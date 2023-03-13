<template>
  <el-dialog
    custom-class="subscribe-modal"
    title="手持机升级"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
      <!-- swx -->
      <el-form-item label="上传文件：" prop="url">
        <my-upload ref="myUpload" :limit="'apk'" :title="'点击上传'" :action="'/user/uploadKeepName'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { upgrade } from '@/api/project/device'
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
        url: '',
        id: null
      },
      dataRule: {
        url: [
          { required: true, message: '上传文件不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(id) {
      this.dataForm.id = id || null
      this.visible = true
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          upgrade({ ...this.dataForm }).then((data) => {
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
  .subscribe-modal {
    width: 600px;
  }
</style>
