<template>
  <el-dialog
    custom-class="update-psw-modal"
    title="修改密码"
    :close-on-click-modal="false"
    append-to-body
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="用户名：" prop="loginName">
        <el-input v-model.trim="dataForm.loginName" :disabled="true" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="原密码：" prop="oldPassword">
        <el-input v-model.trim="dataForm.oldPassword" placeholder="原密码" />
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model.trim="dataForm.newPassword" placeholder="新密码" />
      </el-form-item>
      <el-form-item label="确认新密码：" prop="confirmPassword">
        <el-input v-model.trim="dataForm.confirmPassword" placeholder="确认新密码" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updatePsw } from '@/api/sys/user'
export default {
  data() {
    const loginInfo = JSON.parse(sessionStorage.getItem('result'))
    return {
      visible: false,
      types: [],
      dataForm: {
        loginName: loginInfo.loginName,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      dataRule: {
        loginName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z!@#$%^&*()_+]{8,}$/, message: '密码不少于8位数，且由数字字母和特殊字符组成' }
        ],
        confirmPassword: [
          { required: true, message: '确认新密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updatePsw({ ...this.dataForm }).then((data) => {
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
  .update-psw-modal {
    width: 500px !important;
  }
</style>
