<template>
  <el-dialog
    custom-class="progress-add-or-update-modal"
    :title="!dataForm.id ? '新增进度' : '修改进度'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="项目名称" prop="projectId">
        <el-select v-model.trim="dataForm.projectId" style="width:100%" placeholder="请选择项目">
          <el-option v-for="(item, index) in projectList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同名称" prop="contractName">
        <el-input v-model.trim="dataForm.contractName" placeholder="合同名称" />
      </el-form-item>
      <el-form-item label="乙方单位" prop="yfName">
        <el-input v-model.trim="dataForm.yfName" placeholder="乙方单位" />
      </el-form-item>
      <el-form-item label="计划开始时间" prop="startDate">
        <el-date-picker
          v-model.trim="dataForm.startDate"
          style="width:100%"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="计划开始时间"
        />
      </el-form-item>
      <el-form-item label="计划结束时间" prop="endDate">
        <el-date-picker
          v-model.trim="dataForm.endDate"
          style="width:100%"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="计划结束时间"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model.trim="dataForm.status" style="width:100%">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否短信通知" prop="isSmsNotice">
        <el-radio-group v-model.trim="dataForm.isSmsNotice" style="width:100%">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/progress'
import { projectSelectList } from '@/api/project/device'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        projectId: '',
        contractName: '',
        yfName: '',
        startDate: '',
        endDate: '',
        status: '',
        isSmsNotice: ''
      },
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
    init(row, options) {
      this.options = options
      this.dataForm.id = row.id || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getproSelectList()
        if (this.dataForm.id) {
          this.dataForm = row
        }
      })
    },
    // 所属项目下拉
    getproSelectList(id) {
      projectSelectList({ id }).then((data) => {
        this.projectList = data.result || []
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveOrUpdate({ ...this.dataForm }).then((data) => {
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
  .progress-add-or-update-modal {
    width: 1000px;
  }
</style>
