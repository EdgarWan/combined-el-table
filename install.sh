#!/bin/bash

# Combined El Table 快速安装脚本
# 使用方法: bash install.sh

echo "================================================"
echo "  Combined El Table 快速安装"
echo "================================================"
echo ""

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
COMPONENT_DIR="$SCRIPT_DIR"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

echo "组件目录: $COMPONENT_DIR"
echo "项目根目录: $PROJECT_ROOT"
echo ""

# 步骤 1: 安装组件依赖
echo "步骤 1/3: 安装组件依赖..."
cd "$COMPONENT_DIR"
npm install
if [ $? -ne 0 ]; then
    echo "错误: 组件依赖安装失败"
    exit 1
fi
echo "✓ 组件依赖安装成功"
echo ""

# 步骤 2: 构建组件
echo "步骤 2/3: 构建组件..."
npm run build
if [ $? -ne 0 ]; then
    echo "错误: 组件构建失败"
    exit 1
fi
echo "✓ 组件构建成功"
echo ""

# 步骤 3: 在主项目中安装
echo "步骤 3/3: 在主项目中安装组件..."
cd "$PROJECT_ROOT"
npm install ./my_package/combined-el-table
if [ $? -ne 0 ]; then
    echo "错误: 主项目安装失败"
    exit 1
fi
echo "✓ 主项目安装成功"
echo ""

echo "================================================"
echo "  安装完成！"
echo "================================================"
echo ""
echo "接下来的步骤:"
echo ""
echo "1. 在 main.js 中添加以下代码:"
echo ""
echo "   import CombinedElTable from 'combined-el-table'"
echo "   Vue.use(CombinedElTable)"
echo ""
echo "2. 在组件中使用:"
echo ""
echo "   <combined-el-table"
echo "     :data=\"tableData\""
echo "     :column-list=\"columnList\""
echo "     :span-method-col-keys=\"['field1', 'field2']\""
echo "     border"
echo "   >"
echo "     <el-table-column prop=\"field1\" label=\"字段1\"></el-table-column>"
echo "     <el-table-column prop=\"field2\" label=\"字段2\"></el-table-column>"
echo "   </combined-el-table>"
echo ""
echo "详细文档请查看: $COMPONENT_DIR/README.md"
echo "使用示例请查看: $COMPONENT_DIR/USAGE_EXAMPLE.md"
echo ""

