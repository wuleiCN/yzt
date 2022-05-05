<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
var colorList = [
  new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#1EDF96'
      },
      {
        offset: 1,
        color: '#18D895'
      }
    ],
    false
  ),
  new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#FFBA36'
      },
      {
        offset: 1,
        color: '#FFC961'
      }
    ],
    false
  ),
  new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#36B4FF'
      },
      {
        offset: 1,
        color: '#228CF9'
      }
    ],
    false
  )
]
export default {
  mixins: [resize],
  props: {
    channelData: {
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
    channelData: {
      handler(newVData) {
        return newVData.length && this.initChart()
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
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['50%', '66%'],
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            hoverAnimation: true,
            label: {
              show: true,
              formatter: function(params) {
                return (
                  '{name|' +
                  params.name +
                  '\n' +
                  '}{value|' +
                  params.value + '' +
                  '}'
                )
              },
              rich: {
                name: {
                  fontWeight: 300,
                  fontSize: 16,
                  color: '#ffffff'
                },
                value: {
                  fontWeight: 300,
                  fontSize: 16,
                  color: '#ffffff'
                }
              }
            },
            labelLine: {
              normal: {
                length: 18,
                length2: 30,
                lineStyle: {
                  width: 2
                }
              }
            },
            data: this.channelData.map(item => {
              return {
                name: item.channelName,
                value: item.channelNumb
              }
            })
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
