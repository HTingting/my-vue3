<template>
<!-- vue2中的html模板中必须要有一对根标签，vue3组件的html模板中可以没有根标签 -->
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <p>{{user.name}}</p>
      <p>{{user.gender}}</p>
      <button @click="updateUser">更新数据</button>
    </div>
    <div>
      <p>父级组件</p>
      <p>父组件：{{msg}}</p>
      <button @click="msg += '==='">更新数据</button>
    </div>
    <hello-world :msg="msg" msg2="要努力" @xxx="xxx" :age="age"></hello-world>
    <section>
      <div>
        <p>计算属性和监视的演示</p>
        <fieldset>
          <legend>姓名操作</legend>
          <input type="text" v-model="name.firstName">
          <input type="text" v-model="name.lastName">
        </fieldset>
        <fieldset>
          <legend>显示姓名</legend>
          <input type="text" v-model="fullName1">
          <input type="text" v-model="fullName2">
          <input type="text" v-model="fullName3">
        </fieldset>
      </div>
    </section>

    <section>
      <h2>x:{{x}}, y: {{y}}</h2>
    </section>

    <section>
      <h2>read only</h2>
      <p>{{state2.name}}</p>
      <p>{{state2.car.name}}</p>
      <button @click="update">更新</button>
    </section>

    <section>
      <h2>toRaw 和 markRaw</h2>
      <p>{{Row.name}}{{Row.likes}}</p>
      <button @click="testToRaw">testToRaw</button>
      <button @click="testMarkRow">testMarkRow</button>
    </section>

    <section>
      <h2>toRef</h2>
      <p>age: {{age}}</p>
      <button @click="updateAge">更新年龄</button>
    </section>

    <section>
      <h2>customRef</h2>
      <input type="text" v-model="keyword">
      <p>{{keyword}}</p>
    </section>

    <section>
      <h2>父组件：provide与inject</h2>
      <p>当前颜色： {{color}}</p>
      <button @click="color = 'red'">红</button>
      <button @click="color = 'yellow'">黄</button>
      <button @click="color = 'blue'">蓝</button>
    </section>
  </div>
</template>

<script lang="ts">
// defineComponent 函数，目的是定义一个组件，内部可以传入一个配置对象。
import {computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch, watchEffect, readonly, shallowReadonly, toRaw, markRaw, toRef, customRef} from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import useMousePosition from "@/hooks/useMousePosition";
import useRequest from "@/hooks/useRequest";
import {provide} from "vue";

// 定义接口
interface result{
  id : number;
  address: string;
  distance: string;
}
interface arrayObj {
  id: string;
  title: string;
  price: number;
}
interface userInfo{
  name: string,
  age: number,
  likes?: string[]
}

// 自定义hook防抖的函数
function useDebouncedRef<T> (value: T, delay = 2000) {
  let timeout: number
  return customRef((track, trigger) => {
    return {
      get () {
        // 告诉vue追踪数据
        track()
        return value
      },
      set (newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          // 告诉vue去触发界面更新
          trigger()
        }, delay)
      }
    }
  })
}

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  // setup是组合api的入口，只执行一次！！！！
  setup () {
    // 变量
    // let count = 0   //  此时的数据不是响应式的数据
    const count = ref(0)  // ref是一个函数，定义一个响应式数据; 返回的是一个ref对象，对象中有一个value属性；如果需要对数据进行操作，那么就需要使用改ref对象调用value属性的方式。
    // html模板中是不需要使用.value属性的方式【！important】
    // 一般定义基本函数就是用【ref】

    // 【需求: 显示用户的相关信息，点击按钮，可以更新用户的相关信息数据】
    const obj:any = {
      name: 'Harry',
      age: 20,
      wife:{
        name: 'potter',
        age: '21',
        cars: ['1','2','3']
      }
    }
    const user = reactive(obj)

    // 方法
    function updateCount() {
      console.log('方法执行了');
      // 报错的原因，count是一个ref的对象，对象是不能++的
      // count++
      count.value++
    }

    function updateUser() {
      // 这里面就可以直接使用user了
     /* user.name = 'Harry1'
      user.wife.cars[0] = '马萨拉蒂'*/

      // user ---> 代理对象 obj--->目标对象
      // user对象或者obj对象【添加】一个新的属性，哪一种方式会影响页面渲染
      // obj.gender = '男'  // 这种方式界面没有改变但是数据变了
      user.gender = '女'   // 这种方式界面更新并且数据更新
      // 删除属性，也是用user
      delete user.age
    }

    function xxx(txt: string) {
      msg.value += txt
    }

    const msg = ref('Hello World')


    const name = reactive({
      firstName: 'Harry',
      lastName: 'Potter'

    })
    // 通过计算属性的方式，实现第一个姓名的显示
    // 计算属性中的函数中如果只传入一个回调函数，表示的时get
    // 返回的时一个ref的属性类型的对象
    const fullName1 = computed(()=>{
       return name.firstName + '-' + name.lastName
    })

    const fullName2 = computed({
      get(){
        return name.firstName + '-' +name.lastName
      },
      set(val:string){
        const names = val.split('-')
        name.firstName = names[0]
        name.lastName = names[1]
      }
    })

    // 监视
    const fullName3 = ref('')
    watch(name, ({firstName, lastName})=>{
      fullName3.value = firstName + '-' +lastName
    },{immediate:true, deep: true})
    // immediate 默认回执行一次watch，deep深度监视

    // 监视: 本身不许配置immediate，默认回执行一次
    watchEffect(()=>{
      fullName3.value = name.firstName + '-' + name.lastName
    })

    // 监视fullName3 的数据，改变firstname 和 lastname
    watchEffect(() => {
      const names = fullName3.value.split('-')
      name.firstName = names[0]
      name.lastName = names[1]
    })

    // watch--- 可以监视多个数据的
    watch([()=>name.firstName, () => name.lastName], () => {
      // 如果数组里面的对象不是响应式的数据，要用回调的方式
      console.log('-----------')
    })

    // const x = ref(1)
    // const y = ref(1)
    //
    // const clickHandler = (event:any) => {
    //   x.value = event.pageX
    //   y.value = event.pageY
    // }
    // // 页面加载完毕，进行点击操作
    // // 页面加载完毕 的生命周期
    // onMounted(()=>{
    //   window.addEventListener('click', clickHandler)
    // })
    //
    // onBeforeUnmount(()=>{
    //   window.removeEventListener('click', clickHandler)
    // })
    const {x,y} = useMousePosition()  // 调用自定义hook

    // 限定接口返回的类型
    const {loading, data, errorMsg} = useRequest<result>('请求地址url')
    // const {loading, data, errorMsg} = useRequest<arrayObj[]>('请求地址')

    const state = reactive({
      name: '佐助',
      age: 20,
      car: {
        name: '奔驰',
        color: 'yellow'
      }
    })
    // const state2 = readonly(state)
    const state2 = shallowReadonly(state)
    const update = () => {
      state2.car.name += '==='  // readonly 深度只读，会报错; 用shallowReadonly则不会，因为它是浅度只读
    }

    const Row = reactive<userInfo>({
      name: 'Harry',
      age: 28
    })

    const testToRaw = () => {
      // 把代理对象变成普通对象
      const toRaw = toRaw(Row)
    }

    const testMarkRow = () => {
      // Row.likes = ['eat', 'drink']
      // Row.likes[0] += '=='
      // console.log(Row)
      const likes = ['eat', 'drink']
      // markrow标记的对象数据，从此以后都不能再成为代理对象
      Row.likes = markRaw(likes)
      setInterval(()=>{
        if (state.likes) {
          state.likes[0] += '='
          console.log('定时器走起来')
        }
      },1000)
    }

    const age = toRef(Row, 'age')
    const updateAge = () => {
      age.value += 1
    }

    //const keyword = ref('abc')
    const keyword = useDebouncedRef('abc', 500)

    const color = ref('red')

    provide('color', color)

    return {
      // 属性
      count,
      // 对象属性
      user,
      // 属性
      msg,
      name,
      fullName1,
      fullName2,
      fullName3,

      x,
      y,
      state2,
      Row,
      age,
      keyword,
      color,
      // 方法
      updateCount,
      // 对象操作的方法
      updateUser,
      xxx,
      update,
      testToRaw,
      testMarkRow,
      updateAge,
    }
  }
});
</script>
