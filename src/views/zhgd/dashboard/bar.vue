<template>
  <chart class="pie-chart" :auto-resize="true" :options="options" />
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
        title: {
          text: obj[dustData.name],
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '400'
          },
          itemGap: -10,
          left: 'center',
          top: 'center'
        },
        graphic: [{
          type: 'text',
          z: 100,
          left: 'center',
          top: '85%',
          style: {
            fill: '#fff',
            text: dustData.name
          }
        }],
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
          center: ['50%', '50%'],
          radius: '100%'
        },
        series: [
          {
            type: 'bar',
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
            barWidth: 7,
            z: 2
          },
          {
            type: 'bar',
            data: [
              {
                value: 100,
                itemStyle: {
                  color: '#344060'
                }
              }
            ],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 8,
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
  .pie-chart {
    width: 4.8rem;
    height: 4.8rem;
  }
</style>
