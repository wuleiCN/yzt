<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
var colorList = ['#FF802F', '#02FEFF']
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
        tooltip: {
          trigger: 'item'
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
              return '{name|' + params.name + '：' + '}{value|' + params.value + '}'
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
              length: 15,
              length2: 18,
              lineStyle: {
                width: 2
              }
            }
          },
          data: [{
            'name': '未培训人员',
            'value': this.workerInfo.untrainedCount
          }, {
            'name': '完成培训人员',
            'value': this.workerInfo.trainedCount
          }]
        }]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
