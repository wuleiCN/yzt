<template>
  <el-dialog
    custom-class="audit-detail-modal"
    title="薪资明细"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
        <el-form-item label="项目名称：" prop="code">
          <span>{{ dataForm.projectName }}</span>
        </el-form-item>
        <el-form-item label="参建单位：" prop="name">
          <span>{{ dataForm.constructionName }}</span>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="薪资月份：" prop="ids">
              <span>{{ dataForm.month }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班组：" prop="ids">
              <span>{{ dataForm.teamName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应发小计：" prop="ids">
              <span>{{ dataForm.yfTotal }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实发小计：" prop="ids">
              <span>{{ dataForm.sfTotal }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-table
            v-loading="dataListLoading"
            :data="dataForm.list"
            border
            stripe
            style="width: 100%;"
            highlight-current-row
          >
            <el-table-column
              prop="empName"
              header-align="center"
              align="center"
              label="姓名"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              width="150"
              label="身份证号"
            />
            <el-table-column
              prop="a100"
              header-align="center"
              align="center"
              label="应发工资"
            />
            <el-table-column
              prop="a101"
              header-align="center"
              align="center"
              label="实发工资"
            />
          </el-table>
        </el-form-item>
        <el-form-item label="是否同意：" prop="status">
          <el-radio-group v-model.trim="dataForm.status" style="width:100%">
            <el-radio :label="2">同意</el-radio>
            <el-radio :label="3">不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="理由：" prop="shReason">
          <el-input
            v-model="dataForm.shReason"
            type="textarea"
            :rows="3"
            placeholder="请填写理由"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { detail, review } from '@/api/salary/audit'
export default {
  data() {
    return {
      visible: false,
      dataListLoading: false,
      dataList: [],
      dataForm: {
        status: '',
        shReason: '',
        list: []
      },
      dataRule: {
        status: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(id) {
      this.visible = true
      this.dataForm.id = id
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
      this.getDataList()
    },
    getDataList() {
      detail({ id: this.dataForm.id }).then((data) => {
        this.dataForm = data.result
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const { status, shReason, id } = this.dataForm
          review({ id, status, shReason }).then((data) => {
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
  .audit-detail-modal {
    width: 1200px;
    // .el-dialog__body {
    //   padding: 0;
    // }
    .el-form-item {
      // margin-bottom: 0;
      .el-form-item__label {
        padding: 0;
      }
    }
  }
</style>
