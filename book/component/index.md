# 认识 Component 

Component 是 emberjs 中的重要概念，emberjs 的 Component 和 vuejs 以及 reactjs 等 ui-Component 概念大同小异，并无本质的差别，都是具有独立逻辑且可复用的 UI 单元。

## 定义 Component 

在 ember 使用 `ember generate` 命令可以快速定义一种类型，简写为 `ember g`，生成一个组件如下：

```bash
% ember g component hello 
installing component
  create app/components/hello.hbs
  skip app/components/hello.js
  tip to add a class, run `ember generate component-class hello`
installing component-test
  create tests/integration/components/hello-test.js

% ember g component world
installing component
  create app/components/world.hbs
  skip app/components/world.js
  tip to add a class, run `ember generate component-class world`
installing component-test
  create tests/integration/components/world-test.js 
```

上面的命令将生成两个 hbs 文件：

```bash
% tree app/components
app/components
├── hello.hbs
└── world.hbs
```

文件的内容是：

```handlebars
{{yield}}
```

我们将其中的内容分别改为：

hello.hbs

```html
<h3>Hello</h3>
```

world.hbs

```html
<h3>world</h3>
```

## 使用 Component 

打开编辑器，在 `application.hbs` 中使用上面的组件

```html
<Hello/> Emberjs <World/>
```

![](./../img/screely-1642250731566.png)

可以看到组件的使用就如同普通的 html tag 一样，ember 约定 ember 定义的组件是以 `<>` 的形式使用，支持 self closing 形式 `</>`，组件名称风格是 Pascal 命名法，但是组件在以文件名称存在时，如果包含多个单词，则采用连字符 `-`比如，组件 `<HelloWorld/>` 对应的文件名称是：

```bash
app/components
├── hello-world.hbs
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
