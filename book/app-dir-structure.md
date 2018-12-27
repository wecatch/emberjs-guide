# ember app 目录结构介绍

```

├── app
  ├── components
  ├── controllers
  ├── helpers
  ├── models
  ├── routes
  ├── styles
  └── templates
├── bower_components
├── config
├── node_modules
├── public
├── server
├── tests
└── vendor

```

秉承`约定优于配置`的设计理念，ember app 的目录结构，文件命名，变量名由官方做了统一规范。

## Route

路由，一个 url 对应一个路由，路由负责数据提取与页面之间的跳转。

## Controller

每个 route 都对应一个 controller，controller 是 template 的上下文，template 中的数据、事件等来自 controller。

## Component

`Component` 是具有独立逻辑、属性、UI的一个相对独立的单元。`Component`
最大的特点就是复用性强。


## Helper

ember 模板 HTMLBars 的增强函数，由于 ember 模板并未内置支持逻辑判断，要借助于
helper 完成复杂逻辑判断和数据处理。

## Model

一组或一个数据单元


## Template

一个route对应一个模板，一个Component也对应一个模板(Component可以没有模板)。


## Router

统一管理所有路由的。


## Service

ember 官方对 service 的解释：

An Ember.Service is a long-lived Ember object that can be made available in different parts of your application.

Example uses of services include:

- Logging 日志
- User/session authentication session
- Geolocation
- Third-party APIs 第三方 API
- Web Sockets websocket
- Server-sent events or notifications 事件或通知
- Server-backed API calls that may not fit Ember Data


service 是一个单实例对象，能够以依赖注入的方式，在 ember app 的任意对象中引用，借助 service 可以完成诸如登陆，认证，全局通知等。


## Mixin

可继承，复用的 ember 对象

## Initializer

使用依赖注入的方式，在 ember 所有相关实例对象中注入相应的对象并做初始化
