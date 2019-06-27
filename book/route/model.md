# model

ember 的 route 通过 model hook 来处理来自后端的数据，比如 router 定义了一个 route

```javascript
Router.map(function() {
  this.route('favorite-posts');
});
```

在 route 的 handler 中使用 model 这个 hook 来提供数据进行渲染：

```javascript
//app/routes/favorite-posts.js
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('post', { favorite: true });
  }
});
```

默认情况下 route 通过在 model 中返回 promise 或者普通的 JavaScript 对象来提供数据，如果是 promise，route 会等待 promise 解析完成才去渲染 template。

Route 会把 model 返回的 value 挂在 controller 的 model 属性上，然后就可以在 template 中引用来自 controller 的 model 了：

```handlebars
<h1>Favorite Posts</h1>
{{#each model as |post|}}
  <p>{{post.body}}</p>
{{/each}}
```

除了 model 这个 hook ，route 还提供了

- beforeModel
- afterModel

这两个 hook 来完成在 model 解析前和解析后的工作。

## beforeModel hook

发生在 model hook 调用之前的 hook:

```javascript
beforeModel(transition){
  return Any | Promise
}
```

可以在这个 hook 中调用 transition 的 abort 或者 retry 完成对 route 的特定处理，也可以使用 `this.transitionTo` 完成跳转。

如果这个hook 返回 promise，route 会等待 promise 解析完成，可以在这个 hook 完成一些异步操作。

## afterModel hook

发生在 model hook 调用之后的 hook:

```javascript
afterModel(model, transition){
  return Any | Promise
}
```

可以在这个 hook 中根据 model 的内容执行对应的逻辑判断，然后再做跳转处理，如果这个 hook 返回 promise route 会等待直到 promise 解析完成。

## dynamic model

除了通过 model hook 返回固定的 model，route 还支持通过 URL 来区分不同的 model，称之为 dynamic model，用以区分不同的 model 的 URL 中的参数称之为 dynamic segment。比如有一个列表是 `/photos`  显示图片列表，当用户点击单个图片的时候比如说  `/photos/1` 会使用不同的 model 渲染不同的 template。

更多参见 [Route](index.md)

## model hook 调用的时机

一个带 dynamic segment 的 url 如果总是通过浏览器的 url 进入，那么 route 的 model hook 总是会被调用。
如果一个 route 是通过 transition 进入，比如 link-to 组件，而且还提供了 model 上下文，比如 link-to 的第二个参数是一个 object，这表示 model 需要数据其实已经存在了，这是 hook 都不会被调用。如果第二个参数是一个标识符，比如 id 或其他，那么 model hook 会被调用。

```handlebars
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

```handlebars
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

## 多个 model

Model hook 支持返回多个 model ，这是通过 [RSVP.hash](https://www.emberjs.com/api/ember/release/classes/rsvp/methods/hash?anchor=hash) 完成的，hash 把多个 promise 的 value 重新组织成一个 promise 并返回，新的 promise 的 value 就是多个 promise 的 value 组成的 object：

```javascript
//app/routes/songs.js

import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      songs: this.store.findAll('song'),
      albums: this.store.findAll('album')
    });
  }
});
```

在 template 中渲染：

```handlebars
<h1>Playlist</h1>

<ul>
  {{#each model.songs as |song|}}
    <li>{{song.name}} by {{song.artist}}</li>
  {{/each}}
</ul>

<h1>Albums</h1>

<ul>
  {{#each model.albums as |album|}}
    <li>{{album.title}} by {{album.artist}}</li>
  {{/each}}
</ul>
```

## 重用 route 的上下文，获取 parent route 的信息

有些场景之下，需要从当前 route 中获取 parent route 的一些信息，在 Ember 中是通过 `paramsFor` 完成的：

```javascript
//app/routes/album/index.js
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let { album_id } = this.paramsFor('album');

    return this.store.query('song', { album: album_id });
  }
});
```

除了获取 parent route 的相关信息，`paramsFor` 还可以用来在当前 route 的 action 或 method 中获取当前 route 的参数，用法如下：

```javascript
this.paramsFor(this.routeName)
```

在很多场合，可能 parent route 的 model 更有用，用 `modelFor` 可以完成这个工作:

```javascript
//app/routes/album/index.js
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let { songs } = this.modelFor('album');
    return songs;
  }
});
```

