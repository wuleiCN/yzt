<template>
  <div class="full-screen-toggle" @click="toggleFullScreen()">
    <svg-icon :icon-class="status ? 'exit-full-screen' : 'full-screen'" />
    <span>{{ status ? '退出' : '全屏' }}</span>
  </div>
</template>
<script>
import fullScreen from '@/utils/fullScreen'
// eslint-disable-next-line new-cap
const full = new fullScreen(() => {
  console.log('不支持全屏')
})
export default {
  components: {},
  props: {
    className: {
      type: String,
      default: '.dashboard-full-screen'
    }
  },
  data() {
    return {
      full,
      status: false
    }
  },
  mounted() {
    // if (this.$route.query.status === 'true') {
    //   this.toggleFullScreen()
    // }
  },
  methods: {
    // 全屏 / 退出全屏
    toggleFullScreen() {
      this.status = !full.isElementFullScreen()
      if (full.isElementFullScreen()) {
        full.exitFullscreen()
      } else {
        // 必须加 dashboard-full-screen 类名
        full.Fullscreen(this.className)
      }
    }
  }
}
</script>
<style lang='scss'>
  .full-screen-toggle {
    width: 4rem;
    line-height: 2.9rem;
    font-size: .9rem;
    color: #0686D8;
    cursor: pointer;
    position: absolute;
    top: .6rem;
    right: .32rem;
  }
</style>
