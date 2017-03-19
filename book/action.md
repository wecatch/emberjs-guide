# ember action

ember 中的 action 顾名思义代表的是事件的处理，ember 的事件可以定义在 component、route、controller、application 中，事件会优先在 controller 中查找，如果没有找到会向 route 冒泡，直到 application。

## 指定事件类型

action 默认处理的是 click 事件，但是可以指定事件的类型，注意事件名称是必须是 camelCased 的风格。

```html
<button class="button" {{action "deleteUser" on="keyPress" }} >delete user</button>
```

## action 传递多个参数

```html
<button class="button" {{action "deleteUser" param1 param2 }} >delete user</button>
```

```javascript

Ember.route({
    actions: {
        deleteUser(param1, param2){
            console.log(param1);
            console.log(param2);
        }
    }
})

```

## modifier key 辅助键的处理

ember action 默认会忽略来自 modifier key 的事件，如果希望启用来自 modifier key 的事件可以使用 allowedKeys

```
<button {{action "anActionName" allowedKeys="alt"}}>
  click me
</button>
```

当按下 `alt` 键，action 事件将触发


## 阻止默认事件

ember 默认会阻止 dom 在浏览器的默认行为，使用 preventDefault=false 取消阻止


```html
<a href="newPage.htm" {{action "logClick" preventDefault=false}}>Go</a>
```

`preventDefault=false` 存在，点击锚点，ember action 被触发，同时浏览器发生跳转，如果去掉 `preventDefault=false`，点击锚点仅仅会触发 ember 事件


## action 的第一个参数

If a value option for the {{action}} helper is specified, its value will be considered a property path that will be read off of the first parameter of the action. This comes very handy with event listeners and enables to work with one-way bindings.

如果在 action helper 中指定一个 value，这个 value 将会当成 action 的第一个参数传入，使用内敛的方式调用


```
<label>What's your favorite band?</label>
<input type="text" value={{favoriteBand}} onblur={{action "bandDidChange" value="target.value"}} />
```

By default, the action handler receives the first parameter of the event listener, the event object the browser passes to the handler, so bandDidChange prints Event {}.

默认情况下，内敛 action 第一个参数是 event 如果不指定 value 值。

## 获取原始的浏览器 event

如果想要在 action 中获取原始的浏览器事件，在普通的模板中可以使用内敛事件的方式使用 action


```html
<button onclick={{action 'signUp'}}>Sign Up</button>
```

```javascript
actions: {
  signUp: function(event){ 
    // Only when assigning the action to an inline handler, the event object
    // is passed to the action as the first parameter.
  }
}
```

在 component 中，使用事件名称定义方法来获得原始的 event 对象

```
import Ember from 'ember';

export default Ember.Component.extend({
  doubleClick(e) {
    alert("DoubleClickableComponent was clicked!");
  }
});
```

component 的第一个参数就是原始的 event 对象

## 默认的 action 行为

The normal behavior for a function defined in actions does not receive the browser event as an argument.

action 的默认行为并不会传入浏览器的 event 事件类型，其调用行为就是一个简单的 函数调用


```html
<button {{action 'signUp'}}>Sign Up</button>
```

```javascript
actions: {
  signUp: function(){ 
    // No event object is passed to the action.
  }
}
```

## event name list


**Touch events**

- touchStart
- touchMove
- touchEnd
- touchCancel

**Keyboard events**

- keyDown
- keyUp
- keyPress

**Mouse events**

- mouseDown
- mouseUp
- contextMenu
- click
- doubleClick
- mouseMove
- focusIn
- focusOut
- mouseEnter
- mouseLeave

**Form events**

- submit
- change
- focusIn
- focusOut
- input

**HTML5 drag and drop events**

- dragStart
- drag
- dragEnter
- dragLeave
- dragOver
- dragEnd
- drop


