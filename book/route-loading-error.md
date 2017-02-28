# ember route 的 loading 和 error 处理

ember 通过模式匹配进行错误和 loading 处理，在 route 中的 beforeModel, model, and afterModel hooks 提供进行 promise 解析前、中、后的处理。

## loading 是如何工作的

当 route 从 A --> B 跳转，ember 会在真正进入 B route 之前，也就是 B 的 model hooks 的 promise 未解析完成之前，进入一个 loading route，显示 loading 的状态，不过不同于其他 route ，loading route 并不会改变当前的 url，B 的 promise 解析完成之后，ember 才会真正改变当前 url，退出 loading route 进入 B。

ember 寻找 loading route 对应的模板规则是，routeName-loading 或者 loading

- foo.bar.slow-model-loading
- foo.bar.loading or foo.bar-loading
- foo.loading or foo-loading
- loading or application-loading

当进入 slow-model 时，ember 并不会使用 slow-model.loading ，slow-model.loading 会对 slow-model 层次之下的 route 起作用。

## loading event

loading 发生时会触发 loading event，如果当前 route 没有提供处理机制，事件会冒泡到 application。

> 注意：如果使用了在当前route中使用了 loading event，ember 就不会在去寻找对应的 loading hbs 了。

## error 是如何工作的

error 的原理和 loading 相似，只要 route 在 model,beforeModel,afterModel 发生 on a thrown error or rejected promise returned。

- articles.overview-error
- articles.error or articles-error
- error or application-error



