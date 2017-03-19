# 认识 Component 

Component 是 emberjs 中的重要概念，emberjs 的Component 和 vuejs以及reactjs等 ui-Component 概念大同小异，并无本质的差别，都是具有独立逻辑可复用的组件单元。

## 定义 Component 

Component 的定义非常简单，只要有一个 `template.hbs`模板就可以定义一个Component，也就是说当你只需要一个不断重复的模板片段，而没有任何 JavaScript 逻辑时，Component 就能帮上忙。

```bash
± % ember g component my-first-component 
installing component
  create app/components/my-first-component.js
  create app/templates/components/my-first-component.hbs
installing component-test
  create tests/integration/components/my-first-component-test.js

```

在上面例子中的 my-first-component 即使删除 my-first-component.js 这个 Component 依然有效，需要注意的是，Component 的名字组成**必须要有连接符-**，这是 emberjs 的约定。使用 emberjs 的脚手架创建的 Component hbs 和 js 分别位于不同的文件夹，有时候为了方便管理，可以都放置于 Components 文件夹下面，使用 `--pod`

```
± % ember g component my-second-component -p true                              
installing component
  create app/components/my-second-component/component.js
  create app/components/my-second-component/template.hbs
installing component-test
  create tests/integration/components/my-second-component/component-test.js

```

上的例子中创建了第二个 component，它的 js 和 hbs 在同一个文件夹。


## 使用 Component 

使用 Component 非常简单，像这样

```hbs
{{#my-first-component}}{{/my-first-component}}
```


## 动态渲染 Component

```hbs
{{#each model as |post|}}
  {{!-- either foo-component or bar-component --}}
  {{component post.componentName post=post}}
{{/each}}
```

当不知道 Component name 名字时，可以动态渲染 Component，其穿参、事件绑定等处理和普通是一样的。


## Component 的生命周期  

### 基础概念

- attrs ，通过外部传递给 component 称之为  attrs
- property，内部的属性 称之为 property

**导致 component 重新渲染的条件**

- any of its attributes change
- component.set() is called
- component.rerender() is called
- a property on a model or service used by the template has changed (including through computed properties).

Component 第一次初始化要历经：

```
init-->didReceiveAttrs-->willRender-->didInsertElement-->didRender
```

当组件渲染完毕，之后属性发生改变再次渲染时又会历经:

```
didUpdateAttrs-->didReceiveAttrs-->willUpdate-->willRender-->didUpdate-->didRender
```

组件生命周期结束之后被销毁会历经

```
willDestroyElement-->willClearRender-->didDestroyElement
```


每个生命周期的 hooks 都有相应的职能，所以调用它们要选在恰当的时候。

### **init**

初始化组件，在此 hooks 可以完成对相应属性的最基本的声明和初始化工作

### **didUpdateAttrs**

didUpdateAttrs runs when the attributes of a component have changed, but not when the component is re-rendered, via component.rerender, component.set, or changes in models or services used by the template.

didUpdateAttrs 在 attrs 发生改变之后执行，而不是 Component 通过 component.rerender, component.set, or changes in models or services 发生改变，并且在 re-render 之前执行。

可以把此 hooks 当成很好的 observer 来执行相应的处理逻辑。需要注意：didUpdateAttrs 执行是指 component 从外部传递的属性发生改变，而不是 Component 内部属性发生改变，比如通过 set 改变 Component 某个属性。


```
<ul class="errors">
  {{#each errors as |error|}}
    <li>{{error.message}}</li>
  {{/each}}
</ul>
<fieldset>
  {{input name="user.name" value=name change=(action "required")}}
  {{input name="user.department" value=department change=(action "required")}}
  {{input name="user.email" value=email change=(action "required")}}
</fieldset>


import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.errors = [];
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('errors', []);
  },

  actions: {
    required(event) {
      if (!event.target.value) {
        this.get('errors').pushObject({ message: `${event.target.name} is required`});
      }
    }
  }
});

```

### **didReceiveAttrs**

didReceiveAttrs runs after init, and it also runs on subsequent re-renders, which is useful for logic that is the same on all renders. It does not run when the re-render has been initiated internally.

didReceiveAttrs 在 init 之后执行，也会在 re-render 时在 didUpateAttrs 之后执行，因此这个 hooks 可以用在初次渲染和再次渲染时处理相同的业务逻辑，同 didUpdateAttrs 一样，可以当成一个 observer。如果 re-render 是由 Component 内部触发引起的，此 hooks 并不会执行。

### **didInsertElement**

After a component successfully renders its backing HTML element into the DOM, it will trigger its didInsertElement() hook.

一个 Component 的所有 dom 都渲染完毕之后会执行此 hook，这个时候就可以在此执行和调用第三方库进行 dom 的修改或事件的绑定，但是请谨记，这个 hook 只在初次渲染时调用。

- The component's element has been both created and inserted into the DOM.
- The component's element is accessible via the component's $() method.

`$()` 返回的是 Component 的 root element 的 jquery object，如果需要获得子 dom，可以使用 child 选择器 `this.$('p')`。

注意事项：

- It is only triggered once when the component element is first rendered.
- In cases where you have components nested inside other components, the child component will always receive the didInsertElement() call before its parent does.
- Setting properties on the component in didInsertElement() triggers a re-render, and for performance reasons, is not allowed.
- While didInsertElement() is technically an event that can be listened for using on(), it is encouraged to override the default method itself, particularly when order of execution is important.

- 只在初始化渲染调用
- 子组件的 didInsertElement 调用总是比父组件早
- 在 didInsertElement 中改变 Component 属性能够触发重新 re-render，所以不要这么做。
- 即使可以使用 on 来监听 didInsertElement 方法，但是避免这样做，为了保证所有的 hook 可以正确按照顺序调用


### **didRender**

The didRender hook is called during both render and re-render after the template has rendered and the DOM updated. You can leverage this hook to perform post-processing on the DOM of a component after its been updated.


当 dom 都准备后了之后，didRender 被执行，可以在 didRender 中执行 dom 完成之后的更新，比如计算 dom 容器的高度等等。


### 各个 hook 使用注意事项


- didUpdateAttrs 和 didReceiveAttrs 是在外部传递给 component 的属性发生改变时导致 re-render 重新执行才会调用，如果是组件内部发生的导致属性改变而re-render，这两个 hooks 都不会执行。
- component 内部属性发生改变，会导致 willUpdate、willRender、didUpdate、didRender 执行
- 不要在 {will,did}{Render,Update} 更改 component 的内部或外部属性，这样会导致性能问题或无限的更新循环


