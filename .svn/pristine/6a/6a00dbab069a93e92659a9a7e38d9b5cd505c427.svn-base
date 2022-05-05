<template>
  <el-dialog
    custom-class="gyc-community-modal"
    :title="!dataForm.ids.length ? '新增宿舍' : '修改宿舍'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="可住人数：" prop="allNums">
        <el-input v-model.trim="dataForm.allNums" placeholder="可住人数" />
      </el-form-item>
      <el-form-item v-if="dataForm.ids && dataForm.ids.length" label="费用：" prop="cost">
        <el-input v-model.trim="dataForm.cost" placeholder="费用" />
      </el-form-item>
      <el-form-item label="是否开启：" prop="isOpen">
        <el-radio-group v-model.trim="dataForm.isOpen" style="width:100%">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="dataForm.ids && dataForm.ids.length" label="性别：" prop="isOpen">
        <el-radio-group v-model.trim="dataForm.sex" style="width:100%">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { generateDormitory, batchUpdate } from '@/api/gyc/unit'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        ids: [],
        unitId: '',
        sex: '男',
        allNums: '',
        isOpen: 1,
        cost: ''
      },
      dataRule: {
        allNums: [
          { required: true, message: '可住人数不能为空', trigger: 'blur' },
          { pattern: /^[1-9][0-9]?$/, message: '可住人数格式不正确', trigger: ['blur', 'change'] }
        ],
        isOpen: [
          { required: true, message: '是否开启不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      // ids判断是否选择了宿舍
      this.dataForm.ids = row.ids && row.ids.length ? row.ids : []
      this.dataForm.unitId = row.id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.cost = ''
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const methodName = this.dataForm.ids.length ? batchUpdate : generateDormitory
          methodName({ ...this.dataForm }).then((data) => {
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
  .gyc-community-modal {
    width: 600px;
  }
</style>
