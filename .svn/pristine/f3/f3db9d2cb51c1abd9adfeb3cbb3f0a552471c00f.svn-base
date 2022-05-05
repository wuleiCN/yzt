<template>
  <div class="statistic-dashboard-elevator dashboard-full-screen">
    <!-- <div class="statistic-dashboard-header">
      <FullScreen ref="FullScreen" />
      <SelectProject @newsReload="newsReload" />
    </div>
    <Nav /> -->
    <div class="statistic-dashboard-main">
      <div class="elevator-left-wrap">
        <div class="main-item item-left1">
          <div class="item-left2-main">
            <div class="toggle-wrap">
              <div @click="changeDevice('prev')"><img class="prev" src="@/assets/statistic-dashboard/prev.png" alt=""></div>
              <div class="elevator-name">{{ deviceList.length ? deviceList[index].name : '暂无设备' }}</div>
              <div @click="changeDevice('next')"><img class="next" src="@/assets/statistic-dashboard/next.png" alt=""></div>
            </div>
            <div class="img-wrap">
              <img src="@/assets/statistic-dashboard/elevator.png" alt="">
            </div>
          </div>
        </div>
        <div class="main-item item-left2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 升降机载重</div>
          </div>
          <div class="item-left2-bottom">
            <div class="load-title">
              载重
              <div v-for="(item, idx) in data.laod.toString().split('')" :key="idx" class="num-wrap">{{ item }}</div>
              t
            </div>
            <div class="bottom-time">
              <img src="@/assets/statistic-dashboard/bg-1.png">
              更新时间 {{ data.runtime ? parseTime(data.runtime, '{y}-{m}-{d} {h}:{i}:{s}') : '0000-00-00 00:00:00' }}
              <img src="@/assets/statistic-dashboard/bg-2.png">
            </div>
          </div>
        </div>
      </div>
      <div class="main-item elevator-center">
        <div class="item-center1">
          <div class="statistics-wrap">
            <el-row>
              <el-col :span="12">
                总数
                <div v-for="(item, idx) in elevatorData.elevatorTotal.toString().split('')" :key="idx" class="num-wrap">{{ item }}</div>
              </el-col>
              <el-col :span="12">
                在线
                <div v-for="(item, idx) in elevatorData.onLineTotal.toString().split('')" :key="idx" class="num-wrap">{{ item }}</div>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="9">
                <div class="item">
                  <img class="item-img" src="@/assets/statistic-dashboard/elevator-speed.png" alt="">
                  <div class="item-value">
                    <div>速度</div>
                    <div class="item-value-num">{{ data.speed || 0 }} kN.m</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item">
                  <img class="item-img" src="@/assets/statistic-dashboard/elevavtor-wind-speed.png" alt="">
                  <div class="item-value">
                    <div>风速</div>
                    <div class="item-value-num">{{ data.windSpeed || 0 }} m/s</div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="row-2">
              <el-col :span="12">
                <div class="item">
                  <img class="item-img" src="@/assets/statistic-dashboard/elevavtor-height.png" alt="">
                  <div class="item-value">
                    <div>高度</div>
                    <div class="item-value-num">{{ data.height || 0 }} m</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item">
                  <img class="item-img" src="@/assets/statistic-dashboard/elevavtor-floor.png" alt="">
                  <div class="item-value">
                    <div>楼层</div>
                    <div class="item-value-num">{{ data.floor || 0 }} 层</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="main-item item-center2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 实时明细</div>
          </div>
          <dv-scroll-board
            :config="config"
          />
        </div>
      </div>
      <div class="elevator-right-wrap">
        <div class="main-item item-right1">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 升降机报警汇总</div>
          </div>
          <Bar
            id="pictorialBar-pie-main1"
            :trend-data="[
              {value: data.momentWarn || 0, name:'载重报警'},
              {value: data.peopleNumWarn || 0, name:'人数报警'},
              {value: data.speedWarn || 0, name:'速度报警'},
              {value: data.tiltWarn || 0, name:'倾斜报警'},
            ]"
            height="14.04rem"
            width="100%"
          />
        </div>
        <div class="main-item item-right2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 升降机报警汇总</div>
          </div>
          <div class="item-right2-wrap">
            <Bar
              id="pictorialBar-pie-main2"
              :trend-data="[
                {value: data.limitUpWarn || 0, name:'上限报警'},
                {value: data.limitDownWarn || 0, name:'下限报警'},
                {value: data.topWarn || 0, name:'冲顶报警'},
                {value: data.otherWarn || 0, name:'其他报警'},
              ]"
              height="14.04rem"
              width="100%"
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
import Bar from './component/pictorialBar.vue'
import { parseTime } from '@/utils'
import { screenPro, findNewRecord, getWarnList, elevatorSta } from '@/api/statistic-dashboard/elevator'
export default {
  components: {
    // FullScreen,
    // SelectProject,
    Bar
    // Nav
  },
  // mixins: [common],
  data() {
    return {
      parseTime,
      deviceList: [],
      index: 0,
      data: { laod: '0' },
      elevatorData: {
        elevatorTotal: '0',
        onLineTotal: '0'
      },
      config: {
        header: ['预警设备', '预警时间', '预警内容', '处理结果'],
        headerBGC: ['transparent'],
        oddRowBGC: ['#0D2244'],
        evenRowBGC: ['transparent'],
        carousel: 'page',
        align: ['center', 'center', 'center', 'center']
      }
    }
  },
  mounted() {
  },
  methods: {
    async init(projectId) {
      this.getElevatorSta(projectId)
      const elevatorId = await this.screenProHandle(projectId)
      if (elevatorId) {
        this.findNewRecordHandle(elevatorId)
        this.getWarnListHandle(elevatorId)
      }
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
    screenProHandle(projectId) {
      return screenPro({}).then((data) => {
        if (data && data.code === 1000) {
          const project = data.result.find(item => item.id === projectId)
          this.deviceList = project ? project.deviceList : []
          const elevatorId = project && project.deviceList.length ? project.deviceList[0].id : ''
          return elevatorId
        }
      })
    },
    //
    findNewRecordHandle(elevatorId) {
      findNewRecord({ elevatorId }).then((data) => {
        if (data && data.code === 1000) {
          this.data = data.result || { laod: '0' }
        }
      })
    },
    getElevatorSta(projectId) {
      elevatorSta({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.elevatorData = data.result || {
            elevatorTotal: '0',
            onLineTotal: '0'
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    //
    getWarnListHandle(elevatorId) {
      getWarnList({ elevatorId }).then((data) => {
        if (data && data.code === 1000) {
          const list = data.result.result.map(item => {
            return [item.deviceName, item.warnTime, item.warnText, item.processResult]
          })
          this.config = {
            header: ['预警设备', '预警时间', '预警内容', '处理结果'],
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
.statistic-dashboard-elevator {
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  background: url('../../../assets/statistic-dashboard/elevator-bg.png') center no-repeat no-repeat;
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
        background: url('../../../assets/statistic-dashboard/elevator-icon.png') center no-repeat no-repeat;
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
    .elevator-left-wrap {
      flex: 488;
      .main-item {
        display: flex;
      }
      .item-left1 {
        width: 100%;
        .item-left2-main {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          .toggle-wrap {
            // margin-top: 1rem;
            display: flex;
            flex: wrap;
            // line-height: 2rem;
            .elevator-name {
              line-height: 2rem;
              margin: 0 2.12rem
            }
            .next, .prev {
              width: 2.62rem;
              height: 2rem;
              cursor: pointer;
            }
          }
          .img-wrap {
            img {
              height: 22.9rem;
            }
          }
        }
      }
      .item-left2 {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/vehicle-wrap-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 9.46rem;
        .item-left2-bottom{
          margin: 0 auto;
          .load-title {
            text-align: center;
            font-size: 1.38rem;
            height: 2.77rem;
            vertical-align: middle;
          }
          .bottom-time {
            font-size: .69rem;
            img {
              width: 3.54rem;
            }
          }
        }

      }
    }
    .elevator-center {
      flex: 860;
      margin: 0 1rem;
      .main-item {
        display: flex;
      }
      .item-center1 {
        height: 16rem;
        margin-left: 2rem;
        width: 35.92rem;
        .statistics-wrap {
          display: flex;
          .el-row {
            width: 100%;
          }
        }
        .el-row {
          margin: .62rem 0;
          .item {
            display: flex;
            .item-img {
              width: 4.77rem;
              height: 4.77rem;
            }
            .item-value {
              line-height: 1.2rem;
              margin: 1rem 0 0 1.5rem;
              .item-value-num {
                color: #24CAFD;
              }
            }
          }
        }
        .row-2 {
          margin-left: 3rem;
        }
      }
      .item-center2{
        background: url('../../../assets/statistic-dashboard/v-bro-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 18.57rem;
        padding: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .title-wrap {
          width: 100%;
          background: url('../../../assets/statistic-dashboard/title-item.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          padding: 0rem 0 .5rem 0;
          font-size: .62rem;
          .title {
            .icon {
              display: inline-block;
              background: url('../../../assets/statistic-dashboard/elevator-icon.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              width: 1.38rem;
              height: 1.54rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .elevator-right-wrap {
      flex: 486;
      .main-item {
        display: flex;
      }
      .item-right1 {
        display: flex;
        flex-wrap: wrap;
        flex: 586;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/v-bro-right.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 16.8rem;
        margin-bottom: 1rem;
      }
      .item-right2 {
        display: flex;
        flex-wrap: wrap;
        flex: 586;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/v-bro-right.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 16.8rem;
        .item-right2-wrap {
          padding: 0 0.5rem;
          width: 100%;
          height: 18.38rem;
        }
      }
    }
    .num-wrap {
      background: url('../../../assets/statistic-dashboard/number-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      width: 1.85rem;
      height: 2.31rem;
      line-height: 2.31rem;
      text-align: center;
      display: inline-block;
      color: #00FDF6;
      font-size: 1.54rem;
      font-family: Impact;
      vertical-align: unset;
    }
    .dv-scroll-board {
      height: 14.5rem !important;
      .header {
        background: #132239 !important;
        color: #00FFF6;
        font-size: .64rem !important;
        // .header-item {
        //   width: 6.92rem !important;
        // }
      }
      .rows {
        height: 12.5rem !important;
        overflow: hidden;
        .row-item {
          font-size: .62rem !important;
          height: 1.55rem !important;
          line-height: 1.55rem !important;
          font-family: Source Han Sans CN;
        }
      }
    }
  }
}
</style>
