<template>
  <div class="hello" style="background: yellowgreen">
    <p>子组件 {{msg}}</p>
    <button @click="emitXXX">分发函数</button>
    <p>toRef的应用</p>
    <p>{{age}}</p>
    <p>长度{{length}}</p>
    <sectiont>
      <my-son></my-son>
    </sectiont>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, toRef, computed} from 'vue';
import mySon from '@/components/mySon'
// 这里注意这种用法
function userGetLength(age:Ref) {
  return computed(() => {
    return age.value.toString().length;
  })
}
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
    age: Number,
  },
  components: {
    mySon
  },
  beforeCreate() {
    console.log('数据初始化生命周期回调')
  },
  // setup 细节问题
  // 1. setup执行,它再beforeCreate调用之前就执行了
  // 2. setup执行的时候，当前组件还没有创建。意味着——组件实力对象的this根本就不能用。——this是undefined

  // setup的返回值
  // 1. 返回的是一个对象。里面放着属性和方法，都是给模板使用的。
  // 2. setup内部对象的属性和data函数return对象的的属性都可以再html模板中使用
  // 3. setup中的对象属性会和data函数return的对象的属性进行合并为【组件对象的属性】
  // 4. 同样methods也是。
  // setup (props, {attrs, emit, slot})
  setup (props, context) {
    // props 参数，是一个对象，里面有父级组件向子级组件传递的数据。
    console.log(props)
    console.log(props.msg)
    // context也是一个对象，里面有 attrs（获取当前组件上标签上的所有属性对象。不包括props的）, emit（分发事件）, slot
    console.log(context)
    console.log(context.attrs)
    console.log('setup执行,它再beforeCreate调用之前就执行了')

    // 按钮点击事件分发
    function emitXXX () {
      context.emit('xxx', 'hhhhhh')
    }

    // 这里应该传入props的对象，第三方函数需要传入的是ref属性
    const length = userGetLength(toRef(props, 'age'))
    return {
      // setup中一般都是返回一个对象，对象中的属性和方法都可以再html模板中直接使用
      emitXXX,
      length
    }
  }
});
</script>

