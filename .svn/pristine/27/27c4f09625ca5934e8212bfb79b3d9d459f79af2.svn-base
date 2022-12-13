<template>
  <div class="vehicle-monitor-page">
    <el-form :inline="true">
      <el-form-item label="项目名称：">
        <el-select
          v-if="userType === 1 || userType === 0"
          v-model="projectId"
          filterable
          placeholder="请选择项目名称"
          @change="e => searchHandle(e, 'projectId')"
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
      <el-divider direction="vertical" />
      <el-form-item label="设备名称" prop="id">
        <el-select
          v-model="vehicleId"
          placeholder="请选择"
          @change="e => searchHandle(e, 'vehicleId')"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.deviceName + '-' +item.installAddress"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-divider direction="vertical" />
      <el-form-item label="当前状态：" prop="elevatorId">
        <span v-if="status ==='在线'" class="current-status"><el-tag type="success">在线</el-tag></span>
        <span v-if="status ==='离线'" class="current-status"><el-tag type="danger">离线</el-tag></span>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" class="tabs-style">
      <el-tab-pane label="实时监测" name="ssjc">
        <div class="ssjc-wrap">
          <el-card class="ssjc-left">
            <div class="left-title">车辆进出实时情况</div>
            <div class="ssjc-left-wrap">
              <el-form :inline="true">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="车牌号：">
                      <span class="item-value">{{ deviceInfo.vehicleNo || '暂无数据' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="通道名称：">
                      <span class="item-value">{{ deviceInfo.gateinName || '暂无数据' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="进出类型：">
                      <span class="item-value">{{ deviceInfo.inOut ? (deviceInfo.inOut === 1 ? '进' : '出') : '暂无数据' }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="车辆类型：">
                      <span v-if="deviceInfo.carType === 1" class="item-value">小型车</span>
                      <span v-if="deviceInfo.carType === 2" class="item-value">中型车</span>
                      <span v-if="deviceInfo.carType === 3" class="item-value">泥头车</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="进出时间：">
                      <span class="item-value">{{ deviceInfo.liftTime || '暂无数据' }}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="8">
                    <el-form-item label="设备状态：">
                      <span>{{ status }}</span>
                    </el-form-item>
                  </el-col> -->
                </el-row>
              </el-form>
              <img class="vehicle-img" :src="deviceInfo.img" alt="">
            </div>
          </el-card>
          <el-card class="ssjc-right">
            <div class="ssjc-right-wrap">
              <div class="right-item item-wd">
                今日进车辆/泥头车
                <div class="item-num">{{ deviceInfo.getInCar || 0 }}/{{ deviceInfo.getInCarBig || 0 }}</div>
                <el-progress :show-text="false" :stroke-width="12" :percentage="50" />
                <img src="@/assets/img-zhgd/car.png" alt="">
              </div>
              <div class="right-item item-sd">
                今日进出车次/泥头车
                <div class="item-num">{{ deviceInfo.getInOutCarCount || 0 }}/{{ deviceInfo.getInOutCarCountBig || 0 }}</div>
                <el-progress :show-text="false" :stroke-width="12" :percentage="50" />
                <img src="@/assets/img-zhgd/car1.png" alt="">
              </div>
              <div class="right-item item-fs">
                今日进车次/泥头车
                <div class="item-num">{{ deviceInfo.getInCarCount || 0 }}/{{ deviceInfo.getInCarCountBig || 0 }}</div>
                <el-progress :show-text="false" :stroke-width="12" :percentage="50" />
                <img src="@/assets/img-zhgd/car2.png" alt="">
              </div>
              <div class="right-item item-fx">
                今日累计进出/泥头车
                <div class="item-num">{{ deviceInfo.getInOutCar || 0 }}/{{ deviceInfo.getInOutCarBig || 0 }}</div>
                <el-progress :show-text="false" :stroke-width="12" :percentage="50" />
                <img src="@/assets/img-zhgd/car3.png" alt="">
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史明细" name="lsmx">
        <MonitorHistory :device-id="deviceId" />
      </el-tab-pane>
    </el-tabs>
    <!-- <WebSocket path="/zhgd/vehicle" @reloadData="reloadData" /> -->
    <WebSocket :path="'/zhgd/vehicle/' + vehicleId" :project-id="vehicleId" @reloadData="reloadData" />
  </div>
</template>
<script>
import MonitorHistory from './monitor-history'
import { parseTime } from '@/utils'
import WebSocket from '@/components/webSocket'
import { findVehicleDeviceList, findNewVehicleRecordById, vehicleProList } from '@/api-zhgd/vehicle-monitor'
export default {
  components: {
    MonitorHistory,
    WebSocket
  },
  data() {
    return {
      status: '',
      proName: '',
      vehicleId: '',
      deviceId: '',
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      deviceInfo: {},
      deviceList: [],
      proList: [],
      activeName: 'ssjc'
    }
  },
  mounted() {
    // 初始化
    this.setRem()
    // 改变窗口大小时重新设置 rem
    window.addEventListener('resize', this.setRem())
    this.getProList()
  },
  beforeDestroy() {
    document.documentElement.style.fontSize = '16px'
    window.removeEventListener('resize', this.setRem())
  },
  methods: {
    setRem() {
      // 基准大小
      const baseSize = 16
      const basePc = baseSize / 1920 // 表示1920的设计图,使用100PX的默认值
      let vW = window.innerWidth // 当前窗口的宽度
      const vH = window.innerHeight // 当前窗口的高度
      // 非正常屏幕下的尺寸换算
      const dueH = (vW * 1080) / 1920
      if (vH < dueH) {
        // 当前屏幕高度小于应有的屏幕高度，就需要根据当前屏幕高度重新计算屏幕宽度
        vW = (vH * 1920) / 1080
      }
      const rem = vW * basePc // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值
      document.documentElement.style.fontSize = rem + 'px'
    },
    getProList() {
      vehicleProList().then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
          if (this.proList.length) {
            this.proName = this.proList[0].projectName
            this.deviceList = this.proList[0].deviceList
            this.projectId = this.deviceList[0].projectId
            this.vehicleId = this.deviceList[0].id
            this.deviceId = this.deviceList[0].deviceId
            this.deviceRealTimeData(this.deviceId)
            this.getHearType()
          }
        }
      })
    },
    // 获取设备下拉列表
    getVehicleList(projectId) {
      findVehicleDeviceList({ isDel: 0, projectId }).then(data => {
        if (data && data.code === 1000) {
          this.deviceList = data.result.records
        }
      })
    },
    // 获取设备是否在线状态
    getHearType() {
      const device = this.deviceList.find(item => item.id === this.vehicleId)
      this.status = device && device.heart ? '在线' : '离线'
    },
    // websocket刷新
    reloadData(code) {
      if (code !== 1000 && code && this.projectId) {
        this.deviceRealTimeData(this.deviceId)
        this.getVehicleList(this.projectId)
      }
    },
    // 查询
    searchHandle(e, type) {
      if (type === 'projectId') {
        this.vehicleId = ''
        this.getVehicleList(this.projectId)
      }
      if (type === 'vehicleId' && this.vehicleId) {
        this.deviceId = this.deviceList.filter(item => item.id === this.vehicleId)[0].deviceId
        this.getHearType()
        this.deviceRealTimeData(this.deviceId)
      }
    },
    // 获取某个设备实时数据
    deviceRealTimeData(deviceId) {
      findNewVehicleRecordById({ deviceId }).then(
        data => {
          if (data && data.code === 1000) {
            this.deviceInfo = data.result || {}
            if (this.deviceInfo.liftTime) {
              this.deviceInfo.liftTime = parseTime(this.deviceInfo.liftTime, '{y}-{m}-{d} {h}:{i}:{s}')
            }
          }
        }
      )
    }
  }
}
</script>
<style lang="scss">
.vehicle-monitor-page {
  .el-card__body {
    height: 100%;
  }
  .el-form {
    height: 2.06rem;
    margin: .31rem 0;
    .title {
      font-size: 1.25rem;
    }
    .el-divider {
      width: .13rem;
      height: 2rem;
    }
  }
  .tabs-style {
    height: 97%;
    .el-tabs__content {
      height: 90%;
      .el-tab-pane {
        height: 100%;
      }
    }
    .ssjc-wrap {
      display: flex;
      height: 100%;
      .left-title {
        font-size: 1.88rem;
        margin-bottom: .63rem;
      }
      .ssjc-left {
        flex: 2;
        .ssjc-left-wrap {
          .el-form-item--small.el-form-item {
            margin-bottom: 0;
            .item-value {
              color: #3C75C2;
            }
          }
          .vehicle-img {
            margin-top: 1.5rem;
            width: 90%;
            height: 37.5rem;
          }
        }

      }
      .ssjc-right {
        flex: 1;
        margin-left: 1.25rem;

        .el-card__body {
          width: 100%;
          .ssjc-right-wrap {
            height: 100%;
            flex-wrap: wrap;
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center;     /* 垂直居中 */
            .right-item {
              width: 100%;
              line-height: 3rem;
              padding: .63rem;
              color: #fff;
              font-size: 1.13rem;
              height: 9.2rem;
              margin-bottom: 1.25rem;
              border-radius: .5rem;
              .item-num {
                font-size: 1.88rem;
              }
            }
          }
        }
        .item-wd {
          position: relative;
          background: linear-gradient(90deg, #5171fd 0%, #c97afd 100%);
          .el-progress-bar__outer {
            background: #e3dddd;
          }
          .el-progress-bar__inner {
            background: linear-gradient(90deg, #859cff 0%, #f2f7f9 100%);
          }
          img {
            height: 3.13rem;
            position: absolute;
            right: 3.13rem;
            top: 1.25rem;
          }
        }
        .item-sd {
          position: relative;
          background: linear-gradient(90deg, #3daef6 0%, #747bfc 100%);
          .el-progress-bar__outer {
            background: #e3dddd;
          }
          .el-progress-bar__inner {
            background: linear-gradient(90deg, #5fbafd 0%, #f2f7f9 100%);
          }
          img {
            height: 3.13rem;
            position: absolute;
            right: 3.13rem;
            top: 1.25rem;
          }
        }
        .item-fs {
          position: relative;
          background: linear-gradient(90deg, #ea667d 0%, #f09d5e 100%);
          .el-progress-bar__outer {
            background: #e3dddd;
          }
          .el-progress-bar__inner {
            background: linear-gradient(90deg, #ed7a71 0%, #f2f7f9 100%);
          }
          img {
            height: 3.13rem;
            position: absolute;
            right: 3.13rem;
            top: 1.25rem;
          }
        }
        .item-fx {
          position: relative;
          background: linear-gradient(90deg, #41d79c 0%, #a7e25f 100%);
          .el-progress-bar__outer {
            background: #e3dddd;
          }
          .el-progress-bar__inner {
            background: linear-gradient(90deg, #6bdc83 0%, #f2f7f9 100%);
          }
          img {
            height: 3.13rem;
            position: absolute;
            right: 3.13rem;
            top: 1.25rem;
          }
        }
      }
    }

  }
}
</style>
