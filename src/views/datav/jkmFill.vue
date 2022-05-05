<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'
import 'echarts-liquidfill'
export default {
  mixins: [resize],
  props: {
    statistics: {
      type: Array,
      default: () => {
        return [1]
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
      option: {},
      counts: null,
      greeenCount: 0,
      yellowCount: 0,
      redCount: 0
    }
  },
  watch: {
    statistics: {
      handler(newVData) {
        return newVData.length && this.initChart(newVData)
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
    allCount(data) {
      data && data.map(i => {
        this.counts += i.data[0].number + i.data[1].number + i.data[2].number
        this.greeenCount += i.data[0].number
        this.yellowCount += i.data[1].number
        this.redCount += i.data[2].number
      })
    },
    initChart(data) {
      this.allCount(data)
      var greenCounts = 0
      var yellowCounts = 0
      var redCounts = 0
      if (this.counts !== null) {
        greenCounts = this.$dataConver.div(this.greeenCount, this.counts) || 0
        yellowCounts = this.$dataConver.div(this.yellowCount, this.counts) || 0
        redCounts = this.$dataConver.div(this.redCount, this.counts) || 0
      }
      this.option = {
        graphic: [{
          type: 'group',
          left: '18%',
          top: '45%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: '绿码占比',
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '48%',
          top: '45%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: '黄码占比',
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '78%',
          top: '45%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: '红码占比',
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '20%',
          top: '75%',
          children: [{
            type: 'text',
            style: {
              fill: '#29E8A8',
              text: (greenCounts * 100).toFixed() + '%',
              fontSize: 25
            }
          }]
        }, {
          type: 'group',
          left: '48%',
          top: '75%',
          children: [{
            type: 'text',
            style: {
              fill: '#F1C745',
              text: (yellowCounts * 100).toFixed() + '%',
              fontSize: 25
            }
          }]
        }, {
          type: 'group',
          left: '80%',
          top: '75%',
          children: [{
            type: 'text',
            style: {
              fill: '#DE341E',
              text: (redCounts * 100).toFixed() + '%',
              fontSize: 25
            }
          }]
        }],
        series: [{
          type: 'liquidFill',
          waveAnimation: 20,
          data: [greenCounts, greenCounts - 0.05],
          color: [new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(14, 177, 229, 1)'
              },
              {
                offset: 1,
                color: 'rgba(45, 240, 159, 1)'
              }
            ],
            false
          ), new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(14, 177, 229, 1)'
              },
              {
                offset: 1,
                color: 'rgba(45, 240, 159, 1)'
              }
            ],
            false
          )],
          amplitude: 5,
          radius: '70%',
          center: ['10%', '60%'],
          backgroundStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.55,
              colorStops: [{
                offset: 0.5,
                color: 'rgba(5, 26, 25, 0.1)' // 0% 处的颜色
              }, {
                offset: 0.85,
                color: 'rgba(148, 255, 251, 0.2)' // 100% 处的颜色
              }, {
                offset: 0.95,
                color: 'rgba(148, 255, 251, 0.2)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          outline: {
            show: false
          },
          label: {
            normal: {
              formatter: ''
            }
          }
        }, {
          type: 'liquidFill',
          waveAnimation: 20,
          data: [yellowCounts, yellowCounts - 0.05],
          color: [new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(255, 242, 32, 1)'
              },
              {
                offset: 1,
                color: 'rgba(249, 85, 8, 1)'
              }
            ],
            false
          ), new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(255, 242, 32, 1)'
              },
              {
                offset: 1,
                color: 'rgba(249, 85, 8, 1)'
              }
            ],
            false
          )],
          amplitude: 5,
          radius: '70%',
          center: ['40%', '60%'],
          backgroundStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.55,
              colorStops: [{
                offset: 0.5,
                color: 'rgba(5, 26, 25, 0.1)' // 0% 处的颜色
              }, {
                offset: 0.85,
                color: 'rgba(148, 255, 251, 0.2)' // 100% 处的颜色
              }, {
                offset: 0.95,
                color: 'rgba(148, 255, 251, 0.2)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          outline: {
            show: false
          },
          label: {
            normal: {
              formatter: ''
            }
          }
        }, {
          type: 'liquidFill',
          waveAnimation: 20,
          data: [redCounts, redCounts - 0.05],
          color: [new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(157, 1, 1, 1)'
              },
              {
                offset: 1,
                color: 'rgba(255, 78, 43, 1)'
              }
            ],
            false
          ), new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(157, 1, 1, 1)'
              },
              {
                offset: 1,
                color: 'rgba(255, 78, 43, 1)'
              }
            ],
            false
          )],
          amplitude: 5,
          radius: '70%',
          center: ['70%', '60%'],
          backgroundStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.55,
              colorStops: [{
                offset: 0.5,
                color: 'rgba(5, 26, 25, 0.1)' // 0% 处的颜色
              }, {
                offset: 0.85,
                color: 'rgba(148, 255, 251, 0.2)' // 100% 处的颜色
              }, {
                offset: 0.95,
                color: 'rgba(148, 255, 251, 0.2)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          outline: {
            show: false
          },
          label: {
            normal: {
              formatter: ''
            }
          }
        }]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
