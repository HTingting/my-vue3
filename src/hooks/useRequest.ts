// 引入
import axios from 'axios'
// 发送ajax的请求
import {ref} from "vue";

export default function  <T>(url:string){
    // 加载的状态
    const loading = ref(true)
    const data = ref<T | null>(null)
    const errorMsg = ref('')
    axios.get(url).then(res=>{
        loading.value = false
        data.value= res.data
    }).catch(error=>{
        loading.value = false
        errorMsg.value = error.message || '未知错误'
    })
    return {
        loading,
        data,
        errorMsg,
    }
}
