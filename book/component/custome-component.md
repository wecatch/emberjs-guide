# 自定义 component 模板和内容

传递参数向 component 可以提供 component 模板渲染的所需要的内容，如果想自定义 component 的模板，可以使用 `block form`，即在模板中使用 `{{yield}}` 表达式。 


```html
# app/templates/components/blog-post.hbs
<h1>{{title}}</h1>f
<div class="body">{{yield}}</div>

# app/templates/index.hbs
{{#blog-post title=title}}
  <p class="author">by {{author}}</p>
  {{body}}
{{/blog-post}}

```

其中模板内部的部分` <p class="author">by {{author}}</p>  {{body}}` 将会替代 yield 出现的地方。

## 返回 component 内部的内容

使用 yield 可以把组件内部的内容传递到组件外部供外部使用。

```handlebars
# app/templates/components/blog-post.hbs
<h2>{{title}}</h2>
<div class="body">{{yield (hash body=(component editStyle postData=postData))}}</div>

```

此种场景之下，blog-post 根据组件外部传来的 editStyle 动态选择对应的组件进行渲染，然后通过 hash 的方式 wrap 组件内部的值，并且通过 yield 返回到外部，外部可以通过 as 的方式拿到组件内部的返回的值


```handlebars
{{#blog-post editStyle="markdown-style" postData=myText as |post|}}
  <p class="author">by {{author}}</p>
  {{post.body}}
{{/blog-post}}
```

`as |post|` 对应的是组件内部的 `（hash body=(component editStyle postData=postData))`，


### yield 获取值得顺序

通过 yield 在组件外部可以获取组件内部 yield 的值时，值得获取是按照 yield 的顺序组成的。


```handlebars
# app/templates/components/blog-post.hbs
{{yield post.title post.body post.author}}
```


```handlebars
# app/templates/index.hbs
{{#blog-post post=model as |title body author|}}
  <h2>{{title}}</h2>
  <p class="author">by {{author}}</p>
  <div class="post-body">{{body}}</p>
{{/blog-post}}
```

如果在某些场合 component 不需要 yield，可以使用 `hasBlock` 判断当前组件的使用是否是以 `block form` 的使用

```
app/templates/components/blog-post.hbs
{{#if hasBlock}}
  {{yield post.title}}
  {{yield post.body}}
  {{yield post.author}}
{{else}}
  <h1>{{post.title}}</h1>
  <p class="author">Authored by {{post.author}}</p>
  <p>{{post.body}}</p>
{{/if}}
```


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
