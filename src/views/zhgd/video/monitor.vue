<template>
  <div class="video-manager">
    <el-container>
      <el-aside width="300px">
        <el-form :inline="true">
          <el-form-item label="项目名称">
            <el-select
              v-if="userType === 1 || userType === 0"
              v-model="projectId"
              clearable
              filterable
              style="width: 230px"
              placeholder="请选择项目名称"
              @change="searchHandle()"
            >
              <el-option
                v-for="item in proList"
                :key="item.id"
                :label="item.projectName"
                :value="item.id"
              >
                <span style="float: left">{{ item.projectName }}</span>
              </el-option>
            </el-select>
            <span v-else class="title">{{ proName }}</span>
          </el-form-item>
        </el-form>
        <el-card class="layout-btn-card">
          <div slot="header" class="clearfix">
            <span>画面分布</span>
          </div>
          <div class="layout-btn-wrap">
            <div v-for="(item, index) in [4, 9, 16]" :key="index" class="checkered-item">
              <div @click="changeLayout(item)">
                <SelectBtn :class="activeClass == item ? 'active' : ''" :length="item" />
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="project-list-card">
          <div class="project-list">
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
                @click="selectVideo(item)"
              >
                <i v-if="palyVideo(item.channelNo)" class="el-icon-video-play" />
                <!-- <span v-if="isControl === 2">{{ item.videoName }}</span> -->
                <span>{{ item.videoName }}</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="video-control-card">
          <div class="ptz-zoom">
            <el-button @click="directionChange(8)">放大</el-button>
            <el-button @click="directionChange(9)">缩小</el-button>
          </div>
          <div class="video-control">
            <div class="control-wrap">
              <el-button
                v-for="(item, index) in orderData"
                :key="index"
                :disabled="item.disabled"
                plain
                class="control-btn"
                @click="item.key !== null ? directionChange(item.key) : stopHandle()"
              >
                <span v-if="item.key === null">暂停</span>
                <svg-icon v-else :icon-class="item.name" />
              </el-button>
            </div>
          </div>
        </el-card>

      </el-aside>
      <el-main>
        <div>
          <div class="video-area">
            <div v-for="(item,index) in videoList" :key="index" :style="{ width: (100 / Math.sqrt(activeClass)) + '%', height: (100 / Math.sqrt(activeClass)) + '%' }" class="video-item">
              <div :class="selectIndex === index ? 'selectActive' : ''" class="video-item-block">
                <iframe
                  :id="'container' + selectIndex"
                  class="video-style"
                  style="height:99%;width: 99%"
                  :src="item.deviceSerial"
                  allowfullscreen
                />
                <div class="zhezhao" @click.stop="selectVideoHandle(item, index, 'yinshiyun')" />
              </div>
            </div>
          </div>
        </div>

        <!-- <el-pagination
          v-if="activeClass !== 1"
          background
          :current-page="pageIndex"
          :page-size="activeClass"
          :total="total"
          @current-change="currentChangeHandle"
        /> -->
      </el-main>
    </el-container>
    <WebSocket :path="'/zhgd/video/' + projectId" :project-id="projectId" @reloadData="reloadData" />
    <WebSocket v-if="soketVisible" :path="`/video/heart/${projectId}/${uuid}`" :uuid="uuid" :project-id="projectId" @reloadData="reloadData" />
    <replayModal v-if="replayModalVisible" ref="replayModal" />
  </div>
</template>
<script>
import WebSocket from '@/components/webSocket'
import SelectBtn from '@/components/select-btn'
import replayModal from './replay-modal'
import { videoMonitorList, stopVideo, controlVideo, videoProList, findDeviceCapacity, startControlHKSDK, getList } from '@/api-zhgd/video-device'
import { getUUID } from '@/utils'
export default {
  components: {
    WebSocket,
    SelectBtn,
    replayModal
  },
  data() {
    return {
      orderData: [
        { key: 4, name: 'zuoshang', order: 'ptz45' },
        { key: 0, name: 'shang', order: 'ptzLeftRight' },
        { key: 6, name: 'youshang', order: 'ptz45' },
        { key: 2, name: 'zuo', order: 'ptzLeftRight' },
        { key: null, name: '' },
        { key: 3, name: 'you', order: 'ptzLeftRight' },
        { key: 5, name: 'zuoxia', order: 'ptz45' },
        { key: 1, name: 'xia', order: 'ptzLeftRight' },
        { key: 7, name: 'youxia', order: 'ptz45' }
      ],
      totalList: [],
      src: '',
      uuid: getUUID(),
      videoType: '',
      soketVisible: false,
      isControl: '',
      activeClass: 4,
      replayModalVisible: false,
      pageIndex: 1,
      total: 0,
      direction: '',
      selectIndex: '',
      channelNo: '',
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      selectVideoInfo: {},
      options: [],
      proList: [],
      dataList: [],
      playerList: [],
      videoList: [],
      value: '',
      proName: ''
    }
  },
  mounted() {
    this.getProList()
  },
  methods: {
    getProList() {
      videoProList().then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
          if (this.proList.length) {
            this.proName = this.proList[0].projectName
            this.projectId = this.proList[0].id
            this.value = this.proList[0].deviceList[0].id
            this.getDataList()
            this.visible = false
            this.getVideoMonitorList(this.value)
            for (let i = 0; i < 4; i++) {
              this.videoList.push({})
            }
          }
        }
      })
    },
    // 点击某个摄像头
    selectVideoHandle(item, selectIndex, type) {
      this.selectIndex = selectIndex
      this.videoType = type
      console.log(item)
      if (item.isControl) {
        this.channelNo = item.channelNo
        findDeviceCapacity({ videoSn: item.videoSn, channelNo: item.channelNo }).then(data => {})
        console.log(selectIndex)
      } else {
        this.selectVideoInfo = {}
      }
      this.selectVideoInfo = item
    },
    // 摄像头转动指令
    directionChange(direction) {
      this.direction = direction
      if (this.selectVideoInfo.videoSn) {
        if (this.videoType === 'local') {
          startControlHKSDK({ id: this.selectVideoInfo.id, direction, speed: 10, isStop: 0 }).then(data => {})
        }
        if (this.videoType === 'yinshiyun') {
          controlVideo({ videoSn: this.selectVideoInfo.videoSn, direction, channelNo: this.channelNo }).then(data => {})
        }
      } else {
        this.$message.error('请先选择摄像头')
      }
    },
    // 暂停转动
    stopHandle() {
      if (this.selectVideoInfo.videoSn) {
        if (this.videoType === 'local') {
          startControlHKSDK({ id: this.selectVideoInfo.id, direction: this.direction, speed: 10, isStop: 1 }).then(data => {})
        }
        if (this.videoType === 'yinshiyun') {
          stopVideo({
            videoSn: this.selectVideoInfo.videoSn,
            channelNo: this.channelNo,
            direction: this.direction
          }).then(data => {})
        }
      } else {
        this.$message.error('请先选择摄像头')
      }
    },
    // 关闭摄像头
    stopVideoHandle() {
      this.playerList[this.selectIndex].stop()
    },
    // 蛇摄像头播放
    startVideoHandle() {
      this.playerList[this.selectIndex].play()
    },
    reloadData(code) {
      if (code !== 1000 && code && this.projectId) {
        // 海康不支持云台控制
        if (code === 9003) return this.$message.error('开启云台控制失败,原因: 设备可能不支持的操作')
        // 海康支持云台控制
        if (code === 9002) {
          return
        }
        // 海康开始推流
        this.getDataList()
        if (code === 8131 || code === 9000 || code === 9001) {
          this.changeLayout(this.activeClass)
        }
      }
    },
    // 改变画面分布
    changeLayout(index, id) {
      this.activeClass = index
      this.videoList = []
      for (let i = 0; i < index; i++) {
        this.videoList.push({})
      }
      this.selectIndex = ''
      if (this.projectId) {
        this.getVideoMonitorList(id)
      }
    },
    // 选择某个设备，默认显示4个摄像头
    async changeDevice(id) {
      this.pageIndex = 1
      this.changeLayout(4, id)
      const dataList = await this.getDataList()
      if (this.dataList.length) this.value = dataList.find(item => item.id === id).id
    },
    // 播放某个摄像头
    selectVideo(data) {
      if (this.selectIndex !== '') {
        // this.videoList[this.selectIndex].deviceSerial = data.deviceSerial
        if (this.videoList.find(v => v.channelNo === data.channelNo) === undefined) {
          this.$set(this.videoList, this.selectIndex, { ...data })
        } else this.$message.warning('该摄像头播放中，请选择其它通道播放!')
      } else {
        this.$message.error('请选择摄像头画布')
      }
      console.log(data, this.videoList, this.videoList.find(v => v.channelNo === data.channelNo))
    },
    palyVideo(data) {
      return this.videoList.some(v => v.channelNo === data)
    },
    // 查询
    async searchHandle() {
      const dataList = await this.getDataList(this.projectId)
      if (this.dataList.length) this.value = dataList[0].id
      this.getVideoMonitorList()
    },
    // 当前页
    // currentChangeHandle(val) {
    //   this.pageIndex = val
    //   if (this.isControl === 2) {
    //     const count = this.activeClass * (this.pageIndex - 1)
    //     this.videoList = this.totalList.slice(count, this.activeClass + count)
    //   }
    // },
    // 获取设备下拉
    getDataList(projectId) {
      return getList({ projectId: this.projectId, isDel: 0 }).then(data => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records
          return this.dataList
        } else {
          this.dataList = []
        }
      })
    },
    // 获取数据列表
    getVideoMonitorList(id) {
      videoMonitorList({
        id,
        isDel: 0,
        rows: this.activeClass,
        page: this.pageIndex,
        projectId: this.projectId
      }).then(data => {
        if (data && data.code === 1000) {
          var arr = []
          var result = data.result.result.records
          this.totalList = this.getVideoList(result)
          arr = this.totalList
          this.total = arr.length
          console.log('arr', arr)
          // for (let index = 0; index < this.activeClass; index++) {
          //   const element = arr[index] || {}
          //   this.videoList.push(element)
          // }
          // 如果是本地海康sdk开启websoket(给后台关流使用)
          // const hasHk = this.videoList.filter(item => item && item.isControl === 0)
          // if (hasHk.length) {
          //   console.log(hasHk.length, '开启海康sdk长连接')
          //   this.soketVisible = true
          // }
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
            ele.deviceSerial = `https://open.ys7.com/ezopen/h5/iframe?url=${item.deviceSerial.replace(lastStr, `${ele.channelNo}.hd.live`)}&autoplay=1&accessToken=${ele.accessToken}`
            // item.deviceSerial = 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/C11649978/1.hd.cloud.rec?begin=20221120060000&end=20221121130000&accessToken=at.d23kop2scc5x99qg1kdpqo5db09d8twz-5j3flyghh4-0pguahm-uiulx7123'
            list.push(ele)
          })
        } else if (item.isControl === 1) {
          item.deviceSerial = 'https://open.ys7.com/ezopen/h5/iframe?url=' + item.deviceSerial + '&autoplay=1&accessToken=' + item.accessToken
          // item.deviceSerial = 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/C11649978/1.hd.local.rec?begin=20221120060000&end=20221121130000&accessToken=at.99yfwws48k0shhfsanwufs1t24mczxwz-9rimqilf4n-1nqj3j8-fena7m1tg'
          list.push(item)
        }
      })
      return list
    }
  }
}
</script>
<style lang="scss">
.video-manager {
  .el-aside {
    margin-right: 20px;
    .el-form-item {
      margin-right: 0;
    }
  }
  .layout-btn-card {
    margin-bottom: 20px;
    .el-card__header {
      border-bottom: none;
      padding: 0 20px;
    }
    .layout-btn-wrap {
      display: flex;
      justify-content:space-around;
      .active {
        .se-btn-item .btn-item-block {
          background: #1e82d2;
        }
      }
    }
  }
  .project-list-card {
    margin-bottom: 20px;
    .project-list {
      font-size: 15px;
      .list-wrap {
        height: 230px;
        overflow-y: auto;
        cursor: pointer;
        div {
          height: 30px;
          line-height: 30px;
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
  }
  .video-control-card {
    .ptz-zoom {
      margin-left: 35px;
      .el-button {
        display: inline-block;
        width: 78px;
      }
    }
    .video-control {
      width: 200px;
      margin: 0 auto;
      .control-wrap {
        .control-btn {
          margin: 5px;
          padding: 0;
          width: 50px;
          height: 35px;
          border-radius: 45px !important;
        }
      }
    }
  }
  .video-area {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    height: 670px;
    .video-item {
      .video-item-block {
        position: relative;
        background: #000;
        height: 95%;
        margin: 10px;
        .zhezhao {
          position: absolute;
          top: 0;
          height: 80%;
          width: 95%;
          // 遮罩解决点击的问题
        }
        .video-style {
          height: calc(100% - 4px); // 选中粗细
          width: calc(100% - 4px); // 选中粗细
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .selectActive {
        background: green;
      }
    }
  }
}
</style>
