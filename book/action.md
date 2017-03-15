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
