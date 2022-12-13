<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'
import { getMataierStockView } from '@/api/material/meterialDatav'
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
    }
  },
  data() {
    return {
      chartDom: null,
      myChart: null,
      height_: '',
      date_: [],
      inCount: [1, 3, 6, 2, 7, 9, 2],
      outCount: [0, 4, 7, 4, 8, 11, 4],
      option: {},
      days: []
    }
  },
  mounted() {
    this.chartDom = document.getElementById(this.id)
    this.myChart = echarts.init(this.chartDom)
    this.mataierStockView()
  },
  methods: {
    mataierStockView() {
      getMataierStockView().then(res => {
        if (res.code === 1000 && res.result) {
          res.result.length && res.result.map(v => {
            this.date_.unshift(v[0].date)
            this.inCount.unshift(v[0].inCount)
            this.outCount.unshift(v[0].outCount)
          })
        }
        this.initChart()
      }).catch(() => {
        this.initChart()
      })
    },
    initChart() {
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          width: '90%',
          height: '55%',
          right: '2%',
          top: '10%'
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
                color: '#FFFFFF',
                align: 'right'
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
          },
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
                    color: 'rgba(87,174,255,.5)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(87,174,255,.1)'
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
              color: '#57AEFF',
              width: 2
            },
            data: this.outCount || []
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
