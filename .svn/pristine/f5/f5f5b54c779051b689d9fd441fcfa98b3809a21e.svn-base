<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
var data = [{ value: 75, name: '' }, { value: 25, name: '__other', itemStyle: { normal: { color: 'rgba(0,0,0,0)' }}}]
var data2 = [{ value: 75, name: '' }, { value: 25, name: '__other', itemStyle: { normal: { color: 'rgba(0,0,0,0)' }}}]
var data3 = [{ value: 12, name: '耗电' }, { value: 25, name: '__other', itemStyle: { normal: { color: 'rgba(0,0,0,0)' }}}]
export default {
  mixins: [resize],
  props: {
    workerInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      chartDom: null,
      myChart: null,
      option: {}
    }
  },
  watch: {
    workerInfo: {
      handler(newVData) {
        return Object.keys(newVData).length && this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    this.chartDom = document.getElementById(this.id)
    this.myChart = echarts.init(this.chartDom)
    this.initChart()
  },
  methods: {
    initChart() {
      this.option = {
        legend: {
          selectedMode: false, // 取消图例上的点击事件
          orient: 'vertical',
          x: 'center',
          y: '40%',
          data: ['耗电'],
          itemWidth: 0,
          itemHeight: 0,
          textStyle: {
            fontSize: 14,
            color: '#31E4FF'
          }
        },
        backgroundColor: 'transparent',
        series: [
          { type: 'pie',
            startAngle: 225,
            endAngle: 360,
            radius: ['80%', '100%'],
            center: ['50%', '50%'],
            data: data,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: '#c2d8e8',
                shadowBlur: 60,
                shadowOffsetX: 3,
                shadowColor: 'rgba(27, 242, 245, 0.2)'
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            type: 'pie',
            startAngle: 225,
            endAngle: 360,
            radius: ['80%', '100%'],
            center: ['50%', '50%'],
            data: data3,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: '#2CE8AD' },
                { offset: 1, color: '#2069FF'
                }], false),
                shadowBlur: 60,
                shadowOffsetX: 3
                // shadowColor: 'rgba(27, 242, 245, 0.5)'
              }

            },
            label: {
              normal: {
                show: false
              }
            },

            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            type: 'pie',
            startAngle: 225,
            endAngle: 360,
            radius: ['73%', '75%'],
            center: ['50%', '50%'],
            data: data2,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: '#1bf2f5' },
                { offset: 1, color: '#1092e9'
                }], false)
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(27, 242, 245, 0)'
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false
              }
            }

          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>

