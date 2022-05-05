<template>
  <el-dialog
    custom-class="file-upload-modal"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="closeHandle"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="上传类型：" prop="type">
        <el-radio-group v-model.trim="dataForm.type" style="width:100%">
          <el-radio :label="1">图片</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否启用：" prop="status">
        <el-radio-group v-model.trim="dataForm.status" style="width:100%">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序号" />
      </el-form-item>
      <el-form-item v-if="dataForm.type === 1" label="上传图片：" prop="url">
        <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :is-zhgd="true" :limit="'image'" :action="'/advert/uploadFile'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
        <a target="_blank" style="color: #1890ff" :href="dataForm.url">{{ dataForm.url ? '查看封面' : '' }}</a>
      </el-form-item>
      <el-form-item v-if="dataForm.type === 2" label="上传视频：" prop="url">
        <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :is-zhgd="true" :limit="'mp4'" :action="'/advert/uploadFile'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
        <a target="_blank" style="color: #1890ff" :href="dataForm.url">{{ dataForm.url ? '查看视频' : '' }}</a>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { save, update } from '@/api-zhgd/sys/file-upload'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      dataForm: {
        id: '',
        supAbbreviation: '',
        projectId: this.$store.state.user.loginInfo.projectId,
        status: 0,
        sort: '',
        type: 1,
        url: ''
      },
      dataRule: {
        supName: [
          { required: true, message: '供应商名称不能为空', trigger: 'blur' }
        ],
        supAbbreviation: [
          { required: true, message: '厂家简称(控制在4个字符以内）不能为空', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '设备类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeHandle() {
      this.$refs.myUpload.$children[0].clearFiles()
    },
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
        } else {
          this.dataForm.dictType = row.dictType
        }
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const saveOrUpdate = this.dataForm.id ? update : save
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
  .file-upload-modal {
    width: 600px;
  }
</style>
