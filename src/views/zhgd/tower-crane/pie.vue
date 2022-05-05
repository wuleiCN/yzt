<template>
  <chart class="crane-chart" :auto-resize="true" :options="options" />
</template>

<script>
export default {
  props: {
    craneData: {
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
    craneData: {
      handler(newVal) {
        return newVal && this.getWorkTypeProportion(newVal)
      },
      deep: true
    }
  },
  methods: {
    getWorkTypeProportion(craneData) {
      craneData.value = craneData.value || 0
      craneData.max = craneData.max || 1000
      this.options = {
        backgroundColor: '#fff',
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
                  return `${craneData.imgPath ? '{top|}' : `{text|${craneData.text}}`}\n{bottom|${craneData.value}}{center|${craneData.unit}}`
                },
                rich: {
                  top: {
                    backgroundColor: { image: this.$http.staticUrl(craneData.imgPath) },
                    fontSize: 60,
                    color: '#3C75C2'
                  },
                  text: {
                    fontSize: 20,
                    color: '#3C75C2'
                  },
                  bottom: {
                    fontSize: !craneData.imgPath ? 30 : 18,
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
                value: craneData.value,
                name: '直接售彩',
                label: {
                  show: true
                },
                itemStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: craneData.startColor // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: craneData.endColor // 100% 处的颜色1
                      }
                    ]
                  },
                  emphasis: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: craneData.startColor // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: craneData.endColor // 100% 处的颜色1
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: craneData.max < craneData.value ? 0 : craneData.max - craneData.value,
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
.crane-chart {
  width: 100%;
  height: 22rem;
}
</style>
