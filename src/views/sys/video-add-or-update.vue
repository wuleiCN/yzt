<template>
  <el-dialog
    custom-class="video-modal"
    :title="!dataForm.id ? '新增视频' : '修改视频'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="closeHandle"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="视频名称：" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="视频名称" />
      </el-form-item>
      <el-form-item label="视频类型：" prop="type">
        <el-select v-model.trim="dataForm.type" style="width:100%" clearable placeholder="请选择视频类型">
          <el-option v-for="(item, index) in selectList" :key="index" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频简介：" prop="intro">
        <el-input v-model.trim="dataForm.intro" type="textarea" placeholder="视频简介" />
      </el-form-item>
      <el-form-item label="视频封面：" prop="coverImg">
        <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'coverImg')" />
        <a target="_blank" style="color: #1890ff" :href="dataForm.coverImg">{{ dataForm.coverImg ? '查看封面' : '' }}</a>
      </el-form-item>
      <el-form-item label="上传视频：" prop="videoUrl">
        <my-upload ref="myUpload1" :is-show="true" :title="'点击上传'" :limit="'mp4'" :action="'/video/upload'" @getfileList="(fileList) => getFileData(fileList, 'videoUrl')" />
        <a target="_blank" style="color: #1890ff" :href="dataForm.videoUrl">{{ dataForm.videoUrl ? '查看视频' : '' }}</a>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">提交审核</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/sys/video'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  props: {
    selectList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        name: '',
        intro: '',
        type: '',
        coverImg: '',
        videoUrl: ''
      },
      dataRule: {
        name: [
          { required: true, message: '视频名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择视频类型', trigger: 'blur' }
        ],
        coverImg: [
          { required: true, message: '请上传视频封面', trigger: 'blur' }
        ],
        videoUrl: [
          { required: true, message: '请上传视频', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeHandle() {
      this.$refs.myUpload1.$children[0].clearFiles()
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
          this.dataForm.createTime = null
        }
        // console.log(this.dataForm, 'this.dataForm')
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveOrUpdate({ ...this.dataForm, status: 0 }).then((data) => {
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
  .video-modal {
    width: 600px;
  }
</style>
