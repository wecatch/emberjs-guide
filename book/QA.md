# Questions 

## ember route call renderTemplate into some template

ember 在 route 中使用 renderTemplate 调用非 application 模板会报 bug `not found`

https://github.com/emberjs/ember.js/issues/10780

ember 官方不建议再使用 renderTemplate 而使用 https://github.com/ef4/ember-elsewhere

```javascript

//raise error not found
renderTemplate(){
    this.render('project/group', {
        into: 'project/detail',
    })
}
//work well
renderTemplate(){
    this.render('project/detail', {
        into: 'application',
    })
}
```
## 子 route 中获取 parent params


```javascript
import Ember from 'ember';
import {find_project_by_name} from '../data/main';

export default Ember.Route.extend({
    model(param, transition){
        return  find_project_by_name(transition.params["project.org"]}, param.project_name);
    }
});

```

## route 中请求多个 API

```javascript
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
    model(params){
        return hash({
            app: this.store.findOne('app', params.id),
            computer: this.store.find('computer', {appid: params.id})
        });
    }
});

```

## route 支持多个 dynamic segment

```javascript
Ember.Route.extend({
    serialize: function(model) {
        return {
            listing_id : model.get("listing_id"),
            video_id : model.get("id")
        };
    }
})
```

params 支持改写

## 子 controller 获取父 controller model

通过 inject controller 来获取 model，但是这个 controller 必须要显式存在，也就是 controller 文件必须要存在，否则由于 ember 会默认在 runtime 生成没有声明的 controller 对象，在当前业务如果是通过url进入，不知道什么原因，ember 并未生成 controller 对象

## 已经渲染并且使用过的组件如何恢复到初始状态

这个问题经常在选择组件中，比如 CheckBox group，CheckBox 已经在一次弹窗中使用过了，再次弹窗的时候需要把这组组件恢复到都未选中的状态，这个场景下最好把整个组件再次封装称为新的组件，动态的在渲染一次组件

