# 认识 Component 

Component 是 emberjs 中的重要概念，emberjs 的 Component 和 vuejs 以及 reactjs 等 ui-Component 概念大同小异，并无本质的差别，都是具有独立逻辑可复用的组件单元。

## 定义 Component 

Component 的定义非常简单，只要有一个 `template.hbs`模板就可以定义一个 Component，也就是说当你只需要一个不断重复的模板片段，而没有任何 JavaScript 逻辑时，Component 就能帮上忙。

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
± % ember g component my-second-component --pod
installing component
  create app/components/my-second-component/component.js
  create app/components/my-second-component/template.hbs
installing component-test
  create tests/integration/components/my-second-component/component-test.js

```

上的例子中创建了第二个 component，它的 js 和 hbs 在同一个文件夹。


## 使用 Component 

使用 Component 非常简单，像这样

```handlebars
{{#my-first-component}}{{/my-first-component}}
```

或者使用 

```handlebars
<MyFirstComponent></MyFirstComponent>
```


## 动态渲染 Component

ember 支持动态渲染 component

```handlebars
{{#each model as |post|}}
  {{!-- either foo-component or bar-component --}}
  {{component post.componentName post=post}}
{{/each}}
```

当不知道 Component name 名字时，可以动态渲染 Component，其穿参、事件绑定等处理和普通用法是一样的。

或者

```handlebars
{{#each this.model as |post|}}
  {{!-- either foo-component or bar-component --}}
  {{#let (component this.componentName) as |Post|}}
    <Post @post={{post}} />
  {{/let}}
{{/each}}
```

## 向 component 传递参数

component 传递参数非常简单，按照参数名字赋值就可以

```handlebars
{{blog-post title=post.title body=post.body}}
```

或者

```handlebars
<BlogPost @title={{post.title}} @body={{post.body}}/>
```


It is important to note that these properties stay in sync (technically known as being "bound"). That is, if the value of `componentProperty` changes in the component, `outeroperty` will be updated to reflect that change. The reverse is true as well.

需要注意的是，以这种方式传递的参数其值在组件外和组件内部是同步的，术语叫 bound，也就是说如果组件内部的值发生改变，组件外部的值也会更新，组件外部的值发生改变，内部的值也会发生改变

**使用占位参数**

```javascript
import Component from '@ember/component';

const BlogPostComponent = Component.extend({});

Component.reopenClass({
  positionalParams: ['title', 'body']
});

export default BlogPostComponent;
```

占位参数必须是在 component class 声明的属性，而且运行时不可以改变，代码中使用 reopenClass 把占位参数声明为 component 的静态变量。

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

## 向 component 传递 action


除了可以向 component 传递普通的值参以外，还可以传递 action，即事件处理函数或普通的响应函数


```handlebars
{{blog-post action=(action "pusblishPost")}}
```

`publishPost` 是父容器(route、controller、或者 parent component) `actions` property 中定义的一个 action，通过 `action` helper 传递到 `blog-post` 中


子组件中如何调用？可以像调用普通函数一样调用 `this.get('action')(post.id)`
