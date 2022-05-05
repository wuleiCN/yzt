<template>
  <el-dialog
    custom-class="salary-plan-temp-modal"
    title="薪资格式预览"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <div class="content" v-html="content" />
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      content: ''
    }
  },
  methods: {
    // 打开弹窗
    init(content) {
      this.visible = true
      this.content = content
      this.$nextTick(() => {})
    }
  }
}
</script>
<style lang="scss">
  .salary-plan-temp-modal {
    min-width: 1250px;
    text-align: center;
    position: relative;
    min-height: 400px;
    .content {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
  }
</style>
