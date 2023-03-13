<template>
  <div class="water-monitor-page">
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
            :label=" item.name"
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
                <div class="item-title">今日累计用水 {{ dayCompare.startTime }} 至 {{ dayCompare.endTime }}</div>
                <div class="item-num">{{ dayCompare.mwo }}</div>
                <div>较昨日同时段  {{ dayCompare.dayRate }} {{ parseInt(dayCompare.dayRate) > 0 ? '↑' : '↓' }}</div>
                <div>较上周同时段 {{ dayCompare.weekRate }} {{ parseInt(dayCompare.weekRate) > 0 ? '↑' : '↓' }}</div>
              </el-card>
              <el-card class="main-left-top-item item2">
                <div class="item-title">本月累计用水 {{ monCompare.startTime }} 至 {{ monCompare.endTime }}</div>
                <div class="item-num">{{ monCompare.MonMwo }}</div>
                <div>较上月用水  {{ monCompare.MonRate }} {{ parseInt(monCompare.MonRate) > 0 ? '↑' : '↓' }}</div>
              </el-card>
              <el-card class="main-left-top-item item3">
                <div class="item-title">今年累计用水 {{ yearCompare.startTime }} 至 {{ yearCompare.endTime }}</div>
                <div class="item-num">{{ yearCompare.YearMwo }}</div>
                <div>较去年用水  {{ yearCompare.YearRate }} {{ parseInt(yearCompare.YearRate) > 0 ? '↑' : '↓' }}</div>
              </el-card>
            </div>
            <el-card class="main-left-bottom">
              <div>
                <div> <span class="card-title">总用水图表</span>
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
              <div> <span class="card-title">用水量排行</span>
                <el-radio-group v-model="btnVal" size="medium">
                  <el-radio-button label="sortDay">日</el-radio-button>
                  <el-radio-button label="sortMon">月</el-radio-button>
                  <el-radio-button label="sortYear">年</el-radio-button>
                </el-radio-group>
              </div>
              <div class="row-wrap">
                <el-row class="row-title">
                  <el-col :span="12">排名/设备名称</el-col>
                  <el-col :span="12">用水量</el-col>
                </el-row>
                <el-row v-for="(item, index) in waterSortData[btnVal]" :key="index" :class="`row-${index+1}`">
                  <el-col :span="12">{{ index+ 1 }}{{ item.name }}</el-col>
                  <el-col :span="12">{{ item.mwo }} t</el-col>
                </el-row>
              </div>
            </el-card>
            <el-card class="main-right-bottom">
              <div class="card-title">设备情况</div>
              <div class="equipment-situation-row">
                <div class="row-item">水表</div>
                <div class="row-item"><img src="@/assets/dianbiao.png" alt=""></div>
                <div class="row-item">
                  <div class="online-num">{{ waterStaData.onLineTotal || 1 }}</div>
                  <div>在线数</div>
                </div>
                <div class="row-item">
                  <div class="all-num">{{ waterStaData.total || 1 }}</div>
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
import { waterSta, getSort, getDayTOLastDay, getMonTOLastMon, getYearTOLastYear, getBy15, getByHour, getByDay, waterProList } from '@/api-zhgd/water-meter'
import { getList as elevatorGetList, elevatorProList } from '@/api-zhgd/zhgd-elevator'
import Box from './pie'
import MonitorHistory from './monitor-history'
// import WebSocket from '@/components/webSocket'
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
      waterStaData: {},
      waterSortData: {
        sortDay: [
          {
            name: '9#',
            mwo: 60
          },
          {
            name: '3#',
            mwo: 30
          },
          {
            name: '6#',
            mwo: 20
          }
        ]
      },
      dayCompare: {
        startTime: '2023-03-01',
        endTime: '2023-03-01',
        mwo: '210',
        dayRate: '60',
        weekRate: '80'
      },
      monCompare: {
        startTime: '2023-03-01',
        endTime: '2023-03-01',
        mwo: '410',
        MonMwo: '40',
        MonRate: '60'
      },
      yearCompare: {
        startTime: '2023-03-01',
        endTime: '2023-03-01',
        mwo: '110',
        YearMwo: '4800',
        YearRate: '436'
      },
      chartData: [
        {
          mwo: 30,
          time: '00:00'
        },
        {
          mwo: 20,
          time: '00:03'
        },
        {
          mwo: 15,
          time: '00:06'
        },
        {
          mwo: 23,
          time: '00:09'
        },
        {
          mwo: 23,
          time: '00:12'
        },
        {
          mwo: 31,
          time: '00:15'
        }
      ],
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
  created() {
    this.getWaterProList()
    this.fatchGetBy15(this.projectId)
    this.init()
  },
  methods: {
    init() {
      this.getWaterSta(this.projectId)
      this.fatchSort(this.projectId)
      this.fatchDayTOLastDay()
      this.fatchMonTOLastMon()
      this.fatchYearTOLastYear()
    },
    // 获取设备下拉列表
    getDustEmList(projectId) {
      getDustEmissionList({ isDel: 0, projectId }).then(data => {
        // if (data && data.code === 1000) {
        //   this.deviceList = data.result.records
        // }
      })
      elevatorGetList({ isDel: 0, projectId }).then(data => {
        if (data && data.code === 1000) {
          this.deviceList = data.result.records
        }
      })
    },
    // 设备情况
    getWaterSta(projectId) {
      waterSta({ projectId }).then(data => {
        if (data && data.code === 1000) {
          this.waterStaData = data.result
        }
      })
    },
    // 排行
    fatchSort(projectId) {
      getSort({ projectId }).then(data => {
        if (data && data.code === 1000) {
          // this.waterSortData = data.result
        }
      })
    },
    // 日对比
    fatchDayTOLastDay() {
      getDayTOLastDay({ projectId: this.projectId, deviceId: this.deviceId }).then(data => {
        if (data && data.code === 1000) {
          this.dayCompare = data.result
        }
      })
    },
    // 月对比
    fatchMonTOLastMon() {
      getMonTOLastMon({ projectId: this.projectId, deviceId: this.deviceId }).then(data => {
        if (data && data.code === 1000) {
          this.monCompare = data.result
        }
      })
    },
    // 年对比
    fatchYearTOLastYear() {
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
    getWaterProList() {
      waterProList().then(data => {
        if (data && data.code === 1000) {
          // this.proList = data.result
          // if (this.proList.length) {
          //   this.proName = this.proList[0].projectName
          //   this.deviceList = this.proList[0].deviceList
          //   this.projectId = this.deviceList[0].projectId
          //   this.deviceId = this.deviceList[0].sortNumber
          //   this.deviceRealTimeData(this.deviceId)
          //   this.getHearType()
          // }
        }
      })
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
.water-monitor-page {
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
