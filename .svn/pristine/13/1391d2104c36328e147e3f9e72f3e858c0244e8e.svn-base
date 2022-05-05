<template>
  <chart class="crane-chart" :auto-resize="true" :options="options" />
</template>

<script>
export default {
  props: {
    electData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      options: {}
    }
  },
  watch: {
    electData: {
      handler(newVal) {
        return newVal && this.getWorkTypeProportion(newVal)
      },
      deep: true
    }
  },
  methods: {
    getWorkTypeProportion(newVal) {
      const dataArr = newVal.arr
      const titleArr = newVal.titleArr
      this.options = {
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          data: titleArr,
          axisLabel: {
            textStyle: {
              color: '#000',
              fontWeight: 600,
              fontSize: 18
            },
            interval: 0 // 横轴信息全部显示
            // rotate: 30 // -30度角倾斜显示
          },
          axisLine: {
            lineStyle: {
              color: '#1449A1'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            minInterval: 1,
            axisLabel: {
              textStyle: {
                color: '#646AF3',
                fontSize: 18,
                fontWeight: 500
              },
              formatter: '{value}'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#0c2c5a'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#1449A1'
              }
            }
          }
        ],
        series: [
          {
            name: '销量',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = ['#00FFFF', '#7592E0', '#FFE18F', '#00FFFF']
                  return colorList[params.dataIndex]
                }
              }
            },
            barWidth: 20, // 柱图宽度
            data: dataArr,
            markLine: {
              symbol: 'none',
              label: {
                position: 'middle',
                formatter: '{b}'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.crane-chart {
  height: 21rem;
  width: 100%;
}
</style>
