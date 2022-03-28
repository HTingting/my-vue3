<!--
* @name: index
* @author: 26683
* @date: 2022/3/25 15:58
* @description：index
* @update: 2022/3/25 15:58
-->
<template>
  <div class="four-container">
    <div class="fourBorder border1"></div>
    <div class="fourBorder border2"></div>
    <div class="fourBorder border3"></div>
    <div class="fourBorder border4"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
