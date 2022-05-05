<template>
  <el-dialog
    custom-class="list-set-status"
    title="项目设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px">
      <el-form-item label="分包初始积分" prop="initialScore">
        <el-input v-model.number="dataForm.initialScore" :disabled="!!initScore" />
      </el-form-item>
      <el-form-item label="录人审核状态" prop="isExamine">
        <el-radio-group v-model.trim="dataForm.isExamine">
          <el-radio :label="0">手动审核</el-radio>
          <el-radio :label="1">自动审核</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { proConfigDetail, proConfigSaveOrUpdate } from '@/api/project/project'
export default {
  data() {
    const validateInitialScore = (rule, value, callback) => {
      var r = /^\+?[1-9][0-9]*$/
      if (!value || r.test(value / 10)) {
        callback()
      } else {
        callback(new Error('所填入的数值必须是除以10的整数如：80、110、120等'))
      }
    }
    return {
      visible: false,
      initialScore: 100,
      initScore: '',
      dataListLoading: false,
      dataList: [],
      settingList: [],
      dataForm: {
        isExamine: 1
      },
      dataRule: {
        isExamine: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        initialScore: [
          { required: false, message: '不能为空', trigger: 'blur' },
          { validator: validateInitialScore, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(id) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getDetail(id)
      })
    },
    // 对接平台列表
    getDetail(id) {
      proConfigDetail({ projectId: id }).then(data => {
        this.dataForm = data.result ? { ...data.result } : { projectId: id, isExamine: 1 }
        if (!data.result.initialScore) this.$set(this.dataForm, 'initialScore', 100)
        this.initScore = data.result.initialScore
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // return
          proConfigSaveOrUpdate({ ...this.dataForm }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000
              })
              this.visible = false
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
  .list-set-status {
    width: 600px;
    .el-dialog__body {
      padding-top: 20px;
    }
  }
</style>
