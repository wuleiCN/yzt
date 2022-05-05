<template>
  <el-dialog
    custom-class="mark-modal"
    :title="!dataForm.id ? '新增标记' : '修改标记'"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="90px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="坐标名称" prop="videoName">
        <el-input v-model.trim="dataForm.videoName" placeholder="坐标名称" />
      </el-form-item>
      <!-- <el-form-item label="X坐标" prop="longitude">
        <el-input v-model.trim="dataForm.longitude" :disabled="true" placeholder="X坐标" />
      </el-form-item>
      <el-form-item label="Y坐标" prop="latitude">
        <el-input v-model.trim="dataForm.latitude" :disabled="true" placeholder="Y坐标" />
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/statistic-dashboard/video'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        videoName: '',
        longitude: '',
        latitude: ''
      },
      dataRule: {
        videoName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      console.log(row, 'oooo')
      this.dataForm.id = row.id || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
        } else {
          this.dataForm.projectId = row.projectId
          this.dataForm.longitude = row.offsetX
          this.dataForm.latitude = row.offsetY
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveOrUpdate({ ...this.dataForm }).then((data) => {
          // saveOrUpdate({ ...this.dataForm }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList', this.dataForm.projectId)
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
  .mark-modal {
    width: 700px;
  }
</style>
