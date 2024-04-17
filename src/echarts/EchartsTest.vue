<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chartContainer = ref()

onMounted(() => {
  const myChart = echarts.init(chartContainer.value)
  // 监听窗口resize
  window.addEventListener('resize', function () {
    myChart.resize()
  })
  const option = {
    tooltip: {},
    legend: {},
    dataset: {
      // 提供一份数据。
      source: [
        [43.3, 85.8, 93.7, 93.7],
        [83.1, 73.4, 55.1, 55.1],
        [86.4, 65.2, 82.5, 82.5],
        [72.4, 53.9, 39.1, 39.1]
      ]
    },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: {}, // 声明一个 Y 轴，数值轴。
    yAxis: {},
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  }
  myChart.setOption(option)
})
</script>

<template>
  <div id="chartContainer" ref="chartContainer"></div>
</template>

<style scoped>
#chartContainer {
  width: 100%;
  height: 60vh;
}
</style>
