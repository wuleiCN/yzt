<template>
  <chart class="box-chart" :auto-resize="true" :options="options" />
</template>

<script>
import { graphic } from 'echarts/lib/export/api'
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
      id: this.$router.history.current.query.id,
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
      const dataArr = [newVal.awarm, newVal.bwarm, newVal.cwarm, newVal.nwarm]
      this.options = {
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          data: ['A线路', 'B线路', 'C线路', 'N线路'],
          axisLabel: {
            interval: 0, // 横轴信息全部显示
            rotate: 30 // -30度角倾斜显示
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#82b0ec'
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
              show: false
            }
          }
        ],
        series: [
          {
            name: '销量',
            type: 'bar',
            itemStyle: {
              normal: {
                // 定制显示（按顺序）
                borderColor: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#156dff'
                  },
                  {
                    offset: 1,
                    color: '#00eaeb'
                  }
                ]),
                color: function(params) {
                  var colorList = ['#00536F', '#263B6F', '#4D4748', '#004E68']
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
              // data: [
              //   {
              //     name: '报警线',
              //     yAxis: 30, // res.targetTwo,
              //     lineStyle: {
              //       color: '#ef0508'
              //     }
              //   },
              //   {
              //     name: '预警线',
              //     yAxis: 20, // res.targetTwo,
              //     lineStyle: {
              //       color: '#8129a4'
              //     }
              //   }
              // ]
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.box-chart {
  height: 13rem;
  width: 20.5rem;
  position: absolute;
  top: 7rem;
}
</style>
