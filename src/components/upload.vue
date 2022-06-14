<template>
  <div>
    <!-- :before-upload="beforeUpload" -->
    <el-upload
      ref="upload"
      :action="isZhgd ? $httpZhgd.baseUrl(action) : $http.baseUrl(action)"
      :headers="{
        token: loginInfo.token
      }"
      :data="{...data}"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :show-file-list="(isShow && limit === 'apk') || (isShow && limit === 'mp4') || (isShow && limit === 'zip')"
      :file-list="fileList"
    >
      <el-button :icon="icon" type="primary" size="small">{{ title }}</el-button>
      <div v-if="isShow && limit === 'apk'" slot="tip" class="el-upload__tip">只能上传.apk格式的文件或.zip</div>
      <div v-if="isShow && limit === 'doc'" slot="tip" class="el-upload__tip">只能上传.xlsx格式的文件</div>
      <div v-if="isShow && limit === 'image'" slot="tip" class="el-upload__tip">只能上传图片</div>
      <div v-if="isShow && limit === 'mp4'" slot="tip" class="el-upload__tip">只能上传.mp4的文件</div>
      <!-- <div v-else slot="tip" class="el-upload__tip">只能上传.pdf格式的文件,和图片</div> -->
    </el-upload>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  props: {
    limit: {
      type: String,
      default: ''
    },
    isZhgd: {
      type: Boolean,
      default: false
    },
    imgSize: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loginInfo: this.$store.state.user.loginInfo,
      fileList: [],
      fileName: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      if (file.status === 'success') {
        this.$http({
          url: this.$http.adornUrl('/sys/sysoss/delete'),
          method: 'post',
          data: this.$http.adornData({ id: file.id || file.response.id }, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            })
            this.$emit('init', true)
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    handlePreview(file) {
      // let path = ''
      // if (file.response && file.response.path) {
      //   path = file.response.path
      // }
      // if (file.path) {
      //   path = file.path
      // }
      // var url = this.$http.adornUrl(path) // 要预览文件的访问地址
      // window.open(this.$http.previewUrl(url))
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 1000) {
        this.fileName = fileList.name
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1000
        })
        this.$emit('getfileList', res)
      } else {
        this.$message.error(res.message)
        this.$emit('getfileList', res)
      }
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeUpload(file) {
      const fileType = file.name.split('.')[file.name.split('.').length - 1]
      const isLt100M = file.size / 1024 / 1024 < 500
      const isLt1M = file.size / 1024 / 1024 < 1
      // console.log(file, this.limit, fileType, ['jpg', 'png'].includes(fileType))
      if (!['jpg', 'png'].includes(fileType) && this.limit === 'image') {
        this.$message.error('只能上传图片')
        return false
      } else if ((fileType !== 'apk' && fileType !== 'zip') && this.limit === 'apk') {
        this.$message.error('只能上传.apk的文件或.zip文件')
        return false
      } else if (fileType !== 'xlsx' && this.limit === 'doc') {
        this.$message.error('只能上传.xlsx格式的文件')
        return false
      } else if (!['swx', 'gz', 'zip'].includes(fileType) && this.limit === 'swx&gz&zip') {
        // this.$message.error('只能上传.swx的文件')
        this.$message.error('只能上传.swx,.gz,.zip格式的文件')
        return false
      } else if (fileType !== 'mp4' && this.limit === 'mp4') {
        this.$message.error('只能上传.mp4的文件')
        return false
      } else if (!['jpg', 'png', 'pdf'].includes(fileType) && this.limit === 'png&pdf') {
        this.$message.error('只能上传.pdf格式的文件,和图片')
        return false
      }
      if (!isLt100M) {
        this.$message.error('上传大小不能超过 500MB!')
      }
      if (!isLt1M && this.imgSize) {
        this.$message.error('上传大小不能超过 1MB!')
        return false
      }
      return isLt100M
    }
  }
}
</script>
