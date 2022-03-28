# my-vue3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## app
### setup 
只执行一次。
 + 执行时机

### ref ,reactive
+ ref 处理基本数据，reactive 处理对象，深度递归响应式
+ 如果ref 处理对象或者数组，内部回自动将对象/数组转换成reactive对象
+ ref 内部是通过劫持 getter 和 setter
+ reactive 内部是通过 proxy
+ ref的数据操作： 在js中要.value; 在模板中不需要。（内部解析模板时回自动添加.value）

### 计算属性和监视
watch
watch 多个
watchEffect
computed

### 生命周期
+ beforeCreate,created -> setup
+ beforeMount -> onbeforeMount
+ mounted -> onMounted
+ beforeUpdate -> onbeforeUpdate
+ updated -> onUpdated
+ beforeDestory -> onBeforeUnmounted
+ destoryed -> onUnmounted
+ errorCaptured -> onErrorCaptured

### 新增的钩子

### 自定义hook函数

### toRefs
toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个property都是一个ref


### ref的另外用法
+ 需求：页面加载完毕后，页面中的文本框可以直接获取焦点（自动获取焦点）
```html
<input type="text" ref="inputRef">
```
```js
const inputRef = ref<HTMLElement>(null)
// 设置制动对焦
onMounted(() => {
	inputRef.value && inputRef.value.focus()
})
```

### shallowReactive shallowRef

### readonly shallowReadonly
深度只读，浅度只读

### toRaw 和 markRaw
把代理对象变成普通对象
把指定的属性，再也不能变成代理对象。

### toRef的用法
ref是拷贝一份，相互不影响
toRef 把响应式数据state`对象中的某个属性`age变成ref对象。
```js
const age = toRef(state, 'age')  // 如果改动age， state的age也改动；同理如果state的age改动过，age也改动。
const money = ref(state.money)   // 如果改动money， state的money不会改动
```

### customRef的使用
创建一个自定的ref，并对其依赖项跟踪和更新触发进行显示控制。它需要一个工厂函数，
该函数接收 track 和 trigger 函数作为参数，
并且应该返回一个带有 get 和 set 的对象。
追踪的数据 track
触发页面更新 trigger

### project 与 inject
实现跨层级组件（祖孙）间通信

### 响应式数据的判断
+ isRef: 检查一个值是否为一个ref对象
+ isReactive: 检查一个对象是否是由reactive创建的响应式代理
+ isReadonly: 检查一个对象是否由readonly创建的只读dialing
+ isProxy: 检查一个对象是否是由reactive 或者 readonly 方法创建的代理

### 新组件——Fragment（片断）和Teleport（瞬移）
#### fragment
#### teleport 
可以把指定的片段放到指定的html属性后面
#### suspense （不确定）
异步组件，空白之前的处理
```js
// setup也可以这么改
setup(){
	return axios.get('url').then(res => {
		return {
			data: res.data
        }
    })
}

async setup () {
	const result = await axios.get('/data/address.json')
    return {
		data: result.data
    }
}
```

## 大屏
### 中国地图的处理
https://lbs.amap.com/api/amap-ui/reference-amap-ui/geo/district-explorer


