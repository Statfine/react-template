A react template

# react_template

> React项目模板

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# build page template
npm run generate

# build for production with minification
npm run build

# code standard
npm run lint

# run all tests
npm test
```

Base https://github.com/react-boilerplate/react-boilerplate

# 项目布局

```
.
├── build                                       // 打包文件
├── app                                         // 源码目录
│   ├── auth                                    // 用户验证
│   │   └── auth.js                             
│   ├── components                              // 组件文件
│   │   ├── ...                                 
│   │   └── LoadingIndicator                    // 加载组件
│   ├── containers                              // 页面文件
│   │   ├── App                                 // 页面入口
│   │   │   ├── index.js                        // Appstore
│   │   │   └── types.js                        // 常量
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
│   ├── utils                                   // 项目工具文件
│   │   ├── tests                               // 测试文件
│   │   ├── checkStore                          
│   │   ├── constants                           // 注入方式常量                
│   │   ├── history                            
│   │   ├── injectReducer.js                    // reducer注入 
│   │   ├── injectSaga.js                       // Saga注入
│   │   ├── reducerInjectors.js                               
│   │   └── sagaInjectors.js                           
│   ├── app.js                                  // 程序入口文件，加载资源
│   ├── configureStore                          // Store
│   ├── global-styles.js                        // 全局方式
│   ├── i18n.js                                 // 语言
│   ├── index.html                              // 入口html文件
│   └── reducers                                // 初始reducer
├── index.html                                  // 入口html文件
├── internal                                    // 内部配置
│   ├── generators                              // 模板  （npm run generate）                    
│   ├── mocks                              
│   ├── scripts                                 // 脚本
│   ├── testing           
│   └── webpack                                 // 配置
│   │   ├── webpack.base.babel.js               // 基本配置
│   │   ├── webpack.dev.babel.js                // 测试配置                          
│   │   └── webpack.pro.babel.js                // 正式配置
├── server                                      // 服务（端口...）
.

```

## 第三方库

``` bash
# https://github.com/mjrussell/redux-auth-wrapper  用户验证

```

## 代码风格
Elint

