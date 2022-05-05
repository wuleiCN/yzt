<template>
  <el-dialog
    custom-class="subscribe-modal"
    title="接入服务"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="服务器地址" prop="url">
        <el-input v-model.trim="dataForm.url" placeholder="服务器地址" />
      </el-form-item>
      <el-form-item label="请求间隔时间" prop="reqIntervalTime">
        <!-- <el-input v-model.trim="dataForm.reqIntervalTime" placeholder="请求间隔时间" /> -->
        <el-input-number v-model.trim="dataForm.reqIntervalTime" label="appid" />
      </el-form-item>
      <el-form-item label="appid" prop="appid">
        <el-input v-model.trim="dataForm.appid" placeholder="appid" />

      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { subscribe } from '@/api/project/device'
export default {
  data() {
    return {
      visible: false,
      types: [],
      dataForm: {
        id: null,
        url: '',
        appid: '',
        reqIntervalTime: 5
      },
      dataRule: {
        url: [
          { required: true, message: '服务器地址不能为空', trigger: 'blur' }
        ],
        reqIntervalTime: [
          { required: true, message: '请求间隔时间不能为空', trigger: 'blur' }
        ],
        appid: [
          { required: true, message: 'appid不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(id) {
      // this.$refs['dataForm'].resetFields()
      this.dataForm.id = id || null
      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          subscribe({ ...this.dataForm }).then((data) => {
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
