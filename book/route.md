# route

route 顾名思义就是路由，一个 url 对应一个 route，一个 route 对应一个 controller 和 template，一个 template 可以保护一个或多个 component。


## route 模板渲染的机制

当 url 发生改变，则会调用相应的 route，然后 route 获取数据，获取数据完毕之后进行模板渲染，模板中的 component 在当前 route 对应的 hbs 首次初始化的时候进行实例化，生成组件对应的实例。组件在某些情况下会重新渲染来获取最新的数据。这里需要注意的几点：

1. 如果当前的 url 未发生改变，也就是当前 url 的 route 未发生改变，则当前的 route 对应的 hbs 不重新进行渲染，而且 hbs 中包含的已实例化的组件如果不手动触发重新实例化，则这些组件并不会再次进行实例化，这类情况更多的见于 url 参数部分即 segment 部分发生改变，route 不变得情况，比如 `url ==> /item/1, url ==> /item/2` 对应的 route 是 item, 仅仅只是参数部分变化，比如 id==>1, id==>2，此时 item route 对应的 hbs 并不会重新渲染，包含的组件也只在 hbs 初始化之后初始化一次，之后不在发生变化。

2. 如果直接从浏览器键入 url 访问，则每次进入对应的 route 都会重新渲染对应的 hbs，因为此时 hbs 并没有进行初始化。




