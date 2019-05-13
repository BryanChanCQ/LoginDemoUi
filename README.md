<h1 align="center">FAST-UI——企业级中后台UI框架</h1>
<p align="center">让(中后台系统)前端开发简单而友好</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.3.2-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

-------------

## 简介

FAST-UI 是一个中后台网页开发的集成解决方案，
它基于当前最主流、先进和易学的前端技术：

 - [vue](https://github.com/vuejs/vue)
 - [element](https://github.com/ElemeFE/element)
 - [iconfont](http://www.iconfont.cn/)

以及最主流和易用的前端开发技术栈，十分方便开发和维护：

 - [ES6](http://es6.ruanyifeng.com/#docs/intro)
 - [Node.js](https://nodejs.org/en/about/)
 - [Webpack](https://webpack.js.org/)
 - [Eslint](https://eslint.org/)
 - [Babel](http://babeljs.io/)
 - [Mock.js](http://mockjs.com/)

它内置了动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。

<p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>

## 特点和内置功能

```
- 登录 / 注销
- 菜单资源管理
- 用户角色管理
- 角色权限管理
- 操作审计日志
- 配置数据字典

- 权限验证
  - 页面权限
  - 指令权限
  - 二步登录

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标(iconfont)
  - 本地mock数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 多环境发布
  - dev sit stage prod
  
- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导出zip
  - 导入excel
  - 前端可视化excel

- 表格
  - 动态表格
  - 拖拽表格
  - 树形表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- Echarts 图表
- Clipboard(剪贴复制)

```


## 浏览器兼容性

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![UC](https://raw.github.com/alrra/browser-logos/master/src/uc/uc_48x48.png)
:---: | :---: | :---: | :---: | :---: | :---: | :---:
 ✔ |  ✔ |  ✔ |  10+ ✔ |  ✔ |  ✔ | ✔


## 技术支持和资料

### 1. vue-element-admin
 - [在线访问](http://panjiachen.github.io/vue-element-admin)

 - [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

 - [Gitter 讨论组](https://gitter.im/vue-element-admin/discuss)

 - [Wiki](https://github.com/PanJiaChen/vue-element-admin/wiki)

 - [Gitee](https://panjiachen.gitee.io/vue-element-admin/) 国内用户

 - 作者提供的 **[圈子](https://jianshiapp.com/circles/1209)** ，或者加入[qq 群](https://github.com/PanJiaChen/vue-element-admin/issues/602)

### 2.element-ui
 - [组件文档](http://element-cn.eleme.io/#/zh-CN/component/installation)
 - [Github](https://github.com/ElemeFE/element)

### 3.vue
 - [官方文档](https://cn.vuejs.org/)
 - [Router](https://router.vuejs.org/)
 - [vuex](https://vuex.vuejs.org/)

### 4.webpack
 - [官方文档](https://webpack.js.org/)
 - [中文翻译](https://www.webpackjs.com/)

### 5.Mock.js
 - [官方文档](https://github.com/nuysoft/Mock/wiki)

### 6.配套教程
- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)
- [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)
- [手摸手，带你用合理的姿势使用 webpack4（上）](https://juejin.im/post/5b56909a518825195f499806)
- [手摸手，带你用合理的姿势使用 webpack4（下）](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)


## 依赖的关键组件及版本
| 名称        | 版本   |
| --------   | -----:  |
| element-ui | 2.4.6 |
| vue | 2.5.17 |
| vue-router | 3.0.1 |
| vuex | 3.0.1 |
| vue-i18n | 7.3.2 |
| axios | 0.18.0 |
| babel-core | 6.26.3 |
| babel-loader | 7.1.5 |
| css-loader | 1.0.0 |
| eslint | 4.19.1 |
| eslint-plugin-vue | 4.7.1 |
| postcss-loader | 2.1.6 |
| sass-loader | 7.0.3 |
| svg-sprite-loader | 3.8.0 |
| uglifyjs-webpack-plugin | 1.2.7 |
| vue-loader | 15.3.0 |
| vue-style-loader | 4.1.2 |
| vue-template-compiler | 2.5.17 |
| webpack | 4.16.5 |
| webpack-cli | 3.1.0 |
| webpack-dev-server | 3.1.5 |


## Online Demo

[在线 Demo](http://panjiachen.github.io/vue-element-admin)

## 更多信息
请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## License

[MIT](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)

## 特别鸣谢
 - PanJiaChen



# LoginDemoUi
