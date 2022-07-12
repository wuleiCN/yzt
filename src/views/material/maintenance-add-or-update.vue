<template>
  <el-dialog
    custom-class="maintenance-add-or-update-modal"
    :title="!dataForm.id ? '新增场所信息' : '场所信息设置'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" label-width="120px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="场所名称" prop="projectName">
        <el-input v-model.trim="dataForm.projectName" placeholder="场所名称" />
      </el-form-item>
      <el-form-item label="场所编号" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="场所编号" />
      </el-form-item>
      <el-form-item label="责任人" prop="isOversized">
        <el-input v-model.trim="dataForm.isOversized" placeholder="责任人" />
      </el-form-item>
      <el-form-item label="责任电话" prop="type">
        <el-input v-model.trim="dataForm.type" placeholder="责任电话" />
      </el-form-item>
      <el-form-item label="备注" prop="riskLevel">
        <el-input v-model.trim="dataForm.riskLevel" type="textarea" autosize placeholder="备注" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="userType !== 2" @click="dataFormSubmit()">确定</el-button>
      <el-button type="info" style="margin-left: 30px;" @click="cancel()">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        projectName: '',
        type: '',
        isOversized: '',
        riskLevel: '',
        name: ''
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectList: [],
      dataRule: {
        projectId: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        contractName: [
          { required: true, message: '合同名称不能为空', trigger: 'blur' }
        ],
        yfName: [
          { required: true, message: '乙方单位不能为空', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择计划开始时间', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择计划结束时间', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.visible = false
          return false
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
