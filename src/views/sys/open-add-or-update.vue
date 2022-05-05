<template>
  <el-dialog
    custom-class="open-modal"
    :title="!dataForm.id ? '新增开放平台' : '修改开放平台'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item v-if="!dataForm.id" label="平台类型" prop="type">
        <el-radio-group v-model="dataForm.type" style="width:100%" @change="changeHnadle">
          <el-radio :label="1">公司</el-radio>
          <el-radio :label="2">项目</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="!dataForm.id" label="设置对象" prop="targetId">
        <el-select v-model="dataForm.targetId" filterable style="width:100%" placeholder="设置对象">
          <el-option v-for="(item, index) in targetList" :key="index" :label="item.name" :value="item.id">{{ item.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台名称" prop="platformName">
        <el-input v-model.trim="dataForm.platformName" placeholder="平台名称" />
      </el-form-item>
      <el-form-item label="平台代码" prop="platformCode">
        <el-input v-model.trim="dataForm.platformCode" placeholder="平台代码" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status" style="width:100%">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { openSaveOrUpdate, targetOptionList } from '@/api/sys/version'
export default {
  data() {
    return {
      visible: false,
      targetList: [],
      dataForm: {
        id: null,
        platformName: '',
        platformCode: '',
        targetId: '',
        status: 1,
        type: 1
      },
      dataRule: {
        targetId: [
          { required: true, message: '设置对象不能为空', trigger: 'blur' }
        ],
        platformName: [
          { required: true, message: '平台名称不能为空', trigger: 'blur' }
        ],
        platformCode: [
          { required: true, message: '平台代码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
          this.$set(this.dataForm, 'targetId', '')
        } else {
          this.dataForm.type = 1
          this.dataForm.companyId = ''
          this.dataForm.projectId = ''
          this.getTargetOptionList()
        }
      })
    },
    changeHnadle() {
      this.dataForm.targetId = ''
      this.getTargetOptionList()
    },
    // 下拉列表
    getTargetOptionList() {
      targetOptionList({ type: this.dataForm.type }).then(data => {
        this.targetList = data.result
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            if (this.dataForm.type === 1) {
              this.dataForm.companyId = this.dataForm.targetId
            } else {
              this.dataForm.projectId = this.dataForm.targetId
            }
          }
          openSaveOrUpdate({ ...this.dataForm }).then((data) => {
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
  .open-modal {
    width: 600px;
  }
</style>
