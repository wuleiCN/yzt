<template>
  <el-dialog
    custom-class="version-modal"
    :title="!dataForm.id ? '新增主页模块' : '修改主页模块'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="模块名称：" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="模块名称" />
      </el-form-item>
      <el-form-item label="位置：" prop="sort">
        <el-input-number v-model="dataForm.sort" style="width:200px" controls-position="right" :min="0" label="位置" />
      </el-form-item>
      <!-- <el-form-item label="模块图片：" prop="url">
        <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'apk'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
      </el-form-item> -->
      <el-form-item label="模块图片：" prop="url">
        <my-upload ref="myUpload" :title="'点击上传'" :is-show="true" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
        <a target="_blank" style="color: #1890ff" :href="dataForm.url">{{ dataForm.url ? '查看模块图片' : '' }}</a>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/sys/cs-set'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        name: '',
        url: '',
        sort: ''
      },
      dataRule: {
        name: [
          { required: true, message: '模块名称不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '位置不能为空', trigger: 'blur' }
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
          this.dataForm = { ...this.dataForm, ...row }
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
