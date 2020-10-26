#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to github

git init
git config --global user.name "jiangxuejian"
git config --global user.email "1137518450@qq.com"

codingUrl=https://quaHdFRFBo:${CODING_TOKEN}@e.coding.net/jiangxuejian/blog/blog.git
git add .
git commit -m "d"
git push -f $codingUrl master # 推送到coding

cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist
