<template>
  <el-dialog
    custom-class="construction-add-modal"
    title="新增参建单位"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="140px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="参建单位名称" prop="constructionName">
            <el-input v-model.trim="dataForm.constructionName" placeholder="参建单位名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参建单位简称" prop="shortName">
            <el-input v-model="dataForm.shortName" placeholder="参建单位简称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码" prop="suid">
            <el-input v-model.trim="dataForm.suid" placeholder="统一社会信用代码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位类型" prop="companyType">
            <el-select v-model="dataForm.companyType" style="width:100%" placeholder="请选择">
              <el-option v-for="(item, index) in types" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法定代表人" prop="legalPerson">
            <el-input v-model="dataForm.legalPerson" placeholder="法定代表人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="成立日期" prop="setUpDate">
            <el-date-picker
              v-model="dataForm.setUpDate"
              style="width:100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="成立日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="dataForm.email" placeholder="邮箱地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册资本(万元)" prop="capital">
            <el-input v-model="dataForm.capital" placeholder="注册资本(万元)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="contacts">
            <el-input v-model="dataForm.contacts" placeholder="联系人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="mobilePhone">
            <el-input v-model="dataForm.mobilePhone" placeholder="手机号码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="详细地址" prop="address">
            <el-input
              v-model="dataForm.address"
              type="textarea"
              :rows="2"
              placeholder="请输入详细地址信息"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="dataForm.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/construction'
import { getCompanyType } from '@/api/company'
export default {
  data() {
    return {
      visible: false,
      types: [],
      dataForm: {
        constructionName: '',
        shortName: '',
        suid: '',
        companyType: '',
        legalPerson: '',
        mobilePhone: '',
        address: '',
        contacts: '',
        capital: '',
        empPhon: '',
        setUpDate: '',
        empCardnum: '',
        email: '',
        remark: ''
      },
      dataRule: {
        constructionName: [
          { required: true, message: '参建单位名称不能为空', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '参建单位名称由数字,字母中文组成', trigger: ['blur', 'change'] }
        ],
        shortName: [
          { required: true, message: '参建单位简称不能为空', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '参建单位名称由数字,字母中文组成', trigger: ['blur', 'change'] }
        ],
        suid: [
          { required: true, message: '信用代码不能为空', trigger: 'change' },
          { pattern: /^[0-9A-Za-z]{18}$/, message: '信用代码由数字,字母18位数组成', trigger: ['blur', 'change'] }
        ],
        legalPerson: [
          { required: true, message: '法人代表不能为空', trigger: 'change' },
          { pattern: /^[\u4e00-\u9fa5_A-Za-z]{1,}$/, message: '法定代表人由字母，文字组成', trigger: ['blur', 'change'] }
        ],
        contacts: [
          { pattern: /^[\u4e00-\u9fa5_A-Za-z]{1,}$/, message: '联系人由字母，文字组成', trigger: ['blur', 'change'] }
        ],
        mobilePhone: [
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: ['blur', 'change'] }
        ],
        capital: [
          { pattern: /^[0-9]{1,}$/, message: '注册资本格式不正确', trigger: ['blur', 'change'] }
        ],
        companyType: [
          { required: true, message: '请选择单位类型', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    init(row) {
      this.visible = true
      this.$nextTick(() => {
        this.getTypeList()
        this.$refs['dataForm'].resetFields()
      })
    },
    getTypeList() {
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
            this.visible = false
            this.$emit('refreshDataList')
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .construction-add-modal {
    width: 950px;
  }
</style>
