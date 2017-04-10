# ember-cli

ember-cli 提供创建 ember app 的全套开发环境，一键初始化工程、测试、打包、发布。ember-cli 的详细使用案例官方基本都有介绍 https://ember-cli.com/，在次只介绍一些特殊场景下需要的注意事项。


## 使用 app-import copy、concat 第三方依赖

文档 https://ember-cli.com/user-guide/#using-appimport 描述了如何使用 `app.import` copy、concat 第三方依赖。在 ember-cli 中，ember app 工程的第三方配置使用是在 ember-cli-build.js 中配置完成。如果 ember-app 是一个 ember-addon 工程，第三方依赖在 index.js 中配置使用

**引入第三方 Non-AMD 依赖**

```javascript
app.import('bower_components/moment/moment.js');
```

声明为全局变量使用

```javascript
import Ember from 'ember';
/* global moment */
// No import for moment, it's a global called `moment`

// ...
var day = moment('Dec 25, 1995');
```