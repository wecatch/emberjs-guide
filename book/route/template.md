## Template 的渲染

Route 的一大作用就是进行 template 渲染，默认情况下渲染的 template 和 route 是同名的：

```javascript
Router.map(function() {
  this.route('posts', function() {
    this.route('new');
  });
});
```

`posts` 会渲染 `posts.hbs` ，`posts.new` 会渲染 `posts/new.hbs`。

每个 template 都会渲染在 parent route template 的 outlet 中，比如 `posts.hbs` 会渲染在 `application.hbs` 中的 outlet，`posts/new.hbs` 会渲染在 `posts.hbs` 的 outlet 中。

如果想修改默认渲染的 template 名称可以使用，`templateName` 属性：

```javascript
import Route from '@ember/routing/route';

export default Route.extend({
  templateName: 'posts/favorite-posts'
});
```

Route 还提供了  [`renderTemplate()`](https://www.emberjs.com/api/ember/release/classes/Route/methods/renderTemplate?anchor=renderTemplate) hook 来对 template 的渲染进行更多的控制，比如指定特定的 outlet 和 controller。