import {onBeforeUnmount, onMounted, ref} from "vue";

export default function () {
    const x = ref(1)
    const y = ref(1)

    const clickHandler = (event:any) => {
        x.value = event.pageX
        y.value = event.pageY
    }
    // 页面加载完毕，进行点击操作
    // 页面加载完毕 的生命周期
    onMounted(()=>{
        window.addEventListener('click', clickHandler)
    })

    onBeforeUnmount(()=>{
        window.removeEventListener('click', clickHandler)
    })

    return {
        x, y
    }
}
