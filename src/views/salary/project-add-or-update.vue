<template>
  <el-dialog
    custom-class="salary-project-modal"
    :title="!dataForm.id ? '新增薪资项目' : '修改薪资项目'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="项目代码：" prop="code">
        <el-input v-model.trim="dataForm.code" placeholder="项目代码" />
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="排序值：" prop="sortNum">
        <el-input v-model.trim="dataForm.sortNum" placeholder="排序值" />
      </el-form-item>
      <el-form-item label="最大值：" prop="maxValue">
        <el-input v-model.trim="dataForm.maxValue" placeholder="最大值" />
      </el-form-item>
      <el-form-item label="最小值：" prop="minValue">
        <el-input v-model.trim="dataForm.minValue" placeholder="最小值" />
      </el-form-item>
      <el-form-item label="描述：" prop="content">
        <el-input
          v-model.trim="dataForm.content"
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/salary/project'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        code: '',
        name: '',
        sortNum: '',
        maxValue: '',
        minValue: '',
        content: ''
      },
      dataRule: {
        code: [
          { required: true, message: '项目代码不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        sortNum: [
          { required: true, message: '排序值不能为空', trigger: 'blur' },
          { pattern: /^\+?[0-9][0-9]*$/, message: '格式不正确', trigger: ['blur', 'change'] }
        ],
        maxValue: [
          { required: true, message: '最大值不能为空', trigger: 'blur' },
          { pattern: /(^[0-9]{1,8}$)|(^[0-9]{1,8}[\.]{1}[0-9]{1,2}$)/, message: '格式不正确', trigger: ['blur', 'change'] }
        ],
        minValue: [
          { required: true, message: '最小值不能为空', trigger: 'blur' },
          { pattern: /(^[0-9]{1,8}$)|(^[0-9]{1,8}[\.]{1}[0-9]{1,2}$)/, message: '格式不正确', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
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
  .salary-project-modal {
    width: 600px;
  }
</style>
