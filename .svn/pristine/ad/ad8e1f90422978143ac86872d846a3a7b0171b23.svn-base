<template>
  <el-dialog
    custom-class="version-modal"
    :title="!dataForm.id ? '新增字典' : '修改字典'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="60px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="名称" prop="title">
        <el-input v-model.trim="dataForm.title" placeholder="名称" />
      </el-form-item>
      <el-form-item label="tag" prop="tag">
        <el-input v-model.trim="dataForm.tag" placeholder="tag" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/sys/dict'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        title: '',
        tag: ''
      },
      dataRule: {
        title: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
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
        } else {
          this.dataForm.category = row.category
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
  .version-modal {
    width: 600px;
  }
</style>
