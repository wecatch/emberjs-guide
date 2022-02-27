# 更灵活的控制 Component 的渲染：Block content

如果想自定义 component 的模板，可以使用 `block form`，即在模板中使用 `{{yield}}` 表达式, yield 的含义是在 tempalte 中提供一个 placeholder 让用户可以自定义 template 的内容：

`app/components/message.hbs`
```html
<Message::Avatar
  @title={{@avatarTitle}}
  @initial={{@avatarInitial}}
  @isActive={{@userIsActive}}
  class="{{if @isCurrentUser "current-user"}}"
/>
<section>
  <Message::Username
    @name={{@username}}
    @localTime={{@userLocalTime}}
  />

  {{yield}}
</section>
```


`app/components/received-message.hbs`
```html

<Message
  @username="Tomster"
  @userIsActive={{true}}
  @userLocalTime="4:56pm"

  @avatarTitle="Tomster's avatar"
  @avatarInitial="T"
>
  <p>
    Hey Zoey, have you had a chance to look at the EmberConf
    brainstorming doc I sent you?
  </p>
</Message>
```


其中received-message.hbs 部分:
```html
<p>
    Hey Zoey, have you had a chance to look at the EmberConf
    brainstorming doc I sent you?
  </p>
```
将会替代 `message.hbs` yield 出现的地方，这个例子中 message 提供了用户自定义 message 内容主体的能力。

##  条件 Block content

`has-block` 可以用来判断 component 是否有 block：

```html
<dialog>
  {{#if (has-block)}}
    {{yield}}
  {{else}}
    An unknown error occurred!
  {{/if}}
</dialog>
```
如果有自定义内容就显示内容，否则显示默认的内容。


## 把 component 传递到组件外部


`yield` 除了可以作为占位符之外，还提供把 template 的内容主动传递到 component 外部使用的能力：

```

<h1>{{@post.title}}</h1>
<h2>{{@post.author}}</h2>

{{yield @post.body}}
```

```
<BlogPost @post={{@blogPost}} as |postBody|>
  <img alt="" role="presentation" src="./blog-logo.png">

  {{postBody}}

  <AuthorBio @author={{@blogPost.author}} />
</BlogPost>

```


传递多个参数：

```html

{{yield @post.title @post.author @post.body }}

```


```html
<BlogPost @post={{@blogPost}} as |postTitle postAuthor postBody|>
  <img alt="" role="presentation" src="./blog-logo.png">

  {{postTitle}}

  {{postBody}}

  <AuthorBio @author={{postAuthor}} />
</BlogPost>

```


如果在某些场合 component 不需要 yield，可以使用 `hasBlock` 判断当前组件的使用是否是以 `block form` 的使用

`app/templates/components/blog-post.hbs`

```html
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