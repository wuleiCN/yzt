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
            // this.inCount.push(v[0].inCount + 5)
            // this.outCount.push(v[0].outCount + 3)
          })
        }
        console.log(this.date_)
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
          width: '82%',
          height: '60%'
        },
        xAxis: [
          {
            data: this.date_ || [],
            boundaryGap: false
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
