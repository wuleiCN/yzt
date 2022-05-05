<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
var colorList = [new echarts.graphic.LinearGradient(
  0,
  0,
  0,
  1,
  [
    {
      offset: 0,
      color: '#00A8FF'
    },
    {
      offset: 1,
      color: '#8FDFFE'
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
      color: '#FAA500'
    },
    {
      offset: 1,
      color: '#FFC13F'
    }
  ],
  false
)]
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
      const { qualified = 0, notQualified = 0 } = this.workerInfo
      Math.fiexd
      this.option = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '噪音',
          x: 'center',
          y: '27%',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff'
          }
        },
        series: [{
          type: 'pie',
          center: ['50%', '30%'],
          radius: ['34%', '45%'],
          clockwise: false,
          itemStyle: {
            normal: {
              color: function(params) {
                return colorList[params.dataIndex]
              }
            }
          },
          hoverAnimation: false,
          label: {
            show: true,
            formatter: function(params) {
              const value = params.value === 0 ? 0 : ((params.value / (qualified + notQualified)) * 100).toFixed(2)
              return '{value|' + value + '%' + '}'
            },
            rich: {
              name: {
                fontWeight: 300,
                color: '#ffffff'
              },
              value: {
                fontWeight: 300,
                color: '#ffffff'
              }
            }
          },
          labelLine: {
            normal: {
              length: 0,
              length2: 0,
              lineStyle: {
                width: 2
              }
            }
          },
          data: [{
            'name': '',
            'value': notQualified || 0
          }, {
            'name': '',
            'value': qualified || 0
          }]
        }]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
