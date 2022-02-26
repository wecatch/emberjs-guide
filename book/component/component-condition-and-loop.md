# Component 实现逻辑判断和循环

在 template 中，可以使用 `if` 进行条件判断，ember 提供的条件判断包括两种形式：block 和 inline

```html
{{#if this.thingIsTrue}}
  Content for the block form of "if"
{{/if}}

<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>
  This div used the inline "if" to calculate the class to use.
</div>

```

## Block if

Block 条件判断正如字面意思提供的是基于块状的逻辑判断，类似 html 中的 block 元素:

```html
{{#if condition}}
  {{!-- some content --}}
{{/if}}
```

并且 block condition 支持 `else`:

```html
{{#if condition}}
  {{!-- some content --}}
{{else}}
  {{!-- some other content --}}
{{/if}}

{{#if condition1}}
  ...
{{else if condition2}}
  ...
{{else if condition3}}
  ...
{{else}}
  ...
{{/if}}

```


## Inline if

Inline 条件判断可以在一个表达式中完成逻辑判断:

```html
{{if condition value}}

```

同样 inline 也支持 else:


```html
{{if condition value1 value2}}

```

Inline 的方式经常用于对 html class 的判断中，比如根据用户是否登陆而赋予不同的 class:

```html
<aside ...attributes>
  <div
    class="avatar {{if @isActive "is-active"}}"
    title={{@title}}
  >
    {{@initial}}
  </div>
</aside>
```


## Template 中的循环

循环使用 `each` 完成，`each` 和 `if` 一样，在 ember 中都称之为 `helper`，是 ember 支持的在 template 中实现 JavaScript 逻辑的一种能力

```html
  {{#each this.messages as |message|}}
    <Message
      @username={{message.username}}
      @userIsActive={{message.active}}
      @userLocaltime={{message.localTime}}
    >
      {{{message.content}}}
    </Message>
  {{/each}}
```


如果循环对象 `this.messages` 发生了变更，template 会自动进行渲染，`each` 还支持 index 以及 `else`


```html
<ul>
  {{#each this.queue as |person index|}}
    <li>Hello, {{person.name}}! You're number {{index}} in line</li>
  {{/each}}
</ul>

<ul>
  {{#each this.queue as |person index|}}
    <li>Hello, {{person.name}}! You're number {{index}} in line</li>
  {{else}}
  	<p>Empty list</p>
  {{/each}}
</ul>

```


类似 javascript 中的 for..in 语句，`each-in` 提供对 object 进行迭代的能力：

```js

const categories = {
    'Bourbons': ['Bulleit', 'Four Roses', 'Woodford Reserve'],
    'Ryes': ['WhistlePig', 'High West']}

```


```html
<ul>
  {{#each-in this.categories as |category products|}}
    <li>{{category}}
      <ol>
        {{#each products as |product|}}
          <li>{{product}}</li>
        {{/each}}
      </ol>
    </li>
  {{/each-in}}
</ul>
```


