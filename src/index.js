import CombinedElTable from './CombinedElTable.vue'

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

export default CombinedElTable

