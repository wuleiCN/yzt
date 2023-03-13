<template>
  <chart class="energy-chart" :auto-resize="true" :options="options" />
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      options: {}
    }
  },
  watch: {
    chartData: {
      handler(newVal) {
        return newVal && this.getWorkTypeProportion(newVal)
      },
      deep: true
    }
  },
  created() {
    this.getWorkTypeProportion(this.chartData)
  },
  methods: {
    getWorkTypeProportion(newVal) {
      var data1 = newVal.map(item => item.mwo)
      this.options = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: newVal.map(item => item.time),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '40%',
            data: data1
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.energy-chart {
  width: 100%;
  height: 400px;
}
</style>
