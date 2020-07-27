<template>
  <div class="onrate">
    <div class="top">
      <Echarts :isAxisChart="false" :chartData="chartData" style="height:100%;width:100%;"></Echarts>
    </div>
    <div class="bottom">
      <Echarts :isAxisChart="false" :chartData="chartData" style="height:100%;width:100%;"></Echarts>
    </div>
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
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        title: {
          text: '100%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',

            fontSize: '20'
          }
        },
        legend: {
          show: false,
          data: []
        },
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['90%', '80%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 100,
                name: '',
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '',
                value: 0
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.onrate {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .top {
    flex: 1;
  }
  .bottom {
    flex: 1;
  }
}
</style>
