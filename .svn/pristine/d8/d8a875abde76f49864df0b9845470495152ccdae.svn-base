<template>
  <el-dialog
    custom-class="ic-bind-modal"
    title="桂建通"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
      <el-form-item label="状态" prop="status">
        <!-- <el-select v-model="dataForm.status" style="width:100%" placeholder="请选择状态">
          <el-option label="启用" :value="1"> 启用 </el-option>
          <el-option label="禁用" :value="0"> 禁用 </el-option>
        </el-select> -->
        <el-radio-group v-model.trim="dataForm.status" style="width:100%">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceSn">
        <el-input v-model.trim="dataForm.deviceSn" placeholder="设备编号" />
      </el-form-item>
      <el-form-item label="授权账号" prop="apiKey">
        <el-input v-model.trim="dataForm.apiKey" placeholder="授权账号" />
      </el-form-item>
      <el-form-item label="授权密钥" prop="apiSecret">
        <el-input v-model.trim="dataForm.apiSecret" placeholder="授权密钥" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确 定</el-button>
    </span>

  </el-dialog>
</template>

<script>
import { getGjtInfo, setGjtInfo } from '@/api/project/person'
export default {
  data() {
    return {
      row: {},
      dataForm: {
        deviceSn: '',
        apiKey: '',
        apiSecret: '',
        status: 1
      },
      dataRule: {
        deviceSn: [
          { required: true, message: '设备编号不能为空', trigger: ['blur'] }
        ],
        apiKey: [
          { required: true, message: '授权账号不能为空', trigger: ['blur'] }
        ],
        apiSecret: [
          { required: true, message: '授权密钥不能为空', trigger: ['blur'] }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: ['blur'] }
        ]
      },
      visible: false
    }
  },
  methods: {
    init(row) {
      this.row = row
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getDetail(this.row.id)
      })
    },
    getDetail(deviceId) {
      getGjtInfo({ deviceId }).then((data) => {
        if (data && data.code === 1000) {
          this.dataForm = data.result || { status: 1 }
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          setGjtInfo({ ...this.dataForm, projectId: this.row.projectId, deviceId: this.row.id }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000
              })
              this.visible = false
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
.ic-bind-modal {
  width: 500px;
  .el-dialog__body {
    padding: 15px 10px 0;
  }
}

</style>
