# component 的事件处理

component 中的事件处理非常简单，只需要在 component 实现对应的事件名称的方法即可，需要注意名称必须符合 camelStyle

```javascript
// app/components/double-clickable.js
import Ember from 'ember';

export default Ember.Component.extend({
  doubleClick() {
    Ember.Logger.info("DoubleClickableComponent was clicked!");
    return true;
  }
});
```

`doubleClick` 是事件名称，对应的事件是 `doubleClick`，如果在事件方法中 `return true`，事件将会冒泡到父元素中


## 响应外部 action 

在某些场景中，处理完 component 内部事件之后需要内部产生的数据通过响应外部的 action 发送出去，这在 ember 中也很容易实现

```handlebars
{{drop-target action=(action "didDrop")}}
```


```javascript
//app/components/drop-target.js
import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['draggable'],
  draggable: 'true',

  dragOver() {
    return false;
  },

  drop(event) {
    let id = event.dataTransfer.getData('text/data');
    let response = this.get('action')(id);
    Ember.Logger.info(response);
  }
});

```

属性 `action` 传递的值是 action `didDrop`，这个属性对应的值在 component 内部其实就相当于一个很普通的函数，可以非常容易在内部调用此函数 `this.get('action')(id)`，甚至可以拿到调用函数的返回值 `let response = this.get('action')(id);`。



**事件的更多介绍 见 [../action.md](ember action)**




