<template>
  <el-dialog
    custom-class="zhgd-sys-dict-modal"
    :title="!dataForm.dictCode ? '新增字典' : '修改字典'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="名称：" prop="dictLabel">
        <el-input v-model.trim="dataForm.dictLabel" placeholder="名称" />
      </el-form-item>
      <el-form-item label="值：" prop="dictValue">
        <el-input v-model.trim="dataForm.dictValue" placeholder="值" />
      </el-form-item>
      <el-form-item label="所属类型：" prop="dictType">
        <el-select v-model="dataForm.dictType" style="width:100%" clearable placeholder="所属类型">
          <el-option
            v-for="item in options"
            :key="item.dictType"
            :label="item.dictName"
            :value="item.dictType"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
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
import { save, update } from '@/api-zhgd/sys/dict'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        dictCode: null,
        dictLabel: '',
        remark: '',
        dictValue: '',
        dictType: ''
      },
      options: [],
      dataRule: {
        dictLabel: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '名称由数字,字母中文组成', trigger: ['blur', 'change'] }
        ],
        dictValue: [
          { required: true, message: '值不能为空', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '值由数字,字母中文组成', trigger: ['blur', 'change'] }
        ],
        dictType: [
          { required: true, message: '所属类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row, options) {
      this.options = options
      this.dataForm.dictCode = row.dictCode || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.dictCode) {
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
          const saveOrUpdate = this.dataForm.dictCode ? update : save
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
