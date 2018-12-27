在 Ember app 中，和传统的 web 应用一样，URL 代表着一切，你可以从 URL 上得知当前用户是在查看一篇文章还是在编辑一篇文章，Ember app 就是通过 url 来管理这一切的。

一般来说，URL 可以以下几种方式改变：

- 用户第一次加载 app
- 用户手动更改 URL，比如用户点击回退按钮或编辑地址栏
- 用户点击 app 内部的链接
- 其他一些事件导致 URL 发生变化

无论 URL 是如何被改变的，Ember router 都会把当前的 URL 映射到一个或多个 route handler。

# 介绍

Route 顾名思义就是路由，一个 URL 对应一个 route，一个 route 对应一个 controller 和 template (hbs)，一个 template 可以包括一个或多个 component，而 route 的作用就是：

- 渲染 template 渲染页面
- load model from backend api 加载数据
- redirect to a new route 重定向

在 Ember app 中创建一个 route 很简单：

```bash
ember generate route route-name
```

这个命令会在 `app/routes/route-name.js` 生成一个 route，在 `app/templates/route-name.hbs` 生成一个 template，在 `tests/unit/routes/route-name-test.js` 生成一个单元测试，在 router 中添加一个 route：

```js
Router.map(function() {
  this.route('route-name', { path: '/route-name' });
});
```

**注意**：如果 route 是由多个单词组成的，使用 `-` 作为连接符。 


## 模板渲染的机制

当 url 发生改变会，会进入对应的 route，当 route 获取数据 model 成功之后进行模板渲染，模板中的 component 在当前 route 对应的 hbs 首次初始化时进行实例化，生成 component 对应的实例，component 在某些情况下会重新渲染，这里需要**注意**的是：

1. 如果当前的 url 未发生改变，也就是当前 url 的 route 未发生改变，则当前的 route 对应的 hbs 不重新进行渲染，而且 hbs 中包含的已实例化的 component 如果不手动触发重新实例化，则这些组件并不会再次进行实例化，这类情况更多的见于 url 参数部分即 segment 部分发生改变，route 不变得情况，比如 `url ==> /item/1, url ==> /item/2` 对应的 route 是 item, 仅仅只是参数部分变化，比如 id==>1, id==>2，此时 item route 对应的 hbs 并不会重新渲染，包含的组件也只在 hbs 初始化之后初始化一次，之后不在发生变化。

2. 如果直接从浏览器键入 url 访问，则每次进入对应的 route 都会重新渲染对应的 hbs，因为此时 hbs 并没有进行初始化。

## 嵌套的路由

Ember 的路由通过路由 nest 的方式实现页面的嵌套，比如你想实现在博客列表页创建一篇博客，就可以这样实现：

```javascript
Router.map(function() {
  this.route('posts', function() {
    this.route('new');
  });
});
```

然后再  `posts.hbs` 中添加：

```hbs
<h1>Posts</h1>
<!-- Display posts and other content -->
{{outlet}}
```

outlet 这个 helper 就是你想让嵌套路由 `new` 渲染的地方，也就是说如果用户只是访问 `/posts`  ，Ember 将会渲染 `posts.hbs` ，如果用户访问 `/posts/new` ，Ember 会把 `posts/new.hbs` 渲染在 outlet 出现的位置，也就是  `posts.hbs`  模板中。

**注意**：嵌套路由的名称必须要保护父级的名字，也就是在 transitionTo 和 link-to 中要写成 `posts.new` .




