A react template Base https://github.com/react-boilerplate/react-boilerplate

# react_template

> React项目模板

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# creat page template
npm run generate

# build for production with minification
npm run build

# code standard
npm run lint

# run all tests
npm test
```

## 代码文档
docs


# 项目布局

```
.
├── app                                         // 源码目录
│   ├── auth                                    // 用户验证
│   │   └── auth.js                             
│   ├── common                                  // 项目常量
│   │   └── constants.js                        // （API_BASE）     
│   ├── components                              // 组件文件
│   │   ├── ...                                 
│   │   └── LoadingIndicator                    // 加载组件
│   ├── containers                              // 页面文件
│   │   ├── App                                 // 页面入口
│   │   │   ├── actions.js                      // 全局事件 
│   │   │   ├── api.js                          // 全局API
│   │   │   ├── constants.js                    // 类型常量 
│   │   │   ├── index.js                        // 页面 
│   │   │   ├── reducer.js                      // reducer store 
│   │   │   ├── saga.js                         // saga异步 
│   │   │   └── selectors.js                    // 获取reducer中的数据
│   │   ├── Dashboard                           // 控制面板页面
│   │   ├── HomePage                            // 首页
│   │   ├── LanguageProvider                    // 语言修改
│   │   ├── Login                               // 登录页面
│   │   └── NotFoundPage                        // 404
│   ├── images                                  // 网页配置图片资源
│   │   ├── favicon.ico                         // 网站Icon
│   │   └── icon-512x512.png                    // 网站Png
│   ├── test                                    // 测试文件
│   │   └── ...                                 
│   ├── translation                             // 语言文件
│   │   └── en.json                             // 英文配置
│   ├── utility                                 // 工具文件
│   │   ├── camel                               // 驼峰下划线命名转换
│   │   ├── ...                               
│   │   └── localStorageCookie.js               // localStorage和Cookie 操作类        
│   ├── utils                                   // 项目工具文件
│   │   ├── tests                               // 测试文件
│   │   ├── checkStore                          
│   │   ├── constants                   // 注入方式常量 （RESTART_ON_REMOUNT， DAEMON， ONCE_TILL_UNMOUNT） 
│   │   ├── history                             // 全局history
│   │   ├── injectReducer.js                    // reducer注入 
│   │   ├── injectSaga.js                       // Saga注入
│   │   ├── reducerInjectors.js                               
│   │   ├── request.js                          // 全局请求     
│   │   └── sagaInjectors.js                           
│   ├── app.js                                  // 程序入口文件，加载资源
│   ├── configureStore                          // Store
│   ├── global-styles.js                        // 全局方式
│   ├── i18n.js                                 // 语言
│   ├── index.html                              // 入口html文件
│   └── reducers                                // 初始reducer
├── build                                       // 打包文件
├── docs                                        // 项目文档
│   └── js                                      // JS文档说明示范
│   │   ├── async-components.md                 // loadable-components 说明示范
│   │   ├── i18n.md                             // 国际化设置 说明示范    
│   │   ├── immutablejs.md                      // immutableJs  说明示范 (reducer)
│   │   ├── README.md                           
│   │   ├── redux-saga.md                       // redux-saga 说明示范   saga注入  
│   │   ├── redux.md                            // redux 说明示范    reducer注入  
│   │   ├── remove.md  
│   │   ├── reselect.md                         // reselect 说明示范
│   │   └── routing      // connected-react-router 说明示范 (react-router-redux to connected-react-router)
├── internal                                    // 内部配置文件
│   ├── generators                              // 模板  （npm run generate）                    
│   ├── mocks                              
│   ├── scripts                                 // 脚本
│   ├── testing           
│   └── webpack                                 // 配置文件
│   │   ├── webpack.base.babel.js               // 基本配置
│   │   ├── webpack.dev.babel.js                // 测试配置                          
│   │   └── webpack.pro.babel.js                // 正式配置
├── server                                      // 服务（端口...）
.

```

## 第三方库

``` bash
# https://github.com/mjrussell/redux-auth-wrapper  用户验证
# https://github.com/lodash/lodash  工具库
# https://github.com/pvorb/node-sha1  密码加密
# https://github.com/nfl/react-helmet  标题修改
# https://github.com/ant-design/ant-design 主题样式
# https://github.com/moment/moment 时间
# less less-loader  less加载
# axios  上传请求

```

## 代码风格
Elint

## 分支
``` bash
# dev-build分支用于不同环境构建
>  internals/webpack/webpack.base.babel.js    DefinePlugin 添加新增的env即可

>  app/app.js                                 正式环境-添加ServiceWorker进行缓存
>  app/configureStore.js                      开发环境-使用Redux DevTools Extension
>  app/utils/sgaInjectors.js                  正式&开发环境 saga重置
>  internals/webpack/webpack.base.babel.js    编译时的设置
>  server/index.js                            编译-ngrok反向代理
>  server/middlewares/frontendMiddleware.js   编译环境判断
>  babel.config.js                            production 配置
>  internals/webpack/webpack.pro.babel.js     正式环境编译 mode nodeEnv 
```
```json
{
  "process.env": {
    "NODE_ENV": "JSON.stringify(process.env.NODE_ENV)",
    "QA_ENV": "JSON.stringify(process.env.QA_ENV)",
  },
}
npm run build
npm run build:qa
```

