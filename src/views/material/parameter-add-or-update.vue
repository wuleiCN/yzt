<template>
  <el-dialog
    custom-class="parameter-add-or-update-modal"
    :title="!dataForm.id ? '新增材料信息' : '材料信息设置'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="材料名称" prop="materialName">
        <el-input v-model.trim="dataForm.materialName" placeholder="请输入材料名称" />
      </el-form-item>
      <el-form-item label="材料编号" prop="materialCode">
        <el-input v-model.trim="dataForm.materialCode" placeholder="请输入材料编号" />
      </el-form-item>
      <el-form-item label="材料规格" prop="materialSpec">
        <el-input v-model.trim="dataForm.materialSpec" placeholder="请输入材料规格" />
      </el-form-item>
      <el-form-item label="材料参数" prop="materialType">
        <el-select v-model="dataForm.materialType" filterable placeholder="请选择材料参数">
          <el-option
            v-for="item in materialType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input v-model.trim="dataForm.unit" placeholder="请输入计量单位" />
      </el-form-item>
      <el-form-item label="允许最大库存" prop="maxStock">
        <el-input-number v-model="dataForm.maxStock" :min="1" :max="999" label="请输入允许最大库存" />
        <el-checkbox v-model="dataForm.maxStockWarning" style="margin-left: 20px;">是否预警</el-checkbox>
      </el-form-item>
      <el-form-item label="最低库存量" prop="minStock">
        <el-input-number v-model="dataForm.minStock" :min="1" :max="999" label="请输入最低库存量" />
        <el-checkbox v-model="dataForm.minStockWarning" style="margin-left: 20px;">是否预警</el-checkbox>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model.trim="dataForm.remarks" type="textarea" autosize placeholder="请输入" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="userType !== 2 || disabled" @click="dataFormSubmit()">确定</el-button>
      <el-button type="info" style="margin-left: 30px;" @click="cancel()">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/material/parameterSite'
export default {
  data() {
    return {
      visible: false,
      disabled: false,
      dataForm: {
        id: null,
        materialName: '',
        materialCode: '',
        materialSpec: '',
        unit: '',
        maxStock: '',
        minStock: '',
        materialType: null,
        remarks: '',
        maxStockWarning: false,
        minStockWarning: false
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectList: [],
      materialType: [
        { value: 0, label: '水泥' },
        { value: 1, label: '钢筋' },
        { value: 2, label: '木材' },
        { value: 3, label: '沙子' },
        { value: 4, label: '石子' },
        { value: 5, label: '砖' },
        { value: 6, label: '瓦' },
        { value: 7, label: '玻璃' },
        { value: 8, label: '油毡' },
        { value: 9, label: '石灰' }
      ],
      dataRule: {
        materialName: [
          { required: true, message: '材料名称不能为空', trigger: 'blur' }
        ],
        materialCode: [
          { required: true, message: '材料编号不能为空', trigger: 'blur' }
        ],
        materialSpec: [
          { required: true, message: '材料规格不能为空', trigger: 'blur' }
        ],
        materialType: [
          { required: true, message: '材料参数不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '计量单位不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.disabled = false
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = { ...row }
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.disabled = true
          saveOrUpdate(this.dataForm).then(res => {
            if (res.code === 1000) {
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
              this.$message.error(res.message)
              this.disabled = false
            }
          })
        } else {
          this.disabled = false
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
  .parameter-add-or-update-modal {
    width: 600px;
    .el-select {
      width: 460px;
    }
    textarea {
      height: 70px !important;
    }
  }
</style>
