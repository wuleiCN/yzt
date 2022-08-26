<template>
  <div class="chart" :style="{ height: height, width: width }">
    <div id="meaterial" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'
import { getMataierStockView } from '@/api/material/meterialDatav'
export default {
  mixins: [resize],
  props: {
    workers: {
      type: Array,
      default: () => {
        return []
      }
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
      outCount: [],
      inCount: [],
      option: {},
      days: []
    }
  },
  mounted() {
    this.height_ = this.$parent.$refs.itemWarp.offsetHeight - this.$parent.$refs.titleWrap.offsetHeight
    const setEchartWH = {
      width: 1100,
      height: this.height_
    }
    this.chartDom = document.getElementById('meaterial')
    this.myChart = echarts.init(this.chartDom, null, setEchartWH)
    this.mataierStockView()
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      if (this.$parent.$refs.itemWarp) {
        var height = this.$parent.$refs.itemWarp.offsetHeight - this.$parent.$refs.titleWrap.offsetHeight
        this.myChart.resize({ height })
      }
    })
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
        tooltip: {},
        legend: {
          data: ['入库数量', '出库数量'],
          right: '10%',
          textStyle: {
            color: '#FFFFFF'
          }
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
              color: '#1ABDD5'
            },
            lineStyle: {
              width: 0
            },
            data: this.inCount || []
          },
          {
            name: '出库数量',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 0
            },
            areaStyle: {
              color: '#33F7AE'
            },
            data: this.outCount || []
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
      window.addEventListener('resize', () => {
        if (this.$parent.$refs.itemWarp) {
          var height = this.$parent.$refs.itemWarp.offsetHeight - this.$parent.$refs.titleWrap.offsetHeight
          this.myChart.resize({ height })
        }
      })
    }
  }
}
</script>
