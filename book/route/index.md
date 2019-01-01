Ember app 和传统的 web 应用一样，URL 代表着一切，你可以从 URL 上得知当前用户是在查看一篇文章还是在编辑一篇文章，Ember app 就是通过 url 来管理这一切的。

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



## 模板渲染的机制

当 url 发生改变会，会进入对应的 route，当 route 获取数据 model 成功之后进行模板渲染，模板中的 component 在当前 route 对应的 hbs 首次初始化时进行实例化，生成 component 对应的实例，component 在某些情况下会重新渲染，这里需要**注意**的是：

1. 如果当前的 url 未发生改变，也就是当前 url 的 route 未发生改变，则当前的 route 对应的 hbs 不重新进行渲染，而且 hbs 中包含的已实例化的 component 如果不手动触发重新实例化，则这些组件并不会再次进行实例化，这类情况更多的见于 url 参数部分即 segment 部分发生改变，route 不变得情况，比如 `url ==> /item/1, url ==> /item/2` 对应的 route 是 item, 仅仅只是参数部分变化，比如 id==>1, id==>2，此时 item route 对应的 hbs 并不会重新渲染，包含的组件也只在 hbs 初始化之后初始化一次，之后不在发生变化。
2. 如果直接从浏览器键入 url 访问，则每次进入对应的 route 都会重新渲染对应的 hbs，因为此时 hbs 并没有进行初始化。

## 入口路由 application

`application` route 是 Ember app 的入口路由，意味着 Ember app 首次加载必定会加载路由对应的模板 `application.hbs` ，所有其他的路由都会把模板渲染到 `application.hbs` 中的 `outlet` 。

由于是默认的入口路由，router 中不需要体现。

## Index route

Ember 会默认为每个层级的的 route 添加有一个 index route，包括最顶层的 application，index route 对应的 path 就是该层路由的 `/` ，所以下面的代码：

```javascript
Router.map(function() {
  this.route('favorites');
});
```

其实等价于：

```javascript
Router.map(function() {
  this.route('index', { path: '/' });
  this.route('favorites');
});
```

Index 会渲染在 application 的 outlet ，当改变 URL 为 favorites 后，application 的 outlet 又会被 favorites 取代。

同理，一个嵌套路由：

```javascript
Router.map(function() {
  this.route('posts', function() {
    this.route('favorites');
  });
});
```

等价于：

```javascript
Router.map(function() {
  this.route('index', { path: '/' });
  this.route('posts', function() {
    this.route('index', { path: '/' });
    this.route('favorites');
  });
});
```

当用户访问 `/posts`  其实是访问的是 `posts.index` ，`posts/index.hbs` 会渲染在 `posts ` 的 `outlet` 中，如果用户又去访问 `posts/favorites` ，`outlet` 的又会被替换成 `posts/favorites.hbs`，当前路由变成 `posts.favorites`。

## Index route 的使用时机

Index route 一般用在嵌套路由中，比如博客 URL 的 `/posts` 表示的是博客的列表页，而 `/posts/1234` 表示一篇具体的博客，这个时候就可以用 index route 显示博客列表，类似：

```javascript
Router.map(function() {
  this.route('posts', function() {
    this.route('post', { path: '/:post_id' });
    this.route('index', { path: '/' });
  })
});
```

## Dynamic segment

Ember app 中的 URL 不仅仅反应的是要渲染不同的 template，也可能代表要渲染不同的 model，route 是根据 URL 中的 dynamic segment 来过滤 model 的。

```javascript
Router.map(function() {
  this.route('posts');
  this.route('post', { path: '/post/:post_id' });
});
```

在上面的路由中，`posts` 代表的就是列表的 model，不需要用任何条件过滤，而 `post` 代表的是具体某个 model，需要 URL 中的 `:` 后面部分的 `post_id` 来标识，表示 URL 的 dynamic segment，比如访问 `/posts/5` 含义就是 `post_id` 部分是 5，Ember 会把 dynamic segment 作为一个 `hash object` 传给 route 的 model 函数。

```javascript
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('photo', params.photo_id);
  }
});
```

需要注意的是，在整个嵌套路由中 ，dynamic segment 的 key 必须是唯一的，意味着：

```javascript
// This won't work! The dynamic segments will collide.
Router.map(function() {
  this.route('photo', { path: '/photo/:id' }, function() {
    this.route('comment', { path: '/comment/:id' });
  });
});
```

上面相同 key 是无法工作的。

## wildcard route

通配符 route 是表示如果没有任何一个 route 能够匹配当前的 URL，则路由到 wildcard route 上：

```javascript
Router.map(function() {
  this.route('not-found', { path: '/*path' });
});
```

需要注意的是如果想手动重定向到这样的 route 上，需要带上任意非空的参数：

```javascript
this.transitionTo('not-found', 404);
```

## route 之间的切换

在 Ember App 中如何对不同的 route 进行切换取决于 transition 发生的位置。

如果在 template 中，使用 `{{link-to}}`

如果在 route 中，使用  [`transitionTo()`](https://emberjs.com/api/ember/release/classes/Route/methods/transitionTo?anchor=transitionTo)

如果在 controller 中，使用 [`transitionToRoute()`](https://emberjs.com/api/ember/release/classes/Controller/methods/transitionToRoute?anchor=transitionToRoute)

如果在 Component 中，注入 router service，使用 transitionTo()

