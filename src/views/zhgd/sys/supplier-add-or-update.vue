<template>
  <el-dialog
    custom-class="zhgd-sys-dict-modal"
    :title="!dataForm.id ? '新增供应商' : '修改供应商'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="供应商名称：" prop="supName">
        <el-input v-model.trim="dataForm.supName" placeholder="名称" />
      </el-form-item>
      <el-form-item label="供应商简称：" prop="supAbbreviation">
        <el-input v-model.trim="dataForm.supAbbreviation" placeholder="供应商简称" />
      </el-form-item>
      <el-form-item label="联系人：" prop="supContacts">
        <el-input v-model.trim="dataForm.supContacts" placeholder="联系人" />
      </el-form-item>
      <el-form-item label="联系电话：" prop="supPhone">
        <el-input v-model.trim="dataForm.supPhone" placeholder="联系电话" />
      </el-form-item>
      <!-- <el-form-item label="设备类型：" prop="deviceType">
        <el-select v-model="dataForm.deviceType" style="width:100%" clearable placeholder="设备类型">
          <el-option
            v-for="item in options"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="+item.dictValue"
          />
        </el-select>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { save, update } from '@/api-zhgd/sys/supplier'
export default {
  // props: {
  //   options: {
  //     type: Array,
  //     default: () => { return [] }
  //   }
  // },
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        supName: '',
        supAbbreviation: '',
        supContacts: '',
        supPhone: '',
        deviceType: ''
      },
      dataRule: {
        supName: [
          { required: true, message: '供应商名称不能为空', trigger: 'blur' }
        ],
        supAbbreviation: [
          { required: true, message: '供应商简称不能为空', trigger: 'blur' },
          { pattern: /(^[a-z]{0,4}$)/, message: '供应商简称小写字母(控制在4个字符以内）', trigger: ['blur'] }
        ]
        // deviceType: [
        //   { required: true, message: '设备类型不能为空', trigger: 'blur' }
        // ]
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
        } else {
          this.dataForm.dictType = row.dictType
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const saveOrUpdate = this.dataForm.id ? update : save
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
  .zhgd-sys-dict-modal {
    width: 600px;
  }
</style>
