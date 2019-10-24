# react-my-blog

<p align='center'>
  <a href='https://github.com/facebook/react'>
    <img src="https://img.shields.io/badge/react-16.8.6-brightgreen.svg" alt="react">
  </a>
  <a href='https://github.com/ant-design/ant-design'>
    <img src="https://img.shields.io/badge/antd-3.22.2-brightgreen.svg" alt="ant-design">
  </a>
  <a href='https://github.com/axios/axios'>
    <img src="https://img.shields.io/badge/axios-0.19.0-brightgreen.svg" alt="axios">
  </a>
  <a href='https://github.com/koajs/koa'>
    <img src="https://img.shields.io/badge/koa-2.7.0-brightgreen.svg" alt="koa">
  </a>
  <a href='https://github.com/sequelize/sequelize'>
    <img src="https://img.shields.io/badge/sequelize-5.12.3-brightgreen.svg" alt="sequelize">
  </a>
</p>

简体中文

## 简介

[react-my-blog](https://github.com/zhangwinwin/react-my-blog)是一个基于react、ant-design的优秀前端框架和koa、sequelize优秀后端框架构建成的博客单页面应用。

**目前版本基于create-react-app进行构建**

## 前序准备
你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈前端基于 [ES2015+](http://es6.ruanyifeng.com/)、[react](https://github.com/facebook/react)、[ant-design](https://github.com/ant-design/ant-design)、[axios](https://github.com/axios/axios)、[react-reduex]()和[react-router]()，后端基于[koa](https://github.com/koajs/koa)、[sequelize](https://github.com/sequelize/sequelize)和[nodemon]()。提前了解和学习这些知识会对使用本项目有很大的帮助。

## 功能
```
- 登录 / 注销 / 注册
- 错误页面
  - 404
- 文章
  - 文章创建
  - 文章修改
- 回复
  - 回复创建
- 文章类型
  - 类型创建
  - 类型修改
```

## 开发
```
# 克隆项目
git clone https://github.com/zhangwinwin/react-my-blog

# 进入项目目录
cd react-my-blog

# 安装客户端依赖
npm install

# npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动客户端服务
npm start

# 进入服务端目录
cd server

# 安装服务端依赖
npm install

# 启动服务端服务
npm start
```

浏览器访问 http://localhost:3000

## 发布
```
# 构建生产环境
npm run build
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions