<template>
  <chart class="env-chart" :auto-resize="true" :options="options" />
</template>

<script>
export default {
  props: {
    envData: {
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
    envData: {
      handler(newVal) {
        return newVal && this.getWorkTypeProportion(newVal)
      },
      deep: true
    }
  },
  methods: {
    getWorkTypeProportion(envData) {
      envData.value = envData.value || 0
      envData.max = envData.max || 1000
      this.options = {
        backgroundColor: '#fff',
        title: {
          text: envData.imgPath ? envData.text : '',
          x: 'left',
          y: '10%',
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
                  return `${envData.imgPath ? '{top|}' : `{text|${envData.text}}`}\n{bottom|${envData.value}}{center|${envData.unit}}`
                },
                rich: {
                  top: {
                    backgroundColor: { image: this.$http.staticUrl(envData.imgPath) },
                    fontSize: 60,
                    color: '#3C75C2'
                  },
                  text: {
                    fontSize: 40,
                    color: '#3C75C2'
                  },
                  bottom: {
                    fontSize: !envData.imgPath ? 30 : 18,
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
                value: envData.value,
                name: '直接售彩',
                label: {
                  show: true
                },
                itemStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: envData.startColor // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: envData.endColor // 100% 处的颜色1
                      }
                    ]
                  },
                  emphasis: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: envData.startColor // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: envData.endColor // 100% 处的颜色1
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: envData.max < envData.value ? 0 : envData.max - envData.value,
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
.env-chart {
  width: 100%;
  height: 22rem;
}
</style>
