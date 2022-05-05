export default {
  data() {
    return {
      $_timer: null
    }
  },
  mounted() {
    this.setRem(23)
    this.fn = () => {
      this.$refs.FullScreen && this.$refs.FullScreen.full.isElementFullScreen() ? this.setRem(26) : this.setRem(23)
    }
    window.addEventListener('resize', this.fn)
  },
  destroyed() {
    window.removeEventListener('resize', this.fn)
    // this.destroyListener()
  },
  // deactivated() {
  //   this.destroyListener()
  // },
  methods: {
    destroyListener() {
      this.$_timer = null
    },
    setRem(size) {
      const baseSize = size
      const basePc = baseSize / 1920
      let vW = window.innerWidth
      const vH = window.innerHeight
      const dueH = (vW * 1080) / 1920
      if (vH < dueH) vW = (vH * 1920) / 1080
      const rem = vW * basePc
      document.documentElement.style.fontSize = rem + 'px'
    }
  }
}
