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
      const { laborCount, laborInCount, manageCount, manageInCount } = this.workerInfo
      this.option = {
        // backgroundColor: 'transparent',
        tooltip: {
          show: false
        },
        graphic: [
          {
            type: 'text',
            left: '16%',
            top: '36%',
            style: {
              fontSize: '1rem',
              fontFamily: 'Impact',
              fontWeight: '700',
              text: this.workerInfo.laborRate,
              textAlign: 'left',
              fill: '#46EDE8'
            }
          },
          {
            type: 'text',
            left: '66%',
            top: '36%',
            style: {
              fontSize: '1rem',
              fontFamily: 'Impact',
              fontWeight: '700',
              text: this.workerInfo.manageRate,
              textAlign: 'left',
              fill: '#46EDE8'
            }
          },
          {
            type: 'text',
            left: '10%',
            top: '90%',
            style: {
              fontSize: '.7rem',
              text: '劳务人员',
              textAlign: 'left',
              fill: '#fff'
            }
          },
          {
            type: 'text',
            left: '60%',
            top: '90%',
            style: {
              fontSize: '.7rem',
              text: '管理人员',
              textAlign: 'left',
              fill: '#fff'
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
            radius: ['65%', '80%'],
            center: ['20%', '40%'],
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
            data: [laborCount, laborCount === 0 ? 1 : laborInCount - laborCount],
            labelLine: {
              show: false
            }
          },
          {
            type: 'pie',
            radius: ['65%', '80%'],
            center: ['70%', '40%'],
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
            data: [manageCount, manageCount === 0 ? 1 : manageInCount - manageCount],
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

