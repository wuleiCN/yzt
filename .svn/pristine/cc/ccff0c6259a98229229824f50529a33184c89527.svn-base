<template>
  <div class="distributionBox-monitor-page">
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
          v-model="deviceId"
          placeholder="请选择设备"
          @change="e => searchHandle(e, 'deviceId')"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.deviceId"
            :label="item.deviceName + '-' + item.installAddress"
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
        <div class="box-main">
          <div class="main-left">
            <img style="height: 600px;margin-top: 50px" class="img-bg" src="@/assets/img-zhgd/box-bg.png" alt="">
          </div>
          <div class="main-center">
            <BoxChart
              class="center-chart"
              :box-data="{
                text:'漏电流',
                imgPath:'/ald.png',
                startColor: '#8CAFFF',
                endColor: '#5148ed',
                min: deviceInfo.nowtmpMin,
                max: deviceInfo.nowtmpMax,
                value: deviceInfo.current,
                unit: 'mA'
              }"
            />
            <BoxChart
              class="center-chart"
              :box-data="{
                text:'环境温度',
                imgPath:'/wd.png',
                startColor: '#8CAFFF',
                endColor: '#5148ed',
                min: nowtmpMin,
                max: nowtmpMax,
                value: nowTmp,
                unit: '℃'
              }"
            />
          </div>
          <div class="main-right">
            <div style="display:flex">
              <BoxChart
                class="right-chart"
                :box-data="{
                  text:'a温度',
                  imgPath:'/wd.png',
                  startColor: '#C97AFD',
                  endColor: '#0071FD',
                  min: deviceInfo.minAwarmVal,
                  max: deviceInfo.maxAwarmVal,
                  value: deviceInfo.awarm,
                  unit: '℃'
                }"
              />
              <BoxChart
                class="right-chart"
                :box-data="{
                  text:'b温度',
                  imgPath:'/wd.png',
                  startColor: '#3DAEF6',
                  endColor: '#747BFC',
                  min: deviceInfo.minBwarmVal,
                  max: deviceInfo.maxBwarmVal,
                  value: deviceInfo.bwarm,
                  unit: '℃'
                }"
              />
            </div>
            <div style="display:flex">
              <BoxChart
                class="right-chart"
                :box-data="{
                  text:'c温度',
                  imgPath:'/wd.png',
                  startColor: '#41D79C',
                  endColor: '#A7E25F',
                  min: deviceInfo.minCwarmVal,
                  max: deviceInfo.maxCwarmVal,
                  value: deviceInfo.cwarm,
                  unit: '℃'
                }"
              />
              <BoxChart
                class="right-chart"
                :box-data="{
                  text:'d温度',
                  imgPath:'/wd.png',
                  startColor: '#EA667D',
                  endColor: '#F09D5E',
                  min: deviceInfo.minNwarmVal,
                  max: deviceInfo.maxNwarmVal,
                  value: deviceInfo.nwarm,
                  unit: '℃'
                }"
              />
            </div>
            <div class="center-item-bottom">
              <div class="item">
                <div>漏电流报警</div>
                <span v-if="deviceInfo.current > 50" style="color: red">报警</span>
                <span v-else style="color: green">正常</span>
              </div>
              <el-divider style="height: 50px" direction="vertical" />
              <div class="item">
                <div>线缆报警</div>
                <span v-if="(deviceInfo.awarm > 70) || (deviceInfo.bwarm > 70) || deviceInfo.cwarm > 70" style="color: red">报警</span>
                <span v-else style="color: green">正常</span>
              </div>
              <el-divider style="height: 50px" direction="vertical" />
              <div class="item">
                <div>环境报警</div>
                <span v-if="(nowTmp < -20) || (nowTmp > 35)" style="color: red">报警</span>
                <span v-else style="color: green">正常</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史明细" name="lsmx">
        <MonitorHistory :device-id="deviceId" />
      </el-tab-pane>
    </el-tabs>
    <WebSocket :path="'/zhgd/electricityBox/' + deviceId" :project-id="deviceId" @reloadData="reloadData" />
  </div>
</template>
<script>
import BoxChart from './chart'
import axios from 'axios'
import MonitorHistory from './monitor-history'
import WebSocket from '@/components/webSocket'
import { findElectrictityBoxList, findNewElectRecordById, boxProList } from '@/api-zhgd/box-monitor'
export default {
  components: {
    BoxChart,
    MonitorHistory,
    WebSocket
  },
  data() {
    return {
      deviceId: '',
      nowTmp: '',
      nowtmpMin: '',
      nowtmpMax: '',
      status: '',
      deviceInfo: {},
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      deviceList: [],
      proList: [],
      proName: '',
      activeName: 'ssjc'
    }
  },
  mounted() {
    this.getProList()
  },
  methods: {
    // 获取项目列表
    getProList() {
      boxProList().then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
          if (this.proList.length) {
            this.proName = this.proList[0].projectName
            this.deviceList = this.proList[0].deviceList
            this.projectId = this.deviceList[0].projectId
            this.deviceId = this.deviceList[0].id
            this.getNowWeather(this.proList[0])
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
    // 获取天气
    getNowWeather(prodetailInfo) {
      const { projectRegion, latitude, longitude } = prodetailInfo
      const cityCode = projectRegion ? projectRegion.split(',')[ projectRegion.split(',').length - 2] : ''
      // console.log(projectRegion, latitude, longitude, cityCode)
      const url1 = axios({
        url: `https://free-api.heweather.net/s6/weather/now?key=17d2e87508694f82a19e156432920dbd&lat=${latitude}&lon=${longitude}&location=${cityCode}`,
        method: 'GET'
      })
      const url2 = axios({
        url: `https://free-api.heweather.net/s6/weather/forecast?key=17d2e87508694f82a19e156432920dbd&lat=${latitude}&lon=${longitude}&location=${cityCode}`,
        method: 'GET'
      })
      axios.all([url1, url2])
        .then((response) => {
          this.nowTmp = +response[0].data.HeWeather6[0].now.tmp
          this.nowtmpMin = +response[1].data.HeWeather6[0].daily_forecast[0].tmp_min
          this.nowtmpMax = +response[1].data.HeWeather6[0].daily_forecast[0].tmp_max
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 获取设备下拉列表
    getElectricityBoxList(projectId) {
      findElectrictityBoxList({ isDel: 0, projectId }).then(data => {
        if (data && data.code === 1000) {
          this.deviceList = data.result.records
        }
      })
    },
    reloadData(code) {
      if (code !== 1000 && code && this.projectId) {
        this.deviceRealTimeData(this.deviceId)
        this.getElectricityBoxList(this.projectId)
      }
    },
    // 查询
    searchHandle(e, type) {
      if (type === 'projectId') {
        this.deviceId = '' // 切换项目清空设备名称
        this.getElectricityBoxList(this.projectId)
      }
      if (type === 'deviceId' && this.deviceId) {
        this.getHearType()
        this.deviceRealTimeData(this.deviceId)
        this.getNowWeather(this.proList.find(item => item.id === this.projectId))
      }
    },
    // 获取某个设备实时数据
    deviceRealTimeData(deviceId) {
      findNewElectRecordById({ deviceId }).then(
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
.distributionBox-monitor-page {
  // .el-form {
  //   height: 2.06rem;
  //   margin: 5px 0;
  //   .title {
  //     font-size: 1.25rem;
  //   }
  //   .el-divider {
  //     width: 2px;
  //     height: 2rem;
  //   }
  // }
  .tabs-style {
    .box-main {
      display: flex;
      .main-left {
        width: 30%;
        .img-bg {
          width: 100%;
          height: 400px;
        }
      }
      .main-center {
        width: 35%;
        position: relative;
        z-index: 100;
        // .center-chart {
        //   margin-left: 1.88rem;
        //   width: 100%;
        //   height: 21.5rem;
        // }
      }
      .main-right {
        width: 30%;
        .right-chart {
          width: 50%;
          height: 300px;
        }
        .center-item-bottom {
          display: flex;
          justify-content: center; /* 水平居中 */
          justify-content: center;
          .item {
            margin: 0 1.25rem;
            text-align: center;
            span {
              font-size: 1.25rem;
            }
          }
          .el-divider--vertical {
            height: 2.6em;
            width: .13rem;
          }
        }
      }
    }
  }
}
</style>
