<template>
  <chart class="gyc-dashboard-bar" :auto-resize="true" :options="options" />
</template>

<script>
export default {
  props: {
    dustData: {
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
    dustData: {
      handler(newVal) {
        return newVal && this.getWorkTypeProportion(newVal)
      },
      deep: true
    }
  },
  methods: {
    getWorkTypeProportion(dustData) {
      const obj = {
        'AQI': dustData.aqi || 0,
        'PM2.5': dustData.pm25 || 0,
        'PM10': dustData.pm10 || 0,
        'TSP': dustData.tsp || 0
      }
      this.options = {
        // title: {
        //   text: obj[dustData.name],
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 16,
        //     fontWeight: '400'
        //   },
        //   itemGap: -10,
        //   left: 'center',
        //   top: 'center'
        // },
        // graphic: [{
        //     type: 'text',
        //     z: 100,
        //     left: 'center',
        //     top: '85%',
        //     style: {
        //         fill: '#fff',
        //         text: dustData.name
        //     }
        // }],
        angleAxis: {
          max: 100,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false
          }
        },
        polar: {
          center: ['10%', '90%'],
          radius: '160%'
        },
        series: [
          {
            type: 'bar',
            clockwise: true,
            startAngle: 190, // 起始角度
            data: [
              {
                value: obj[dustData.name],
                itemStyle: {
                  normal: {
                    color: dustData.color
                  }
                }
              }
            ],
            coordinateSystem: 'polar',
            barWidth: 13,
            z: 2
          },
          {
            type: 'bar',
            data: [
              {
                value: 100,
                itemStyle: {
                  color: '#24375C'
                }
              }
            ],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 13,
            barGap: '-100%',
            z: 1
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
  .gyc-dashboard-bar {
    width: 100%;
    height: 11rem;
  }
</style>
