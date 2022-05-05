<template>
  <el-dialog
    custom-class="import-modal"
    title="导入"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" label-width="100px">
      <el-form-item label="模板下载:">
        <a target="_blank" class="temp-name" :href="$http.staticUrl('/人员导入模板.xlsx')">人员导入模板</a>
      </el-form-item>
      <el-form-item label="导入模板:">
        <my-upload ref="myUpload" v-permit="'project_person_btn_import'" :is-show="true" :limit="'doc'" :title="'点击上传'" :action="'/workers/excelImport'" @getfileList="getFileData" />
      </el-form-item>
      <div v-if="dataForm.errorList.length">
        <el-form-item label="失败导入：">
          <el-table
            :data="dataForm.errorList"
            border
            stripe
            highlight-current-row
          >
            <el-table-column
              prop="empName"
              header-align="center"
              align="center"
              label="人员名称"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              label="身份证"
            />
            <el-table-column
              prop="msg"
              header-align="center"
              align="center"
              label="失败原因"
            />
          </el-table>
        </el-form-item>
        <el-form-item label="成功导入：">
          <span> {{ dataForm.successCount || 0 }} 条</span>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="成功导入：">
          <span> {{ dataForm.successCount || 0 }} 条</span>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      dataForm: {
        successCount: '',
        errorList: []
      },
      visible: false
    }
  },
  methods: {
    init(id, tempId) {
      this.visible = true
      this.$nextTick(() => {
        this.dataForm.errorList = []
        this.dataForm.successCount = 0
      })
    },
    // 导入
    getFileData(res) {
      this.$set(this.dataForm, 'successCount', res.result.successCount)
      this.$set(this.dataForm, 'errorList', res.result.errorList)
      this.$emit('refreshDataList')
    }
  }
}
</script>

<style lang="scss">
.import-modal {
  width: 1000px;
  .el-dialog__body {
    padding: 15px 10px 0;
  }
  .temp-name {
    color: #1890ff;
  }
}

</style>
