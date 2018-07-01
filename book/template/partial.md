# partial

partial 表示一个模板片段，用来实现 hbs 片段复用的目的，无论 partial 被包含在普通 hbs 或 component 中，partial 都具有和渲染上下文一样的上下文。

partial 文件名必须必须以 `-` 打头，且必须用 `-` 连接：

- '-form.hbs' 合法
- '_form.hbs' 不合法
- '-shop-form' 合法
- '-shopForm'  不合法


在 hbs 中引用 partial ：

```
{{partial "form"}}
{{partial "book/form"}}
```

引用时可以不包含开头 `-` 中间的 `-` 可以变成驼峰结构的。

partial 用 `/` 来区分路径，`book/form` 表示 templates 中 book 目录下的 `-form.hbs`