# ember route 的 loading 和 error 处理

ember 通过模式匹配进行错误和 loading 处理，在 route 中的 beforeModel, model, and afterModel hooks 提供进行 promise 解析前、中、后的处理。

## loading 是如何工作的

Simply define a template called loading (and optionally a corresponding route) that Ember will transition to. The intermediate transition into the loading substate happens immediately (synchronously), the URL won't be updated, and, unlike other transitions, the currently active transition won't be aborted.

当 route 从 A --> B 跳转，ember 会在真正进入 B route 之前，也就是 B 的 model hooks 的 promise 未解析完成之前，进入一个 loading route，显示 loading 的状态，不过不同于其他 route ，loading route 并不会改变当前的 url，B 的 promise 解析完成之后，ember 才会真正改变当前 url，退出 loading route 进入 B。

ember 寻找 loading route 对应的模板规则是，routeName-loading 或者 loading

- foo.bar.slow-model-loading
- foo.bar.loading or foo.bar-loading
- foo.loading or foo-loading
- loading or application-loading

当进入 slow-model 时，ember 并不会使用 slow-model.loading ，slow-model.loading 会对 slow-model 层次之下的 route 起作用。

loading 渲染规则，优先渲染同名 loading，然后一级一级向上冒泡。

## loading event

loading 发生时会触发 loading event，如果当前 route 没有提供处理机制，事件会冒泡到 application。

When using the loading handler, we can make use of the transition promise to know when the loading event is over:


```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  ...
  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('foo');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
          controller.set('currentlyLoading', false);
      });
    }
  }
});
```

> 注意：如果使用了在当前route中使用了 loading event，ember 就不会在去寻找对应的 loading hbs 了。

## error 是如何工作的

As with the loading substate, on a thrown error or rejected promise returned from the articles.overview route's model hook (or beforeModel or afterModel) Ember will look for an error **template or route** in the following order:

- foo.bar.error-model-error
- foo.bar.error or foo.bar-error
- error or application-error

error 的原理和 loading 相似，只要 route 在 model,beforeModel,afterModel 发生 on a thrown error or rejected promise returned，ember 会寻找 template or route 按照下面的顺序

- foo.bar.error-model-error
- foo.bar.error or foo.bar-error
- error or application-error

The model hooks (beforeModel, model, and afterModel) of an error substate are not called. Only the setupController method of the error substate is called with the error as the model. See example below:

当 error 发生是，error substate 的 route 中的 beforeModel，model，afterModel hooks 并不会被调用，只有 setupController 被调用

```
setupController: function(controller, error) {
  Ember.Logger.debug(error.message);
  this._super(...arguments);
}
```

If no viable error substates can be found, an error message will be logged.

如果没有可见的 error substates ，错误会被记录。

## error event

同理 loading event，error event 会被触发当有错误或者异常出现，如果当前 route 不提供 handler 来处理，这个事件会不断冒泡

```
import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findAll('privileged-model');
  },
  actions: {
    error(error, transition) {
      if (error.status === '403') {
        this.replaceWith('login');
      } else {
        // Let the route above this handle the error.
        return true;
      }
    }
  }
});
```



