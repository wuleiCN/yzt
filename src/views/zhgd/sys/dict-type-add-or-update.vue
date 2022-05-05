<template>
  <el-dialog
    custom-class="zhgd-sys-dict-modal"
    :title="!dataForm.dictId ? '新增字典类型' : '修改字典类型'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="字典名称：" prop="dictName">
        <el-input v-model.trim="dataForm.dictName" placeholder="字典名称" />
      </el-form-item>
      <el-form-item label="字典值：" prop="dictType">
        <el-input v-model.trim="dataForm.dictType" placeholder="字典值" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { save, update } from '@/api-zhgd/sys/dict-type'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        dictId: null,
        dictName: '',
        dictType: ''
      },
      dataRule: {
        dictName: [
          { required: true, message: '字典名称不能为空', trigger: 'blur' }
        ],
        dictType: [
          { required: true, message: '字典值不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.dictId = row.dictId || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.dictId) {
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
          const saveOrUpdate = this.dataForm.dictId ? update : save
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
