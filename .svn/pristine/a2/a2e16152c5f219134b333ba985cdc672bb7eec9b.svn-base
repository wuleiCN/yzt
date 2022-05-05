<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
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
      const { value = 30, value1 = 100, name = '' } = this.workerInfo
      this.option = {
        tooltip: {
          show: false
        },
        graphic: [
          {
            type: 'text',
            left: '30%',
            top: '45%',
            style: {
              fontSize: '.7rem',
              fontFamily: 'Impact',
              fontWeight: '700',
              text: name,
              textAlign: 'left',
              fill: '#46EDE8'
            }
          }
        ],
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1,
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
          ),
          new echarts.graphic.LinearGradient(0, 0, 0, 1,
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
          )
        ], // 五个数据，五个颜色
        series: [
          {
            type: 'pie',
            radius: ['80%', '100%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            z: 10,
            itemStyle: {
              normal: {
                borderWidth: 5
                // borderColor: 'red'
              }
            },
            label: {
              show: false
            },
            data: [value, value === 0 ? 1 : value1 - value],
            labelLine: {
              show: false
            }
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>

