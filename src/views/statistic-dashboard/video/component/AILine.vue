<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'
export default {
  mixins: [resize],
  props: {
    trendData: {
      type: Array,
      default: () => []
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
      height_: '',
      date_: [],
      inCount: [],
      option: {}
    }
  },
  watch: {
    trendData: {
      handler(newVData) {
        return Object.keys(newVData).length && this.initChart(newVData)
      },
      deep: true
    }
  },
  mounted() {
    this.chartDom = document.getElementById(this.id)
    this.myChart = echarts.init(this.chartDom)
  },
  methods: {
    initChart(data) {
      if (this.trendData.length) {
        this.inCount = data.map(v => v.frequency).reverse()
        this.date_ = data.map(v => v.date).reverse()
      }
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          width: '80%',
          height: '65%',
          right: '10%',
          top: '25%'
        },
        xAxis: [
          {
            data: this.date_ || [],
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#FFFFFF'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: ['#5f9ea0']
              },
              show: true
            },
            axisLabel: {
              textStyle: {
                color: '#FFFFFF'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#29B9C8'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '入库数量',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(26,189,213,0.5)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(26,189,213,0.1)'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'top',
              color: '#00EDFF'
            },
            lineStyle: {
              color: '#57EEFF',
              width: 2
            },
            data: this.inCount || []
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
