<template>
  <div style="height:100%;width:100%;">
    <Echarts :isAxisChart="false" :chartData="chartData" style="height:100%;width:100%;"></Echarts>
  </div>
</template>

<script>
import Echarts from '../Common/Echarts'
export default {
  components: {
    Echarts
  },
  data() {
    return {
      chartData: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          // left: 'left',
          // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '本月故障恢复率',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 38, name: '故障自愈' },
              { value: 24, name: '未恢复' },
              { value: 28, name: '人工恢复' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style></style>
