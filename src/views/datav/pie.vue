<template>
  <chart class="pie-chart" :auto-resize="true" :options="options" />
</template>

<script>
import { getWorkTypeProportion } from '@/api/datav'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // id: this.$router.history.current.query.id,
      options: {}
    }
  },
  watch: {
    id: {
      handler(newVData) {
        return newVData && this.getWorkTypeProportion()
      },
      immediate: true
    }
  },
  // mounted() {
  //   this.getWorkTypeProportion()
  // },
  methods: {
    getWorkTypeProportion() {
      getWorkTypeProportion({ id: this.id }).then(data => {
        this.workTypeList = data.result || []
        this.workTypeList = this.workTypeList.map(item => {
          item.name = item.name + `: ${item.value}`
          return item
        })
        this.options = {
          color: [
            '#619DDB',
            '#E37B75',
            '#DEA537',
            '#00DA8A',
            '#ff9f7f',
            '#fb7293',
            '#e7bcf3',
            '#8378ea'
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} ({d}%)'
          },
          toolbox: {
            show: true
          },
          // legend: {
          //   orient: 'vertical',
          //   textStyle: {
          //     color: '#fff'
          //   },
          //   right: 5,
          //   top: 20,
          //   data: this.workTypeList.map(item => item.name)
          // },
          series: [
            {
              name: '工种',
              type: 'pie',
              roseType: 'radius',
              radius: ['20%', '80%'],
              data: this.workTypeList
            }
          ]
        }
      })
    }
  }
}
</script>
