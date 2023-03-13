<template>
  <div class="statistic-dashboard-video dashboard-full-screen">
    <!-- <div class="statistic-dashboard-header">
      <FullScreen ref="FullScreen" />
      <SelectProject @newsReload="newsReload" />
    </div>
    <Nav /> -->
    <div class="statistic-dashboard-main">
      <div class="left-wrap">
        <div class="toogle">
          <span :class="isMap ? 'active' : ''" @click="changeToMap(true)">地图</span>
          <span :class="!isMap ? 'active' : ''" @click="changeToMap(false)">网格</span>
        </div>
        <div class="project-list">
          <my-upload v-show="isMap" ref="myUpload" class="uploadMap" :is-show="false" :limit="'image'" :title="'点击上传地图'" :action="'/user/upload'" @getfileList="getFileData" />
          <!-- <div
            v-for="(item, index) in dataList"
            v-show="!isMap"
            :key="index"
            class="video-project-list"
            @click="getVideoMonitorList(item.id, projectId)"
          >
            <span>{{ item.videoName }}</span>
          </div> -->
          <div v-show="!isMap" class="video-project-list">
            <el-select
              v-model="value"
              style="width: 120px"
              placeholder="请选择设备"
              clearable
              @change="(e) =>changeDevice(e)"
            >
              <el-option
                v-for="item in dataList"
                :key="item.id"
                :label="`${item.videoName}-${item.area}`"
                :value="item.id"
              />
            </el-select>
            <span>在线：<span style="color:#067D36">{{
              dataList.filter(item => {
                return item.heart;
              }).length
            }}</span></span>
            <span>离线：<span style="color:#D31B1B">{{
              dataList.filter(item => {
                return !item.heart;
              }).length
            }}</span></span>
            <div class="list-wrap">
              <div
                v-for="(item, index) in totalList"
                :key="index"
                :title="`${item.videoName}-${item.area}`"
                :class="item.heart ? 'online' : 'offline'"
              >
                <span v-if="isControl === 2">{{ item.videoName }}</span>
                <!-- <span v-else>{{ item.videoName }}</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isMap" class="right-wrap">
        <!-- <div v-if="!videoList.length" class="video-space">
          <div v-for="(v, i) in 4" :key="i+ 'a'" class="space-item" />
        </div> -->
        <div class="video-area">
          <div v-for="(item,index) in (videoList.length ? videoList : activeClass)" :key="index" :style="{ width: (100 / Math.sqrt(activeClass)) + '%', height: (100 / Math.sqrt(activeClass)) + '%' }" class="video-item">
            <div :class="selectIndex === index ? 'selectActive' : ''" class="video-item-block">
              <iframe
                :id="'container' + index"
                class="video-style"
                style="height:99%;width: 99%"
                :src="item.deviceSerial"
                allowfullscreen
              />
              <div v-if="item && item.isControl" class="zhezhao">
                <div class="contros">
                  <span v-if="item.deviceSerial.indexOf('.hd') === -1" class="video-hd" @click="chnangeHD(item, index)">标清</span>
                  <span v-else class="video-hd" @click="chnangeHD(item, index)">高清</span>
                  <span class="video-sc" @click.stop="selectVideoHandle(item, index, 'yinshiyun')">
                    <i class="el-icon-full-screen" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-for="(item,index) in videoList" :key="index" class="wrap-item">
          <div class="video-item-block" @click="fullScreen(index, item)">
            <div :id="'videoContainer' + index" />
          </div>
        </div> -->
        <el-pagination
          v-if="activeClass !== 1 && videoList.length"
          background
          :current-page="pageIndex"
          :page-size="activeClass"
          :total="total"
          @current-change="currentChangeHandle"
        />
      </div>
      <div v-if="isMap" class="right-wrap1">
        <div v-if="datailData.projectImgUrl" class="map-img" :style="projectImgUrl" @click="showMarkModal">
          <!-- {{ $refs.FullScreen && $refs.FullScreen.status }} -->
          <div
            v-for="(item, index) in site"
            :key="index"
            class="mark-wrap"
            :style="{
              left: item.longitude - 16 + 'px',
              top: item.latitude - 60 + 'px',
            }"
            @click="(e) => updateHandle(e, item)"
          >
            <div :title="item.videoName" class="mark-name inaline">
              {{ item.videoName }}
            </div>
            <span class="icon-style" @click="e => deleteHandle(e, item.id)"><i class="el-icon-circle-close" /></span>
            <img
              class="mark"
              src="@/assets/statistic-dashboard/video-mark.png"
            >
          </div>
        </div>
      </div>
      <div v-show="isMap" class="right-wrap1">
        <div>
          <!-- {{ $refs.FullScreen && $refs.FullScreen.status }} -->
        </div>
      </div>
      <!-- 弹窗 -->
      <MarkModal v-if="markVisible" ref="markModal" @refreshDataList="getMapDetail" />
      <WebSocket v-if="soketVisible" :path="`/video/heart/${projectId}/${uuid}`" :uuid="uuid" :project-id="projectId" @reloadData="reloadData" />
    </div>
  </div>
</template>
<script>
// import FullScreen from '../component/FullScreen.vue'
// import SelectProject from '../component/SelectPro.vue'
// import common from '../mixins/common'
// import Nav from '../component/Nav.vue'
import WebSocket from '@/components/webSocket'
import { videoMonitorList, videoProList, getList } from '@/api-zhgd/video-device'
import { detail, saveOrUpdateImg, delMark } from '@/api/statistic-dashboard/video'
import MyUpload from '@/components/upload'
import MarkModal from './mark-modal.vue'
export default {
  components: {
    MyUpload,
    MarkModal,
    WebSocket
    // FullScreen,
    // SelectProject,
    // Nav
  },
  // mixins: [common],
  data() {
    return {
      isMap: false,
      markVisible: false,
      videoList: [],
      totalList: [],
      accessToken: '',
      FullScreenState: false,
      isControl: '',
      value: '',
      id: '',
      activeClass: 4,
      pageIndex: 1,
      total: 0,
      site: [],
      projectImgUrl: '',
      projectId: JSON.parse(sessionStorage.getItem('result')).projectId || '',
      datailData: {},
      dataList: [],
      soketVisible: false,
      selectIndex: null
    }
  },
  watch: {
    // '$store.getters.contarct'(newVal, oldVal) {
    //   for (const key in playObj) {
    //     playObj[key].reSize(newVal.width, newVal.height)
    //     playObj[key] = ''
    //   }
    //   console.log(this.videoPara, this.videoList, playObj)
    // }
  },
  mounted() {
    this.getProList()
  },
  methods: {
    init(projectId) {
      this.projectId = projectId
      this.getMapDetail(projectId)
      this.getDataList(projectId)
      // this.getVideoMonitorList(null, projectId)
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    getProList() {
      videoProList().then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
          if (this.proList.length) {
            this.proName = this.proList[0].projectName
            this.projectId = this.proList[0].id
            this.value = this.proList[0].deviceList[0].id
            this.getDataList(this.projectId)
            this.visible = false
            this.getVideoMonitorList(this.value)
          }
        }
      })
    },
    // 点击某个摄像头
    selectVideoHandle(item, index) {
      const de = document.getElementById('container' + index)
      this.$set(this.videoList[index], 'deviceSerial', this.videoList[index].deviceSerial.replace(`${index + 1}.live`, `${index + 1}.hd.live`))
      de.requestFullscreen()
      if (item.isControl) {
        if (this.FullScreenState === false) {
          // 全屏
          console.log('全屏', this.FullScreenState)
          if (de.requestFullScreen) {
            de.requestFullscreen()
          } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen()
          } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen()
          } else if (de.msRequestFullscreen) {
            de.msRequestFullscreen()
          }
        } else {
        // 退出全屏
          console.log('退出全屏', this.FullScreenState)
          if (de.exitFullscreen) {
            de.exitFullscreen()
          } else if (de.mozCancelFullScreen) {
            de.mozCancelFullscreen()
          } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullscreen()
          }
        }
      }
    },
    changeToMap(value) {
      this.isMap = value
    },
    getFileData(fileList) {
      saveOrUpdateImg({ projectId: this.projectId, projectImgUrl: fileList.result }).then(data => {
        if (data && data.code === 1000) {
          this.getMapDetail(this.projectId)
        }
      })
    },
    showMarkModal(e) {
      this.markVisible = true
      this.$nextTick(() => {
        this.$refs.markModal.init({ offsetX: e.offsetX, offsetY: e.offsetY, projectId: this.projectId })
      })
    },
    updateHandle(e, item) {
      e.stopPropagation()
      this.markVisible = true
      this.$nextTick(() => {
        this.$refs.markModal.init({ ...item, projectId: this.projectId })
      })
    },
    getMapDetail(projectId) {
      detail({ projectId }).then(data => {
        if (data && data.code === 1000) {
          this.datailData = data.result
          this.projectImgUrl = `background: url(${data.result.projectImgUrl}) center no-repeat no-repeat;background-size: 100% 100%;`
          this.site = data.result.site || []
        }
      })
    },
    show(item) {
      this.player = null
      if (item && item.isControl === 0) {
        // 本地模式
      } else {
        this.src = item.deviceSerial
      }
    },
    chnangeHD(item, index) {
      if (item.deviceSerial.indexOf('.hd') === -1) {
        this.$set(this.videoList[index], 'deviceSerial', this.videoList[index].deviceSerial.replace(`${index + 1}.live`, `${index + 1}.hd.live`))
      } else {
        this.$set(this.videoList[index], 'deviceSerial', this.videoList[index].deviceSerial.replace(`${index + 1}.hd.live`, `${index + 1}.live`))
      }
    },
    // 获取设备列表
    getDataList(projectId) {
      return getList({ projectId: projectId, isDel: 0 }).then(data => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records
          return this.dataList
        } else {
          this.dataList = []
        }
      })
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      if (this.isControl === 2) {
        const count = this.activeClass * (this.pageIndex - 1)
        this.videoList = this.totalList.slice(count, this.activeClass + count)
      }
    },
    // 获取数据列表
    getVideoMonitorList(id, projectId) {
      videoMonitorList({
        id,
        isDel: 0,
        rows: this.activeClass,
        page: this.pageIndex,
        projectId
      }).then(data => {
        if (data && data.code === 1000) {
          var arr = []
          var result = data.result.result.records
          this.accessToken = result[0].accessToken
          this.totalList = this.getVideoList(result)
          arr = this.totalList
          this.total = arr.length
          this.videoList = []
          console.log('accessToken', result)
          for (let index = 0; index < 4; index++) {
            const element = arr[index] || {}
            if (arr[index]) this.show(arr[index])
            this.videoList.push(element)
          }
          // 如果是本地海康sdk开启websoket(给后台关流使用)
          const hasHk = this.videoList.filter(item => item && item.isControl === 0)
          if (hasHk.length) {
            console.log(hasHk.length, '开启海康sdk长连接')
            this.soketVisible = true
          }
        }
      })
    },
    cancelFullScreen() {
      console.log(123)
      // playObj[this.selectIndex].cancelFullScreen()
      // const url = `ezopen://open.ys7.com/E97206343/${this.selectIndex + 1}.live`
      // if (this.selectIndex !== null) {
      //   playObj[this.selectIndex].stop().then(() => {
      //     playObj[this.selectIndex].play({ url: url, accessToken: this.accessToken })
      //   })
      // }
    },
    // 删除
    deleteHandle(e, id) {
      e.stopPropagation()
      // this.$confirm(`您确定进行删除操作吗?`, '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   'modalAppendToBody': false,
      //   type: 'warning'
      // }).then(() => {
      //   delMark({ id, projectId: this.projectId }).then((data) => {
      //     if (data && data.code === 1000) {
      //       this.$message({
      //         message: '操作成功',
      //         type: 'success',
      //         duration: 1000,
      //         onClose: () => {
      //           this.getMapDetail(this.projectId)
      //         }
      //       })
      //     } else {
      //       this.$message.error(data.msg)
      //     }
      //   })
      // }).catch(() => {})
      delMark({ id, projectId: this.projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.getMapDetail(this.projectId)
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getVideoList(data) {
      const list = []
      data.map(item => {
        this.isControl = item.isControl
        const lastStr = item.deviceSerial ? item.deviceSerial.split('/')[item.deviceSerial.split('/').length - 1] : ''
        if (item.isControl === 2) {
          item.childVideo && item.childVideo.map((ele, index) => {
            ele.pId = item.id
            ele.accessToken = item.accessToken
            ele.isControl = item.isControl
            ele.deviceSerial = `https://open.ys7.com/ezopen/h5/iframe?url=${item.deviceSerial.replace(lastStr, `${index + 1}.live`)}&autoplay=1&accessToken=${ele.accessToken}`
            // ele.deviceSerial = `${item.deviceSerial.replace(lastStr, `${index + 1}.live`)}`
            list.push(ele)
          })
        } else if (item.isControl === 1) {
          item.deviceSerial = 'https://open.ys7.com/ezopen/h5/iframe?url=' + item.deviceSerial + '&autoplay=1&accessToken=' + item.accessToken
          list.push(item)
        }
      })
      return list
    },
    async changeDevice(id) {
      this.pageIndex = 1
      this.getVideoMonitorList(id)
      const dataList = await this.getDataList()
      if (this.dataList.length) this.value = dataList.find(item => item.id === id).id
    }
  }
}
</script>
<style lang="scss">
// 计算方式 26px -> 1rem
.statistic-dashboard-video {
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  background: url('../../../assets/statistic-dashboard/sq-bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 41.54rem;
  color: #fff;
  font-size: .77rem;
  .statistic-dashboard-header {
    position: relative;
    height: 3.85rem;
    background: url('../../../assets/statistic-dashboard/top-header.png') center no-repeat no-repeat;
    background-size: 100% 100%;
  }
  .statistic-dashboard-main {
    display: flex;
    // padding: 0 .74rem;
    .left-wrap {
      flex: 12.31;
      // height: 35rem;
      background: url('../../../assets/statistic-dashboard/video-left.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .toogle {
        width: 8rem;
        height: 2.85rem;
        line-height: 2.85rem;
        text-align: center;
        border: .04rem solid #0154BE;
        margin: 0 auto;
        margin-top: 1.54rem;
        span {
          width: 40%;
          cursor: pointer;
          display: inline-block;
        }
      }
      .project-list {
        // line-height: 2.15rem;
        .video-project-list {
          text-align: center;
          margin: 1.38rem 0 1.38rem 0;
          .list-wrap {
            height: 515px;
            width: 90%;
            padding-left: .58rem;
            overflow-y: auto;
            margin-left: 50%;
            transform: translateX(-50%);
            div {
              height: 30px;
              line-height: 30px;
              margin-top: .38rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .online {
              color: #067d36;
            }
            .offline {
              color: #d31b1b;
            }
          }
        }
        .uploadMap {
          margin: 50% 0 0 50%;
          transform: translate(-50%, -50%);
        }
        // div {
        //   text-align: center;
        //   margin-top: 1rem;
        // }
      }
    }
    .right-wrap {
      flex: 61;
      width: 100%;
      // height: 35rem;
      .video-space {
        display: flex;
        flex-wrap: wrap;
        width: 99.8%;
        height: 100%;
        .space-item {
          width: 50%;
          border: 1px solid #00EDFF;
          background: #000;
        }
      }
      // margin-top: .2rem;
      .wrap-item {
        width: 50%;
        border: .04rem solid #0154BE;
        .video-item-block {
          // position: relative;
          background: #000;
          height: 100%;
          width: 100%;
          &:nth-child(n) {
            iframe {
              width: 100%;
            }
          }
          // padding: 1.35rem 0 0 .58rem;
        }
      }
      .el-pagination {
        // margin-left: 60% !important;
        // position: absolute;
        margin: .38rem .58rem 0 !important;
      }

    }
    .right-wrap1 {
      flex: 61;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 1.15rem 3.08rem;
      .map-img {
        position: relative;
        // width: 100%;
        // height: 99%;
        width: 1400px;
        height: 700px;
        .mark-wrap {
          position: absolute;
          // text-align: center;
          width: 30px;
          .mark-name {
            text-align: center;
            background: url('../../../assets/statistic-dashboard/mark-name-bg.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            width: 239.98px;
            height: 34.06px;
            line-height: 34.06px;
            margin-left: -104px;
            padding: 1px;
          }
          .icon-style {
            position: absolute;
            top: 0px;
            font-size: 20px;
            right: -105px;
          }
          img {
            width: 30px;
            height: 30px;
            margin: 0 auto;
          }
        }
      }
    }
    .inaline {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      /*clip  修剪文本。*/
    }
    .active {
      color: #00EDFF;
    }
  }
  .video-area {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    width: 100%;
    height: 33.08rem;
    .video-item {
      .video-item-block {
        position: relative;
        background: #000;
        height: 100%;
        .zhezhao {
          position: absolute;
          bottom: 0;
          height: 1.92rem;
          width: 99%;
          background: #3d3d3d;
          opacity: .9;
          user-select: none;
          text-align: left;
          // 遮罩解决点击的问题
          .contros {
            position: absolute;
            height: .92rem;
            right: 10px;
            top: 30%;
            .video-hd {
              cursor: pointer;
              color: rgb(255, 255, 255);
              font-size: 12px;
              line-height: 16px;
              display: inline-block;
              margin-right: 10px;
              line-height: .92rem;
              vertical-align: top;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
