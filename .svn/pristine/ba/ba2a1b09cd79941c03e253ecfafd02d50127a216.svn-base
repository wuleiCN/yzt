<template>
  <el-dialog
    custom-class="device-issued-modal"
    :title="dataForm.deviceFactory === 'yf' ? 'logo下发' : '图片下发'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="first" label="图库" name="first">
        <el-divider content-position="left">已下发图片（ <span style="color: red">点击图片修改</span> ）</el-divider>
        <div class="slot-wrap">
          <div v-for="(item, index) in params.newArr" :key="index" class="adslot defult">
            <i v-if="item.url" class="el-icon-error" @click="delOneHandle(item.id)" />
            <div @click="isueeHandle(index)">
              <el-image
                class="defult-img-wrap"
                :src="item.url"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </div>
          </div>
        </div>
        <el-divider content-position="left">待下发图片 (已选中 <span style="color:red;font-size: 18px">{{ list.filter(item => item.isSelect).length }}</span> 张)</el-divider>
        <div class="gallery-wrap">
          <div v-for="(item, index) in list" :key="index" class="item-defult" @click="selectImg(item, index)">
            <i class="el-icon-error" @click="imgListHandleRemove(item.id)" />
            <img :style="item.isSelect ? 'border: 1px solid red;padding:3px': ''" :src="item.url" alt="">
          </div>
        </div>
        <el-dialog custom-class="cloose-modal" title="选择图片" append-to-body :visible.sync="dialogVisible1">
          <div class="gallery-wrap">
            <div v-for="(item, index) in list" :key="index" @click="onDragenter(item)">
              <img :src="item.url" alt="">
            </div>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="新图上传" name="second">
        <el-upload
          ref="myUpload"
          :action="$http.baseUrl('/user/upload')"
          list-type="picture-card"
          multiple
          :headers="{
            token: loginInfo.token
          }"
          accept=".jpg,"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <div class="tip">只能上传'jpg'格式的图片</div>
        <el-dialog custom-class="preview-modal" title="预览" append-to-body :visible.sync="dialogVisible">
          <img width="500px" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="activeName === 'second'" type="primary" :disabled="!urls.length" @click="dataFormSubmit()">确定</el-button>
      <el-button v-if="activeName === 'first'" type="primary" :disabled="!!!list.filter(item => item.isSelect).length" @click="issueHandle()">确认下发</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { imglist, imglistDelete, selectListDelete, selectList, batchSave, issue } from '@/api/gyc/device'
export default {
  data() {
    return {
      loginInfo: this.$store.state.user.loginInfo,
      urls: [],
      indexImg: '',
      isSelect: false,
      activeName: 'first',
      list: [],
      params: {
        newArr: []
      },
      seList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible1: false,
      visible: true,
      dataForm: {
        id: null
      },
      dataRule: {
        companyName: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.dataForm.deviceFactory = row.deviceFactory || ''
      this.visible = true
      this.$nextTick(() => {
        this.getImgList()
        this.handleSelectList()
      })
    },
    getImgList() {
      imglist({ deviceId: this.dataForm.id, page: 1, rows: -1 }).then((data) => {
        if (data && data.code === 1000) {
          this.list = data.result.records
        } else {
          this.$message.error(data.message)
        }
      })
    },
    isueeHandle(indexImg) {
      this.indexImg = indexImg
      this.dialogVisible1 = true
    },
    delOneHandle(id) {
      this.$confirm(`您确定删除当前已下发的图片吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        selectListDelete([id]).then((data) => {
          if (data && data.code === 1000) {
            this.handleSelectList()
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {})
    },
    issueHandle(idx) {
      const flist = this.list.filter(item => item.isSelect)
      let params = flist.map((item, index) => {
        item.galleryId = item.id
        item.deviceId = this.dataForm.id
        item.adslot = idx || index
        return { galleryId: item.galleryId, deviceId: item.deviceId, adslot: item.adslot }
      })
      // 贩毒案如果是fy厂家的设备就只能传一张图片
      if (this.dataForm.deviceFactory === 'yf') {
        params = params.length ? [params[0]] : []
      }
      this.$confirm(`您确定进行下发操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        issue(params).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
            })
            this.handleSelectList()
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {})
    },
    handleSelectList() {
      selectList({ deviceId: this.dataForm.id }).then((data) => {
        if (data && data.code === 1000) {
          this.seList = data.result
          this.params.newArr = [...new Array(this.dataForm.deviceFactory === 'yf' ? 1 : 5).keys()]
          this.params.newArr = this.params.newArr.map((item) => {
            item = { adslot: item + '' }
            this.seList.map(ele => {
              if (ele.adslot === item.adslot) {
                item = ele
              }
            })
            return item
          })
        } else {
          this.$message.error(data.message)
        }
      })
    },
    handleClick(tab) {
      if (tab.name === 'first') {
        this.getImgList()
      }
    },
    handleRemove(file, fileList) {
      this.urls = this.urls.filter(item => item !== file.response.result)
    },
    imgListHandleRemove(ids) {
      this.$confirm(`您确定删除当前选中的图片吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        imglistDelete([ids]).then((data) => {
          if (data && data.code === 1000) {
            this.getImgList()
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {})
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    selectImg(img, index) {
      this.$set(img, 'isSelect', !img.isSelect)
      const flist = this.list.filter(item => item.isSelect)
      if (flist.length > 5) {
        this.$set(img, 'isSelect', !img.isSelect)
        return this.$message.error('选择的图片不能超过五张')
      }
    },
    onDragenter(imgItem) {
      const newArr = this.params.newArr.map((item) => {
        if (this.indexImg === +item.adslot) {
          item.adslot = this.indexImg
          item.galleryId = imgItem.id
          item.deviceId = this.dataForm.id
        }
        return { galleryId: item.galleryId, deviceId: item.deviceId, adslot: item.adslot }
      })
      this.$confirm(`您确定修改当前操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        issue(newArr.filter(item => item.galleryId)).then((data) => {
          if (data && data.code === 1000) {
            this.dialogVisible1 = false
            this.handleSelectList()
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {})
    },
    handleSuccess(res) {
      if (res.code === 1000) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1000
        })
        this.urls.push(res.result)
      } else {
        this.$message.error(res.message)
      }
    },
    beforeUpload(file) {
      const fileType = file.name.split('.')[file.name.split('.').length - 1]
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!['jpg'].includes(fileType)) {
        // this.$message.error('只能上传图片')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传大小不能超过 1MB!')
        return false
      }
    },
    // 表单提交
    dataFormSubmit() {
      //  return
      batchSave(this.urls).then((data) => {
        if (data && data.code === 1000) {
          this.$refs.myUpload.clearFiles()
          this.urls = []
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000
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
  .device-issued-modal {
    width: 660px;
    .el-dialog__body {
      padding-top: 0;
    }
    .first .el-upload--picture-card {
      display: none;
    }
    .slot-wrap {
      display: flex;
    }
    .gallery-wrap {
      display: flex;
      flex-wrap: wrap;
      height: 300px;
      overflow: auto;
      img {
        width: 100px;
        height: 100px;
        margin: 10px;
      }
      .item-defult {
        position: relative;
      }
      .el-icon-error {
        color: rgba(0, 0, 0, 0.35);
        font-size: 18px;
        position: absolute;
        z-index: 1000;
        right: 0px;
        top: 0px;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item, .el-upload--picture-card {
      width: 90px;
      height: 90px;
    }
    .el-upload--picture-card {
      line-height: 100px;
    }
    .adslot {
      margin: 0 10px 10px;
    }
    .defult-img-wrap {
      cursor: pointer;
      width: 90px;
      height: 90px;
      .image-slot {
        font-size: 50px;
        margin: 20px;
      }
    }
    .defult {
      background: #f5f7fa;
      position: relative;
      .el-icon-error {
        color: rgba(0, 0, 0, 0.35);
        font-size: 18px;
        position: absolute;
        z-index: 1000;
        right: -8px;
        top: -12px;
      }
    }
    .tip {
      color: red;
      margin: 10px;
    }
  }
  .preview-modal {
    width: 540px;
  }
  .cloose-modal {
    width: 660px;
    height: 700px;
    .el-dialog__body {
      padding: 20px;
    }
    .gallery-wrap {
      height: 600px;
      width: 100%;
      div {
        display: inline-block;
        white-space:nowrap;
        img {
          width: 100px;
          height: 100px;
          margin: 10px;
        }
      }
    }
  }
</style>
