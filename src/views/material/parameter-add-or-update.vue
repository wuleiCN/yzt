<template>
  <el-dialog
    custom-class="progress-add-or-update-modal"
    :title="!dataForm.id ? '新增场所信息' : '场所信息设置'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="场所名称" prop="projectName">
        <el-input v-model.trim="dataForm.projectName" placeholder="请输入场所名称" />
      </el-form-item>
      <el-form-item label="场所编号" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="请输入场所编号" />
      </el-form-item>
      <el-form-item label="材料规格" prop="isOversized">
        <el-input v-model.trim="dataForm.isOversized" placeholder="请输入材料规格" />
      </el-form-item>
      <el-form-item label="计量单位" prop="type">
        <el-input v-model.trim="dataForm.type" placeholder="请输入计量单位" />
      </el-form-item>
      <el-form-item label="允许最大库存" prop="riskLevels">
        <el-input-number v-model="dataForm.riskLevels" :min="1" :max="10" label="请输入允许最大库存" />
        <el-checkbox v-model="dataForm.checked" style="margin-left: 20px;">是否预警</el-checkbox>
      </el-form-item>
      <el-form-item label="最低库存量" prop="riskLevel">
        <el-input-number v-model="dataForm.riskLevel" :min="1" :max="999" label="请输入最低库存量" />
        <el-checkbox v-model="dataForm.check" style="margin-left: 20px;">是否预警</el-checkbox>
      </el-form-item>
      <el-form-item label="备注" prop="type">
        <el-input v-model.trim="dataForm.type" type="textarea" autosize placeholder="请输入" />
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
  .progress-add-or-update-modal {
    width: 600px;
    textarea {
      height: 70px !important;
    }
  }
</style>
