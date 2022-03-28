// 创建对应地应用，产生对应地应用地实例对象
import { createApp } from 'vue'
// 引入app组件（所有组件的父级组件）
import App from './App.vue'
import router from './router'
import store from './store'

import "@/styles/index.scss";
import "@UI/styles/ui.scss";

// 创建app应用返回对应的实例对象，调用mount方法进行挂载。挂载到id为app的组件中。
createApp(App).use(store).use(router).mount('#app')
