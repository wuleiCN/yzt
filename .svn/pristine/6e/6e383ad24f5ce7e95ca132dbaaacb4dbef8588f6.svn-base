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
  },
  methods: {
    initChart() {
      this.option = {
        backgroundColor: '#fff',
        title: {
          text: '数量（个）',
          left: '18px',
          top: '0',
          textStyle: {
            color: '#999',
            fontSize: 12,
            fontWeight: '400'
          }
        },
        color: ['#73DEB3', '#73A0FA', '#FFB761', '#ee6666'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            },
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        grid: {
          left: '25',
          right: '25',
          bottom: '24',
          top: '75',
          containLabel: true
        },
        legend: {
          data: ['入库', '出库', '返修', '报废'],
          orient: 'horizontal',
          icon: 'rect',
          show: true,
          left: 20,
          top: 25
        },
        xAxis: {
          type: 'category',
          data: this.list.map(item => item.name),
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // max: max_value>=100? max_value + 100: max_value+10,
          // max: max_value > 100 ? max_value * 2 : max_value + 10,
          // interval: 10,
          // nameLocation: "center",
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
        series: [{
          name: '入库',
          type: 'line',
          smooth: true,
          data: this.list.map(item => item.rkNums)
        },
        {
          name: '出库',
          type: 'line',
          smooth: true,
          data: this.list.map(item => item.ckNums)
        },
        {
          name: '返修',
          type: 'line',
          smooth: true,
          data: this.list.map(item => item.fxNums)
        }, {
          name: '报废',
          type: 'line',
          smooth: true,
          data: this.list.map(item => item.bfNums)
        }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
