<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
var path = 'path://M112 512a400 240 0 1 0 800 0 400 240 0 1 0-800 0Z'
export default {
  mixins: [resize],
  props: {
    workers: {
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
    workers: {
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
      var xData = this.workers.map(item => item.constructionName)
      var yData1 = this.workers.map(item => item.allNum)
      var yData2 = this.workers.map(item => item.inNum)
      this.option = {
        tooltip: {
          show: true
        },
        legend: { // 右边
          data: ['总人数', '在场人数'],
          icon: 'circle',
          right: '5%',
          selectedMode: false, // 取消点击
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          // itemGap: 40, // 设置间距
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        'grid': {
          'top': '25%',
          'left': '2%',
          'bottom': '10%',
          'right': '5%',
          'containLabel': true
        },
        animation: false,
        'xAxis': [{
          'type': 'category',
          'data': xData,
          'axisTick': {
            show: false,
            'alignWithLabel': true
          },
          'axisLine': {
            show: false,
            'lineStyle': {
              'color': '#82b0ec'
            }
          },
          axisLabel: {
            // x轴文字的配置
            show: true,
            interval: 0, // 使x轴文字显示全
            textStyle: {
              color: 'rgba(219, 225, 255, 1)'
            },
            formatter: function(params) {
              var newParamsName = ''; var paramsNameNumber = params.length; var provideNumber = 8
              // 一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''; var start = p * provideNumber
                  var end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          }
        }],
        'yAxis': [{
          show: true,
          'type': 'value',
          'axisLabel': {
            'textStyle': {
              'color': '#fff'
            },
            'formatter': '{value}'
          },
          'splitLine': {
            'lineStyle': {
              'color': '#0c2c5a'
            }
          },
          'axisLine': {
            'show': true
          }
        }],
        'series': [{
          name: '总人数',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [23, 7],
          symbolOffset: [-14, -5],
          symbolPosition: 'end',
          z: 12,
          color: '#68B4FF',
          data: yData1
        },
        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [23, 7],
          symbolOffset: [-14, 5],
          z: 12,
          color: '#68B4FF',
          data: yData1
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              opacity: 0.7
            }
          },
          barWidth: '23',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#3D83CD'
          },
          {
            offset: 1,
            color: '#0B3147'
          }
          ]),
          data: yData1
        },
        {
          name: '在场人数',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [23, 7],
          symbolOffset: [14, -5],
          symbolPosition: 'end',
          z: 12,
          color: '#FFCE69',
          data: yData2
        },

        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [23, 7],
          symbolOffset: [14, 5],
          color: '#FFCE69',
          z: 12,
          data: yData2
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              opacity: 0.7
            }
          },
          barWidth: '23',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#CC9F49'
          },
          {
            offset: 1,
            color: '#0B3147'
          }
          ]),
          data: yData2
        }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
