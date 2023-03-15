echo $1

DEPLOY_ENV=$1

# 安装依赖
yarn install

if [ $? -ne 0 ]; then
    echo "============================安装依赖失败=================================="
    exit 1
fi

DEPLOY_SVN=""

if [ $DEPLOY_ENV == "production" ]
then
    DEPLOY_SVN="http://svn.cm.net/build-production/<%= projectName %>"
elif [ $DEPLOY_ENV == "staging" ]
then
    DEPLOY_SVN="http://svn.dc.cm.net/build-staging/<%= projectName %>"
elif [ $DEPLOY_ENV == "test" ]
then
    DEPLOY_SVN="http://xx.xx.xx:8088/build-test/<%= projectName %>"
else
    DEPLOY_SVN="http://xx.xx.xx:8088/build-test/<%= projectName %>"
fi

yarn build:$DEPLOY_ENV

if [ $? -ne 0 ]; then
    echo "============================构建失败=================================="
    exit 1
fi


echo $DEPLOY_SVN

# 创建目录
svn mkdir $DEPLOY_SVN -m '创建 <%= projectName %>'
if [ $? -ne 0 ]; then
    echo "============================<%= projectName %>目录已存在=================================="
else
    echo "============================<%= projectName %>目录创建成功================================"
fi

echo 'svn checkout'
# 拉取 svn 代码
svn checkout $DEPLOY_SVN

DIST_DIR="./<%= projectName %>"
echo $DIST_DIR

echo 'cp files'
# 拷贝文件
cp -rf ./dist/* $DIST_DIR

echo '提交svn'
# 提交文件
cd $DIST_DIR

svn info

svn add . --no-ignore --force

svn status

svn ci -m 'push by jenkins'

if [ $? -ne 0 ]; then
    echo "============================failed=================================="
    exit 1
else
    echo "===========================succeed=================================="
fi