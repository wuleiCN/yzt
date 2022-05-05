<template>
  <chart class="line-chart" :auto-resize="true" :options="options" />
</template>

<script>
import { getWeekAttendance } from '@/api/datav'
import { parseTime, multiply } from '@/utils/index'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      multiply,
      // id: this.$router.history.current.query.id,
      options: {}
    }
  },
  watch: {
    id: {
      handler(newVData) {
        return newVData && this.getWeekAttendance()
      },
      immediate: true
    }
  },
  // mounted() {
  //   this.getWeekAttendance()
  // },
  methods: {
    getWeekAttendance() {
      getWeekAttendance({ id: this.id }).then(data => {
        this.workTypeList = data.result || []

        this.options = {
          backgroundColor: '',
          title: {
            text: '',
            left: '18px',
            top: '0',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontWeight: '400'
            }
          },
          color: ['#E0525E', '#0BEB7B'],
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              let allHtml = `${params[0].axisValue}`
              params.map((item, index) => {
                allHtml += `<div>
              <span class="showIcon" style="display:inline-block;width:10px;height:10px;border-radius:10px;background:${item.color}"></span>
              ${item.seriesName + ': ' + item.value + '%'}
            </div>`
              })
              return allHtml
            },
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#fff'
              },
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          xAxis: {
            type: 'category',
            data: this.workTypeList.map(item => {
              item.days = item.days ? parseTime(item.days, '{m}-{d}') : ''
              return item.days
            }),
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ffffff', // X轴文字颜色
                fontSize: 12
              }
            },
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
            max: '100',
            min: '0',
            axisLabel: {
              color: '#fff',
              textStyle: {
                fontSize: 12
              },
              formatter: function(value, index) {
                const texts = []
                if (value === 0) {
                  texts.push('0%')
                } else if (value === 20) {
                  texts.push('20%')
                } else if (value === 40) {
                  texts.push('40%')
                } else if (value === 60) {
                  texts.push('60%')
                } else if (value === 80) {
                  texts.push('80%')
                } else if (value === 100) {
                  texts.push('100%')
                }
                return texts
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#2C366B'
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
            {
              name: '工人出勤率',
              type: 'line',
              smooth: true,
              data: this.workTypeList.map(item => this.multiply(item.labor, 100))
            },
            {
              name: '管理出勤率',
              type: 'line',
              smooth: true,
              data: this.workTypeList.map(item => this.multiply(item.management, 100))
            }
          ]
        }
      })
    }
  }
}
</script>
