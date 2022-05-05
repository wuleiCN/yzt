<template>
  <el-dialog
    custom-class="version-modal"
    :title="!dataForm.id ? '新增版本' : '修改版本'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="closeHandle"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="版本号：" prop="version">
        <el-input v-model.trim="dataForm.version" placeholder="版本号" />
      </el-form-item>
      <el-form-item label="更新内容：" prop="content">
        <el-input v-model.trim="dataForm.content" placeholder="更新内容" />
      </el-form-item>
      <el-form-item label="下载地址：" prop="downloadUrl">
        <el-input v-model.trim="dataForm.downloadUrl" :disabled="true" placeholder="下载地址" />
      </el-form-item>
      <el-form-item label="是否可以更新：" prop="isUpdate">
        <el-radio-group v-model="dataForm.isUpdate" style="width:100%">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否全局更新：" prop="xxxx">
        <el-radio-group v-model="dataForm.xxxx" style="width:100%">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传文件：" prop="downloadUrl">
        <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'apk'" :action="'/version/uploadFileApp'" @getfileList="(fileList) => getFileData(fileList, 'downloadUrl')" />
      </el-form-item>
      <el-form-item label="设备类型：" prop="deviceType">
        <el-radio-group v-model="dataForm.deviceType" style="width:100%">
          <el-radio :label="1">Android</el-radio>
          <el-radio :label="2">IOS</el-radio>
          <el-radio :label="3">小智</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/sys/version'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      types: [],
      dataForm: {
        id: null,
        version: '',
        content: '',
        downloadUrl: '',
        isUpdate: 1,
        xxxx: 1,
        deviceType: 1
      },
      dataRule: {
        version: [
          { required: true, message: '版本号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeHandle() {
      this.$refs.myUpload.$children[0].clearFiles()
    },
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
        }
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveOrUpdate({ ...this.dataForm }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .version-modal {
    width: 600px;
  }
</style>
