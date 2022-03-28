<!--
* @name: navBar
* @author: 26683
* @date: 2022/3/25 15:07
* @description：navBar
* @update: 2022/3/25 15:07
-->
<template>
  <div class="nav-wrapper">
    <div class="bar-title" @click.stop="toHome">大数据分析系统</div>
    <div class="time">{{date}} {{time}}</div>
    <div class="mapChoose" v-if="parentInfo.length > 1 && isHome">
      <span v-for="(item,index) in parentInfo" :key="item.code">
        <span class="title" @click="chooseArea(item,index)">
          {{ item.cityName == "全国" ? "中国" : item.cityName }}
        </span>
        <span class="icon" v-show="index + 1 != parentInfo.length">></span>
      </span>
    </div>
  </div>
</template>

<script>
import { setup, ref, onMounted, computed } from "vue";
import { getDate, getTime } from "@/utils/date.js";
import useResize from "@/componentApi/useResize.js";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "navBar",
  setup(props, context) {
    // 年月日
    const date = getDate()
    // 时分秒
    const time = ref(getTime())
    const router = useRouter()
    const route = useRoute()
    const {parentInfo, removeCommitMapInfo} = useResize();
    let isHome = computed(() => route.path === '/homepage')

    const chooseArea = (item, index) => {

    }

    const toHome = () => {
      if (route.path == "/homepage") {
        return;
      }
      router.push("/homepage");
    }

    onMounted(() => {
      setInterval(() => {
        time.value = getTime();
      }, 1000);
    })

    return {
      date,
      time,
      parentInfo,
      chooseArea,
      toHome,
      isHome,
    }
  }
}
</script>

<style scoped>

</style>
