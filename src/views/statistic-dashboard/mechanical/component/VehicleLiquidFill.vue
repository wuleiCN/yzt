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
    inOrOutNumb: {
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
    inOrOutNumb: {
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
        graphic: [{
          type: 'group',
          left: '20%',
          top: '35%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: '今日入场',
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '55%',
          top: '35%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: '在场车辆',
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '85%',
          top: '35%',
          children: [{
            type: 'text',
            style: {
              fill: '#fff',
              text: '今日出场',
              fontSize: 15
            }
          }]
        }, {
          type: 'group',
          left: '20%',
          top: '55%',
          children: [{
            type: 'text',
            style: {
              fill: '#FEE21D',
              text: (this.inOrOutNumb.intCarNumb || 0) + ' 辆',
              fontSize: '.7rem'
            }
          }]
        }, {
          type: 'group',
          left: '55%',
          top: '55%',
          children: [{
            type: 'text',
            style: {
              fill: '#24CAFD',
              text: (this.inOrOutNumb.intStateNumb || 0) + ' 辆',
              fontSize: '.7rem'
            }
          }]
        }, {
          type: 'group',
          left: '85%',
          top: '55%',
          children: [{
            type: 'text',
            style: {
              fill: '#29E8A8',
              text: (this.inOrOutNumb.outCarNumb || 0) + ' 辆',
              fontSize: '.7rem'
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
          center: ['10%', '50%'],
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
          center: ['45%', '50%'],
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
          center: ['75%', '50%'],
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
