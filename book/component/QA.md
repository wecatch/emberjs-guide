### Component 的两种不同调用方式的区别

Component 支持 `{{my-component}}` 和` <MyComponent /> ` 两种调用方式，`{{}}` 的形式支持位置参数，而 `<>` 形式默认都是带名字参数，如果在 Component 中声明了：

```javascript
import Component from '@ember/component';

export default Component.extend({
}).reopenClass({
  positionalParams: ['greeting', 'name']
});
```

则调用的时候也必须显式指定：

```html
<MyGreeting @greeting="Hello" @name="World" />
```

还可以直接指定数组的形式：

```javascript
import Component from '@ember/component';

export default Component.extend({
}).reopenClass({
  positionalParams: 'params'
});
```

然后调用的时候告诉 params 是数组：

```html
<MyGreeting @params={{array "Hello" "World"}}>
```

#### 何时使用传统的形式

```html
{{some-component param1 param2}}
{{ui/foo-bar}}
```

一个是占位参数，一个 Component 是按照文件目录嵌套调用的