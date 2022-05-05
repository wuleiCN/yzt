<template>
  <el-dialog
    custom-class="salary-plan-modal"
    :title="!dataForm.id ? '新增方案' : '修改方案'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="方案代码：" prop="code">
        <el-input v-model.trim="dataForm.code" placeholder="方案代码" />
      </el-form-item>
      <el-form-item label="方案名称：" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="方案名称" />
      </el-form-item>
      <el-form-item label="薪资项目：" prop="ids">
        <el-transfer v-model="dataForm.ids" :titles="['待选项目', '已选项目']" :data="data" />
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input
          v-model.trim="dataForm.description"
          type="textarea"
          :rows="3"
          placeholder="请输入描述信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, proList, detail } from '@/api/salary/plan'
export default {
  data() {
    return {
      visible: false,
      data: [],
      dataForm: {
        id: null,
        code: '',
        name: '',
        ids: [],
        description: ''
      },
      dataRule: {
        code: [
          { required: true, message: '方案代码不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '方案名称不能为空', trigger: 'blur' }
        ],
        ids: [
          { required: true, message: '请选择薪资项目', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '描述信息不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(id) {
      this.dataForm.id = id || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.ids = []
        this.data = []
        this.getProList()
        if (this.dataForm.id) {
          detail({ id }).then((data) => {
            if (data && data.code === 1000) {
              this.dataForm = data.result
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    getProList() {
      proList().then((data) => {
        if (data && data.code === 1000) {
          this.data = data.result.map(item => {
            item.key = item.id
            item.label = item.name
            return item
          })
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
  .salary-plan-modal {
    width: 800px;
  }
</style>
