## URL 的 query parameter

默认情况 url 中的 query parameter 会一直带在 url 的后面，可以显示指定让其消失，按照下面的方法

1. link-to 中指定 query-params 为 null
2. 对应路由的 controller 中要指定 为 null

```
{{#link-to "index" (query-params classes=null channel=null material=null tag=null) class="item" }}我的书架{{/link-to}}
```

```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['material','channel','classes','tag'],
    material: null,
    channel: null,
    classes: null,
    tag: null
});

```

