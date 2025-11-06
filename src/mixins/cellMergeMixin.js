/**
 * 单元格合并 Mixin
 * 提供表格单元格合并的核心逻辑
 */
export default {
  data() {
    return {
      // 缓存相关
      _mergeCache: {},
      _dataVersion: '',
      _hasSorted: false
    }
  },
  
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          // 数据变化时清除缓存，确保合并单元格重新计算
          this.clearMergeCache()
          this._hasSorted = false
          this.$nextTick(() => {
            if (this.autoUpdateCombinedKeys) {
              this.updateCombinedKeys()
            }
          })
        }
      },
      deep: true
    }
  },
  
  methods: {
    /**
     * 自定义合并单元格方法（Element UI Table 的 span-method）
     */
    customSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 快速返回：如果没有合并配置，直接返回
      if (!this.spanMethodColKeys || this.spanMethodColKeys.length === 0) {
        return { rowspan: 1, colspan: 1 }
      }
      
      // 性能优化：只在第一行第一列时执行排序，避免重复计算
      if (rowIndex === 0 && columnIndex === 0) {
        this.handleDataSorting()
      }

      // 检查是否是需要合并的操作列
      if (this.mergeActionColumns && this.mergeActionColumns.length > 0) {
        const actionConfig = this.getActionColumnConfig(column.label)
        if (actionConfig) {
          // 操作列按照配置的级别合并
          return this.calculateActionColumnSpan(rowIndex, actionConfig.level)
        }
      }

      // 获取当前列信息
      const currentColumn = this.getCurrentColumn(columnIndex)

      // 根据列类型决定是否合并
      if (currentColumn && this.shouldMergeColumn(currentColumn.key)) {
        return this.calculateMergeSpan(rowIndex, currentColumn.key)
      }

      return { rowspan: 1, colspan: 1 }
    },
    
    /**
     * 获取操作列配置
     */
    getActionColumnConfig(label) {
      if (!label || !this.mergeActionColumns || this.mergeActionColumns.length === 0) {
        return null
      }
      
      for (const config of this.mergeActionColumns) {
        // 支持两种格式：字符串或对象
        if (typeof config === 'string') {
          if (config === label) {
            return { label, level: 1 } // 默认一级合并
          }
        } else if (typeof config === 'object' && config.label === label) {
          return { label: config.label, level: config.level || 1 }
        }
      }
      
      return null
    },
    
    /**
     * 计算操作列的合并行数（支持一级、二级、三级合并）
     */
    calculateActionColumnSpan(rowIndex, level = 1) {
      const data = this.tableData
      
      // 性能优化：缓存计算结果
      const cacheKey = `action_merge_${rowIndex}_level${level}`
      if (this._mergeCache && this._mergeCache[cacheKey] !== undefined) {
        return this._mergeCache[cacheKey]
      }
      
      let shouldHide = false
      let mergeCount = 1
      
      // 根据级别判断是否需要隐藏和计算合并数
      if (level === 1) {
        // 一级合并
        if (rowIndex > 0 && this.checkKeysMatch(rowIndex, this.spanMethodColKeys)) {
          shouldHide = true
        } else {
          mergeCount = this.calculatePrimaryMergeCount(rowIndex)
        }
      } else if (level === 2) {
        // 二级合并
        if (rowIndex > 0) {
          // 先检查一级是否相同
          if (this.checkKeysMatch(rowIndex, this.spanMethodColKeys)) {
            // 再检查二级是否相同
            if (this.subSpanMethodColKeys && this.checkKeysMatch(rowIndex, this.subSpanMethodColKeys)) {
              shouldHide = true
            }
          }
        }
        if (!shouldHide) {
          mergeCount = this.calculateSecondaryMergeCount(rowIndex)
        }
      } else if (level === 3) {
        // 三级合并
        if (rowIndex > 0) {
          // 检查一级、二级、三级是否都相同
          if (this.checkKeysMatch(rowIndex, this.spanMethodColKeys) &&
              this.subSpanMethodColKeys && this.checkKeysMatch(rowIndex, this.subSpanMethodColKeys) &&
              this.thirdSpanMethodColKeys && this.checkKeysMatch(rowIndex, this.thirdSpanMethodColKeys)) {
            shouldHide = true
          }
        }
        if (!shouldHide) {
          mergeCount = this.calculateThirdMergeCount(rowIndex)
        }
      }
      
      const result = shouldHide ? { rowspan: 0, colspan: 0 } : { rowspan: mergeCount, colspan: 1 }
      
      // 缓存结果
      if (!this._mergeCache) this._mergeCache = {}
      this._mergeCache[cacheKey] = result
      
      return result
    },
    
    /**
     * 计算合并行数
     */
    calculateMergeSpan(rowIndex, columnKey) {
      const data = this.tableData
      let rowspan = 1

      // 检查是否需要隐藏 - 确保所有 spanMethodColKeys 中的 key 都保证同样的行数
      if (rowIndex > 0 && this.shouldHideRow(rowIndex, columnKey)) {
        return { rowspan: 0, colspan: 0 }
      }

      // 计算合并行数 - 确保所有 spanMethodColKeys 中的 key 都保证同样的行数
      const mergeCount = this.calculateMergeCount(rowIndex, columnKey)
      rowspan = mergeCount

      return { rowspan, colspan: 1 }
    },

    /**
     * 检查是否应该隐藏当前行
     */
    shouldHideRow(rowIndex, columnKey) {
      const data = this.tableData

      // 性能优化：缓存计算结果
      const cacheKey = `hide_${rowIndex}_${columnKey}`
      if (this._mergeCache && this._mergeCache[cacheKey] !== undefined) {
        return this._mergeCache[cacheKey]
      }

      let shouldHide = false

      // 检查一级合并
      if (this.spanMethodColKeys.includes(columnKey)) {
        shouldHide = this.checkKeysMatch(rowIndex, this.spanMethodColKeys)
      }

      // 检查二级合并
      if (!shouldHide && this.subSpanMethodColKeys && this.subSpanMethodColKeys.includes(columnKey)) {
        // 先检查一级合并是否相同
        if (this.checkKeysMatch(rowIndex, this.spanMethodColKeys)) {
          shouldHide = this.checkKeysMatch(rowIndex, this.subSpanMethodColKeys)
        }
      }

      // 检查三级合并
      if (!shouldHide && this.thirdSpanMethodColKeys && this.thirdSpanMethodColKeys.includes(columnKey)) {
        // 先检查一级和二级合并是否相同
        if (this.checkKeysMatch(rowIndex, this.spanMethodColKeys) &&
            this.checkKeysMatch(rowIndex, this.subSpanMethodColKeys)) {
          shouldHide = this.checkKeysMatch(rowIndex, this.thirdSpanMethodColKeys)
        }
      }

      // 缓存结果
      if (!this._mergeCache) this._mergeCache = {}
      this._mergeCache[cacheKey] = shouldHide

      return shouldHide
    },

    /**
     * 检查指定键值是否匹配
     */
    checkKeysMatch(rowIndex, keys) {
      const data = this.tableData
      for (const key of keys) {
        if (data[rowIndex][key] !== data[rowIndex - 1][key]) {
          return false
        }
      }
      return true
    },

    /**
     * 计算合并行数 - 确保所有 spanMethodColKeys 中的 key 都保证同样的行数
     */
    calculateMergeCount(rowIndex, columnKey) {
      const data = this.tableData

      // 性能优化：缓存计算结果
      const cacheKey = `merge_${rowIndex}_${columnKey}`
      if (this._mergeCache && this._mergeCache[cacheKey] !== undefined) {
        return this._mergeCache[cacheKey]
      }

      let mergeCount = 1

      // 计算一级合并
      if (this.spanMethodColKeys.includes(columnKey)) {
        mergeCount = this.calculatePrimaryMergeCount(rowIndex)
      }

      // 计算二级合并
      if (this.subSpanMethodColKeys && this.subSpanMethodColKeys.includes(columnKey)) {
        mergeCount = this.calculateSecondaryMergeCount(rowIndex)
      }

      // 计算三级合并
      if (this.thirdSpanMethodColKeys && this.thirdSpanMethodColKeys.includes(columnKey)) {
        mergeCount = this.calculateThirdMergeCount(rowIndex)
      }

      // 缓存结果
      if (!this._mergeCache) this._mergeCache = {}
      this._mergeCache[cacheKey] = mergeCount

      return mergeCount
    },

    /**
     * 计算一级合并行数
     */
    calculatePrimaryMergeCount(rowIndex) {
      const data = this.tableData
      const currentValues = this.getCurrentValues(rowIndex, this.spanMethodColKeys)

      let mergeCount = 1
      for (let i = rowIndex + 1; i < data.length; i++) {
        if (this.checkRowValuesMatch(i, currentValues, this.spanMethodColKeys)) {
          mergeCount++
        } else {
          break
        }
      }

      return mergeCount
    },

    /**
     * 计算二级合并行数
     */
    calculateSecondaryMergeCount(rowIndex) {
      const data = this.tableData
      const primaryValues = this.getCurrentValues(rowIndex, this.spanMethodColKeys)
      const secondaryValues = this.getCurrentValues(rowIndex, this.subSpanMethodColKeys)

      let mergeCount = 1
      for (let i = rowIndex + 1; i < data.length; i++) {
        // 先检查一级合并是否还相同
        if (!this.checkRowValuesMatch(i, primaryValues, this.spanMethodColKeys)) {
          break
        }

        // 再检查二级合并是否相同
        if (this.checkRowValuesMatch(i, secondaryValues, this.subSpanMethodColKeys)) {
          mergeCount++
        } else {
          break
        }
      }

      return mergeCount
    },

    /**
     * 计算三级合并行数
     */
    calculateThirdMergeCount(rowIndex) {
      const data = this.tableData
      const primaryValues = this.getCurrentValues(rowIndex, this.spanMethodColKeys)
      const secondaryValues = this.getCurrentValues(rowIndex, this.subSpanMethodColKeys)
      const thirdValues = this.getCurrentValues(rowIndex, this.thirdSpanMethodColKeys)

      let mergeCount = 1
      for (let i = rowIndex + 1; i < data.length; i++) {
        // 先检查一级合并是否还相同
        if (!this.checkRowValuesMatch(i, primaryValues, this.spanMethodColKeys)) {
          break
        }

        // 再检查二级合并是否还相同
        if (!this.checkRowValuesMatch(i, secondaryValues, this.subSpanMethodColKeys)) {
          break
        }

        // 最后检查三级合并是否相同
        if (this.checkRowValuesMatch(i, thirdValues, this.thirdSpanMethodColKeys)) {
          mergeCount++
        } else {
          break
        }
      }

      return mergeCount
    },

    /**
     * 获取当前行的指定键值
     */
    getCurrentValues(rowIndex, keys) {
      const data = this.tableData
      const values = {}
      for (const key of keys) {
        values[key] = data[rowIndex][key]
      }
      return values
    },

    /**
     * 检查指定行的值是否匹配
     */
    checkRowValuesMatch(rowIndex, expectedValues, keys) {
      const data = this.tableData
      for (const key of keys) {
        if (data[rowIndex][key] !== expectedValues[key]) {
          return false
        }
      }
      return true
    },

    /**
     * 计算列偏移量
     */
    calculateColumnOffsetFn() {
      return this.columnOffset || 0
    },

    /**
     * 处理数据排序逻辑
     */
    handleDataSorting() {
      if (this.tableData && this.tableData.length > 0) {
        const currentVersion = JSON.stringify(this.tableData)
        if (this._dataVersion !== currentVersion) {
          this._hasSorted = false
          this._dataVersion = currentVersion
          // 清除缓存
          this.clearMergeCache()
        }
      }
      // 只执行一次排序
      if (!this._hasSorted && this.spanMethodColKeys && this.spanMethodColKeys.length > 0) {
        if (this.autoSort) {
          this.sortDataBySpanMethodColKeys()
        }
        this._hasSorted = true
      }
    },

    /**
     * 获取当前列信息
     */
    getCurrentColumn(columnIndex) {
      const offsetIndex = this.calculateColumnOffsetFn()
      let actualColumnIndex = columnIndex - offsetIndex

      if (!this.columnList || this.columnList.length === 0) {
        return null
      }

      // 遍历列配置
      for (const item of this.columnList) {
        // 如果是一级列
        if (!item.subColumnList) {
          if (actualColumnIndex === 0) {
            return item
          }
          actualColumnIndex--
        } else {
          // 如果是二级列，遍历子列
          for (const ele of item.subColumnList) {
            if (actualColumnIndex === 0) {
              return ele
            }
            actualColumnIndex--
          }
        }
      }

      return null
    },

    /**
     * 判断是否应该合并列
     */
    shouldMergeColumn(columnKey) {
      // 检查一级合并
      if (this.spanMethodColKeys.includes(columnKey) ||
          (this.subSpanMethodColKeys && this.subSpanMethodColKeys.includes(columnKey)) ||
          (this.thirdSpanMethodColKeys && this.thirdSpanMethodColKeys.includes(columnKey))) {
        return true
      }

      return false
    },

    /**
     * 按照 spanMethodColKeys 的规则对数据进行排序
     */
    sortDataBySpanMethodColKeys() {
      if (!this.spanMethodColKeys || this.spanMethodColKeys.length === 0) {
        return
      }

      if (!this.tableData || this.tableData.length === 0) {
        return
      }

      // 创建新数组进行排序，避免直接修改原数组
      const sortedData = [...this.tableData].sort((a, b) => {
        // 首先按 spanMethodColKeys 排序
        for (let i = 0; i < this.spanMethodColKeys.length; i++) {
          const key = this.spanMethodColKeys[i]
          const valueA = a[key] || ''
          const valueB = b[key] || ''

          if (valueA < valueB) return -1
          if (valueA > valueB) return 1
        }

        // 如果 spanMethodColKeys 都相同，再按 subSpanMethodColKeys 排序
        if (this.subSpanMethodColKeys && this.subSpanMethodColKeys.length > 0) {
          for (let i = 0; i < this.subSpanMethodColKeys.length; i++) {
            const key = this.subSpanMethodColKeys[i]
            const valueA = a[key] || ''
            const valueB = b[key] || ''

            if (valueA < valueB) return -1
            if (valueA > valueB) return 1
          }
        }

        // 如果 subSpanMethodColKeys 都相同，再按 thirdSpanMethodColKeys 排序
        if (this.thirdSpanMethodColKeys && this.thirdSpanMethodColKeys.length > 0) {
          for (let i = 0; i < this.thirdSpanMethodColKeys.length; i++) {
            const key = this.thirdSpanMethodColKeys[i]
            const valueA = a[key] || ''
            const valueB = b[key] || ''

            if (valueA < valueB) return -1
            if (valueA > valueB) return 1
          }
        }

        return 0
      })

      // 触发更新
      this.$emit('update:data', sortedData)
    },

    /**
     * 清除合并缓存
     */
    clearMergeCache() {
      this._mergeCache = {}
    },

    /**
     * 根据 data 配置把每个二级合并组的值写入 combinedKeys
     */
    updateCombinedKeys() {
      const modeOrKey = this.secondaryRecordKey
      const valueKey = this.secondaryRecordValueKey || 'tid'
      const list = this.tableData || []
      if (!list.length) return

      // 清空默认值
      list.forEach(row => {
        this.$set(row, 'combinedKeys', '')
      })

      // 组装用于匹配分组的key集合
      const levelKeys = this.spanMethodColKeys || []
      const level2Keys = (this.subSpanMethodColKeys || [])
      const level3Keys = (this.thirdSpanMethodColKeys || [])

      let compareKeys = []
      const isLevel = ['1','2','3',1,2,3].includes(modeOrKey)
      if (isLevel) {
        const lvl = Number(modeOrKey)
        if (lvl === 1) compareKeys = [...levelKeys]
        if (lvl === 2) compareKeys = [...levelKeys, ...level2Keys]
        if (lvl === 3) compareKeys = [...levelKeys, ...level2Keys, ...level3Keys]
      } else if (typeof modeOrKey === 'string' && modeOrKey) {
        // 默认：一级合并基础上追加某个字段作为"二级"判定
        compareKeys = [...levelKeys, modeOrKey]
      } else {
        // 若未配置，直接按行自身值写入
        list.forEach(row => {
          const v = row && row[valueKey]
          this.$set(row, 'combinedKeys', v != null ? String(v) : '')
        })
        return
      }

      // 遍历构造分组
      const groups = []
      let i = 0
      const matches = (a, b, keys) => {
        for (const k of keys) {
          if ((a && a[k]) !== (b && b[k])) return false
        }
        return true
      }
      while (i < list.length) {
        let j = i + 1
        while (j < list.length && matches(list[i], list[j], compareKeys)) j++
        const count = j - i
        groups.push({ startIndex: i, count, rows: list.slice(i, j) })
        i = j
      }

      // 写回 combinedKeys
      groups.forEach(g => {
        const combined = g.rows
          .map(r => r && r[valueKey])
          .filter(v => v !== undefined && v !== null && v !== '')
          .join(',')
        g.rows.forEach(r => this.$set(r, 'combinedKeys', combined))
      })
    },

    /**
     * 获取当前显示模式
     */
    getCurrentDisplayMode() {
      if (!this.spanMethodColKeys || this.spanMethodColKeys.length === 0) {
        return 'noMerge'
      }
      if (this.subSpanMethodColKeys && this.subSpanMethodColKeys.length > 0) {
        if (this.thirdSpanMethodColKeys && this.thirdSpanMethodColKeys.length > 0) {
          return 'level3'
        }
        return 'level2'
      }
      return 'level1'
    }
  }
}

