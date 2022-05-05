<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../statistic-dashboard/mixins/resize'
export default {
  mixins: [resize],
  props: {
    videoData: {
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
    videoData: {
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
      let { videoTotal = 0, onLineTotal = 0 } = this.videoData
      videoTotal = videoTotal ? 220 / videoTotal : 0
      onLineTotal = 220 - videoTotal
      this.option = {
        graphic: [
          {
            type: 'group',
            left: 'center',
            top: '50%',
            children: [
              {
                type: 'text',
                z: 100,
                left: 'center',
                top: 'top',
                style: {
                  fill: '#FFFFFF',
                  fontSize: '.7rem',
                  text: this.videoData.videoPercentage + '%'
                }
              }
            ]
          }
        ],
        series: [
          {
            type: 'pie',
            label: {
              show: false
            },
            hoverAnimation: false,
            center: ['50%', '50%'],
            radius: ['45%', '70%'],
            startAngle: 200,
            data: [
              {
                value: videoTotal,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#0efcff'
                  },
                  {
                    offset: 1,
                    color: '#2783cd'
                  }
                  ], false)
                }
              },
              {
                value: onLineTotal,
                itemStyle: {
                  color: '#343E61'
                }
              },
              {
                name: 'bottom',
                value: 140,
                itemStyle: {
                  color: 'transparent'
                }
              }
            ]
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>

