import Vue from 'vue'
import { Table } from 'element-ui'

export interface ColumnConfig {
  key?: string
  name?: string
  width?: number
  subColumnList?: ColumnConfig[]
}

export interface ActionColumnConfig {
  label: string
  level?: 1 | 2 | 3  // 1-一级合并, 2-二级合并, 3-三级合并
}

export interface CombinedElTableProps {
  data: Array<any>
  mergeEnabled?: boolean
  columnList?: ColumnConfig[]
  spanMethodColKeys?: string[]
  subSpanMethodColKeys?: string[]
  thirdSpanMethodColKeys?: string[]
  columnOffset?: number
  autoSort?: boolean
  autoUpdateCombinedKeys?: boolean
  secondaryRecordKey?: string | number
  secondaryRecordValueKey?: string
  mergeActionColumns?: Array<string | ActionColumnConfig>
}

export declare class CombinedElTable extends Vue {
  // Props
  data: Array<any>
  mergeEnabled: boolean
  columnList: ColumnConfig[]
  spanMethodColKeys: string[]
  subSpanMethodColKeys: string[]
  thirdSpanMethodColKeys: string[]
  columnOffset: number
  autoSort: boolean
  autoUpdateCombinedKeys: boolean
  secondaryRecordKey: string | number
  secondaryRecordValueKey: string
  mergeActionColumns: Array<string | ActionColumnConfig>

  // Methods from cellMergeMixin
  customSpanMethod(params: { row: any; column: any; rowIndex: number; columnIndex: number }): { rowspan: number; colspan: number }
  clearMergeCache(): void
  updateCombinedKeys(): void
  getCurrentDisplayMode(): 'noMerge' | 'level1' | 'level2' | 'level3'

  // Methods from el-table
  clearSelection(): void
  toggleRowSelection(row: any, selected?: boolean): void
  toggleAllSelection(): void
  toggleRowExpansion(row: any, expanded?: boolean): void
  setCurrentRow(row: any): void
  clearSort(): void
  clearFilter(columnKey?: string): void
  doLayout(): void
  sort(prop: string, order: string): void
}

export function install(vue: typeof Vue): void

export default CombinedElTable

