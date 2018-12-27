# 为什么是emberjs

emberjs 被 wecatch 选中用于比较复杂的资源管理项目中，比如公司内部的CMS，各种 dashboard 等，
此类项目基本具有如下特点：

- 表单多，频繁与后端进行交互
- 数据形式复杂，表现形式相对单一，比如大量的 table、card、grid等组织形式
- 交互复杂，交互尽量在单页完成

在小团队中，尤其是创业公司，此类 CMS 系统往往缺乏明晰的前后端职责划分，
前后端常由相同的人员担当，加上人员流动，需求频繁变更导致可维护性，可持续性差，
因而必须要有非常严格的规范来保证代码的一致性和体验的一致性。

>**Convention over configuration is an important philosphy in Ember.**

约定优于配置，这是 emberjs 的重要理念，正是这种理念，ember 应用才具有非常一致的代码组织结构和代码风格，为应用的可维护性提供了最基本的保证，
而可复用的组件又为应用提供了一致性和可持续的交互体验。

- 能胜任复杂庞大的单页应用
- 具有强制规范，具有可复用的组件
- 支持双向绑定以处理频繁的表单操作
- 有完备的构建流程和构建工具(ember-cli)
- 有成熟的案例[builtwithember](http://builtwithember.io/)
- 有活跃的社区[discuss](http://discuss.emberjs.com/)
- 类似于传统 MVC 的模板表达语言[handlebars](http://handlebarsjs.com/)
- 有丰富的库 https://emberobserver.com/
> 方便不了解前端的后端同学来实现 html 的逻辑

这些优势让 wecatch 选择了 [emberjs](http://emberjs.com/)
