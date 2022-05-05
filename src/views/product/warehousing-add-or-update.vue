<template>
  <el-dialog
    custom-class="product-warehousing-modal"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="所属产品" prop="productId">
        <el-select v-model="dataForm.productId" filterable style="width:100%" placeholder="请选择所属产品">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.productName" :value="item.id">{{ item.productName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品型号" prop="model">
        <el-input v-model.trim="dataForm.model" placeholder="产品型号" />
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
import { saveOrUpdate, productSelectList } from '@/api/productPurchase'
export default {
  data() {
    return {
      visible: false,
      proList: [],
      dataForm: {
        id: '',
        productId: '',
        model: '',
        remark: ''
      },
      dataRule: {
        productId: [
          { required: true, message: '所属产品不能为空', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '产品型号不能为空', trigger: 'blur' }
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
        this.getproSelectList()
        if (this.dataForm.id) {
          this.dataForm = row
        }
      })
    },
    // 所属产品下拉
    getproSelectList(id) {
      productSelectList({ id }).then((data) => {
        this.proList = data.result || []
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
  .product-warehousing-modal {
    width: 700px;
  }
</style>
