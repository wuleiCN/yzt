import { debounce } from '@/utils'

export default {
  data() {
    return {
      $_resizeHandler: null
    }
  },
  mounted() {
    this.initListener()
  },
  beforeDestroy() {
    this.destroyListener()
  },
  deactivated() {
    this.destroyListener()
  },
  methods: {
    initListener() {
      setTimeout(() => {
        this.resize()
      }, 0)
      this.$_resizeHandler = debounce(() => {
        this.resize()
      }, 60)
      window.addEventListener('resize', this.$_resizeHandler)
    },
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null
    },
    resize() {
      const { myChart } = this
      myChart && myChart.resize()
    }
  }
}
