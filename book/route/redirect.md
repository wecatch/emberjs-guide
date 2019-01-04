## 重定向

为了控制用户访问 web page 的权限，Ember 提供了丰富多样的重定向机制，在 route 中调用 transitionTo，在 controller 中调用 [`transitionToRoute()`](https://www.emberjs.com/api/ember/release/classes/Controller/methods/transitionToRoute?anchor=transitionToRoute)，另一个具有相同功能的是 [`replaceWith()`](https://www.emberjs.com/api/ember/release/classes/Route/methods/transitionTo?anchor=replaceWith/) ，他们的不同之处在于 replaceWith 是替换当前 URL history。

如果重定向的 route 包含 dynamic segment，可以传递对应的 model 或者 id，如果传递 model ，route 的 model hook 将不会被调用。

## 在 model 解析之前重定向

[`beforeModel()`](https://www.emberjs.com/api/ember/release/classes/Route/methods/transitionTo?anchor=beforeModel) 在 model hook 之前调用，所以方便在 model 解析之前进行重定向，beforeModel 接受当前 transition 作为第一个参数，因而可以实现完成权限认证之后重新跳回来的逻辑。

```javascript
Router.map(function() {
  this.route('posts');
});
```

```javascript
//app/routes/index.js
import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(/* transition */) {
    this.transitionTo('posts'); // Implicitly aborts the on-going transition.
  }
});
```

## 在 model 解析之后重定向

[`afterModel()`](https://www.emberjs.com/api/ember/release/classes/Route/methods/transitionTo?anchor=afterModel) 在 model hook 之后调用，因而接受 model 和 transition 两个参数，可以根据当前 model 的结果进行重定向。

```javascript
Router.map(function() {
  this.route('posts');
  this.route('post', { path: '/post/:post_id' });
});
```



```javascript
//app/routes/posts.js

import Route from '@ember/routing/route';

export default Route.extend({
  afterModel(model, transition) {
    if (model.get('length') === 1) {
      this.transitionTo('post', model.get('firstObject'));
    }
  }
});
```

## 重定向到子 route

如果多个 route 是嵌套的，在 parent route 中调用 transitionTo 会导致在重定向到子 route 时，parent 的 model、beforeModel、afterModel 都会触发，为了防止这样的事情发生，Ember 提供了 [`redirect()`](https://www.emberjs.com/api/ember/release/classes/Route/methods/transitionTo?anchor=redirect) 方法：

```javascript
//app/router.js
Router.map(function() {
  this.route('posts', function() {
    this.route('post', { path: '/:post_id' });
  });
});
```



```javascript
//app/routes/posts.js
import Route from '@ember/routing/route';

export default Route.extend({
  redirect(model, transition) {
    if (model.get('length') === 1) {
      this.transitionTo('posts.post', model.get('firstObject'));
    }
  }
});
```

