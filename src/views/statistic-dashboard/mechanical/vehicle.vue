<template>
  <div class="statistic-dashboard-vehicle dashboard-full-screen">
    <!-- <div class="statistic-dashboard-header">
      <FullScreen ref="FullScreen" />
      <SelectProject @newsReload="newsReload" />
    </div>
    <Nav /> -->
    <div class="statistic-dashboard-main">
      <div class="vehicle-left-wrap">
        <div class="main-item item-left1">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 车辆类型</div>
          </div>
          <TypePie id="type-pie" :cat-type="catType" height="10.85rem" width="100%" />
        </div>
        <div class="main-item item-left2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 最新识别车辆</div>
          </div>
          <div class="item-left2-main">
            <img v-if="data.img" :src="data.img" alt="">
            <img v-else src="@/assets/333.png" alt="">
            <el-row class="row" :gutter="12">
              <el-col :span="12"><span class="label">车辆牌号：</span> {{ data.vehicleNo || '暂无数据' }}</el-col>
              <el-col :span="12"><span class="label">进出类型：</span> {{ data.inOut ? (data.inOut === 1 ? '进' : '出') : '暂无数据' }}</el-col>
            </el-row>
            <el-row class="row" :gutter="12">
              <el-col :span="12"><span class="label">通道名称：</span> {{ data.gateinName || '暂无数据' }}</el-col>
              <el-col :span="12"><span class="label">车辆类型：</span>
                <span v-if="data.carType === 1" class="item-value">小型车</span>
                <span v-if="data.carType === 2" class="item-value">中型车</span>
                <span v-if="data.carType === 3" class="item-value">泥头车</span>
                <span v-else class="item-value">暂无数据</span>
              </el-col>
            </el-row>
            <el-row class="row" :gutter="12">
              <el-col :span="24"><span class="label">进出时间：</span>
                {{ data.liftTime ? parseTime(data.liftTime, '{y}-{m}-{d} {h}:{i}:{s}') : '' || '暂无数据' }}
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="main-item vehicle-center">
        <div class="item-center1">
          <!-- <Line ref="qual-pie" /> -->
        </div>
        <div class="main-item item-center2">
          <LiquidFill id="vehicle-LiquidFill" :in-or-out-numb="inOrOutNumb" height="6.62rem" width="100%" />
        </div>
        <div class="main-item item-center3">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 车辆出入口统计</div>
          </div>
          <VLine id="vehicle-line" :list="numList" height="10rem" width="100%" />
        </div>
      </div>
      <div class="vehicle-right-wrap">
        <div class="main-item item-right1">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 通道统计</div>
          </div>
          <TdPie id="type-pie1" :channel-data="channelData" height="10.85rem" width="100%" />
        </div>
        <div class="main-item item-right2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 最新识别车辆</div>
          </div>
          <div class="item-right2-wrap">
            <dv-scroll-board
              :config="config"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import FullScreen from '../component/FullScreen.vue'
// import SelectProject from '../component/SelectPro.vue'
// import common from '../mixins/common'
// import Nav from '../component/Nav.vue'
import TypePie from './component/VehicleTypePie.vue'
import TdPie from './component/VehicleTdPie.vue'
import VLine from './component/VehicleLine.vue'
import LiquidFill from './component/VehicleLiquidFill.vue'
import { parseTime } from '@/utils/index'
import { getCarType, getRecord, getWarnList, getNum } from '@/api/statistic-dashboard/vehicle'
export default {
  components: {
    // FullScreen,
    // SelectProject,
    TypePie,
    TdPie,
    VLine,
    LiquidFill
    // Nav
  },
  // mixins: [common],
  data() {
    return {
      parseTime,
      data: {},
      catType: {},
      channelData: [],
      inOrOutNumb: {},
      numList: [],
      config: {}
    }
  },
  mounted() {
  },
  methods: {
    async init(projectId) {
      this.findNewRecordHandle(projectId)
      this.getWarnListHandle(projectId)
      this.getNumHandle(projectId)
      this.getCarTypeHandle(projectId)
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    changeDevice(type) {
      if (this.deviceList && this.deviceList.length) {
        if (type === 'prev' && this.index !== 0) {
          this.index--
        } else if (type === 'next' && (this.index < this.deviceList.length - 1)) {
          this.index++
        }
        this.findNewRecordHandle(this.deviceList[this.index].id)
        this.getWarnListHandle(this.deviceList[this.index].id)
      }
    },
    getCarTypeHandle(projectId) {
      getCarType({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.catType = data.result.catType || {}
          this.channelData = data.result.channelData || []
          this.inOrOutNumb = data.result.inOrOutNumb || {}
        }
      })
    },
    //
    findNewRecordHandle(projectId) {
      getRecord({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.data = data.result || {}
        }
      })
    },
    getNumHandle(projectId) {
      getNum({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.numList = data.result || {}
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    //
    getWarnListHandle(projectId) {
      getWarnList({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          const list = data.result.map(item => {
            return [
              item.vehicleNo,
              item.liftTime ? parseTime(item.liftTime, '{m}-{d} {h}:{i}:{s}') : '',
              item.inOut === 1 ? '进' : '出',
              item.deviceName
            ]
          })
          this.config = {
            header: ['识别车辆', '进出时间', '进出状态', '识别设备'],
            headerBGC: ['transparent'],
            oddRowBGC: ['#0D2244'],
            evenRowBGC: ['transparent'],
            carousel: 'page',
            align: ['center', 'center', 'center', 'center'],
            data: list
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
// 计算方式 26px -> 1rem
.statistic-dashboard-vehicle {
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
  .title-wrap {
    width: 100%;
    height: 1rem;
    background: url('../../../assets/statistic-dashboard/vehicle-bro-bg.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    margin: .5rem;
    padding: 0rem 0 .5rem 0;
    font-size: .62rem;
    .title {
      margin-top: -.5rem;
      .icon {
        display: inline-block;
        background: url('../../../assets/statistic-dashboard/vehicle-icon.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        width: 1.38rem;
        height: 1.54rem;
        vertical-align: middle;
      }
    }
  }
  .statistic-dashboard-header {
    position: relative;
    height: 3.85rem;
    background: url('../../../assets/statistic-dashboard/top-header.png') center no-repeat no-repeat;
    background-size: 100% 100%;
  }
  .statistic-dashboard-main {
    display: flex;
    box-sizing: border-box;
    padding: 0 .74rem;
    .vehicle-left-wrap {
      flex: 488;
      .main-item {
        display: flex;
      }
      .item-left1 {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/vehicle-wrap-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 13.23rem;
      }
      .item-left2 {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/vehicle-wrap-bg1.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 21.54rem;
        .item-left2-main {
          width: 16.77rem;
          margin: 0 auto;
          img {
            width: 100%;
            height: 11.38rem;
          }
          .row {
            font-size: .77rem;
            margin: 1rem 0;
            .label {
              color: #2AAEF2;
            }
          }
        }
      }
    }
    .vehicle-center {
      background: url('../../../assets/statistic-dashboard/vehicle-center-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      flex: 860;
      height: 20rem;
      margin: 0 1rem;
      .main-item {
        display: flex;
      }
      .item-center1 {
        height: 16rem;
        width: 100%;
      }
      .item-center2 {
        display: flex;
        width: 100%;
        height: 7.31rem;

      }
      .item-center3{
        background: url('../../../assets/statistic-dashboard/vehicle-wrap-bg2.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 11.2rem;
        padding: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        .title-wrap {
          width: 100%;
          background: url('../../../assets/statistic-dashboard/title-item.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          padding: 0rem 0 .5rem 0;
          font-size: .62rem;
          .title {
            .icon {
              display: inline-block;
              background: url('../../../assets/statistic-dashboard/vehicle-icon.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              width: 1.38rem;
              height: 1.54rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .vehicle-right-wrap {
      flex: 486;
      .main-item {
        display: flex;
      }
      .item-right1 {
        display: flex;
        flex-wrap: wrap;
        flex: 586;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/vehicle-wrap-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 13.23rem;
      }
      .item-right2 {
        display: flex;
        flex-wrap: wrap;
        flex: 586;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/vehicle-wrap-bg1.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 21.54rem;
        .item-right2-wrap {
          padding: 0 0.5rem;
          width: 100%;
          height: 18.38rem;
          .dv-scroll-board {
            height: 100%;
            padding: .6rem 0 0;
            .header {
              background: #132239 !important;
              color: #00FFF6;
              font-size: .64rem !important;
            }
            .rows {
              height: 16.5rem !important;
              overflow: hidden;
              .row-item {
                font-size: .62rem !important;
                height: 2rem !important;
                line-height: 2rem !important;
              }
            }
          }
        }
      }
    }

  }
}
</style>
