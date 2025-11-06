# Combined El Table

一个基于 Element UI Table 的增强型表格组件，提供强大的单元格合并功能。

## 特性

- ✅ 完全兼容 Element UI Table 的所有 API
- ✅ 支持一级、二级、三级单元格合并
- ✅ 性能优化的缓存机制
- ✅ 支持自动排序
- ✅ 支持动态合并键更新
- ✅ 易于集成和使用

## 安装

### 方式一：本地安装（开发阶段）

```bash
# 在项目根目录下
cd my_package/combined-el-table
npm install

# 在主项目中安装
cd ../../
npm install ./my_package/combined-el-table
```

### 方式二：从 npm 安装（发布后）

```bash
npm install combined-el-table
```

## 快速开始

### 全局注册

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CombinedElTable from 'combined-el-table'

Vue.use(ElementUI)
Vue.use(CombinedElTable)
```

### 局部注册

```javascript
import CombinedElTable from 'combined-el-table'

export default {
  components: {
    CombinedElTable
  }
}
```

## 操作列合并

组件支持对操作列（按钮列）进行自动合并，支持配置一级、二级、三级合并规则。

### 简单配置（默认一级合并）

```vue
<template>
  <combined-el-table
    :data="tableData"
    :column-list="columnList"
    :span-method-col-keys="['category', 'product']"
    :merge-action-columns="['操作', '查看详情']"
    border
  >
    <el-table-column prop="category" label="类别"></el-table-column>
    <el-table-column prop="product" label="产品"></el-table-column>
    <el-table-column prop="sales" label="销量"></el-table-column>
    
    <!-- 操作列会自动合并 -->
    <el-table-column label="操作" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    
    <!-- 可以有多个操作列，都会合并 -->
    <el-table-column label="查看详情" width="120" fixed="right">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </combined-el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [...],
      columnList: [
        { key: 'category', name: '类别' },
        { key: 'product', name: '产品' },
        { key: 'sales', name: '销量' }
      ]
    }
  },
  methods: {
    handleEdit(row) {
      console.log('编辑:', row)
    },
    handleDelete(row) {
      console.log('删除:', row)
    },
    handleView(row) {
      console.log('查看:', row)
    }
  }
}
</script>
```

**说明：**
- `merge-action-columns` 接收一个数组，包含需要合并的列的 `label` 值
- 简单配置时，默认按照一级合并规则（`span-method-col-keys`）进行合并
- 支持多个操作列，只要在 `merge-action-columns` 中配置即可
- 不限制按钮的数量和类型，完全灵活

### 高级配置（指定合并级别）

```vue
<template>
  <combined-el-table
    :data="tableData"
    :column-list="columnList"
    :span-method-col-keys="primaryKeys"
    :sub-span-method-col-keys="secondaryKeys"
    :third-span-method-col-keys="thirdKeys"
    :merge-action-columns="actionColumnsConfig"
    border
  >
    <el-table-column prop="year" label="年份"></el-table-column>
    <el-table-column prop="quarter" label="季度"></el-table-column>
    <el-table-column prop="category" label="类别"></el-table-column>
    <el-table-column prop="product" label="产品"></el-table-column>
    <el-table-column prop="region" label="地区"></el-table-column>
    
    <!-- 操作列1 - 一级合并 -->
    <el-table-column label="基础操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini">编辑</el-button>
        <el-button size="mini">删除</el-button>
      </template>
    </el-table-column>
    
    <!-- 操作列2 - 二级合并 -->
    <el-table-column label="详细操作" width="120">
      <template slot-scope="scope">
        <el-button size="mini">查看</el-button>
      </template>
    </el-table-column>
    
    <!-- 操作列3 - 三级合并 -->
    <el-table-column label="特殊操作" width="100">
      <template slot-scope="scope">
        <el-button size="mini">审批</el-button>
      </template>
    </el-table-column>
  </combined-el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [...],
      columnList: [...],
      primaryKeys: ['year', 'quarter'],       // 一级合并
      secondaryKeys: ['category'],             // 二级合并
      thirdKeys: ['product'],                  // 三级合并
      
      // 操作列配置 - 指定不同的合并级别
      actionColumnsConfig: [
        { label: '基础操作', level: 1 },  // 按一级合并
        { label: '详细操作', level: 2 },  // 按二级合并
        { label: '特殊操作', level: 3 }   // 按三级合并
      ]
    }
  }
}
</script>
```

**配置说明：**
- **格式1**：字符串数组 `['操作']` - 默认一级合并
- **格式2**：对象数组 `[{ label: '操作', level: 1 }]` - 指定合并级别
- **level 说明**：
  - `1` - 一级合并（按 `span-method-col-keys` 规则）
  - `2` - 二级合并（按 `sub-span-method-col-keys` 规则）
  - `3` - 三级合并（按 `third-span-method-col-keys` 规则）
- 可以混合使用两种格式

## 使用示例

### 基础用法

```vue
<template>
  <combined-el-table
    :data="tableData"
    :column-list="columnList"
    :span-method-col-keys="['category', 'product']"
    border
  >
    <el-table-column prop="category" label="类别"></el-table-column>
    <el-table-column prop="product" label="产品"></el-table-column>
    <el-table-column prop="sales" label="销量"></el-table-column>
  </combined-el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { category: '电子产品', product: '手机', sales: 100 },
        { category: '电子产品', product: '手机', sales: 200 },
        { category: '电子产品', product: '电脑', sales: 150 },
        { category: '家具', product: '桌子', sales: 50 },
      ],
      columnList: [
        { key: 'category', name: '类别' },
        { key: 'product', name: '产品' },
        { key: 'sales', name: '销量' }
      ]
    }
  }
}
</script>
```

### 多级合并

```vue
<template>
  <combined-el-table
    :data="tableData"
    :column-list="columnList"
    :span-method-col-keys="primaryKeys"
    :sub-span-method-col-keys="secondaryKeys"
    :third-span-method-col-keys="thirdKeys"
    border
  >
    <el-table-column prop="month" label="月份"></el-table-column>
    <el-table-column prop="category" label="类别"></el-table-column>
    <el-table-column prop="product" label="产品"></el-table-column>
    <el-table-column prop="region" label="地区"></el-table-column>
    <el-table-column prop="warehouse" label="仓库"></el-table-column>
  </combined-el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [...],
      columnList: [...],
      // 一级合并字段
      primaryKeys: ['month', 'category', 'product'],
      // 二级合并字段
      secondaryKeys: ['region'],
      // 三级合并字段
      thirdKeys: ['warehouse']
    }
  }
}
</script>
```

### 带嵌套列的表格

```vue
<template>
  <combined-el-table
    :data="tableData"
    :column-list="columnList"
    :span-method-col-keys="['month', 'product']"
    border
  >
    <el-table-column prop="month" label="月份"></el-table-column>
    <el-table-column prop="product" label="产品"></el-table-column>
    
    <!-- 嵌套列 -->
    <el-table-column label="第一季度">
      <el-table-column prop="q1Plan" label="计划"></el-table-column>
      <el-table-column prop="q1Actual" label="实际"></el-table-column>
    </el-table-column>
    
    <el-table-column label="第二季度">
      <el-table-column prop="q2Plan" label="计划"></el-table-column>
      <el-table-column prop="q2Actual" label="实际"></el-table-column>
    </el-table-column>
  </combined-el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [...],
      columnList: [
        { key: 'month', name: '月份' },
        { key: 'product', name: '产品' },
        {
          name: '第一季度',
          subColumnList: [
            { key: 'q1Plan', name: '计划' },
            { key: 'q1Actual', name: '实际' }
          ]
        },
        {
          name: '第二季度',
          subColumnList: [
            { key: 'q2Plan', name: '计划' },
            { key: 'q2Actual', name: '实际' }
          ]
        }
      ]
    }
  }
}
</script>
```

## Props

### 组件特有属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 表格数据 | Array | [] |
| merge-enabled | 是否启用合并功能 | Boolean | true |
| column-list | 列配置列表（用于解析列结构） | Array | [] |
| span-method-col-keys | 一级合并字段列表 | Array | [] |
| sub-span-method-col-keys | 二级合并字段列表 | Array | [] |
| third-span-method-col-keys | 三级合并字段列表 | Array | [] |
| column-offset | 列偏移量（序号列、选择列等） | Number | 0 |
| auto-sort | 是否自动按合并字段排序 | Boolean | false |
| auto-update-combined-keys | 是否自动更新 combinedKeys | Boolean | false |
| secondary-record-key | 二级记录键（'1','2','3' 或字段名） | String/Number | '1' |
| secondary-record-value-key | 要拼接的值字段key | String | 'tid' |

### Element UI Table 原生属性

支持 Element UI Table 的所有属性，包括但不限于：

- `height` / `max-height`
- `stripe`
- `border`
- `fit`
- `show-header`
- `highlight-current-row`
- `row-class-name`
- `row-style`
- `cell-class-name`
- `cell-style`
- 等等...

详见 [Element UI Table 文档](https://element.eleme.cn/#/zh-CN/component/table)

## Methods

组件代理了 Element UI Table 的所有方法：

- `clearSelection()` - 清空用户的选择
- `toggleRowSelection(row, selected)` - 切换某一行的选中状态
- `toggleAllSelection()` - 切换所有行的选中状态
- `toggleRowExpansion(row, expanded)` - 切换某一行的展开状态
- `setCurrentRow(row)` - 设置某一行为当前行
- `clearSort()` - 清空排序条件
- `clearFilter(columnKey)` - 清空指定列的过滤条件
- `doLayout()` - 对 Table 进行重新布局
- `sort(prop, order)` - 手动排序

此外还提供了合并相关的方法：

- `clearMergeCache()` - 清除合并缓存
- `updateCombinedKeys()` - 更新合并键
- `getCurrentDisplayMode()` - 获取当前显示模式

## Events

支持 Element UI Table 的所有事件：

- `select` - 当用户手动勾选数据行的 Checkbox 时触发
- `select-all` - 当用户手动勾选全选 Checkbox 时触发
- `selection-change` - 当选择项发生变化时触发
- `cell-mouse-enter` - 当单元格 hover 进入时触发
- `cell-mouse-leave` - 当单元格 hover 退出时触发
- `cell-click` - 当某个单元格被点击时触发
- `row-click` - 当某一行被点击时触发
- 等等...

详见 [Element UI Table 文档](https://element.eleme.cn/#/zh-CN/component/table)

## Column List 配置说明

`column-list` 用于描述表格的列结构，帮助组件正确识别列位置以进行合并。

### 基础列结构

```javascript
{
  key: 'fieldName',      // 字段名（必填）
  name: '显示名称',       // 列标题（可选）
  width: 120             // 列宽（可选）
}
```

### 嵌套列结构

```javascript
{
  name: '父级列名',
  subColumnList: [       // 子列列表
    { key: 'field1', name: '子列1' },
    { key: 'field2', name: '子列2' }
  ]
}
```

## 合并规则说明

### 一级合并

只配置 `span-method-col-keys`，相同值的单元格会被合并：

```javascript
spanMethodColKeys: ['category', 'product']
```

当 `category` 和 `product` 字段值都相同时，这些字段对应的单元格会被合并。

### 二级合并

在一级合并基础上，配置 `sub-span-method-col-keys`：

```javascript
spanMethodColKeys: ['category', 'product']
subSpanMethodColKeys: ['brand']
```

合并逻辑：
1. 首先按一级合并字段分组
2. 在同一个一级分组内，再按二级合并字段分组
3. `brand` 字段只在同一个一级分组内进行合并

### 三级合并

在二级合并基础上，配置 `third-span-method-col-keys`：

```javascript
spanMethodColKeys: ['category', 'product']
subSpanMethodColKeys: ['brand']
thirdSpanMethodColKeys: ['model']
```

## 性能优化

组件内置了多项性能优化措施：

1. **缓存机制**：合并计算结果会被缓存，避免重复计算
2. **懒排序**：只在需要时执行一次排序
3. **增量更新**：数据变化时只清除相关缓存

## 注意事项

1. 使用合并功能时，建议传入 `column-list` 以确保正确识别列结构
2. 如果表格包含选择列或序号列，需要设置正确的 `column-offset`
3. 开启 `auto-sort` 会自动对数据排序，可能影响原始数据顺序
4. 合并字段的值应该是可比较的类型（字符串、数字等）

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build
```

## License

MIT

