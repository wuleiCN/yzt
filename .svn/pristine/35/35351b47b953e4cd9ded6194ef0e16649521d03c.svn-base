<template>
  <div class="zhgd-elevator-page">
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
      <el-form-item label="设备名称：">
        <el-select
          v-model="elevatorId"
          placeholder="请选择设备"
          @change="e => searchHandle(e, 'elevator')"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.name + '-' +item.installAddress
            "
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
        <div class="elevator-main">
          <div class="elevator-main-left">
            <div class="main-left-top">
              <div class="left-item left-item-1">
                <div class="item-title">速度</div>
                <div class="item-value">{{ deviceInfo.speed || 0 }}</div>
                <div class="item-unit">kN.m</div>
              </div>
              <div class="left-item left-item-2">
                <div class="item-title">风速</div>
                <div class="item-value">{{ deviceInfo.windSpeed || 0 }}</div>
                <div class="item-unit">m/s</div>
              </div>
              <div class="left-item left-item-3">
                <div class="item-title">高度</div>
                <div class="item-value">{{ deviceInfo.height || 0 }}</div>
                <div class="item-unit">%</div>
              </div>
              <div class="left-item left-item-4">
                <div class="item-title">楼层</div>
                <div class="item-value">{{ deviceInfo.floor || 0 }}</div>
                <div class="item-unit">层</div>
              </div>
            </div>
            <div>
              <img style="width:55%" src="@/assets/img-zhgd/crane-bg.png" alt="">
              <Pie
                class="elevator-chart"
                :crane-data="{
                  text: '升降机载重',
                  startColor: '#8CAFFF',
                  endColor: '#5148ED',
                  min: deviceInfo.minCapacity || 0,
                  max: deviceInfo.maxCapacity || 0,
                  value:deviceInfo.laod || 0,
                  unit: 't'
                }"
              />
            </div>
          </div>
          <div class="elevator-main-right">
            <div class="right-title">升降机预警汇总统计</div>
            <!-- arr: [deviceInfo.momentWarn, deviceInfo.peopleNumWarn, deviceInfo.speedWarn, deviceInfo.tiltWarn], -->
            <Box
              :elect-data="{
                arr: [1, 2, 2, 3],
                titleArr: ['载重报警', '人数报警', '速度报警', '倾斜报警']
              }"
            />
            <!-- arr: [deviceInfo.limitUpWarn, deviceInfo.limitDownWarn, deviceInfo.topWarn, deviceInfo.otherWarn], -->
            <Box
              :elect-data="{
                arr: [deviceInfo.fallAlarmWarn, deviceInfo.speedAlarmWarn, 2, 1],
                titleArr: ['上限报警', '下限报警', '冲顶报警', '其他报警']
              }"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史明细" name="lsmx">
        <MonitorHistory :elevator-id="elevatorId" />
      </el-tab-pane>
      <el-tab-pane label="工作循环" name="gzxh">
        <MonitorWork :elevator-id="elevatorId" />
      </el-tab-pane>
    </el-tabs>
    <WebSocket :path="'/zhgd/elevator/' + elevatorId" :project-id="elevatorId" @reloadData="reloadData" />
  </div>
</template>
<script>
import MonitorHistory from './monitor-history'
// import { parseTime } from '@/utils'
import Box from './box'
import Pie from './pie'
import MonitorWork from './monitor-work'
import WebSocket from '@/components/webSocket'
import { getList as elevatorGetList, findNewRecord, elevatorProList } from '@/api-zhgd/zhgd-elevator'
export default {
  components: {
    Box,
    Pie,
    MonitorHistory,
    MonitorWork,
    WebSocket
  },
  data() {
    return {
      status: '',
      proName: '',
      elevatorId: '',
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      deviceInfo: {},
      deviceList: [],
      proList: [],
      activeName: 'ssjc'
    }
  },
  async mounted() {
    // 初始化
    this.setRem()
    // 改变窗口大小时重新设置 rem
    window.onresize = () => {
      this.setRem()
    }
    this.getProList()
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
    // 获取项目列表
    getProList() {
      elevatorProList().then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
          if (this.proList.length) {
            this.proName = this.proList[0].projectName
            this.deviceList = this.proList[0].deviceList
            this.projectId = this.deviceList[0].projectId
            this.elevatorId = this.deviceList[0].id
            this.deviceRealTimeData(this.elevatorId)
            this.getHearType()
          }
        }
      })
    },
    // 获取设备是否在线状态
    getHearType() {
      const device = this.deviceList.find(item => item.id === this.elevatorId)
      this.status = device && device.heart ? '在线' : '离线'
    },
    // 获取设备下拉列表
    getElevatorList(projectId) {
      elevatorGetList({ isDel: 0, projectId }).then(data => {
        if (data && data.code === 1000) {
          this.deviceList = data.result.records
        }
      })
    },
    reloadData(code) {
      if (code !== 1000 && code && this.projectId) {
        this.deviceRealTimeData(this.elevatorId)
        this.getElevatorList(this.projectId)
      }
    },
    // 查询
    searchHandle(e, type) {
      if (type === 'projectId') {
        this.elevatorId = '' // 切换项目清空设备名称
        this.getElevatorList(this.projectId)
      }
      if (type === 'elevator' && this.elevatorId) {
        this.getHearType()
        this.deviceRealTimeData(this.elevatorId)
      }
    },
    // 获取某个设备实时数据
    deviceRealTimeData(elevatorId) {
      findNewRecord({ elevatorId }).then(
        data => {
          if (data && data.code === 1000) {
            this.deviceInfo = data.result || {}
          }
        }
      )
    }
  }
}
</script>
<style lang="scss">
.zhgd-elevator-page {
  .el-card__body {
    height: 100%;
  }
  .el-form {
    height: 33px;
    margin: 5px 0;
    .title {
      font-size: 1.25rem;
    }
    .el-divider {
      width: 2px;
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
    .elevator-main {
      display: flex;
      .elevator-main-left {
        width: 50%;
        .main-left-top {
          height: 18.75rem;
          position: relative;
          .left-item {
            color: #fff;
            width: 7rem;
            height: 7rem;
            border-radius: 2.19rem;
            vertical-align: middle;
            padding-top: 1rem;
            text-align: center;
            position: absolute;
            .item-title {
              font-size: 1.56rem;
            }
            .item-value {
              font-size: 2rem;
            }
          }
          .left-item-1 {
            left: 10%;
            top: 50%;
            background: linear-gradient(90deg, #EA667D, #F09D5E);
          }
          .left-item-2 {
            left: 32%;
            top: 25%;
            background: linear-gradient(90deg, #5171FD, #C97AFD);
          }
          .left-item-3 {
            left: 55%;
            top: 10%;
            background: linear-gradient(90deg, #3DAEF6, #747BFC);
          }
          .left-item-4 {
            left: 75%;
            top: 55%;
            background: linear-gradient(90deg, #41D79C, #A7E25F);
          }
        }
        .elevator-chart {
          position: absolute;
          top: 50%;
          left: 28%;
          width: 20rem;
          z-index: 1;
        }
      }
      .elevator-main-right {
        width: 50%;
        .right-title {
          position: absolute;
          top: 3%;
          font-weight: 600;
          font-size: 1.25rem;
        }
      }
    }
  }
}
</style>
