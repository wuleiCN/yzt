<template>
  <el-dialog
    custom-class="editor-modal"
    :title="!dataForm.id ? '新增公司' : '修改公司'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业名称" prop="companyName">
            <el-input v-model.trim="dataForm.companyName" placeholder="企业名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业简称" prop="shortName">
            <el-input v-model.trim="dataForm.shortName" placeholder="企业简称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人" prop="contacts">
            <el-input v-model.trim="dataForm.contacts" placeholder="负责人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="mobilePhone">
            <el-input v-model.trim="dataForm.mobilePhone" placeholder="联系电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位类型" prop="companyType">
            <el-select v-model.trim="dataForm.companyType" style="width:100%" placeholder="请选择">
              <el-option v-for="(item, index) in types" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信用代码" prop="suid">
            <el-input v-model.trim="dataForm.suid" placeholder="社会统一信用代码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法人代表" prop="legalPerson">
            <el-input v-model.trim="dataForm.legalPerson" placeholder="法人代表" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户行" prop="bankOpen">
            <el-input v-model.trim="dataForm.bankOpen" style="width:100%" placeholder="开户行" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model.trim="dataForm.email" placeholder="电子邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户账号" prop="bankNum">
            <el-input v-model.trim="dataForm.bankNum" placeholder="开户账号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开户地址" prop="bankAddress">
            <el-input v-model.trim="dataForm.bankAddress" type="textarea" placeholder="开户地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司地址" prop="address">
            <el-input v-model.trim="dataForm.address" type="textarea" placeholder="公司地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="dataForm.remark"
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
import { saveOrUpdate, getCompanyType, detail } from '@/api/company'
export default {
  data() {
    return {
      visible: false,
      types: [],
      dataForm: {
        id: null,
        companyName: '',
        shortName: '',
        contacts: null,
        mobilePhone: '',
        companyType: '',
        address: '',
        legalPerson: '',
        suid: '',
        email: '',
        bankOpen: '',
        bankAddress: '',
        bankNum: '',
        remark: ''
      },
      dataRule: {
        companyName: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' },
          // 允许()
          { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z/(/)/（/）]{1,}$/, message: '企业名称由数字,字母中文组成', trigger: ['blur', 'change'] }
        ],
        shortName: [
          { required: true, message: '企业简称不能为空', trigger: 'change' },
          { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '企业简称由数字,字母中文组成', trigger: ['blur', 'change'] }
        ],
        suid: [
          { required: true, message: '信用代码不能为空', trigger: 'change' },
          { pattern: /^[0-9A-Za-z]{18}$/, message: '信用代码由数字,字母18位数组成', trigger: ['blur', 'change'] }
        ],
        contacts: [
          { required: true, message: '负责人不能为空', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5_A-Za-z]{1,}$/, message: '负责人由字母，文字组成', trigger: ['blur', 'change'] }
        ],
        legalPerson: [
          { required: true, message: '法人代表不能为空', trigger: 'change' },
          { pattern: /^[\u4e00-\u9fa5_A-Za-z]{1,}$/, message: '法人代表由字母，文字组成', trigger: ['blur', 'change'] }
        ],
        mobilePhone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: ['blur', 'change'] }
        ],
        companyType: [
          { required: true, message: '请选择单位类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(id) {
      this.dataForm.id = id || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getCompanyTypeHandle()
        if (this.dataForm.id) {
          detail({ id: this.dataForm.id }).then((data) => {
            if (data && data.code === 1000) {
              this.dataForm = data.result
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    getCompanyTypeHandle() {
      getCompanyType().then(data => {
        if (data && data.code === 1000) {
          this.types = data.result
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
  .editor-modal {
    width: 950px;
  }
</style>
