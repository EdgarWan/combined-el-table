<template>
  <div class="basic-example">
    <h2>Combined El Table - 基础示例</h2>
    
    <div class="example-section">
      <h3>示例 1: 简单合并</h3>
      <combined-el-table
        :data="simpleData"
        :column-list="simpleColumns"
        :span-method-col-keys="['category']"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="category" label="类别" width="150"></el-table-column>
        <el-table-column prop="name" label="名称" width="200"></el-table-column>
        <el-table-column prop="value" label="数值"></el-table-column>
      </combined-el-table>
    </div>

    <div class="example-section">
      <h3>示例 2: 多级合并</h3>
      <combined-el-table
        :data="complexData"
        :column-list="complexColumns"
        :span-method-col-keys="primaryKeys"
        :sub-span-method-col-keys="secondaryKeys"
        border
        style="width: 100%"
      >
        <el-table-column prop="year" label="年份" width="100"></el-table-column>
        <el-table-column prop="quarter" label="季度" width="100"></el-table-column>
        <el-table-column prop="category" label="类别" width="120"></el-table-column>
        <el-table-column prop="product" label="产品" width="150"></el-table-column>
        <el-table-column prop="region" label="地区" width="120"></el-table-column>
        <el-table-column prop="sales" label="销量"></el-table-column>
      </combined-el-table>
    </div>

    <div class="example-section">
      <h3>示例 3: 带嵌套列的表格</h3>
      <combined-el-table
        :data="nestedData"
        :column-list="nestedColumns"
        :span-method-col-keys="['month', 'product']"
        border
        style="width: 100%"
      >
        <el-table-column prop="month" label="月份" width="120"></el-table-column>
        <el-table-column prop="product" label="产品" width="150"></el-table-column>
        
        <el-table-column label="销售数据">
          <el-table-column prop="salesPlan" label="计划" width="120"></el-table-column>
          <el-table-column prop="salesActual" label="实际" width="120"></el-table-column>
        </el-table-column>
        
        <el-table-column label="库存数据">
          <el-table-column prop="inventory" label="当前库存" width="120"></el-table-column>
          <el-table-column prop="inventoryAlert" label="预警值" width="100"></el-table-column>
        </el-table-column>
      </combined-el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicExample',
  
  data() {
    return {
      // 简单示例数据
      simpleData: [
        { category: '电子产品', name: '手机A', value: 100 },
        { category: '电子产品', name: '手机B', value: 150 },
        { category: '电子产品', name: '电脑A', value: 200 },
        { category: '家具', name: '桌子', value: 50 },
        { category: '家具', name: '椅子', value: 80 },
        { category: '文具', name: '笔', value: 10 }
      ],
      
      simpleColumns: [
        { key: 'category', name: '类别' },
        { key: 'name', name: '名称' },
        { key: 'value', name: '数值' }
      ],
      
      // 复杂示例数据
      complexData: [
        { year: '2024', quarter: 'Q1', category: '电子产品', product: '笔记本', region: '华东', sales: 100 },
        { year: '2024', quarter: 'Q1', category: '电子产品', product: '笔记本', region: '华北', sales: 150 },
        { year: '2024', quarter: 'Q1', category: '电子产品', product: '台式机', region: '华东', sales: 200 },
        { year: '2024', quarter: 'Q2', category: '家具', product: '办公桌', region: '华南', sales: 80 },
        { year: '2024', quarter: 'Q2', category: '家具', product: '办公桌', region: '华北', sales: 120 },
        { year: '2025', quarter: 'Q1', category: '电子产品', product: '平板', region: '华东', sales: 90 }
      ],
      
      complexColumns: [
        { key: 'year', name: '年份' },
        { key: 'quarter', name: '季度' },
        { key: 'category', name: '类别' },
        { key: 'product', name: '产品' },
        { key: 'region', name: '地区' },
        { key: 'sales', name: '销量' }
      ],
      
      primaryKeys: ['year', 'quarter', 'category', 'product'],
      secondaryKeys: ['region'],
      
      // 嵌套列示例数据
      nestedData: [
        { month: '2024-01', product: '产品A', salesPlan: 1000, salesActual: 950, inventory: 200, inventoryAlert: 100 },
        { month: '2024-01', product: '产品A', salesPlan: 800, salesActual: 820, inventory: 150, inventoryAlert: 100 },
        { month: '2024-01', product: '产品B', salesPlan: 500, salesActual: 480, inventory: 300, inventoryAlert: 150 },
        { month: '2024-02', product: '产品A', salesPlan: 1200, salesActual: 1150, inventory: 180, inventoryAlert: 100 }
      ],
      
      nestedColumns: [
        { key: 'month', name: '月份' },
        { key: 'product', name: '产品' },
        {
          name: '销售数据',
          subColumnList: [
            { key: 'salesPlan', name: '计划' },
            { key: 'salesActual', name: '实际' }
          ]
        },
        {
          name: '库存数据',
          subColumnList: [
            { key: 'inventory', name: '当前库存' },
            { key: 'inventoryAlert', name: '预警值' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.basic-example {
  padding: 20px;
}

.example-section {
  margin-bottom: 40px;
}

h2 {
  color: #333;
  margin-bottom: 30px;
}

h3 {
  color: #666;
  margin-bottom: 15px;
  font-size: 16px;
}
</style>
