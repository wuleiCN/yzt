<template>
  <div>
    <!-- <button @click="send">发消息</button> -->
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: () => {
        return ''
      }
    },
    projectId: {
      type: String,
      default: () => {
        return ''
      }
    },
    uuid: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    const path = this.path
    return {
      timer: '',
      soketPath: this.$httpZhgd.socketUrl(path),
      socket: ''
    }
  },
  watch: {
    path: {
      handler(newVal, oldVal) {
        this.soketPath = this.$httpZhgd.socketUrl(newVal)
        return newVal && this.init(this.soketPath)
      }
    }
  },
  mounted() {
    // 初始化
    if (this.projectId) this.init(this.soketPath)
    window.addEventListener('beforeunload', e => {
      this.socket.close()
    })
  },
  beforeDestroy() {
    window.clearInterval(this.timer)
    if (this.socket) this.socket.close()
  },
  methods: {
    init(soketPath) {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        if (soketPath && this.projectId) {
          this.socket = new WebSocket(soketPath)
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket关闭信息
          this.socket.onclose = this.close
          // 监听socket消息
          this.socket.onmessage = this.getMessage
        } else {
          this.socket.close()
        }
      }
    },
    open() {
      console.log('socket连接成功:' + this.soketPath)
    },
    error() {
      console.log('连接错误')
    },
    getMessage(msg) {
      window.clearInterval(this.timer)
      const data = JSON.parse(msg.data)
      if (data.code === 1000 && this.uuid) {
        this.timer = setInterval(() => {
          this.socket.send(`"{\"code\": \"1000\", \"data\": \"${this.projectId}&${this.uuid}\"}"`)
        }, 5000)
      }
      if (data.code) this.$emit('reloadData', data.code, data.projectId, data.data)
    },
    send() {
      this.socket.send('你好')
    },
    close() {
      console.log('socket已经关闭:' + this.soketPath)
    }
  }
}
</script>
