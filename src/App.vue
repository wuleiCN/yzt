<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 实现项目管理->考勤设备->同步人员确定按钮点击三分钟之后才能操作
    this.$EventBus.$on('startTimeRun', (ct) => {
      window.clearInterval(this.timer)
      ct = JSON.parse(ct)
      this.startDownTime(ct)
    })
    const ct = sessionStorage.getItem('countDownTime') ? JSON.parse(sessionStorage.getItem('countDownTime')) : []
    // 监听浏览器是否关闭
    this.startDownTime(ct)
  },
  methods: {
    startDownTime(ct) {
      const newct = ct.map(item => {
        if (item.t > 0) {
          item.t--
        }
        return item
      })
      sessionStorage.setItem('countDownTime', JSON.stringify(newct))
      this.$EventBus.$emit('getCt', newct)
      this.timer = setInterval(() => {
        const newct = ct.map(item => {
          if (item.t > 0) {
            item.t--
          }
          return item
        })
        sessionStorage.setItem('countDownTime', JSON.stringify(newct))
        this.$EventBus.$emit('getCt', newct)
        if (newct.every((item) => item.t <= 0)) window.clearInterval(this.timer)
      }, 1000)
    }
  }
}
</script>
