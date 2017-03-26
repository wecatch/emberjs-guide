# 认识 Component 

Component 是 emberjs 中的重要概念，emberjs 的Component 和 vuejs以及reactjs等 ui-Component 概念大同小异，并无本质的差别，都是具有独立逻辑可复用的组件单元。

## 定义 Component 

Component 的定义非常简单，只要有一个 `template.hbs`模板就可以定义一个Component，也就是说当你只需要一个不断重复的模板片段，而没有任何 JavaScript 逻辑时，Component 就能帮上忙。

```bash
± % ember g component my-first-component 
installing component
  create app/components/my-first-component.js
  create app/templates/components/my-first-component.hbs
installing component-test
  create tests/integration/components/my-first-component-test.js

```

在上面例子中的 my-first-component 即使删除 my-first-component.js 这个 Component 依然有效，需要注意的是，Component 的名字组成**必须要有连接符-**，这是 emberjs 的约定。使用 emberjs 的脚手架创建的 Component hbs 和 js 分别位于不同的文件夹，有时候为了方便管理，可以都放置于 Components 文件夹下面，使用 `--pod`

```
± % ember g component my-second-component -p true                              
installing component
  create app/components/my-second-component/component.js
  create app/components/my-second-component/template.hbs
installing component-test
  create tests/integration/components/my-second-component/component-test.js

```

上的例子中创建了第二个 component，它的 js 和 hbs 在同一个文件夹。


## 使用 Component 

使用 Component 非常简单，像这样

```hbs
{{#my-first-component}}{{/my-first-component}}
```


## 动态渲染 Component

```hbs
{{#each model as |post|}}
  {{!-- either foo-component or bar-component --}}
  {{component post.componentName post=post}}
{{/each}}
```

当不知道 Component name 名字时，可以动态渲染 Component，其穿参、事件绑定等处理和普通是一样的。

## 向 component 传递参数

component 传递参数非常简单，按照参数名字赋值就可以

```handlebars
{{blog-post title=post.title body=post.body}}
```

It is important to note that these properties stay in sync (technically known as being "bound"). That is, if the value of `componentProperty` changes in the component, `outeroperty` will be updated to reflect that change. The reverse is true as well.

需要注意的是，以这种方式传递的参数其值在组件外和组件内部是同步的，术语叫 bound，也就是说如果组件内部的值发生改变，组件外部的值也会更新，组件外部的值发生改变，内部的值也会发生改变

**使用占位参数**

```javascript
import Ember from 'ember';

const BlogPostComponent = Ember.Component.extend({});

BlogPostComponent.reopenClass({
  positionalParams: ['title', 'body']
});

export default BlogPostComponent;
```

占位参数必须是在 component class 声明的属性，而且运行时不可以改变，代码中使用 reopenClass 把占位参数声明为component 的静态变量。

```handlebars
  {{blog-post post.title post.body}}
```

可以像下面这样，声明占位参数为一个数组，此时，`positionalParams` 值为 `params`

```JavaScript
import Ember from 'ember';

const BlogPostComponent = Ember.Component.extend({
  title: Ember.computed('params.[]', function(){
    return this.get('params')[0];
  }),
  body: Ember.computed('params.[]', function(){
    return this.get('params')[1];
  })
});

BlogPostComponent.reopenClass({
  positionalParams: 'params'
});

export default BlogPostComponent;
```

## 自定义 component 模板渲染的内容

传递参数向 component 可以提供 component 模板渲染的所需要的内容，如果想自定义 component 的模板，可以使用 `block form`，在模板中使用 `{{yield}}` 表达式可以起到这个作用。 

组件 `blog-post`

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

其中模板内部的部分`  <p class="author">by {{author}}</p>  {{body}}` 将会替代 yield 出现的地方。

**组件的内部内容和组件外部进行通信**

hbs 提供了两个非常有用的 helper `component ` 和 `hash `，借助 component 可以动态渲染组件内容，借助 hash 可以把组件内部的内容传递到组件外部供组件外部使用。

```handlebars
# app/templates/components/blog-post.hbs
<h2>{{title}}</h2>
<div class="body">{{yield (hash body=(component editStyle postData=postData))}}</div>

```

此种场景之下，blog-post 根据组件外部传来的 editStyle 选择对应的组件进行渲染，然后通过 hash 的方式传递组件内部的值到外部，外部可以通过 as 的方式拿到组件内部的值

```handlebars
{{#blog-post editStyle="markdown-style" postData=myText as |post|}}
  <p class="author">by {{author}}</p>
  {{post.body}}
{{/blog-post}}
```

`as |post|` 对应的是组件内部的 （hash body=(component editStyle postData=postData))，

## Component 的生命周期  

### 基础概念

- attrs ，通过外部传递给 component 称之为  attrs
- property，内部的属性 称之为 property

**导致 component 重新渲染的条件**

- any of its attributes change
- component.set() is called
- component.rerender() is called
- a property on a model or service used by the template has changed (including through computed properties).

> 注意：任何外部 attribute 或者内部的 property 发生了改变，包括 model 中的属性，service 中的属性， 且这些 property 在 component 的模板中被使用，都会触发 component 重新渲染

Component 第一次初始化要历经：

```
init-->didReceiveAttrs-->willRender-->didInsertElement-->didRender
```

当组件渲染完毕，之后属性发生改变再次渲染时又会历经:

```
didUpdateAttrs-->didReceiveAttrs-->willUpdate-->willRender-->didUpdate-->didRender
```

组件生命周期结束之后被销毁会历经

```
willDestroyElement-->willClearRender-->didDestroyElement
```


每个生命周期的 hooks 都有相应的职能，所以调用它们要选在恰当的时候。

### **init**

初始化组件，在此 hooks 可以完成对相应属性的最基本的声明和初始化工作

### **didUpdateAttrs**

didUpdateAttrs runs when the attributes of a component have changed, but not when the component is re-rendered, via component.rerender, component.set, or changes in models or services used by the template.

didUpdateAttrs 在 attrs 发生改变之后执行，而不是 Component 通过 component.rerender, component.set, or changes in models or services 发生改变，并且在 re-render 之前执行。

可以把此 hooks 当成很好的 observer 来执行相应的处理逻辑。需要注意：didUpdateAttrs 执行是指 component 从外部传递的属性发生改变，而不是 Component 内部属性发生改变，比如通过 set 改变 Component 某个属性。


```
<ul class="errors">
  {{#each errors as |error|}}
    <li>{{error.message}}</li>
  {{/each}}
</ul>
<fieldset>
  {{input name="user.name" value=name change=(action "required")}}
  {{input name="user.department" value=department change=(action "required")}}
  {{input name="user.email" value=email change=(action "required")}}
</fieldset>


import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.errors = [];
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('errors', []);
  },

  actions: {
    required(event) {
      if (!event.target.value) {
        this.get('errors').pushObject({ message: `${event.target.name} is required`});
      }
    }
  }
});
```

### **didReceiveAttrs**

didReceiveAttrs runs after init, and it also runs on subsequent re-renders, which is useful for logic that is the same on all renders. It does not run when the re-render has been initiated internally.

didReceiveAttrs 在 init 之后执行，也会在 re-render 时在 didUpateAttrs 之后执行，因此这个 hooks 可以用在初次渲染和再次渲染时处理相同的业务逻辑，同 didUpdateAttrs 一样，可以当成一个 observer。如果 re-render 是由 Component 内部触发引起的，此 hooks 并不会执行。

### **didInsertElement**

After a component successfully renders its backing HTML element into the DOM, it will trigger its didInsertElement() hook.

一个 Component 的所有 dom 都渲染完毕之后会执行此 hook，这个时候就可以在此执行和调用第三方库进行 dom 的修改或事件的绑定，但是请谨记，这个 hook 只在初次渲染时调用。

- The component's element has been both created and inserted into the DOM.
- The component's element is accessible via the component's $() method.

`$()` 返回的是 Component 的 root element 的 jquery object，如果需要获得子 dom，可以使用 child 选择器 `this.$('p')`。

注意事项：

- It is only triggered once when the component element is first rendered.
- In cases where you have components nested inside other components, the child component will always receive the didInsertElement() call before its parent does.
- Setting properties on the component in didInsertElement() triggers a re-render, and for performance reasons, is not allowed.
- While didInsertElement() is technically an event that can be listened for using on(), it is encouraged to override the default method itself, particularly when order of execution is important.




- 只在初始化渲染调用
- 子组件的 didInsertElement 调用总是比父组件早
- 在 didInsertElement 中改变 Component 属性能够触发重新 re-render，所以不要这么做。
- 即使可以使用 on 来监听 didInsertElement 方法，但是避免这样做，为了保证所有的 hook 可以正确按照顺序调用


### **didRender**

The didRender hook is called during both render and re-render after the template has rendered and the DOM updated. You can leverage this hook to perform post-processing on the DOM of a component after its been updated.


当 dom 都准备后了之后，didRender 被执行，可以在 didRender 中执行 dom 完成之后的更新，比如计算 dom 容器的高度等等。


### 各个 hook 使用注意事项


- didUpdateAttrs 和 didReceiveAttrs 是在外部传递给 component 的属性发生改变时导致 re-render 重新执行才会调用，如果是组件内部发生的导致属性改变而re-render，这两个 hooks 都不会执行，有一点需要注意，虽然这两个 hooks 可以当做 oberver 来使用，但对应的属性最好都是 object 才会在属性发生改变时调用 hooks，详见 [ember-cli-simditor](https://github.com/wecatch/ember-cli-simditor/blob/master/addon/components/simditor-editor.js) component 的实现。
- component 内部属性发生改变，会导致 willUpdate、willRender、didUpdate、didRender 执行
- 不要在 {will,did}{Render,Update} 更改 component 的内部或外部属性，这样会导致性能问题或无限的更新循环

## 自定义 component 的 html 元素和属性

component 默认是使用 `div` 进行包裹，ember 提供了不同方法来修改 component 的 html 标签、html attribute、html class


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

