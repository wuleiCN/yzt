<template>
  <div>
    <script id="editor" type="text/plain" />
  </div>
</template>
<script>
export default {
  name: 'Ue',
  props: {
    value: {
      type: String,
      default: ''
    }, // 编辑器文字
    config: {
      type: Object,
      default: function() {
        return {}
      }
    } // 编辑器的配置参数
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = window.UE.getEditor('editor', this.config)
    this.editor.addListener('ready', () => {
      this.editor.setContent(this.value)
    })
  },
  destroyed() {
    this.editor.destroy()
  },
  methods: {
    getUEContent() {
      return this.editor.getContent()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
