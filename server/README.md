### koa
koa2、koa-router

### npm start
localhost:3030/api

### nodemon 热启动
npm install nodemon -D 
在package.json的script增加"start": "nodemon app.js"

### 支持import
npm install nodemon -D babel-plugin-transform-es2015-modules-commonjs babel-register
在根目录增加start.js
修改package.json
"start": "nodemon start.js"