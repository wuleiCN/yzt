<template>
  <chart class="zhgd-box-chart" :auto-resize="true" :options="options" />
</template>

<script>
export default {
  props: {
    boxData: {
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
    boxData: {
      handler(newVal) {
        return newVal && this.getWorkTypeProportion(newVal)
      },
      deep: true
    }
  },
  methods: {
    getWorkTypeProportion(boxData) {
      boxData.value = boxData.value || 0
      boxData.max = boxData.max || 1000
      this.options = {
        backgroundColor: '#fff',
        title: {
          text: boxData.imgPath ? boxData.text : '',
          x: '10%',
          y: '2%',
          textStyle: {
            color: '#3C75C2',
            fontSize: '20'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['55%', '70%'],
            startAngle: 90,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: params => {
                  return `${boxData.imgPath ? '{top|}' : `{text|${boxData.text}}`}\n{bottom|${boxData.value}}{center|${boxData.unit}}`
                },
                rich: {
                  top: {
                    backgroundColor: { image: this.$http.staticUrl(boxData.imgPath) },
                    fontSize: 60,
                    color: '#3C75C2'
                  },
                  text: {
                    fontSize: 40,
                    color: '#3C75C2'
                  },
                  bottom: {
                    fontSize: !boxData.imgPath ? 30 : 18,
                    color: '#3C75C2',
                    padding: [0, 0, 12, 0]
                  },
                  center: {
                    fontSize: 14,
                    color: '#3C75C2',
                    padding: [0, 0, 12, 0]
                  }
                }
              }
            },
            emphasis: {
              label: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: boxData.value,
                name: '直接售彩',
                label: {
                  show: true
                },
                itemStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: boxData.startColor // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: boxData.endColor // 100% 处的颜色1
                      }
                    ]
                  },
                  emphasis: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: boxData.startColor // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: boxData.endColor // 100% 处的颜色1
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: boxData.max < boxData.value ? 0 : boxData.max - boxData.value,
                name: '间接售彩',
                itemStyle: {
                  color: '#EDF0F4',
                  emphasis: {
                    color: '#EDF0F4'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.zhgd-box-chart {
  width: 100%;
  height: 350px;
}
</style>
