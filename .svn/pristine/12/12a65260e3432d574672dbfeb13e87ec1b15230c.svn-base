<template>
  <div class="product-statistics-page">
    <div>
      <productLine id="productLine" :list="weekData" height="400px" width="100%" />
    </div>
    <div>
      <productBar id="productBar1" :list="yearData" height="400px" width="100%" />
    </div>
  </div>
</template>
<script>
import productLine from './component/prodLine.vue'
import productBar from './component/prodBar.vue'
import { weekStatistics, yearStatistics } from '@/api/product'
export default {
  components: { productLine, productBar },
  data() {
    return {
      weekData: [],
      yearData: []
    }
  },
  mounted() {
    this.fetchWeek()
    this.fetchYear()
  },
  methods: {
    fetchWeek() {
      weekStatistics({}).then((data) => {
        if (data && data.code === 1000) {
          this.weekData = data.result
        }
      })
    },
    fetchYear() {
      yearStatistics({}).then((data) => {
        if (data && data.code === 1000) {
          this.yearData = data.result
        }
      })
    }
  }
}
</script>
<style lang='scss'>
.product-statistics-page {
  height: 85vh;
}
</style>
