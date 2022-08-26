<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../mixins/resize'
var colorList = [
  new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#1EDF96'
      },
      {
        offset: 1,
        color: '#18D895'
      }
    ],
    false
  ),
  new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#FFBA36'
      },
      {
        offset: 1,
        color: '#FFC961'
      }
    ],
    false
  ),
  new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#36B4FF'
      },
      {
        offset: 1,
        color: '#228CF9'
      }
    ],
    false
  ),
  new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#00E4EC'
      },
      {
        offset: 1,
        color: '#21F4ED'
      }
    ],
    false
  ),
  new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#EB6F49'
      },
      {
        offset: 1,
        color: '#FC7F59'
      }
    ],
    false
  )
]
export default {
  mixins: [resize],
  props: {
    catType: {
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
    catType: {
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
      this.option = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['40%', '70%'],
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            hoverAnimation: true,
            label: {
              show: true,
              formatter: function(params) {
                return (
                  '{name|' +
                  params.name +
                  '}'
                )
              }
            },
            labelLine: {
              normal: {
                length: 18,
                length2: 30,
                lineStyle: {
                  width: 2
                }
              }
            },
            data: [
              {
                name: '水平位移',
                value: 0,
                label: {
                  rich: {
                    name: {
                      align: 'center',
                      color: '#00D98B'
                    }
                  }
                }
              },
              {
                name: '立杆倾斜',
                value: 0,
                label: {
                  rich: {
                    name: {
                      align: 'center',
                      color: '#FDB628'
                    }
                  }
                }
              },
              {
                name: '地基沉降',
                value: 0,
                label: {
                  rich: {
                    name: {
                      align: 'center',
                      color: '#0091F1'
                    }
                  }
                }
              },
              {
                name: '立杆轴力',
                value: 0,
                label: {
                  rich: {
                    name: {
                      align: 'center',
                      color: '#00E4EC'
                    }
                  }
                }
              },
              {
                name: '模板沉降',
                value: 0,
                label: {
                  rich: {
                    name: {
                      align: 'center',
                      color: '#EB6F49'
                    }
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
