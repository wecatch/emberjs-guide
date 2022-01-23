# 在 Template 中进行条件和分支判断

ember 支持在 template 中完成循环和分支判断，表达式如下：

非内联方式

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

内联方式

```html
{{if condition value}}

{{if condition value1 value2}}
```

在使用时，非内联方式一般用于判断 html 块的内容

```html
<h4 class="username">
  {{@name}}
  {{#if @localTime}}
    <span class="local-time">their local time is {{@localTime}}</span>
  {{/if}}
</h4>
```

内联方式用于判断 html 属性

```html
<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>
  This div used the inline "if" to calculate the class to use.
</div>
```

