# ember template

ember 中的 template engine 是 handlebars，提供有属性、逻辑、分支等不同模板属性，而且还提供了 helper 一种具有 JavaScript 逻辑的函数表达式，可以用来实现自定义模板属性。

每个 template 文件 hbs 都具有一个上下文 context 用来获取属性的值，通过 route 渲染的 hbs 的上下文 context 是 controller，而 component 中的 hbs 对应的上下文就是 component 的 JavaScript 文件，如果 component 用了 `block form` 形势，其 context 还包括使用 component 的父容器，有时候是一个 controller，有时候是一个 parent component。


## 属性表达式

在 hbs 中获取 context 中的属性值非常简单，使用 `{{}}` 表达式，无论这个属性值是用于普通的 html 文本或是 html 属性都是可以的。

```handlebars
#app/templates/application.hbs
Hello, <strong>{{firstName}} {{lastName}}</strong>!
<div class={{isDeleted}} ></div>
<img src={{src}} alt="">
```

`firstName` 和  `lastName` 属性来自于 `application controller` 这个 context，只要 context 中有对应的表达式就会显示对应的值，否则显示为空

### Adding Data Attributes

默认情况下 component 的 html 属性不包含 data-* attribute，可以使用 component 的 attributeBindings 来完成

```javascript
Ember.TextField.reopen({
  attributeBindings: ['data-toggle', 'data-placement']
});
```

## 条件表达式 if else

在 hbs 中可以很方便完成 `if else` 等简单的条件元素，为此 ember handlebars 提供了  `if` 和 `unless` 等 helper。

```handlebars
{{#if person}}
    Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{/if}}

{{#if person}}
    Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{else}}
    Welcome back, <b>some one</b>
{{/if}}

{{#if person}}
    Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{else if child}}
    Welcome back, <b>child</b>
{{else}}
    Welcome back, <b>some one</b>
{{/if}}
{{/if}}

{{#unless person}}
    Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{/unless}}
```

`if` 表达式为真时显示内容，为真的值包括所有非 `null` 和 `undefined` 以及 `false` 和 空字符串、0 以外的值，`unless` 则正好相反。


### 内联调用条件表达式

使用内敛的方式调用条件表达式可以很简洁的表达 `if else` 逻辑，

```handlebars
<div>
  {{if isFast "zoooom" "putt-putt-putt"}}
</div>
```

`ifFast` 为真，显示 `zoooom` 否则显示 `putt-putt-putt`，内敛方式在判断 html class 属性会非常有用。


### 嵌套调用条件表达式

一个条件表达式的返回值可以作为另一个条件表达式的输入值，借此特性可以实现表达式的嵌套调用

```handlebars
<div>
  {{if isFast (if isFueled "zoooom")}}
</div>
```


## each 表达式

迭代一个 list 使用 `each` 表达式。

```handlebars
<ul>
  {{#each people as |person|}}
    <li>Hello, {{person.name}}!</li>
  {{/each}}
</ul>
```

### each 表达式的索引

在循环表达式中，第二个 block param 是迭代对象的索引值，多个 block param 之间用空格隔开

```handlebars
<ul>
  {{#each people as |person index|}}
    <li>Hello, {{person.name}}! You're number {{index}} in line</li>
  {{/each}}
</ul>
```

### each 遇上空的 list

如果迭代对象为空，可以用 `else` 输出为空的条件下的值

```handlebars
{{#each people as |person|}}
  Hello, {{person.name}}!
{{else}}
  Sorry, nobody is here.
{{/each}}
```


### 加速 each 的渲染

可以指定迭代对象的 key 值来加速 `each` 的渲染，当 list 中的内容发生变化，可以使用 key 来指定 ember 需要监听的属性值的变化以达到重新渲染的目的。

```handlebars
{{#each model key="id" as |item|}}
{{/each}}
```


### each-in 表达式

`{{each-in}}` 表达式能够迭代一个 object 的属性和值

```handlebars
<ul>
{{#each-in user as |key value|}}
  <li>{{key}}: {{value}}</li>
{{/each-in}}
</ul>
```

`each-in` 一样可以使用 `else` 表达对象为空的条件

```handlebars
<ul>
{{#each-in user as |key value|}}
  <li>{{key}}: {{value}}</li>
{{else}}
    no value
{{/each-in}}
</ul>
```