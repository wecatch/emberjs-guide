# 自定义 component 模板和内容

传递参数向 component 可以提供 component 模板渲染的所需要的内容，如果想自定义 component 的模板，可以使用 `block form`，即在模板中使用 `{{yield}}` 表达式。 

component `blog-post`

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

**组件的内部内容和组件外部进行通信**

hbs 提供了两个非常有用的 helper `component ` 和 `hash ` 来动态渲染组件内容， hash 可以把组件内部的内容传递到组件外部供组件外部使用。

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

## 返回 component 内部的值


自定义 component 内容时，我们提到了 `block form`，使用 `yield` 表达式可以返回 component 内部的值供外部使用

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

通过 yield 在组件外部可以获取组件内部 yield 的值，值得获取是按照 yield 的顺序组成的。

如果在某些场合 component 不需要 yield，可以使用 `hasBlock` 判断当前组件的使用是否是利用 yield

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
