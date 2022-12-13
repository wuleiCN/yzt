<template>
  <div class="video-manager">
    <el-container>
      <el-aside width="390px">
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
        <el-card class="project-list-card">
          <div class="project-list">
            <el-select
              v-model="value"
              style="width: 120px;margin:0 10px 0 25px;"
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
                @click="clickVideo(index)"
              >
                <i v-if="selectIndex === index" class="el-icon-video-play" />
                <span v-if="isControl === 2">{{ item.videoName }}</span>
                <!-- <span v-else>{{ item.videoName }}</span> -->
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="video-control-card">
          <span>存储模式：</span>
          <el-radio-group v-model.trim="viideoType">
            <el-radio :label="2" border>本地存储</el-radio>
            <!-- <el-radio :label="3" border>云存储</el-radio> -->
          </el-radio-group>
          <el-date-picker
            v-model="timeRange"
            clearable
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="margin-top: 15px;"
            @change="(e) => changeTimeRange(e)"
          />
        </el-card>

      </el-aside>
      <el-main>
        <div>
          <div class="video-area">
            <div :style="{ width: (100 / Math.sqrt(activeClass)) + '%', height: (100 / Math.sqrt(activeClass)) + '%' }" class="video-item">
              <div class="video-item-block">
                <iframe
                  id="container"
                  class="video-style"
                  style="height:99%;width: 99%"
                  :src="deviceSerial"
                  minutes
                  allowfullscreen
                />
              </div>
            </div>
          </div>
        </div>

      </el-main>
    </el-container>
    <WebSocket :path="'/zhgd/video/' + projectId" :project-id="projectId" @reloadData="reloadData" />
    <WebSocket v-if="soketVisible" :path="`/video/heart/${projectId}/${uuid}`" :uuid="uuid" :project-id="projectId" @reloadData="reloadData" />
    <replayModal v-if="replayModalVisible" ref="replayModal" />
  </div>
</template>
<script>
import WebSocket from '@/components/webSocket'
import replayModal from './replay-modal'
import { videoMonitorList, videoProList, getList } from '@/api-zhgd/video-device'
import { getUUID } from '@/utils'
export default {
  components: {
    WebSocket,
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
      deviceSerial: '',
      src: '',
      uuid: getUUID(),
      videoType: '',
      soketVisible: false,
      isControl: '',
      timeRange: [],
      activeClass: 1,
      replayModalVisible: false,
      pageIndex: 1,
      direction: '',
      selectIndex: '',
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      selectVideoInfo: {},
      proList: [],
      dataList: [],
      playerList: [],
      arr: [],
      value: '',
      proName: '',
      startTime: '',
      stopTime: '',
      viideoType: 2
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
          }
        }
      })
    },
    clickVideo(index) {
      this.selectIndex = index
      this.getVideoList(index)
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
      if (this.projectId) {
        this.getVideoMonitorList(id)
      }
    },
    // 选择某个设备，默认显示1个摄像头
    async changeDevice(id) {
      this.pageIndex = 1
      this.changeLayout(1, id)
      const dataList = await this.getDataList()
      if (this.dataList.length) this.value = dataList.find(item => item.id === id).id
    },
    changeTimeRange(e) {
      this.startTime = (e && e.length ? e[0] : '') + ' 00:00:00'
      this.stopTime = (e && e.length ? e[1] : '') + ' 23:00:00'
      this.getVideoMonitorList(this.value)
    },
    show(item) {
      this.player = null
      // const env = this.$httpZhgd.siteEnv() ? 'http://' : 'https://'
      if (item && item.isControl === 0) {
        // 本地模式
      } else {
        this.src = item.deviceSerial
      }
    },
    // 查询
    async searchHandle() {
      const dataList = await this.getDataList(this.projectId)
      if (this.dataList.length) this.value = dataList[0].id
      this.getVideoMonitorList()
    },
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
        projectId: this.projectId,
        startTime: this.startTime,
        stopTime: this.stopTime,
        type: this.viideoType
      }).then(data => {
        if (data && data.code === 1000) {
          this.arr = data.result.result.records
          this.totalList = this.arr[0].childVideo
          this.isControl = this.arr[0].isControl
          this.getVideoList()
          console.log(data, this.totalList)
        }
      })
    },
    getVideoList(index = 0) {
      let idx = 1
      if (index) {
        idx = this.totalList[index].channelNo
      }
      if (this.arr[0].isControl === 2) {
        const lastStr = this.arr[0].deviceSerial ? this.arr[0].deviceSerial.split('/')[this.arr[0].deviceSerial.split('/').length - 1] : ''
        this.deviceSerial = `https://open.ys7.com/ezopen/h5/iframe?url=${this.arr[0].deviceSerial.replace(lastStr, `${idx}.local.rec`)}&autoplay=1&accessToken=${this.arr[0].accessToken}`
      } else if (this.arr[0].isControl === 1) {
        this.deviceSerial = 'https://open.ys7.com/ezopen/h5/iframe?url=' + this.arr[0].deviceSerial + '&autoplay=1&accessToken=' + this.arr[0].accessToken
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.video-manager {
  .el-aside {
    margin-right: 20px;
    .el-form-item {
      margin-right: 0;
    }
  }
  .project-list-card {
    margin-bottom: 20px;
    .project-list {
      margin-left: 35px;
      font-size: 15px;
      .list-wrap {
        height: 230px;
        overflow-y: auto;
        div {
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
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
