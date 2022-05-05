<template>
  <el-dialog
    custom-class="train-topic-upload"
    title="培训图片上传"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
      <el-form-item label="培训图片：" prop="lecturer">
        <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'imgUrl')" />
        <!-- <a target="_blank" style="color: #1890ff" :href="dataForm.imgUrl">{{ dataForm.imgUrl ? '查看附件' : '' }}</a> -->
        <img style="width:80%" :src="dataForm.imgUrl" alt="">
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveImg } from '@/api/project/train-topic'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      dataForm: {
        name: ''
      },
      dataRule: {}
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm = row
      this.visible = true
      this.$nextTick(async() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveImg({ ...this.dataForm }).then((data) => {
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
  .train-topic-upload {
    width: 710px;
  }
</style>
