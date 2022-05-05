<template>
  <div :id="id" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
import resize from '../../statistic-dashboard/mixins/resize'
export default {
  mixins: [resize],
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
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
      option: {}
    }
  },
  watch: {
    list: {
      handler(newVData) {
        return newVData.length && this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    this.chartDom = document.getElementById(this.id)
    this.myChart = echarts.init(this.chartDom)
    this.initChart()
  },
  methods: {
    initChart() {
      const list = this.list.map(item => {
        return [item.name, item.rkNums, item.ckNums, item.fxNums, item.bfNums]
      })
      this.option = {
        grid: {
          left: '3%',
          right: '5%',
          top: '20%',
          bottom: '5%'
        },
        legend: {
          orient: 'horizontal',
          icon: 'rect',
          show: true,
          left: 20,
          top: 25
        },
        color: ['#73DEB3', '#73A0FA', '#FFB761', '#ee6666'],
        tooltip: {},
        dataset: {
          source: [
            ['product', '入库', '出库', '返修', '报废'],
            ...list
          ]
        },
        xAxis: {
          type: 'category'

        },
        yAxis: {
          type: 'value',
          name: '数量（个）',
          axisLabel: {
            color: '#999',
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#F3F4F4'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
