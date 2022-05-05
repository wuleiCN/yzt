<template>
  <el-dialog
    custom-class="gyc-community-modal"
    :title="!dataForm.id ? '新增生活区' : '修改生活区'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="所属项目：" prop="projectId">
        <el-select v-model="dataForm.projectId" clearable filterable style="width:100%" placeholder="请选择项目">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生活区名称：" prop="liveAreaName">
        <el-input v-model.trim="dataForm.liveAreaName" placeholder="生活区名称" />
      </el-form-item>
      <el-form-item label="责任人：" prop="personLiable">
        <el-input v-model.trim="dataForm.personLiable" placeholder="责任人" />
      </el-form-item>
      <el-form-item label="联系电话：" prop="personLiablePhone">
        <el-input v-model.trim="dataForm.personLiablePhone" placeholder="联系电话" />
      </el-form-item>
      <el-form-item label="是否开启:" prop="isOpen">
        <el-radio-group v-model.trim="dataForm.isOpen" style="width:100%">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
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
import { saveOrUpdate } from '@/api/gyc/community'
export default {
  data() {
    return {
      visible: false,
      proList: [],
      dataForm: {
        id: '',
        projectId: this.$store.state.user.loginInfo.projectId,
        liveAreaName: '',
        personLiable: '',
        personLiablePhone: '',
        remark: '',
        isOpen: 1
      },
      dataRule: {
        projectId: [
          { required: true, message: '所属项目不能为空', trigger: 'blur' }
        ],
        liveAreaName: [
          { required: true, message: '生活区名称不能为空', trigger: 'blur' }
        ],
        personLiable: [
          { required: true, message: '责任人不能为空', trigger: 'blur' }
        ],
        personLiablePhone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '联系电话格式不正确', trigger: ['blur', 'change'] }
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
      this.dataForm.id = row.id || ''
      this.proList = row.proList
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
  .gyc-community-modal {
    width: 600px;
  }
</style>
