<template>
  <el-dialog
    custom-class="salary-project-modal"
    title="修改薪资方案分配"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="施工许可证：" prop="builderLicense">
        <el-input v-model.trim="dataForm.builderLicense" :disabled="true" placeholder="施工许可证" />
      </el-form-item>
      <el-form-item label="项目名称：" prop="projectName">
        <el-input v-model.trim="dataForm.projectName" :disabled="true" placeholder="项目名称" />
      </el-form-item>
      <el-form-item label="薪资方案：" prop="planId">
        <el-select v-model="dataForm.planId" clearable style="width:100%" placeholder="请选择薪资方案">
          <el-option v-for="(item, index) in planList" :key="index" :label="item.name" :value="item.id">{{ item.name }}</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, optionPlanList } from '@/api/salary/allot'
export default {
  data() {
    return {
      visible: false,
      planList: [],
      dataForm: {
        id: null,
        builderLicense: '',
        projectName: '',
        sortNum: '',
        maxValue: '',
        minValue: '',
        content: ''
      },
      dataRule: {
        planId: [
          { required: true, message: '请选择薪资方案', trigger: 'blur' }
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
          this.getOptionPlanList()
        }
      })
    },
    getOptionPlanList() {
      optionPlanList().then((data) => {
        if (data && data.code === 1000) {
          this.planList = data.result
        } else {
          this.$message.error(data.message)
        }
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
  .salary-project-modal {
    width: 600px;
  }
</style>
