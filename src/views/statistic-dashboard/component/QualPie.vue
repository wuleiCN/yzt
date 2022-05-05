<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../mixins/resize'
export default {
  mixins: [resize],
  props: {
    projectInfo: {
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
    projectInfo: {
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
      let { safetyFinishCount = 0, safetyImprovingCount = 0, qualityFinishCount = 0, qualityImprovingCount = 0 } = this.projectInfo
      safetyFinishCount = safetyFinishCount ? 220 / (safetyFinishCount + safetyImprovingCount) * safetyFinishCount : 220
      safetyImprovingCount = 220 - safetyFinishCount
      qualityFinishCount = qualityFinishCount ? 220 / (qualityFinishCount + qualityImprovingCount) * qualityFinishCount : 220
      qualityImprovingCount = 220 - qualityFinishCount
      this.option = {
        legend: [
          {
            align: 'left',
            orient: 'vertical',
            left: '12%',
            bottom: '10%',
            type: 'plain',
            textStyle: {
              color: '#fff',
              fontSize: '.7rem'
            },
            icon: 'circle',
            data: [
              {
                name: '已整顿: ' + this.projectInfo.qualityFinishCount
              },
              {
                name: '整顿中: ' + this.projectInfo.qualityImprovingCount
              }
            ]
          },
          {
            align: 'left',
            orient: 'vertical',
            left: '62%',
            bottom: '10%',
            type: 'plain',
            textStyle: {
              color: '#fff',
              fontSize: '.7rem'
            },
            icon: 'circle',
            // itemGap: 20,
            // itemWidth: 18,
            data: [
              {
                name: '已整顿: ' + this.projectInfo.safetyFinishCount
              },
              {
                name: '整顿中: ' + this.projectInfo.safetyImprovingCount
              }
            ]
          }
        ],
        graphic: [
          {
            type: 'group',
            left: '15%',
            top: '40%',
            children: [
              {
                type: 'text',
                z: 100,
                left: 'center',
                top: 'top',
                style: {
                  fill: '#FFFFFF',
                  fontSize: '.7rem',
                  text: '质量整改率'
                }
              }
            ]
          },
          {
            type: 'group',
            left: '20%',
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
                  text: this.projectInfo.qualityRate
                }
              }
            ]
          },
          {
            type: 'group',
            left: '65%',
            top: '40%',
            children: [
              {
                type: 'text',
                z: 100,
                left: 'center',
                top: 'top',
                style: {
                  fill: '#FFFFFF',
                  fontSize: '.7rem',
                  text: '安全整改率'
                }
              }
            ]
          },
          {
            type: 'group',
            left: '70%',
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
                  text: this.projectInfo.safetyRate
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
            center: ['25%', '50%'],
            radius: ['45%', '70%'],
            startAngle: 200,
            data: [
              {
                name: '已整顿: ' + this.projectInfo.qualityFinishCount,
                value: qualityFinishCount,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#2783CD'
                  },
                  {
                    offset: 1,
                    color: '#0EFCFF'
                  }
                  ], false)
                }
              },
              {
                name: '整顿中: ' + this.projectInfo.qualityImprovingCount, // 实际显示部分是总量-用量
                value: qualityImprovingCount,
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
          },
          {
            type: 'pie',
            label: {
              show: false
            },
            hoverAnimation: false,
            center: ['75%', '50%'],
            radius: ['45%', '70%'],
            startAngle: 200,
            data: [
              {
                name: '已整顿: ' + this.projectInfo.safetyFinishCount,
                value: safetyFinishCount,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#CD56CC'
                  },
                  {
                    offset: 1,
                    color: '#FFAEE7'
                  }
                  ], false)
                }
              },
              {
                name: '整顿中: ' + this.projectInfo.safetyImprovingCount, // 实际显示部分是总量-用量
                value: safetyImprovingCount,
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
