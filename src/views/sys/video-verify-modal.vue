<template>
  <el-dialog
    custom-class="video-verify-modal"
    title="视频审核"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <div style="width:100%;margin:0 auto">
      <video class="video-verify" :src="dataForm.videoUrl" controls />
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit(1)">通过审核</el-button>
      <el-button type="primary" @click="dataFormSubmit(2)">审核拒绝</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { verify } from '@/api/sys/video'
export default {
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
      dataForm: {},
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
    // 打开弹窗
    init(row) {
      this.dataForm = {}
      this.visible = true
      this.$nextTick(() => {
        this.dataForm = row
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 表单提交
    dataFormSubmit(status) {
      verify({ ...this.dataForm, status }).then((data) => {
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
  }
}
</script>
<style lang="scss">
  .video-verify-modal {
    width: 600px;
    .video-verify {
      width: 100%;
    }
  }
</style>
