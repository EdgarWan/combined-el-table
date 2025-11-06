(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["combined-el-table"] = factory();
	else
		root["combined-el-table"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"32be2c1d-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/CombinedElTable.vue?vue&type=template&id=6b39ea4c
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('el-table',_vm._g(_vm._b({ref:"elTable",attrs:{"data":_vm.tableData,"span-method":_vm.mergeEnabled ? _vm.customSpanMethod : null}},'el-table',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)
}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/CombinedElTable.vue?vue&type=template&id=6b39ea4c

// CONCATENATED MODULE: ./src/mixins/cellMergeMixin.js
/**
 * 单元格合并 Mixin
 * 提供表格单元格合并的核心逻辑
 */
/* harmony default export */ var cellMergeMixin = ({
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
});


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/CombinedElTable.vue?vue&type=script&lang=js



/* harmony default export */ var CombinedElTablevue_type_script_lang_js = ({
  name: 'CombinedElTable',
  mixins: [cellMergeMixin],
  
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    
    // 是否启用合并功能
    mergeEnabled: {
      type: Boolean,
      default: true
    },
    
    // 列配置列表
    columnList: {
      type: Array,
      default: () => []
    },
    
    // 一级合并字段列表
    spanMethodColKeys: {
      type: Array,
      default: () => []
    },
    
    // 二级合并字段列表
    subSpanMethodColKeys: {
      type: Array,
      default: () => []
    },
    
    // 三级合并字段列表
    thirdSpanMethodColKeys: {
      type: Array,
      default: () => []
    },
    
    // 列偏移量（用于序号列、选择列等）
    columnOffset: {
      type: Number,
      default: 0
    },
    
    // 是否自动排序
    autoSort: {
      type: Boolean,
      default: false
    },
    
    // 是否自动更新 combinedKeys
    autoUpdateCombinedKeys: {
      type: Boolean,
      default: false
    },
    
    // 二级记录键（1,2,3 或具体字段名）
    secondaryRecordKey: {
      type: [String, Number],
      default: '1'
    },
    
    // 要拼接的值字段key
    secondaryRecordValueKey: {
      type: String,
      default: 'tid'
    },
    
    // 需要合并的操作列标识（通过 label 匹配）
    // 支持两种格式：
    // 1. 简单数组：['操作', '查看详情'] - 默认按一级合并
    // 2. 对象数组：[{ label: '操作', level: 1 }, { label: '查看详情', level: 2 }]
    //    level: 1-一级合并, 2-二级合并, 3-三级合并
    mergeActionColumns: {
      type: Array,
      default: () => []
    }
  },
  
  computed: {
    tableData: {
      get() {
        return this.data
      },
      set(val) {
        this.$emit('update:data', val)
      }
    }
  },
  
  methods: {
    // 代理 el-table 的所有方法
    clearSelection() {
      this.$refs.elTable.clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row)
    },
    clearSort() {
      this.$refs.elTable.clearSort()
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey)
    },
    doLayout() {
      this.$refs.elTable.doLayout()
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order)
    }
  }
});

// CONCATENATED MODULE: ./src/CombinedElTable.vue?vue&type=script&lang=js
 /* harmony default export */ var src_CombinedElTablevue_type_script_lang_js = (CombinedElTablevue_type_script_lang_js); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/CombinedElTable.vue





/* normalize component */

var component = normalizeComponent(
  src_CombinedElTablevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CombinedElTable = (component.exports);
// CONCATENATED MODULE: ./src/index.js


// 存储已安装标记
CombinedElTable.installed = false

// Vue.use() 调用的安装方法
CombinedElTable.install = function(Vue) {
  if (CombinedElTable.installed) return
  CombinedElTable.installed = true
  
  Vue.component(CombinedElTable.name, CombinedElTable)
}

// 自动安装（如果通过 script 标签引入）
if (typeof window !== 'undefined' && window.Vue) {
  CombinedElTable.install(window.Vue)
}

/* harmony default export */ var src_0 = (CombinedElTable);


// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_0);



/***/ })

/******/ });
});