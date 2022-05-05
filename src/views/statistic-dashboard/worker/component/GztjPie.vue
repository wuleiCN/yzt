<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
var colorList = ['#EB6F49', '#00D98B', '#FDB628', '#0091F1', '#00E4EC', '#8256E8']
export default {
  mixins: [resize],
  props: {
    typeList: {
      type: Array,
      default: () => {
        return []
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
    typeList: {
      handler(newVData) {
        return newVData.length && this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    this.chartDom = document.getElementById(this.id)
    this.myChart = echarts.init(this.chartDom)
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
          clockwise: true,
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
              return '{name|' + params.name + ' ' + '}{value|' + params.value + '}'
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
              length: 20,
              length2: 10,
              lineStyle: {
                width: 1
              }
            }
          },
          data: this.typeList
        }]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
