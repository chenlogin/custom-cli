#!/bin/bash
echo "===begin==="
echo $PATH
node -v

# 当前脚本目录
currentDir=$(cd `dirname $0`; pwd)

echo "脚本文件 $0，在目录 $currentDir 构建 $1 项目"