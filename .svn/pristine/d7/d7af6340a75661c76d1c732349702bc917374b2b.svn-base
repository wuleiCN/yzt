<template>
  <el-dialog
    custom-class="product-list-modal"
    :title="!dataForm.id ? '新增产品' : '修改产品'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model.trim="dataForm.companyName" placeholder="公司名称" />
      </el-form-item>
      <el-form-item label="品牌名称" prop="brandName">
        <el-input v-model.trim="dataForm.brandName" placeholder="品牌名称" />
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model.trim="dataForm.productName" placeholder="产品名称" />
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input v-model.trim="dataForm.contacts" placeholder="联系人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactsPhone">
        <el-input v-model.trim="dataForm.contactsPhone" placeholder="联系电话" />
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input
          v-model.trim="dataForm.address"
          type="textarea"
          :rows="2"
          placeholder="请输入联系地址信息"
        />
      </el-form-item>
      <el-form-item label="是否启用" prop="isEnable">
        <el-radio-group v-model.trim="dataForm.isEnable" style="width:100%">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="dataForm.remark"
          type="textarea"
          :rows="2"
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
import { saveOrUpdate } from '@/api/product'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: '',
        companyName: '',
        brandName: '',
        isEnable: 1,
        productName: '',
        remark: '',
        contacts: '',
        contactsPhone: '',
        address: ''
      },
      dataRule: {
        contactsPhone: [
          { required: false, message: '联系电话不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '联系电话格式不正确', trigger: ['blur', 'change'] }
        ],
        companyName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '不能为空', trigger: 'blur' }
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
  .product-list-modal {
    width: 700px;
  }
</style>
