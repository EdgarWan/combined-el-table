<template>
  <el-table
    ref="elTable"
    :data="tableData"
    :span-method="mergeEnabled ? customSpanMethod : null"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-table>
</template>

<script>
import cellMergeMixin from './mixins/cellMergeMixin'

export default {
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
}
</script>

