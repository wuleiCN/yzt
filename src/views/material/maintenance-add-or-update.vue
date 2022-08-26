<template>
  <el-dialog
    custom-class="maintenance-add-or-update-modal"
    :title="!dataForm.id ? '新增场所信息' : '场所信息设置'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="场所名称" prop="siteName">
        <el-input v-model.trim="dataForm.siteName" placeholder="场所名称" />
      </el-form-item>
      <el-form-item label="场所编号" prop="siteCode">
        <el-input v-model.trim="dataForm.siteCode" placeholder="场所编号" />
      </el-form-item>
      <el-form-item label="责任人" prop="personCharge">
        <el-input v-model.trim="dataForm.personCharge" placeholder="责任人" />
      </el-form-item>
      <el-form-item label="责任电话" prop="personPhone">
        <el-input v-model.trim="dataForm.personPhone" placeholder="责任电话" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model.trim="dataForm.remarks" type="textarea" autosize placeholder="备注" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="userType !== 2 || disabled" @click="dataFormSubmit">确定</el-button>
      <el-button type="info" style="margin-left: 30px;" @click="cancel">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/material/materialSite'
export default {
  data() {
    return {
      visible: false,
      disabled: false,
      dataForm: {
        id: null,
        siteName: '',
        personPhone: '',
        personCharge: '',
        remarks: '',
        siteCode: ''
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectList: [],
      dataRule: {
        siteName: [
          { required: true, message: '场所名称不能为空', trigger: 'blur' }
        ],
        siteCode: [
          { required: true, message: '场所编号不能为空', trigger: 'blur' }
        ],
        personCharge: [
          { required: true, message: '责任人不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.disabled = false
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = { ...row }
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        this.disabled = true
        if (valid) {
          saveOrUpdate(this.dataForm).then(res => {
            if (res.code === 1000) {
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
              this.$message.error(res.message)
              this.disabled = false
            }
          })
        } else {
          this.disabled = false
        }
      })
    },
    cancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
  .maintenance-add-or-update-modal {
    width: 600px;
    .el-input, .el-textarea {
      width: 360px;
    }
    textarea {
      height: 70px !important;
    }
  }
</style>
