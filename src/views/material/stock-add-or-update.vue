<template>
  <div>
    <el-dialog
      custom-class="stock-add-or-update-modal"
      title="材料库存单详情"
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="cancel"
    >
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
        <el-form-item label="材料名称" prop="materialName">
          <el-input v-model.trim="dataForm.materialName" placeholder="请输入材料名称" disabled />
        </el-form-item>
        <el-form-item label="材料编码" prop="materialCode">
          <el-input v-model.trim="dataForm.materialCode" placeholder="请输入材料编码" disabled />
        </el-form-item>
        <el-form-item label="计量单位" prop="unitName">
          <el-input v-model.trim="dataForm.unitName" placeholder="计量单位" disabled />
        </el-form-item>
        <el-form-item label="预警数量" prop="warningNumber">
          <el-input v-model.number="dataForm.warningNumber" clearable placeholder="请输入预警数量" />
        </el-form-item>
        <el-form-item label="现存数量" prop="nowNumber">
          <el-input v-model.number="dataForm.nowNumber" clearable placeholder="请输入现存数量" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="userType !== 2 || disabled" @click="dataFormSubmit()">确定</el-button>
        <el-button type="info" style="margin-left: 30px;" @click="cancel()">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { saveOrUpdate } from '@/api/material/materialStock'
export default {
  data() {
    return {
      visible: false,
      disabled: false,
      dataForm: {
        id: null,
        materialName: '',
        materialCode: '',
        warningNumber: '',
        nowNumber: '',
        unitName: ''
      },
      fileList: [],
      loginInfo: this.$store.state.user.loginInfo,
      dialogImageUrl: '',
      dialogVisible: false,
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectList: [],
      dataRule: {
        materialName: [
          { required: true, message: '材料名称不能为空', trigger: 'blur' }
        ],
        materialCode: [
          { required: true, message: '材料编码不能为空', trigger: 'blur' }
        ],
        warningNumber: [
          { required: true, message: '预警数量不能为空' },
          { type: 'number', message: '必须为数字值' }
        ],
        nowNumber: [
          { required: true, message: '现存数量不能为空' },
          { type: 'number', message: '必须为数字值' }
        ],
        unitName: [
          { required: true, message: '计量单位不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      console.log(row)
      this.visible = true
      this.disabled = false
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = { ...row }
          this.dataForm.unitName || (this.dataForm.unitName = '无')
          console.log(this.dataForm)
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
            }
          })
        } else {
          this.disabled = false
        }
      })
    },
    cancel() {
      this.fileList = []
      this.dataForm = {}
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .el-dialog {
    width: 600px;
  }
</style>
