# route 的 model hook 

ember 的 route 通过 model hook 来处理来自后端的数据，其中 model hook 包括：
- model
- beforeModel
- afterModel

默认情况下 route 通过在 model 中返回 promise 或者 普通的 JavaScript 对象来提供数据，如果是 promise，route 会等待 promise 解析完成才去渲染 template。

## model hook 何时被调用

Note: A route with a dynamic segment will always have its model hook called when it is entered via the URL. If the route is entered through a transition (e.g. when using the link-to Handlebars helper/), and a model context is provided (second argument to link-to), then the hook is not executed. If an identifier (such as an id or slug/) is provided instead then the model hook will be executed.

一个带 dynamic segment 的 url 如果总是通过浏览器的 url 进入，那么 route 的 model hook 总是会被调用。
如果一个 route 是通过 transition 进入，比如 link-to 组件，而且还提供了 model 上下文，比如 link-to 的第二个参数是一个 object，这表示 model 需要数据其实已经存在了，这是 hook 都不会被调用。如果第二个参数是一个标识符，比如 id 或其他，那么 model hook 会被调用。

```hbs
<h1>Photos</h1>
{{#each model as |photo|}}
  <p>
    {{#link-to "photo" photo}}
      <img src="{{photo.thumbnailUrl}}" alt="{{photo.title}}" />
    {{/link-to}}
  </p>
{{/each}}
```
上面传给 link-to 的是 model，hook 不会被调用。

```hbs
<h1>Photos</h1>
{{#each model as |photo|}}
  <p>
    {{#link-to "photo" photo.id}}
      <img src="{{photo.thumbnailUrl}}" alt="{{photo.title}}" />
    {{/link-to}}
  </p>
{{/each}}
```
上面传给 link-to 的是 id，hook 会被调用。

**不带 dynamic segment 的 route 不论传递什么参数总是会被调用**