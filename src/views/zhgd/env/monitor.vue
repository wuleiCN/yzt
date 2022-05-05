<template>
  <div class="env-monitor-page">
    <el-form :inline="true">
      <el-form-item label="项目名称">
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
          v-model="deviceId"
          placeholder="请选择设备"
          @change="e => searchHandle(e, 'deviceId')"
        >
          <el-option
            v-for="(item, index) in deviceList"
            :key="index"
            :label=" item.deviceName + '-' + item.installAddress"
            :value="item.id"
          >
            <span style="float: left">{{ `${item.deviceName}-${item.installAddress}` }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-divider direction="vertical" />
      <el-form-item label="当前状态：" prop="elevatorId">
        <span v-if="status ==='在线'" class="current-status"><el-tag type="success">在线</el-tag></span>
        <span v-if="status ==='离线'" class="current-status"><el-tag type="danger">离线</el-tag></span>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
      <el-tab-pane label="实时监测" name="ssjc">
        <div class="env-main">
          <div class="main-left">
            <Bar
              :env-data="{
                text: 'AQI',
                startColor: '#8cafff',
                endColor: '#5148ed',
                min: deviceInfo.minAqiVal,
                max: deviceInfo.maxAqiVal,
                value: deviceInfo.aqi,
                unit: ''
              }"
            />
            <div class="update-time"> 更新时间：{{ deviceInfo.date }} </div>
            <div class="left-bottom">
              <el-form label-position="right" label-width="6.25rem" :inline="true">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="PM2.5">
                      <span>【{{ deviceInfo.pm25 }}】</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="温度">
                      <span>【{{ deviceInfo.temperature }}】</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="PM10">
                      <span>【{{ deviceInfo.pm10 }}】</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="湿度">
                      <span>【{{ deviceInfo.humidity }}】</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="TSP">
                      <span>【{{ deviceInfo.tsp }}】</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="风速">
                      <span>【{{ deviceInfo.windSpeed }}】</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="噪音">
                      <span>【{{ deviceInfo.noise }}】</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="风向">
                      <span>【{{ dist.winddirectiontoName()[deviceInfo.winddirection] }}】</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="main-center">
            <el-row>
              <el-col :span="12">
                <div class="center-item">
                  <Bar
                    :env-data="{
                      text: 'PM2.5',
                      imgPath:'/pm2.5.png',
                      startColor: '#C97AFD',
                      endColor: '#0071FD',
                      min: deviceInfo.minPm25Val,
                      max: deviceInfo.maxPm25Val,
                      value: deviceInfo.pm25,
                      unit: 'ug/m3'
                    }"
                  />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="center-item">
                  <Bar
                    :env-data="{
                      text: 'PM10',
                      imgPath:'/PM10.png',
                      startColor: '#3DAEF6',
                      endColor: '#747BFC',
                      min: deviceInfo.minPm10Val,
                      max: deviceInfo.maxPm10Val,
                      value: deviceInfo.pm10,
                      unit: 'ug/m3'
                    }"
                  />
                </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="center-item">
                  <Bar
                    :env-data="{
                      text: 'TSP',
                      imgPath:'/TSP.png',
                      startColor: '#41D79C',
                      endColor: '#A7E25F',
                      min: deviceInfo.minTspVal,
                      max: deviceInfo.maxTspVal,
                      value: deviceInfo.tsp,
                      unit: 'ug/m3'
                    }"
                  />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="center-item">
                  <Bar
                    :env-data="{
                      text: '噪音',
                      imgPath:'/noise.png',
                      startColor: '#ea667d',
                      endColor: '#f09d5e',
                      min: deviceInfo.minNoiseVal,
                      max: deviceInfo.maxNoiseVal,
                      value: deviceInfo.noise,
                      unit: 'db'
                    }"
                  />
                </div></el-col>
            </el-row>
          </div>
          <div class="main-right">
            <div class="main-right-top">
              <div class="right-item right-item-1">
                <div class="item-title">风速</div>
                <div class="item-value">{{ deviceInfo.windSpeed ? deviceInfo.windSpeed : "0" }}</div>
                <div class="item-unit">m/s</div>
              </div>
              <div class="right-item right-item-2">
                <div class="item-title">温度</div>
                <div class="item-value">{{ deviceInfo.temperature ? deviceInfo.temperature : "0" }}</div>
                <div class="item-unit">℃</div>
              </div>
              <div class="right-item right-item-3">
                <div class="item-title">湿度</div>
                <div class="item-value">{{ deviceInfo.humidity ? deviceInfo.humidity : "0" }}</div>
                <div class="item-unit">%</div>
              </div>
              <div class="right-item right-item-4">
                <div class="item-title">风向</div>
                <div class="item-value">{{ dist.winddirectiontoName()[deviceInfo.winddirection] }}</div>
              </div>
            </div>
            <div>
              <img style="width:100%" src="@/assets/img-zhgd/env-bg.png" alt="">
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史明细" name="lsmx">
        <MonitorHistory :device-id="deviceId" />
      </el-tab-pane>
    </el-tabs>
    <WebSocket :path="'/zhgd/dustEmission/' + deviceId" :project-id="deviceId" @reloadData="reloadData" />
  </div>
</template>
<script>
import Bar from './pie'
import { parseTime } from '@/utils'
import dist from '@/utils/dist'
import MonitorHistory from './monitor-history'
import WebSocket from '@/components/webSocket'
import {
  getDustEmissionList,
  findNewDustRecordById,
  envProList
} from '@/api-zhgd/env-monitor'
export default {
  components: {
    Bar,
    MonitorHistory,
    WebSocket
  },
  data() {
    return {
      dist,
      status: '',
      deviceId: '',
      deviceInfo: {},
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      deviceList: [],
      proList: [],
      proName: '',
      activeName: 'ssjc'
    }
  },
  created() {
    // 初始化
    this.setRem()
    // 改变窗口大小时重新设置 rem
    window.onresize = () => {
      this.setRem()
    }
    this.getEnvProList()
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
    // 获取设备下拉列表
    getDustEmList(projectId) {
      getDustEmissionList({ isDel: 0, projectId }).then(data => {
        if (data && data.code === 1000) {
          this.deviceList = data.result.records
        }
      })
    },
    // 获取项目列表
    getEnvProList() {
      return envProList().then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
          if (this.proList.length) {
            this.proName = this.proList[0].projectName
            this.deviceList = this.proList[0].deviceList
            this.projectId = this.deviceList[0].projectId
            this.deviceId = this.deviceList[0].id
            this.deviceRealTimeData(this.deviceId)
            this.getHearType()
          }
        }
      })
    },
    // 获取设备是否在线状态
    getHearType() {
      const device = this.deviceList.find(item => item.id === this.deviceId)
      this.status = device && device.heart ? '在线' : '离线'
    },
    // 获取某个设备实时数据
    deviceRealTimeData(deviceId) {
      findNewDustRecordById({ deviceId }).then(
        data => {
          if (data && data.code === 1000) {
            this.deviceInfo = data.result || {}
            this.deviceInfo.date = this.deviceInfo.date
              ? parseTime(this.deviceInfo.date, '{y}-{m}-{d} {h}:{i}:{s}')
              : ''
          }
        }
      )
    },
    // websocket刷新
    reloadData(code) {
      if (code !== 1000 && code && this.projectId) {
        this.deviceRealTimeData(this.deviceId)
        this.getDustEmList(this.projectId)
      }
    },
    // 查询
    searchHandle(e, type) {
      if (type === 'projectId') {
        this.deviceId = ''
        this.getDustEmList(this.projectId)
      }
      if (type === 'deviceId' && this.deviceId) {
        this.getHearType()
        this.deviceRealTimeData(this.deviceId)
      }
    }
  }
}
</script>
<style lang="scss">
.env-monitor-page {
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
  .el-tabs__header {
    margin: 0;
  }
  .env-main {
    display: flex;
    .main-left {
      width: 33.33%;
      color: #3C75C2;
      .el-form-item__label {
        color: #3C75C2;
      }
      .update-time {
        color: #000;
        font-size: 1.25rem;
        text-align: center;
        // margin-left: 8rem;
        margin-bottom: 1.88rem;
      }
    }
    .main-center {
      width: 33.33%;
    }
    .main-right {
      width: 33.33%;
      .main-right-top {
        height: 18.75rem;
        position: relative;
        .right-item {
          color: #fff;
          width: 6.25rem;
          height: 6.25rem;
          border-radius: 2.19rem;
          vertical-align: middle;
          padding-top: 1rem;
          text-align: center;
          position: absolute;
          .item-title {
            font-size: 1.56rem;
          }
          .item-value {
            font-size: 1.8rem;
          }
        }
        .right-item-1 {
          left: 10%;
          top: 50%;
          background: linear-gradient(90deg, #EA667D, #F09D5E);
        }
        .right-item-2 {
          left: 32%;
          top: 25%;
          background: linear-gradient(90deg, #5171FD, #C97AFD);
        }
        .right-item-3 {
          left: 55%;
          top: 10%;
          background: linear-gradient(90deg, #3DAEF6, #747BFC);
        }
        .right-item-4 {
          left: 75%;
          top: 55%;
          background: linear-gradient(90deg, #41D79C, #A7E25F);
        }
      }
    }
  }
}
</style>
