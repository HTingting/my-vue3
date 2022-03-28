<!--
* @name: index
* @author: 26683
* @date: 2022/3/25 15:33
* @description：index
* @update: 2022/3/25 15:33
-->
<template>
  <div class="home-container">
    <z-row :gutter="15">
      <!--  左边的地图    -->
      <z-col :span="7">
        <div class="echartList">
          <div class="chart-item">
            <box-container :boxTitle="year + '年销售额度排名'">
              <city-count />
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '年销售种类占比'">
              <type-count />
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '年销售品牌占比'">
              <word-chart />
            </box-container>
          </div>
        </div>
      </z-col>
      <!--  中间    -->
      <z-col :span="10">
        <!--   总量统计计时板     -->
        <count-to/>
        <div style="width: 100%; height: 85%">
            <!--    地图面板      -->
            <scatter-map/>
        </div>
      </z-col>
      <!--   右边的地图   -->
      <z-col :span="7">
        <div class="echartList">
          <div class="chart-item">
            <box-container :boxTitle="year + '年客户年龄分布'">
              <funnel-chart />
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '年公司市值'">
              <liquid-chart />
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '年同行业销售额度对比'">
              <line-chart />
            </box-container>
          </div>
        </div>
      </z-col>
    </z-row>
  </div>
</template>

<script>
import { ZRow, ZCol } from "@UI/components";
import boxContainer from "@/components/boxContainer/index";
import countTo from "@/components/countTo/index";
import {
  cityCount,
  typeCount,
  scatterMap,
  wordChart,
  funnelChart,
  lineChart,
  liquidChart,
} from './components'
import useResize from "@/componentApi/useResize.js";
export default {
  name: "homepage",
  components: {
    ZRow,
    ZCol,
    boxContainer,
    cityCount,
    typeCount,
    scatterMap,
    wordChart,
    funnelChart,
    lineChart,
    liquidChart,
    countTo,
  },
  setup(props, context) {
    const {year, sum} = useResize();

    return {
      year,
      sum,
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  width: 100%;
  height: 100%;
  position: relative;
  .echartList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .echart-item {
      height: 32.1%;
      width: 100%
    }
  }

}
</style>
