# 自定义 component 的 html 元素和属性


component 默认是使用 `div` 进行包裹，ember 提供了不同方法来修改 component 的 html tag name、html attribute、html class


### 自定义 component html Element

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav'
});
```

component 的 `tagName` 属性可以修改 component 的包裹元素


### 自定义 component html Element attribute 


component 有不同的属性来分别自定义元素属性和元素 class: `attributeBindings`、`classNameBindings` 和 `classNames`。


```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['primary'],
  classNameBindings: ['myclass'],
  attributeBindings: ['href'],
  href: 'http://emberjs.com',
});
```

借助 JavaScript 的可计算能力，这些属性都可以动态进行计算和添加。

**普通 classs**

`classNames` 属性是一个 class 字符串组成的数组，用来自定义 component 上的 class

**动态绑定 class**

`classNameBindings` 属性可以动态计算 component 的 class

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings:['isUrgent','isActive:active','isEnabled:enabled:disabled','priority'],
  isUrgent: true,
  isActive: true,
  isEnabled: false,
  priority: 'highestPriority',
});
```

计算规则如下：

1. 默认 isUrgent 驼峰风格的值为 ture 时，class 为 is-urgent，false 时无 class
2. 自定义 class 名字，可以写成像 isActive:active，值为 ture 时，class 为 active，false 时无 class
3. 属性值为字符串，class 为属性的值

上面的组件渲染以后如下

```html
<div class="ember-view is-urgent active disabled highestPriority">
```

**动态绑定 attribute**

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  title: null,
  customeAlt: 'link'
  attributeBindings: ['href','title', 'customeAlt:alt'],
  href: 'http://emberjs.com'
});
```

可以在 `attributeBindings` 中指定绑定的属性，当属性为空时不渲染，否则渲染对应的属性值，也可以自定义属性对应的名字如 `customeAlt:alt`
