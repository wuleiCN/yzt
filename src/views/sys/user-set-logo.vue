<template>
  <el-dialog
    custom-class="user-set-logo"
    title="设置logo"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="135px">
      <el-form-item label="是否开启：" prop="isOpen">
        <el-radio-group v-model.trim="dataForm.isOpen" style="width:100%">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0"> 否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="logo：" prop="customLogo">
        <my-upload ref="myUpload" :title="'点击上传'" :is-show="true" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'customLogo')" />
        <a target="_blank" style="color: #1890ff" :href="dataForm.customLogo">{{ dataForm.customLogo ? '查看logo' : '' }}</a>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { setLogoSaveOrUpdate, logoDetail } from '@/api/sys/user'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      dataForm: {
        customLogo: '',
        isOpen: 1
      },
      id: '',
      dataRule: {
        customLogo: [
          { required: true, message: '请上传logo', trigger: 'blur' }
        ],
        isOpen: [
          { required: true, message: '请选择是否开启', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.id = id || ''
      this.visible = true
      this.getLogoDetail(id)
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    getLogoDetail(id) {
      logoDetail({ id }).then(res => {
        if (res.code === 1000 && res.result) {
          this.dataForm = res.result
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          setLogoSaveOrUpdate({ ...this.dataForm, userId: this.id }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.btnLoading = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.btnLoading = false
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
.user-set-logo {
  width: 600px;
}
.flag {
  font-size: 10px;
  color: red;
}
</style>
