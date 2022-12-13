<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'
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
      option: {},
      types: ['劳务人员', '管理人员', '监理人员']
    }
  },
  watch: {
    workers: {
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
    initChart(data) {
      var yData1, yData2
      if (this.workers.length) {
        yData1 = this.workers.map(v => v.dayCount)
        yData2 = this.workers.map(v => v.totalCount)
      }
      this.option = {
        tooltip: {
          show: true
        },
        legend: {
          data: ['实际出勤', '总人数'],
          left: '6%',
          itemStyle: {
            borderCap: 'butt'
          },
          textStyle: {
            color: '#FFFFFF'
          }
        },
        'grid': {
          'top': '20%',
          'left': '5%',
          // 'bottom': '1%',
          'right': '1%',
          width: '90%',
          height: '78%',
          'containLabel': true
        },
        animation: false,
        'xAxis': [{
          'type': 'category',
          'data': this.types,
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
              color: '#00EDFF',
              fontWeight: 600,
              fontSize: 24,
              padding: [10, 0, 0, 0]
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
          name: '实际出勤',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [-11, -5],
          symbolPosition: 'end',
          z: 12,
          color: '#00ffff',
          data: yData1
        },
        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [-11, 5],
          z: 12,
          color: '#7fffd4',
          data: yData1
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              opacity: 0.7
            }
          },
          barWidth: '18',
          color: new echarts.graphic.LinearGradient(0.1, 0.2, 0.3, 1, [{
            offset: 0,
            color: '#29E8A8'
          },
          {
            offset: 1,
            color: '#0B3147'
          }
          ]),
          data: yData1
        },
        {
          name: '总人数',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [11, -5],
          symbolPosition: 'end',
          z: 12,
          color: '#FFCE69',
          data: yData2
        },

        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [11, 5],
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
          barWidth: '18',
          color: new echarts.graphic.LinearGradient(0.1, 0.2, 0.3, 1, [{
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
