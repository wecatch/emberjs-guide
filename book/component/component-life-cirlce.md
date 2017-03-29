# Component 的生命周期  

### 基础概念

- attrs ，通过外部传递给 component 称之为  attrs
- property，内部的属性称之为 property

**导致 component 重新渲染的条件**

- any of its attributes change
- component.set() is called
- component.rerender() is called
- a property on a model or service used by the template has changed (including through computed properties).

> 注意：任何外部 attribute 或者内部的 property 发生了改变，包括 model 中的属性、service 中的属性，且这些 property 在 component 的模板中被使用，都会触发 component 重新渲染

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


- didUpdateAttrs 和 didReceiveAttrs 是在外部传递给 component 的属性发生改变时导致 re-render 重新执行才会调用，如果是组件内部发生的导致属性改变而re-render，这两个 hooks 都不会执行，有一点需要注意，虽然这两个 hooks 可以当做 oberver 来使用，但对应的属性最好都是 object 才会在属性发生改变时调用 hooks，详见 [ember-cli-simditor](https://github.com/wecatch/ember-cli-simditor/blob/master/addon/components/simditor-editor.js) component 的实现。
- component 内部属性发生改变，会导致 willUpdate、willRender、didUpdate、didRender 执行
- 不要在 {will,did}{Render,Update} 更改 component 的内部或外部属性，这样会导致性能问题或无限的更新循环

