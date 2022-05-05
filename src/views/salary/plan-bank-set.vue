<template>
  <el-dialog
    custom-class="plan-blank-set-modal"
    title="绑定项目账户"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="银行类型" prop="bankTypeCode">
        <el-select v-model="dataForm.bankTypeCode" filterable style="width:100%" placeholder="银行类型">
          <el-option v-for="(item, index) in bankTypes" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行卡卡号" prop="cardCode">
        <el-input v-model.trim="dataForm.cardCode" placeholder="银行卡卡号" />
      </el-form-item>
      <el-form-item label="银行卡账户名" prop="userName">
        <el-input v-model.trim="dataForm.userName" placeholder="银行卡账户名" />
      </el-form-item>
      <el-form-item label="开户支行名称" prop="payrollBankCardName">
        <el-input v-model.trim="dataForm.payrollBankCardName" placeholder="开户支行名称" />
      </el-form-item>
      <el-form-item label="银行联号" prop="bankLinkNumber">
        <el-input v-model.trim="dataForm.bankLinkNumber" placeholder="银行联号" />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="personName">
        <el-input v-model.trim="dataForm.personName" placeholder="联系人姓名" />
      </el-form-item>
      <el-form-item label="联系人电话" prop="personPhone">
        <el-input v-model.trim="dataForm.personPhone" placeholder="联系人电话" />
      </el-form-item>
      <el-form-item label="备注" prop="other">
        <el-input
          v-model.trim="dataForm.other"
          type="textarea"
          :rows="3"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { bankSaveOrUpdate, bankdetail, optionList } from '@/api/salary/plan'
export default {
  data() {
    return {
      visible: false,
      bankTypes: [],
      dataForm: {
        bankTypeCode: '',
        cardCode: '',
        userName: '',
        payrollBankCardName: '',
        bankLinkNumber: '',
        personName: '',
        personPhone: '',
        other: ''
      },
      dataRule: {
        bankTypeCode: [
          { required: true, message: '请选择银行类型', trigger: 'blur' }
        ],
        cardCode: [
          { required: true, message: '银行卡卡号不能为空', trigger: 'blur' }
        ],
        bankLinkNumber: [
          { required: true, message: '银行联号不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '银行卡账户名不能为空', trigger: 'blur' }
        ],
        payrollBankCardName: [
          { required: true, message: '开户支行名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(projectId) {
      this.projectId = projectId
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getOptionList(projectId)
        if (this.projectId) {
          bankdetail({ projectId }).then((data) => {
            if (data && data.code === 1000) {
              this.dataForm = data.result || {}
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    // 下拉银行类型
    getOptionList(projectId) {
      optionList({ projectId }).then(data => {
        this.bankTypes = data.result
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          bankSaveOrUpdate({ ...this.dataForm, projectId: this.projectId }).then((data) => {
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
  .plan-blank-set-modal {
    width: 500px;
  }
</style>
