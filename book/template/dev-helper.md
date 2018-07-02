# 开发自定义 helper

使用 `ember g helper my-format-helper` 生成 helper。

helper 接受两种形式的参数，一种是类似数组，一种类似 hash，使用 helper 时，如果参数不指定名字表示的就是数组行，如果指定了名字就可以使用 hash 的方式存取

```hbs
{{my-format-helper 'beijing' name='beijing'}}
```

helper 中最重要的是调用 ember 提供的几个工具函数，见 ``