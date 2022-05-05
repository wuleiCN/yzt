<template>
  <el-dialog
    custom-class="contract-print-modal"
    title="打印预览"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <div style="overflow: auto;height: 700px;" v-html="content" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handlePrint(content)">打 印</el-button>
    </span>

  </el-dialog>
</template>

<script>
import { tempPrint } from '@/api/project/person'
import { myPrint } from '@/utils/index'
export default {
  data() {
    return {
      myPrint,
      content: '',
      visible: false
    }
  },
  methods: {
    init(id, tempId) {
      this.visible = true
      this.$nextTick(() => {
        // 项目打印
        tempPrint({ id, tempId }).then((data) => {
          // myPrint(data.result)
          this.content = data.result
          if (this.content) this.content = this.content.replace(/http:\/\//g, this.$http.baseUrl(`/user/getImg?orgUrl=http://`))
        })
      })
    },
    handlePrint(content) {
      this.myPrint(content)
    }
  }
}
</script>

<style lang="scss">
.contract-print-modal {
  width: 70%;
  .el-dialog__body {
    padding: 15px 10px 0;
  }
  table, td, th {
    border-collapse: collapse;
      border:1px solid #000;
  }
}

</style>
