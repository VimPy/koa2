# 项目搭建

1.  npm install koa-generator -g

2.  koa2 my-demo
    cd my-demo && npm install（install dependencies）
    SET DEBUG=koa* & npm start my-demo （run the app）

3. 生成的目录结构

   .
   +-- bin
   |   +-- www               // 项目启动必备文件,配置端口等服务信息
   +-- node_modules          // 项目依赖，安装的所有模块都会在这个文件夹下
   +-- public                // 存放静态文件，如样式、图片等
   |   +-- images            // 图片
   |   +-- javascript        // js文件
   |   +-- stylesheets       // 样式文件
   +-- routers               // 存放路由文件，如果前后端分离的话只用来书写api接口使用
   |   +-- index.js
   |   +-- user.js
   +-- views                 // 存放模板文件，就是前端页面，如果后台只是提供api的话，这个就是备用
   |   +-- error.pug
   |   +-- index.pug
   |   +-- layout.pug
   +-- app.js                // 主入口文件
   +-- package.json          // 存储项目名、描述、作者、依赖等等信息
   +-- package-lock.json     // 存储项目依赖的版本信息，确保项目内的每个人安装的版本一致
