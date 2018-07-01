
# 理解 component 的 attrs 和 property

有两个组件X和Y，分别都有两个值，internal 和 external。

``` hbs
{{X external = value}}
```

在 X 模板中，使用 Y 组件，并把 X 的 internal 传递给 Y 的 external，也就是说 X 的内部变量现在是 Y 的外部变量。

``` hbs
{{Y external = internal}}
```

在 Y 中对 external 进行改变，其实是改变的 X 的 internal。这时会触发 X 的 `willUpdate`, `willRender`,`didUpdate`,`didRender`，但是**不会**触发 X 的 `attrs` 函数。`attrs` 函数只有在传给 component 的外部作用域的值改变时才会触发。

