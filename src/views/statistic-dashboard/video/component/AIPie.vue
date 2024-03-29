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
        color: '#2AF8FF'
      },
      {
        offset: 1,
        color: '#4BF8FF'
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
        color: '#28EF74'
      },
      {
        offset: 1,
        color: '#49fF76'
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
        color: '#DE8D2F'
      },
      {
        offset: 1,
        color: '#EF8E4F'
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
        color: '#FFF32A'
      },
      {
        offset: 1,
        color: '#FFF64B'
      }
    ],
    false
  )
]
export default {
  mixins: [resize],
  props: {
    catType: {
      type: Array,
      default: () => {
        return []
      }
    },
    alarm: {
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
      count: 0,
      option: {},
      data: []
    }
  },
  watch: {
    catType: {
      handler(newVData) {
        return this.initChart(newVData)
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
      if (this.catType.length && this.alarm.length) {
        this.data = []
        this.count = 0
        this.catType.forEach(v => {
          this.count += v.frequency
          this.data.push({
            value: v.frequency,
            // eslint-disable-next-line eqeqeq
            name: this.alarm.find(e => e.type === v.type).name
          })
        })
      } else {
        this.data = []
        this.count = 0
      }
      this.option = {
        title: {
          text: this.count + '/次', // join('\n')作用是换行居中
          left: '19%',
          y: 'center',
          textAlign: 'center',
          // 可以设置显示的样式
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 18
          },
          show: true
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: '15%',
          y: 'center',
          icon: 'circle',
          formatter: (name) => {
            let total = 0
            let target
            for (let i = 0; i < this.data.length; i++) {
              total += this.data[i].value
              if (this.data[i].name === name) {
                target = this.data[i].value
              }
            }
            var arr = [
              '{a|' + name + '}',
              '{b|' + (((target / total) * 100).toFixed(2) || 0) + '%}',
              '{c|' + (target || 0) + '次' + '}'
            ]
            return arr.join('')
          },
          textStyle: {
            padding: [8, 0, 0, 0],
            color: '#2AF8FF',
            rich: {
              a: {
                fontSize: 15,
                width: 110
              },
              b: {
                fontSize: 15,
                width: 70
              },
              c: {
                fontSize: 15
              }
            }
          }
        },
        series: [
          {
            name: 'AI',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            zlevel: 1,
            grid: {
              width: '100%',
              height: '100%'
            },
            center: ['20%', '50%'],
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            label: {
              show: false,
              position: 'center',
              color: '#fff',
              formatter: function(params) {
                return (
                  '{value|' +
                  params.value +
                  '}{count|' +
                  '次' +
                  '}'
                )
              },
              textStyle: {
                fontSize: '0'
              },
              rich: {
                value: {
                  fontWeight: 600,
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#fff'
                },
                count: {
                  fontWeight: 300,
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#fff'
                }
              }
            },
            emphasis: {
              formatter: params => {
                return (
                  '{value|' +
                  params.value +
                  '}{count|' +
                  '次' +
                  '}'
                )
              },
              label: {
                show: true,
                fontSize: '10',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.data
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
      this.myChart.on('mouseover', { seriesName: 'AI' }, params => {
        this.myChart.setOption({
          title: {
            show: false
          }
        })
      })
      this.myChart.on('highlight', { seriesName: 'AI' }, params => {
        this.myChart.setOption({
          title: {
            show: false
          }
        })
      })
      this.myChart.on('downplay', { seriesName: 'AI' }, params => {
        this.myChart.setOption({
          title: {
            show: true
          }
        })
      })
      this.myChart.on('mouseout', { seriesName: 'AI' }, params => {
        this.myChart.setOption({
          title: {
            show: true
          }
        })
      })
    }
  }
}
</script>
