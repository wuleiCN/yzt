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
    trendData: {
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
    trendData: {
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
      //       allNum: 6
      // constructionName: "测试分包单位参建0001"
      // inNum: 5
      var xData = this.trendData.map(item => item.name)
      var yData1 = this.trendData.map(item => item.value)
      this.option = {
        tooltip: {
          show: true
        },
        'grid': {
          'top': '5%',
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
              color: '#00EDFF'
            }
          }
        }],
        'yAxis': [{
          show: true,
          'type': 'value',
          'axisLabel': {
            'textStyle': {
              'color': '#2AA7D3'
            },
            'formatter': '{value}'
          },
          'splitLine': {
            'lineStyle': {
              'color': '#0c2c5a'
            }
          },
          'axisLine': {
            'show': false
          }
        }],
        'series': [{
          name: '总人数',
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [23, 7],
          symbolOffset: [0, -5],
          symbolPosition: 'end',
          z: 12,
          color: '#68B4FF',
          data: yData1
        },
        {
          type: 'pictorialBar',
          symbol: path,
          symbolSize: [23, 7],
          symbolOffset: [0, 5],
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
        }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
