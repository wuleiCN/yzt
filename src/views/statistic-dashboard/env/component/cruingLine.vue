<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'
export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chartDom: null,
      myChart: null,
      height_: '',
      date_: [],
      inCount: [1, 3, 6, 2, 7, 9, 2, 3, 5, 7, 1, 3],
      outCount: [0, 4, 7, 4, 8, 11, 4, 2, 7, 9, 2],
      option: {}
    }
  },
  mounted() {
    this.chartDom = document.getElementById(this.id)
    this.myChart = echarts.init(this.chartDom)
    this.mataierStockView()
    console.log(this.date_)
  },
  methods: {
    mataierStockView() {
      for (let i = 0; i < 12; i++) {
        this.date_.push(i + 1 + '月')
      }
      this.initChart()
    },
    initChart() {
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          width: '95%',
          height: '73%',
          right: '2%',
          top: '10%'
        },
        xAxis: [
          {
            data: this.date_ || [],
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#FFFFFF'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: ['#5f9ea0']
              },
              show: true
            },
            axisLabel: {
              textStyle: {
                color: '#FFFFFF'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#29B9C8'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '温度',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(26,189,213,0.5)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(26,189,213,0.1)'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'top',
              color: '#00EDFF'
            },
            lineStyle: {
              color: '#57EEFF',
              width: 2
            },
            data: this.inCount || []
          },
          {
            name: '湿度',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(87,174,255,.5)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(87,174,255,.1)'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'top',
              color: '#00EDFF'
            },
            lineStyle: {
              color: '#57AEFF',
              width: 2
            },
            data: this.outCount || []
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
