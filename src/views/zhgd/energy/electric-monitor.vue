<template>
  <div class="electric-monitor-page">
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
            :label="item.name"
            :value="item.sortNumber"
          >
            <span style="float: left">{{ `${item.name}` }}</span>
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
        <div class="main">
          <div class="main-left">
            <div class="main-left-top">
              <el-card class="main-left-top-item item1">
                <div class="item-title">今日累计用电 {{ dayCompare.startTime }} 至 {{ dayCompare.endTime }}</div>
                <div class="item-num">{{ dayCompare.mwo }}</div>
                <div>较昨日同时段  {{ dayCompare.dayRate }} {{ parseInt(dayCompare.dayRate) > 0 ? '↑' : '↓' }}</div>
                <div>较上周同时段 {{ dayCompare.weekRate }} {{ parseInt(dayCompare.weekRate) > 0 ? '↑' : '↓' }}</div>
              </el-card>
              <el-card class="main-left-top-item item2">
                <div class="item-title">本月累计用电 {{ monCompare.startTime }} 至 {{ monCompare.endTime }}</div>
                <div class="item-num">{{ monCompare.MonMwo }}</div>
                <div>较上月用水  {{ monCompare.MonRate }} {{ parseInt(monCompare.MonRate) > 0 ? '↑' : '↓' }}</div>
              </el-card>
              <el-card class="main-left-top-item item3">
                <div class="item-title">今年累计用电 {{ yearCompare.startTime }} 至 {{ yearCompare.endTime }}</div>
                <div class="item-num">{{ yearCompare.YearMwo }}</div>
                <div>较去年用水  {{ yearCompare.YearRate }} {{ parseInt(yearCompare.YearRate) > 0 ? '↑' : '↓' }}</div>
              </el-card>
            </div>
            <el-card class="main-left-bottom">
              <div>
                <div> <span class="card-title">总用电图表</span>
                  <el-radio-group v-model="chartBtnVal" size="medium" @change="changeHandle">
                    <el-radio-button label="chartM">15分钟</el-radio-button>
                    <el-radio-button label="chartDay">日</el-radio-button>
                    <el-radio-button label="chartMon">月</el-radio-button>
                  </el-radio-group>
                </div>
                <Box :chart-data="chartData" />
              </div>
            </el-card>
          </div>
          <div class="main-right">
            <el-card class="main-right-top">
              <div> <span class="card-title">用电量排行</span>
                <el-radio-group v-model="btnVal" size="medium">
                  <el-radio-button label="sortDay">日</el-radio-button>
                  <el-radio-button label="sortMon">月</el-radio-button>
                  <el-radio-button label="sortYear">年</el-radio-button>
                </el-radio-group>
              </div>
              <div class="row-wrap">
                <el-row class="row-title">
                  <el-col :span="12">排名/设备名称</el-col>
                  <el-col :span="12">用电量</el-col>
                </el-row>
                <el-row v-for="(item, index) in electricSortData[btnVal]" :key="index" :class="`row-${index+1}`">
                  <el-col :span="12">{{ index+ 1 }}{{ item.name }}</el-col>
                  <el-col :span="12">{{ item.mwo }}kWh</el-col>
                </el-row>
              </div>
            </el-card>
            <el-card class="main-right-bottom">
              <div class="card-title">设备情况</div>
              <div class="equipment-situation-row">
                <div class="row-item">电表</div>
                <div class="row-item"><img src="@/assets/dianbiao.png" alt=""></div>
                <div class="row-item">
                  <div class="online-num">{{ electricStaData.onLineTotal }}</div>
                  <div>在线数</div>
                </div>
                <div class="row-item">
                  <div class="all-num">{{ electricStaData.total }}</div>
                  <div>总数</div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史明细" name="lsmx">
        <MonitorHistory :device-id="deviceId" />
      </el-tab-pane>
    </el-tabs>
    <!-- <WebSocket :path="'/zhgd/dustEmission/' + deviceId" :project-id="deviceId" @reloadData="reloadData" /> -->
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import { electricSta, getSort, getDayTOLastDay, getMonTOLastMon, getYearTOLastYear, getBy15, getByHour, getByDay, electricProList } from '@/api-zhgd/electric-meter'
import Box from './pie'
import MonitorHistory from './electric-monitor-history'
import {
  getDustEmissionList,
  findNewDustRecordById
} from '@/api-zhgd/env-monitor'
export default {
  components: {
    Box,
    MonitorHistory
    // WebSocket
  },
  data() {
    return {
      electricStaData: {},
      electricSortData: {},
      dayCompare: {},
      monCompare: {},
      yearCompare: {},
      chartData: [],
      status: '',
      chartBtnVal: 'chartM',
      btnVal: 'sortDay',
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
  async created() {
    await this.getElectricProList()
    this.fatchGetBy15(this.projectId)
    this.init()
  },
  methods: {
    init() {
      this.getElectricSta(this.projectId)
      this.fatchSort(this.projectId)
      this.fatchDayTOLastDay()
      this.fatchMonTOLastMon()
      this.fatchYearTOLastYear()
    },
    // 获取设备下拉列表
    getDustEmList(projectId) {
      getDustEmissionList({ isDel: 0, projectId }).then(data => {
        if (data && data.code === 1000) {
          this.deviceList = data.result.records
        }
      })
    },
    // 设备情况
    getElectricSta(projectId) {
      electricSta({ projectId }).then(data => {
        if (data && data.code === 1000) {
          this.electricStaData = data.result
        }
      })
    },
    // 设备情况
    fatchSort(projectId) {
      getSort({ projectId }).then(data => {
        if (data && data.code === 1000) {
          this.electricSortData = data.result
        }
      })
    },
    // 日对比
    fatchDayTOLastDay(projectId) {
      getDayTOLastDay({ projectId: this.projectId, deviceId: this.deviceId }).then(data => {
        if (data && data.code === 1000) {
          this.dayCompare = data.result
        }
      })
    },
    // 月对比
    fatchMonTOLastMon(projectId) {
      getMonTOLastMon({ projectId: this.projectId, deviceId: this.deviceId }).then(data => {
        if (data && data.code === 1000) {
          this.monCompare = data.result
        }
      })
    },
    // 年对比
    fatchYearTOLastYear(projectId) {
      getYearTOLastYear({ projectId: this.projectId, deviceId: this.deviceId }).then(data => {
        if (data && data.code === 1000) {
          this.yearCompare = data.result
        }
      })
    },
    changeHandle(val) {
      if (val === 'chartM') this.fatchGetBy15(this.projectId)
      if (val === 'chartDay') this.fatchGetByHour(this.projectId)
      if (val === 'chartMon') this.fatchGetByDay(this.projectId)
    },
    //  15分钟 图表
    fatchGetBy15(projectId) {
      getBy15({ projectId, deviceId: this.deviceId }).then(data => {
        if (data && data.code === 1000) {
          this.chartData = data.result
        }
      })
    },
    // 日 图表
    fatchGetByHour(projectId) {
      getByHour({ projectId, deviceId: this.deviceId }).then(data => {
        if (data && data.code === 1000) {
          this.chartData = data.result
        }
      })
    },
    // 月 图表
    fatchGetByDay(projectId) {
      getByDay({ projectId, deviceId: this.deviceId }).then(data => {
        if (data && data.code === 1000) {
          this.chartData = data.result
        }
      })
    },
    // 获取项目列表
    getElectricProList() {
      return electricProList().then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
          if (this.proList.length) {
            this.proName = this.proList[0].projectName
            this.deviceList = this.proList[0].deviceList
            this.projectId = this.deviceList[0].projectId
            this.deviceId = this.deviceList[0].sortNumber
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
    // reloadData(code) {
    //   if (code !== 1000 && code && this.projectId) {
    //     this.deviceRealTimeData(this.deviceId)
    //     this.getDustEmList(this.projectId)
    //   }
    // },
    // 查询
    searchHandle(e, type) {
      if (type === 'projectId') {
        this.deviceId = ''
        this.getDustEmList(this.projectId)
      }
      if (type === 'deviceId' && this.deviceId) {
        this.init()
        this.changeHandle(this.chartBtnVal)
        this.getHearType()
        this.deviceRealTimeData(this.deviceId)
      }
    }
  }
}
</script>
<style lang="scss">
.electric-monitor-page {
  .main {
    display: flex;
    .main-left {
      width: 70%;
      .main-left-top {
        display: flex;
        width: 100%;
        margin-bottom: 10px;
        .main-left-top-item {
          flex: 1;
          margin-right: 10px;
          height: 180px;
          font-size: 19px;
          color: #fff;
          .item-title {
            font-size: 19px;
          }
          .item-num {
            font-size: 40px;
            margin: 10px 0;
          }
        }
        .item1 {
          background: linear-gradient(to right, #5171fd, #c97afd);
        }
        .item2 {
          background: linear-gradient(to right, #c97afd, #3daef6);
        }
        .item3 {
          background: linear-gradient(to right, #3daef6, #747bfc);
        }
      }
      .main-left-bottom {
        margin-right: 10px;
        height: 500px;
      }
    }
    .el-radio-group {
      .el-radio-button {
        margin: 0 10px;
        text-align: center;
        .el-radio-button__inner {
          border: 2px solid #1890FF;
          border-radius: 5px;
          line-height: 26px;
          padding: 0;
          width: 56px;
          height: 28px;
        }
      }
    }
    .main-right {
      width: 30%;
      .main-right-top {
        margin-bottom: 10px;
        height: 340px;
        .row-wrap {
          font-size: 18px;
          font-weight: 400;
          padding: 20px 0 0 20px;
          .el-row {
            line-height: 48px;
          }
          .row-title {
            text-align: left;
          }
          .row-1 {
            color: #FF0000;
          }
          .row-2 {
            color: #F56B29;
          }
          .row-3 {
            color: #FFAF20;
          }
        }
      }
      .card-title {
        font-weight: 500;
        font-size: 19px;
      }
      .main-right-bottom {
        margin-bottom: 10px;
        height: 340px;
        .equipment-situation-row {
          display: flex;
          justify-content:center;
          align-items: center;
          margin-top: 50px;
          .row-item {
            flex: 1;
            text-align: center;
            font-size: 19px;
            .online-num {
              font-size: 40px;
              color: #00FF01;
            }
            .all-num {
              font-size: 40px;
              color: #1890FF;
            }
          }
        }
      }
    }
  }
}
</style>
