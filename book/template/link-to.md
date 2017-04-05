# link-to component

`link-to` component 用来创建 route 跳转的连接

```
{{#link-to 'index' }}index{{/link-to}}
```

`index` 为 route 名称，生成的 html 是 `<a href="/">index</a>`，如果当前的 url 正好是此 route，class 中会有名称为 active 的 class。

## route 的 url 参数

如果 route 包含 url 参数，在 link-to route 中可以指定 route 的参数

```
Router.map(function() {
  this.route('photos', function(){
    this.route('edit', { path: '/:photo_id' });
  });
});
```

```
<ul>
  {{#each photos as |photo|}}
    <li>{{#link-to "photos.edit" photo}}{{photo.title}}{{/link-to}}</li>
  {{/each}}
</ul>
```

```
<ul>
  <li><a href="/photos/1">Happy Kittens</a></li>
  <li><a href="/photos/2">Puppy Running</a></li>
  <li><a href="/photos/3">Mountain Landscape</a></li>
</ul>
```

如果 link-to 参数部分提供的是一个 object，link-to 会获取 object 属性 id 的值，如果不是 object，可以手动指定参数或者动态获取

```
<li>{{#link-to "photos.edit" 1}}{{photo.title}}{{/link-to}}</li>
<li>{{#link-to "photos.edit" photo.id}}{{photo.title}}{{/link-to}}</li>
<li>{{#link-to "photos.edit" (get photo 'id')}}{{photo.title}}{{/link-to}}</li>
```
