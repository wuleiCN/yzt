<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'
// import { getMataierStockView } from '@/api/material/meterialDatav'
export default {
  mixins: [resize],
  props: {
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
    },
    initData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartDom: null,
      myChart: null,
      height_: '',
      date_: [],
      inCount: [0, 0, 0, 0, 0, 0, 0],
      option: {},
      days: []
    }
  },
  watch: {
    initData: {
      handler(newVData) {
        return newVData.length && this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    this.chartDom = document.getElementById(this.id)
    this.myChart = echarts.init(this.chartDom)
    this.mataierStockView()
  },
  methods: {
    mataierStockView() {
      // this.getToWeek()
      this.initChart()
    },
    initChart() {
      if (this.initData.length) {
        this.getToWeek()
        this.days.forEach((e, i) => {
          this.initData.forEach((v, s) => {
            if (e === v.date) {
              this.inCount.splice(i, 1, v.bfb)
            }
          })
        })
        console.log(this.initData, this.days)
      }
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['占比例%'],
          right: '10%',
          itemStyle: {
            borderCap: 'butt'
          },
          textStyle: {
            color: '#FFFFFF'
          }
        },
        grid: {
          width: '80%',
          height: '60%',
          right: '8%',
          top: '15%'
        },
        xAxis: [
          {
            data: this.days || [],
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
            name: '占比例%',
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
    },
    getToWeek() {
      const addDate0 = time => {
        if (time.toString().length === 1) {
          time = '0' + time.toString()
        }
        return time
      }
      var date = new Date()
      for (let i = 0; i <= 24 * 6; i += 24) {
        const dateItem = new Date(date.getTime() - i * 60 * 60 * 1000)
        const y = dateItem.getFullYear()
        let m = dateItem.getMonth() + 1
        let d = dateItem.getDate()
        m = addDate0(m)
        d = addDate0(d)
        const valueItem = y + '-' + m + '-' + d
        this.days.unshift(valueItem)
      }
      return this.days
    }
  }
}
</script>
