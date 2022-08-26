<template>
  <div class="zhgd-tower-crane-page">
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
      <el-form-item label="设备名称">
        <el-select
          v-model="craneId"
          placeholder="请选择设备"
          @change="e => searchHandle(e, 'crane')"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-divider direction="vertical" />
      <el-form-item label="当前状态：">
        <span v-if="status ==='在线'" class="current-status"><el-tag type="success">在线</el-tag></span>
        <span v-if="status ==='离线'" class="current-status"><el-tag type="danger">离线</el-tag></span>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" class="tabs-style">
      <el-tab-pane label="实时监测" name="ssjc">
        <div class="tower-crane-main">
          <div class="main-top">
            <div class="main-top-item item-1">
              <div class="item-title">风速</div>
              <div class="item-unit">
                <span class="value">{{ deviceInfo.windSpeed || 0 }}</span>
                <span class="unit">m/s</span>
              </div>
            </div>
            <div class="main-top-item item-2">
              <div class="item-title">力矩</div>
              <div class="item-unit">
                <span class="value">{{ deviceInfo.moment || 0 }}</span>
                <span class="unit">kN.m</span>
              </div>
            </div>
            <div class="main-top-item item-3">
              <div class="item-title">高度</div>
              <div class="item-unit">
                <span class="value">{{ deviceInfo.height || 0 }}</span>
                <span class="unit">m</span>
              </div>
            </div>
            <div class="main-top-item item-4">
              <div class="item-title">角度</div>
              <div class="item-unit">
                <span class="value">{{ deviceInfo.slewingSpeed || 0 }}</span>
              </div>
            </div>
            <div class="main-top-item item-5">
              <div class="item-title">幅度</div>
              <div class="item-unit">
                <span class="value">{{ deviceInfo.range || 0 }}</span>
              </div>
            </div>
            <div class="main-top-item item-6">
              <div class="item-title">倾角</div>
              <div class="item-unit">
                <span class="value">{{ deviceInfo.obliguity || 0 }}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="main-wrap">
              <div class="main-left">
                <!-- <div class="main-left-top">
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
                    <div class="item-value">{{ deviceInfo.foor || 0 }}</div>
                    <div class="item-unit">层</div>
                  </div>
                </div> -->
                <div class="img-wrap">
                  <img style="width:87%" src="@/assets/img-zhgd/elevator-bg.png" alt="">
                  <Pie
                    class="crane-chart"
                    :crane-data="{
                      text: '塔吊载重',
                      startColor: '#8CAFFF',
                      endColor: '#5148ED',
                      min: deviceInfo.minCapacity || 0,
                      max: deviceInfo.maxCapacity || 0,
                      value:deviceInfo.loadT || 0,
                      unit: 't'
                    }"
                  />
                </div>
              </div>
              <div class="main-right">
                <div class="right-title">塔吊预警汇总统计</div>
                <!-- arr: [deviceInfo.momentWarn, deviceInfo.peopleNumWarn, deviceInfo.speedWarn, deviceInfo.tiltWarn], -->
                <Box
                  :elect-data="{
                    arr: [deviceInfo.momentWarn, 2, 2, 2],
                    titleArr: ['限位报警', '倾斜报警', '吊重报警', '风速报警']
                  }"
                />
                <!-- arr: [deviceInfo.collisionWarn, deviceInfo.craneCollisionWarn, deviceInfo.momentWarn, deviceInfo.entryBanWarn], -->
                <Box
                  :elect-data="{
                    arr: [1, deviceInfo.craneCollisionWarn, deviceInfo.momentWarn,1],
                    titleArr: ['障碍物碰撞', '塔吊碰撞', '力矩故障', '进入禁行区']
                  }"
                />
              </div>
            </div>

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史明细" name="lsmx">
        <MonitorHistory :crane-id="craneId" />
      </el-tab-pane>
      <el-tab-pane label="工作循环" name="gzxh">
        <MonitorWork :crane-id="craneId" />
      </el-tab-pane>
    </el-tabs>
    <WebSocket :path="'/zhgd/crane/' + craneId" :project-id="craneId" @reloadData="reloadData" />
  </div>
</template>
<script>
import MonitorHistory from './monitor-history'
import MonitorWork from './monitor-work'
import Box from './box'
import Pie from './pie'
import WebSocket from '@/components/webSocket'
import { getList as craneGetList, findNewRecord, craneProList } from '@/api-zhgd/zhgd-tower-crane'
export default {
  components: {
    MonitorHistory,
    MonitorWork,
    Box,
    Pie,
    WebSocket
  },
  data() {
    return {
      status: '',
      proName: '',
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      craneId: '',
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
    window.addEventListener('resize', this.setRem())
    this.getProList()
  },
  beforeDestroy() {
    document.documentElement.style.fontSize = '16px'
    window.removeEventListener('resize', this.setRem())
  },
  methods: {
    setRem() {
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
      craneProList().then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
          if (this.proList.length) {
            this.proName = this.proList[0].projectName // 项目名称
            this.deviceList = this.proList[0].deviceList // 设备列表
            this.projectId = this.deviceList[0].projectId // 项目id
            this.craneId = this.deviceList[0].id // 设备id
            this.deviceRealTimeData(this.craneId)
            this.getHearType()
          }
        }
      })
    },
    // 获取设备下拉列表
    getCraneList(projectId) {
      craneGetList({ isDel: 0, projectId }).then(data => {
        if (data && data.code === 1000) {
          this.deviceList = data.result.records
        }
      })
    },
    // 获取设备是否在线状态
    getHearType() {
      const device = this.deviceList.find(item => item.id === this.craneId)
      this.status = device && device.heart ? '在线' : '离线'
    },
    reloadData(code) {
      if (code !== 1000 && code && this.projectId) {
        this.deviceRealTimeData(this.craneId)
        this.getCraneList(this.projectId)
      }
    },
    // 查询
    searchHandle(e, type) {
      if (type === 'projectId') {
        this.craneId = '' // 切换项目清空设备名称
        this.getCraneList(this.projectId)
      }
      if (type === 'crane' && this.craneId) {
        this.getHearType()
        this.deviceRealTimeData(this.craneId)
      }
    },
    // 获取某个设备实时数据
    deviceRealTimeData(craneId) {
      findNewRecord({ craneId }).then(
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
.zhgd-tower-crane-page {
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
    .tower-crane-main {
      .main-top {
        display: flex;
        .main-top-item {
          padding: .8rem;
          color: #fff;
          width: 16.6%;
          background: pink;
          margin: 0 .63rem;
          height: 5.25rem;
          border-radius: .63rem;
          .item-title {
            font-size: 1.36rem;
          }
          .item-unit {
            .value {
              font-size: 2.2rem;
            }
            .unit {
              font-size: 1.25rem;
            }
          }
        }
        .item-1 {
          background: linear-gradient(90deg, #5171FD, #C97AFD);
        }
        .item-2 {
          background: linear-gradient(90deg, #C97AFD, #3DAEF6);
        }
        .item-3 {
          background: linear-gradient(90deg, #3DAEF6, #747BFC);
        }
        .item-4 {
          background: linear-gradient(90deg, #747BFC, #EA667D);
        }
        .item-5 {
          background: linear-gradient(90deg, #EA667D, #F09D5E);
        }
        .item-6 {
          background: linear-gradient(90deg, #F09D5E, #41D79C);
        }
      }
      .main-wrap {
        display: flex;
        .main-left {
          width: 50%;
            .img-wrap {
              margin-top: 4rem;
            }
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
          .crane-chart {
            position: absolute;
            top: 50%;
            left: 33%;
            width: 20rem;
            z-index: 1;
          }
        }
        .main-right {
          width: 50%;
          .right-title {
            padding-top: 1.05rem;
            font-weight: 600;
            font-size: 1.25rem;
          }
        }
      }
    }
  }
}
</style>
