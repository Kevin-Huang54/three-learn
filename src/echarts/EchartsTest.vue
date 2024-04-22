<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import rawData from './data.json'

const chartContainer = ref()

onMounted(() => {
  console.log(rawData)
  const myChart = echarts.init(chartContainer.value)
  // 监听窗口resize
  window.addEventListener('resize', function () {
    myChart.resize()
  })
  let base = +new Date(1968, 9, 3)
  let oneDay = 24 * 3600 * 1000
  let date = []
  let data = [Math.random() * 300]
  for (let i = 1; i < 20000; i++) {
    const now = new Date((base += oneDay))
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
  }
  const option = {
    dataset: [],
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
      data: date
    },
    yAxis: {},
    tooltip: { trigger: 'axis' },
    series: {
      type: 'line',
      symbol: 'none',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      sampling: 'lttb',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }
        ])
      },
      data
    }
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
