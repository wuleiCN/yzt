<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
export default {
  mixins: [resize],
  props: {
    monthData: {
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
    monthData: {
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
      const man = [
        this.monthData.typeSix,
        this.monthData.typeOne,
        this.monthData.typeTwo,
        this.monthData.typeThree,
        this.monthData.typeFour,
        this.monthData.typeFive
      ]
      const indicator = [
        {
          name: '严重',
          max: Math.max.apply(null, man)
        },
        {
          name: '优秀',
          max: Math.max.apply(null, man)
        },
        {
          name: '良好',
          max: Math.max.apply(null, man)
        },
        {
          name: '轻度',
          max: Math.max.apply(null, man)
        },
        {
          name: '中度',
          max: Math.max.apply(null, man)
        },
        {
          name: '重度',
          max: Math.max.apply(null, man)
        }
      ]
      this.option = {
        // backgroundColor: '#0B0D13',
        // tooltip: {
        //   trigger: 'item'
        // },
        color: ['#068AC3', '#B2782C'],

        // legend: {
        //   icon: 'roundRect',
        //   // left: '47%',
        //   top: '90%',
        //   show: true,
        //   padding: [3, 5],
        //   // right: '50',
        //   y: '1',
        //   center: 0,
        //   itemWidth: 20,
        //   itemHeight: 10,
        //   itemGap: 26,
        //   z: 3,
        //   // orient: 'horizontal',
        //   data: ['男', '女'],
        //   textStyle: {
        //     fontSize: 12,
        //     color: '#F1F7FF'
        //   }
        // },
        radar: {
          center: ['50%', '50%'], // 外圆的位置
          radius: '65%',
          name: {
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 400
            }
          },
          // TODO:
          indicator: indicator,
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              // 分隔区域的样式设置。
              color: ['#00224A', '#00224A', '#00224A', '#00224A', '#00224A'] // 画布颜色 // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          },
          axisLine: {
            // 指向外圈文本的分隔线样式
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: ['#1781BA', '#1781BA'], // 分隔线颜色
              width: 1 // 分隔线线宽
            }
          }
        },
        series: [
          {
            type: 'radar',
            symbolSize: 5,
            data: [
              {
                // TODO:
                value: man,
                name: '男',
                areaStyle: {
                  normal: {
                    color: {
                      type: 'radial',
                      x: 0.5,
                      y: 0.5,
                      r: 0.5,
                      colorStops: [{
                        offset: 0, color: 'rgba(46,203,255, 0.14)' // 0% 处的颜色
                      },
                      {
                        offset: 0.15, color: 'rgba(46,203,255, 0.14)' // 100% 处的颜色
                      },
                      {
                        offset: 0.75, color: '#057FB3' // 100% 处的颜色
                      },
                      {
                        offset: 1, color: '#078DC6' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                },
                itemStyle: { // 折线拐点标志的样式。
                  normal: { // 普通状态时的样式
                    lineStyle: {
                      width: 1
                    },
                    opacity: 0.3
                  },
                  emphasis: { // 高亮时的样式
                    lineStyle: {
                      width: 5
                    },
                    opacity: 0
                  }
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

