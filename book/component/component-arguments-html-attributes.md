# Component 的参数和 html 属性

Component 的最重要的作用就是让 UI 单元具有复用的作用，上文中我们通过把 html 进行拆分和封装形成了独立可以复用的单元，但是这些组件都只是一个普通的静态 UI，不包含任何的属性和数据，观察 avatar 这两个组件

`app/components/received-message/avatar.hbs`

```html
<aside>
  <div class="avatar" title="Tomster's avatar">T</div>
</aside>
```

`app/components/sent-message/avatar.hbs`

```bash
<aside class="current-user">
  <div class="avatar" title="Zoey's avatar">Z</div>
</aside>
```

他们的区别可能只在于 class 名称以及 title 名称的差异，component 支持传入参数来实现根据参数不同展示不同的 UI。

`app/components/avatar.hbs`

```html
<aside>
  <div class="avatar" title={{@title}}>{{@initial}}</div>
</aside>
```

**ember 通过 `@` 来实现在 template 中获取传入 component 的 argument，在 ember 中 `{{}}` 表示要执行一个表达式，如果不用 `{{}}` 则变量会被当成字符串渲染**。

使用这个新的 avatar 组件

`app/components/received-message/avatar.hbs`

```html
<Avatar @title="Tomster's avatar" @initial="T" />
```

`app/components/sent-message/avatar.hbs`

```html
<Avatar @title="Zoey's avatar" @initial="Z" />
```



## html 属性

上文中新的 `Avatar` 组件并没有 class，component 除了通过  `@` 传入组件属性以外，还支持传入任意 html 属性

`app/components/received-message/avatar.hbs`

```html
<Avatar @title="Tomster's avatar" @initial="T"   class="current-user"/>
```

`app/components/avatar.hbs`

```html
<aside ...attributes >
  <div class="avatar" title={{@title}}>{{@initial}}</div>
</aside>
```

`...attributes` 会把任意的 component 的 html 属性渲染出来，如果希望用户可以覆盖组件自身的 attribute ，那么就把 `...attributes` 放在想要覆盖的 attribute 后面，因此 `...attributes` 的位置会影响最终属性的渲染。