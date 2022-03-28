<!--
* @name: mySon
* @author: 26683
* @date: 2022/3/22 14:23
* @description：mySon
* @update: 2022/3/22 14:23
-->
<template>
   <div :style="{background: color}">
      <h1>孙子组件 {{color }}</h1>
   </div>
</template>

<script>
import {inject} from "vue"

export default {
  name: "mySon",
  setup(){
    const color = inject('color')
    return {
      color
    }
  }
}
</script>

<style scoped>

</style>
