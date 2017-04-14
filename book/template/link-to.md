# link-to component

`link-to` component 用来创建 route 的链接

```handlebars
{{#link-to 'index' }}index{{/link-to}}
```

`index` 为 route 名称，生成的 html 是 `<a href="/">index</a>`，如果当前的 url 正好是此 route，class 中会有名称为 active 的 class `<a href="/" class="active" >index</a>`。

## route 的 url 参数

如果 route 包含 url 参数，在 link-to route 中可以指定 route 的参数

```javascript
Router.map(function() {
  this.route('photos', function(){
    this.route('edit', { path: '/:photo_id' });
  });
});
```

```handlebars
<ul>
  {{#each photos as |photo|}}
    <li>{{#link-to "photos.edit" photo}}{{photo.title}}{{/link-to}}</li>
  {{/each}}
</ul>
```

```handlebars
<ul>
  <li><a href="/photos/1">Happy Kittens</a></li>
  <li><a href="/photos/2">Puppy Running</a></li>
  <li><a href="/photos/3">Mountain Landscape</a></li>
</ul>
```

如果 link-to 参数部分提供的是一个 object，link-to 会获取 object 属性 id 的值，如果不是 object，可以手动指定参数或者动态获取

```handlebars
<li>{{#link-to "photos.edit" 1}}{{photo.title}}{{/link-to}}</li>
<li>{{#link-to "photos.edit" photo.id}}{{photo.title}}{{/link-to}}</li>
<li>{{#link-to "photos.edit" (get photo 'id')}}{{photo.title}}{{/link-to}}</li>
```

## route query 参数

`query-params` helper 用来指定 route 的 query 参数。

```handlebars
<li>{{#link-to "photos.edit" 1 (query-params keyword='qq') }}{{photo.title}}{{/link-to}}</li>
```

```
<li><a href="/photos/1?keyword=qq">Mountain Landscape</a></li>
```

想要 query 参数出现在 url 后面需要在 route 中指定 `queryParams`

```js
import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        keyword: ''
    }
});

```

## 指定替换 url history

默认当 route 发生变化时，当前 route 是压栈进入浏览器的 history，可以指定 route history 的行为，

```handlebars
<p>
  {{#link-to "photo.comment" 5 primaryComment replace=true}}
    Main Comment for the Next Photo
  {{/link-to}}
</p>
```

`replace=true` 会替换当前的 history state


