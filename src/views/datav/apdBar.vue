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
      days: []
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
      var yData1, yData2, yData3
      if (this.workers.length) {
        this.days = this.workers.map(item => item.date)
        yData1 = this.workers.map(item => item.data[0].number)
        yData2 = this.workers.map(item => item.data[1].number)
        yData3 = this.workers.map(item => item.data[2].number)
      } else {
        this.getToWeek()
        yData1 = [0, 0, 0, 0, 0, 0, 0]
        yData2 = [0, 0, 0, 0, 0, 0, 0]
        yData3 = [0, 0, 0, 0, 0, 0, 0]
      }
      this.option = {
        tooltip: {
          show: true
        },
        'grid': {
          'top': '10%',
          'left': '2%',
          'bottom': '10%',
          'right': '5%',
          width: '90%',
          height: '91%',
          'containLabel': true
        },
        animation: false,
        'xAxis': [{
          'type': 'category',
          'data': this.days,
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
          name: '绿码',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [-21.5, -5],
          symbolPosition: 'end',
          z: 12,
          color: '#00ffff',
          data: yData1
        },
        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [-21.5, 5],
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
          name: '黄码',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [0, -5],
          symbolPosition: 'end',
          z: 12,
          color: '#FFCE69',
          data: yData2
        },

        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [0, 5],
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
        },
        {
          name: '红码',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [21.5, -5],
          symbolPosition: 'end',
          z: 12,
          color: '#b22222',
          data: yData3
        },

        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [18, 7],
          symbolOffset: [21.5, 5],
          color: '#dc143c',
          z: 12,
          data: yData3
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
            color: '#ff0000'
          },
          {
            offset: 1,
            color: '#0B3147'
          }
          ]),
          data: yData3
        }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    },
    getToWeek() {
      const addDate0 = time => {
        if (time.toString().length === 1) {
          time = '0' + time.toString()
        }
        return time
      }
      var date = new Date()
      for (let i = 0; i <= 24 * 6; i += 24) {
        const dateItem = new Date(date.getTime() - i * 60 * 60 * 1000)
        const y = dateItem.getFullYear()
        let m = dateItem.getMonth() + 1
        let d = dateItem.getDate()
        m = addDate0(m)
        d = addDate0(d)
        const valueItem = y + '-' + m + '-' + d
        this.days.push(valueItem)
      }
      return this.days
    }
  }
}
</script>
