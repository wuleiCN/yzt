<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
import 'echarts-liquidfill'
export default {
  mixins: [resize],
  props: {
    recordData: {
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
    recordData: {
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
        'grid': {
          'top': '15%',
          'left': '12%',
          'bottom': '25%',
          'right': '35%'
        },
        graphic: [{
          type: 'group',
          left: '15%',
          top: '1%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: `今日累计用${this.recordData.type === 'water' ? '水' : '电'}`,
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '46%',
          top: '1%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: `本月累计用${this.recordData.type === 'water' ? '水' : '电'}`,
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '75%',
          top: '1%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: `今年累计用${this.recordData.type === 'water' ? '水' : '电'}`,
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '15%',
          top: '25%',
          children: [{
            type: 'text',
            style: {
              fill: '#FEE21D',
              text: (this.recordData.dayCompare.mwo || 0),
              fontSize: 20
            }
          }]
        }, {
          type: 'group',
          left: '46%',
          top: '25%',
          children: [{
            type: 'text',
            style: {
              fill: '#29E8A8',
              text: (this.recordData.monCompare.MonMwo || 0),
              fontSize: 20
            }
          }]
        }, {
          type: 'group',
          left: '75%',
          top: '25%',
          children: [{
            type: 'text',
            style: {
              fill: '#29E8A8',
              text: (this.recordData.yearCompare.YearMwo || 0),
              fontSize: 20
            }
          }]
        }, {
          type: 'group',
          left: '15%',
          top: '55%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: 'kWh',
              fontSize: 12
            }
          }]
        }, {
          type: 'group',
          left: '46%',
          top: '55%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: 'kWh',
              fontSize: 12
            }
          }]
        }, {
          type: 'group',
          left: '75%',
          top: '55%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: 'kWh',
              fontSize: 12
            }
          }]
        }],
        series: [{
          type: 'liquidFill',
          waveAnimation: 20,
          data: [0.65, 0.6],
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
          center: ['7%', '35%'],
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
          data: [0.65, 0.6],
          color: [new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(43, 218, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgba(7, 143, 247, 1)'
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
                color: 'rgba(43, 218, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgba(7, 143, 247, 1)'
              }
            ],
            false
          )],
          amplitude: 10,
          radius: '70%',
          center: ['37%', '35%'],
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
          data: [0.65, 0.6],
          color: [new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(45, 240, 159, 1)'
              },
              {
                offset: 1,
                color: 'rgba(14, 177, 229, 1)'
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
                color: 'rgba(45, 240, 159, 1)'
              },
              {
                offset: 1,
                color: 'rgba(14, 177, 229, 1)'
              }
            ],
            false
          )],
          amplitude: 10,
          radius: '70%',
          center: ['67%', '35%'],
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
