<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../mixins/resize'
export default {
  mixins: [resize],
  props: {
    progressData: {
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
      default: ''
    },
    height: {
      type: String,
      default: ''
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
    progressData: {
      handler(newVData) {
        return Object.keys(newVData).length && this.initChart()
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
        // backgroundColor: 'transparent',
        tooltip: {
          show: false
        },
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '35%',
            style: {
              fontSize: '1rem',
              text: this.progressData.doneDays + '天',
              textAlign: 'center',
              fill: 'rgb(149,162,255)'
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '80%',
            style: {
              fontSize: '.6rem',
              text: '已施工',
              textAlign: 'center',
              fill: '#fff'
            }
          }
        ],
        color: ['#0275FE', '#24375C'], // 五个数据，五个颜色
        series: [
          {
            type: 'pie',
            radius: ['85%', '100%'],
            center: ['50%', '40%'],
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
            data: [this.progressData.doneDays, this.progressData.doneDays ? this.progressData.allDays - this.progressData.doneDays : 100],
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

