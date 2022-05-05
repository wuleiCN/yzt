<template>
  <chart class="gyc-dashboard-pie" :auto-resize="true" :options="options" />
</template>

<script>
export default {
  props: {
    ageData: {
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
    ageData: {
      handler(newVal) {
        return newVal && this.renderAgeChart(newVal)
      },
      deep: true
    }
  },
  methods: {
    renderAgeChart(ageData) {
      const ageData1 = ageData.map(item => {
        item.itemStyle = {}
        return item
      })
      const newAgeData = ageData1.map(item => {
        if (item.name === '20岁以下') {
          item.itemStyle.color = 'rgba(22, 249, 194, 0.8)'
          item.itemStyle.borderColor = 'rgba(22, 249, 194, 1)'
          item.itemStyle.borderWidth = 2
        }
        if (item.name === '20-25岁') {
          item.itemStyle.color = 'rgba(221, 65, 246, 0.8)'
          item.itemStyle.borderColor = 'rgba(221, 65, 246, 1)'
          item.itemStyle.borderWidth = 2
        }
        if (item.name === '26-30岁') {
          item.itemStyle.color = 'rgba(71, 138, 248, 0.8)'
          item.itemStyle.borderColor = 'rgba(71, 138, 248, 1)'
          item.itemStyle.borderWidth = 2
        }
        if (item.name === '31-35岁') {
          item.itemStyle.color = 'rgba(64, 244, 83, 0.8)'
          item.itemStyle.borderColor = 'rgba(64, 244, 83, 1)'
          item.itemStyle.borderWidth = 2
        }
        if (item.name === '36-45岁') {
          item.itemStyle.color = 'rgba(236, 160, 14, 0.8)'
          item.itemStyle.borderColor = 'rgba(236, 160, 14, 1)'
          item.itemStyle.borderWidth = 2
        }
        if (item.name === '46岁以上') {
          item.itemStyle.color = 'rgba(250, 238, 4, 0.8)'
          item.itemStyle.borderColor = 'rgba(250, 238, 4, 1)'
          item.itemStyle.borderWidth = 2
        }
        return item
      })
      this.options = {
        backgroundColor: 'transparent',
        legend: {
          orient: 'vertical',
          top: 'bottom',
          right: '5%',
          data: newAgeData.map(item => item.name),
          textStyle: {
            color: '#fff'
            // fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '半径模式',
            type: 'pie',
            radius: ['30%', '80%'],
            center: ['40%', '50%'],
            roseType: 'radius',
            label: {
              show: true,
              normal: {
                position: 'outside',
                fontSize: 16
              }
            },
            labelLine: {
              length: 1,
              length2: 20,
              smooth: true
            },
            data: newAgeData
            // data: [{
            //         value: 1,
            //         name: 'rose1',
            //         itemStyle: {
            //             color: 'rgba(50,123,250,0.8)',
            //             borderColor: 'rgba(50,123,250,1)',
            //             borderWidth: 3
            //         }
            //     },
            //     {
            //         value: 2,
            //         name: 'rose2',
            //         itemStyle: {
            //             color: 'rgba(244,201,7,0.8)',
            //             borderColor: 'rgba(244,201,7,1)',
            //             borderWidth: 3
            //         }
            //     },
            //     {
            //         value: 3,
            //         name: 'rose3',
            //         itemStyle: {
            //             color: 'rgba(23,216,161,0.8)',
            //             borderColor: 'rgba(23,216,161,1)',
            //             borderWidth: 3
            //         }
            //     },
            //     {
            //         value: 4,
            //         name: 'rose4',
            //         itemStyle: {
            //             color: 'rgba(122,60,235,0.8)',
            //             borderColor: 'rgba(122,60,235,1)',
            //             borderWidth: 3
            //         }
            //     },
            //     {
            //         value: 5,
            //         name: 'rose5',
            //         itemStyle: {
            //             color: 'rgba(15,197,243,0.8)',
            //             borderColor: 'rgba(15,197,243,1)',
            //             borderWidth: 3
            //         }
            //     }
            // ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.gyc-dashboard-pie {
  width: 100%;
  height: 11rem;
}
</style>
