#!/bin/bash

# 版本号
node -v
yarn -v
npm -v

# 设置为prod模式
export NODE_ENV=production
env | grep NODE_ENV

# 清理npm缓存
# npm cache clean -f
# 安装依赖，忽略关联脚本运行，加快安装速度
# npm install --ignore-scripts

cnpm install

npm run server:prod

if [ $? -ne 0 ]; then
exit 1
fi

mkdir -p ./output/webroot

tar czvf node_modules.tar ./node_modules
tar czvf server.tar ./dist

# cp -r ./dist ./output/webroot
# cp -r ./node_modules ./output/webroot

tar zxvf server.tar -C ./output/webroot
tar zxvf node_modules.tar -C ./output/webroot
chmod -R 755 ./output/webroot
