<template>
  <div class="statistic-dashboard-env dashboard-full-screen">
    <!-- <div class="statistic-dashboard-header">
      <FullScreen ref="FullScreen" />
      <SelectProject @newsReload="newsReload" />
    </div>
    <Nav /> -->
    <div class="statistic-dashboard-main">
      <div class="left-wrap">
        <div class="main-item left1">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 本月情况</div>
          </div>
          <div class="left1-main-wrap">
            <div class="left1-main-top">
              <Radar id="env-radar" :month-data="monthData.api" height="9.23rem" width="10.73rem" />
              <div class="top-item-wrap">
                <div class="top-item">优秀：{{ monthData.api.typeOne || 0 }}天</div>
                <div class="top-item">良好：{{ monthData.api.typeTwo || 0 }}天</div>
                <div class="top-item">轻度：{{ monthData.api.typeThree || 0 }}天</div>
                <div class="top-item">中度：{{ monthData.api.typeFour || 0 }}天</div>
                <div class="top-item">重度：{{ monthData.api.typeFive || 0 }}天</div>
                <div class="top-item">严重：{{ monthData.api.typeSix || 0 }}天</div>
              </div>
            </div>
            <el-divider />
            <div class="left1-bottom-wrap">
              <div class="chart">
                <div class="chart-item">
                  <EnvPie id="env-pie1" :worker-info="monthData.noise" height="12.73rem" width="10.73rem" />
                </div>
                <div class="chart-item item2">
                  <div>
                    <div class="title1">不达标</div>
                    <div class="value-img value1">
                      <span style="color: #FCB31E">{{ monthData.noise.qualified || 0 }}</span> 天
                    </div>
                    <div class="title2">达标</div>
                    <div class="value-img value2">
                      <span style="color: #46EDE8">{{ monthData.noise.notQualified || 0 }}</span> 天
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-item left2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 历史记录/{{ yearData.year }}</div>
          </div>
          <div class="left2-row1">
            <div class="row1-item1"><span>AQI</span></div>
            <div class="row1-item2">
              <div>优秀：{{ yearData.api.typeOne || 0 }}天</div>
              <div>良好：{{ yearData.api.typeTwo || 0 }}天</div>
              <div>轻度：{{ yearData.api.typeThree || 0 }}天</div>
            </div>
            <div class="row1-item3">
              <div>中度：{{ yearData.api.typeFour || 0 }}天</div>
              <div>重度：{{ yearData.api.typeFive || 0 }}天</div>
            </div>
          </div>
          <div class="left2-row2">
            <div class="row2-item1"><span>噪音</span></div>
            <div class="row2-item2">
              <div>达标：{{ yearData.noise.qualified || 0 }}天</div>
              <div>不达标：{{ yearData.noise.notQualified || 0 }}天</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-item center-wrap">
        <div class="center1">
          <div class="center1-top">
            <div class="item1">
              <div class="item1-qw">
                <div class="qw-wrap">
                  <div class="img-wrap">
                    <img src="../../../assets/statistic-dashboard/wd.png" alt="">
                  </div>
                  <div class="value-wrap">
                    <div>气温</div>
                    <div>{{ recordData.temperature ? recordData.temperature+'°C' : '暂无数据' }}</div>
                  </div>
                </div>
              </div>
              <div class="item1-sd">
                <div class="sd-wrap">
                  <div class="img-wrap">
                    <img src="../../../assets/statistic-dashboard/sd.png" alt="">
                  </div>
                  <div class="value-wrap">
                    <div>湿度</div>
                    <div>{{ recordData.humidity ? recordData.humidity+'%' : '暂无数据' }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item2">
              <div class="item2-wrap">
                <div class="value">{{ recordData.aqi }}</div>
                <div class="title">{{ recordData.apiType }}</div>
                <div class="name">AQI</div>
              </div>
            </div>
            <div class="item3">
              <div class="item3-fs">
                <div class="fs-wrap">
                  <div class="img-wrap">
                    <img src="../../../assets/statistic-dashboard/fs.png" alt="">
                  </div>
                  <div class="value-wrap">
                    <div>风速</div>
                    <div>{{ recordData.windSpeed ? recordData.windSpeed+'m/s' : '暂无数据' }}</div>
                  </div>
                </div>
              </div>
              <div class="item3-zy">
                <div class="zy-wrap">
                  <div class="img-wrap">
                    <img src="../../../assets/statistic-dashboard/zy.png" alt="">
                  </div>
                  <div class="value-wrap">
                    <div>噪音</div>
                    <div>{{ recordData.noise ? recordData.noise+'db' : '暂无数据' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="center1-bottom">
            <LiquidFill id="vehicle-LiquidFill" :record-data="recordData" height="6.62rem" width="33.72rem" />
          </div>
        </div>
        <div class="main-item center2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 最近24小时</div>
          </div>
          <XLine id="env-line" class="x-line" :week-data="time24Data" height="6.5rem" width="30.77rem" />
        </div>
      </div>
      <div class="right-wrap">
        <div class="main-item right1">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 用电量</div>
          </div>
          <div class="right1-main">
            <div class="r-img-wrap">
              <img src="@/assets/statistic-dashboard/box-r-t.png" alt="">
            </div>
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
import common from '../mixins/common'
// import Nav from '../component/Nav.vue'
import XLine from './component/Line.vue'
import EnvPie from './component/EnvPie.vue'
import LiquidFill from './component/LiquidFill.vue'
import Radar from './component/Radar.vue'
import { parseTime } from '@/utils/index'
import { getNewDustRecordByProjectId, getGradeByYear, getGradeByMonth, findTimeDustRecordByProjectId, getWarnIng } from '@/api/statistic-dashboard/env'
export default {
  components: {
    // FullScreen,
    // SelectProject,
    LiquidFill,
    Radar,
    XLine,
    EnvPie
    // Nav
  },
  mixins: [common],
  data() {
    return {
      time24Data: [],
      config: {},
      recordData: {},
      monthData: {
        api: {},
        noise: {}
      },
      yearData: {
        api: {},
        noise: {}
      }
    }
  },
  mounted() {
  },
  methods: {
    init(projectId) {
      this.fetchRecord(projectId)
      this.fetchYearData(projectId)
      this.fetchMonthData(projectId)
      this.fetch24TimeData(projectId)
      this.fetchWarnList(projectId)
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    //
    fetchRecord(projectId) {
      getNewDustRecordByProjectId({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.recordData = data.result || {}
        }
      })
    },
    //
    fetchYearData(projectId) {
      getGradeByYear({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.yearData = data.result || {
            api: {},
            noise: {}
          }
        }
      })
    },
    //
    fetchMonthData(projectId) {
      getGradeByMonth({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.monthData = data.result || {
            api: {},
            noise: {}
          }
        }
      })
    },
    //
    fetch24TimeData(projectId) {
      findTimeDustRecordByProjectId({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.time24Data = data.result || {}
        }
      })
    },
    //
    fetchWarnList(projectId) {
      getWarnIng({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.recordList = data.result ? data.result.map(item => {
            return [item.deviceName, item.warnContent, item.warnTime ? parseTime(item.warnTime, '{m}-{d} {h}:{i}:{s}') : '']
          }) : []
          this.config = {
            header: ['告警设备', '告警内容', '时间'],
            headerBGC: ['transparent'],
            oddRowBGC: ['#0D2244'],
            evenRowBGC: ['transparent'],
            carousel: 'page',
            align: ['center', 'center', 'center', 'center'],
            data: this.recordList
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
// 计算方式 26px -> 1rem
.statistic-dashboard-env {
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
        background: url('../../../assets/statistic-dashboard/env-icon.png') center no-repeat no-repeat;
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
    .left-wrap {
      flex: 488;
      .main-item {
        display: flex;
      }
      .left1 {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/vehicle-wrap-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 20.23rem;
        .left1-main-wrap {
          width: 100%;
          .left1-main-top {
            display: flex;
            font-size: .46rem;
            .top-item {
              margin: .7rem 0 0 2rem;
              position: relative;
              &::before {
                content: '';
                position: absolute;
                left: -0.98rem;
                top: .08rem;
                width: .46rem;
                height: .46rem;
                background-color: #2AF8FF;
                border-radius: .23rem;
              }
            }
            .top-item:nth-of-type(1)::before {
              background-color: #0DCAD8;
            }
            .top-item:nth-of-type(2)::before {
              background-color: #2AFF77;
            }
            .top-item:nth-of-type(3)::before {
              background-color: #FC9C2A;
            }
            .top-item:nth-of-type(4)::before {
              background-color: #FF2A9C;
            }
            .top-item:nth-of-type(5)::before {
              background-color: #FFF32A;
            }
            .top-item:nth-of-type(6)::before {
              background-color: red;
            }
            .top-item:nth-of-type(1) {
              color: #0DCAD8;
            }
            .top-item:nth-of-type(2) {
              color: #2AFF77;
            }
            .top-item:nth-of-type(3) {
              color: #FC9C2A;
            }
            .top-item:nth-of-type(4) {
              color: #FF2A9C;
            }
            .top-item:nth-of-type(5) {
              color: #FFF32A;
            }
            .top-item:nth-of-type(6) {
              color: red;
            }
          }
          .el-divider {
            background: #0C9BFF;
            height: .04rem !important;
            margin: .38rem 0;
          }
          .left1-bottom-wrap {
            width: 100%;
            .chart {
              display: flex;
              .chart-item {
                // height: 4.81rem;
                flex: 1;
                display: flex;
                justify-content: center; /* 水平居中 */
              }
              .item2 {
                // margin-left: 3.46rem;
                .value-img {
                  background: url('../../../assets/statistic-dashboard/b-v-bro.png') center no-repeat no-repeat;
                  background-size: 100% 100%;
                  width: 5.15rem;
                  height: 1.46rem;
                  line-height: 1.46rem;
                  text-align: center;
                  margin: .69rem 0;
                }
              }
            }
          }
        }
      }
      .left2 {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/vehicle-wrap-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 14.08rem;
        font-size: .62rem;
        .left2-row1 {
          display: flex;
          height: 4.77rem;
          .row1-item1 {
            background: url('../../../assets/statistic-dashboard/env-l-bg.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            width: 5.85rem;
            text-align: center;
            margin-right: .1rem;
            span {
              display: inline-block;
              margin-top: 1.5rem;
            }
          }
          .row1-item2 {
            div {
              margin: .7rem 1rem;
              position: relative;
              &::before {
                content: '';
                position: absolute;
                left: -0.98rem;
                top: .08rem;
                width: .46rem;
                height: .46rem;
                background-color: red;
                border-radius: .23rem;
              }
            }
            div:nth-of-type(1)::before {
              background-color: #0DCAD8;
            }
            div:nth-of-type(2)::before {
              background-color: #2AFF77;
            }
            div:nth-of-type(3)::before {
              background-color: #FC9C2A;
            }
          }
          .row1-item3 {
            margin-left: 1rem;
            div {
              margin: .7rem 1rem;
              position: relative;
              &::before {
                content: '';
                position: absolute;
                left: -0.98rem;
                top: .08rem;
                width: .46rem;
                height: .46rem;
                background-color: red;
                border-radius: .23rem;
              }
            }
            div:nth-of-type(1)::before {
              background-color: #DD258D;
            }
            div:nth-of-type(2)::before {
              background-color: #EFE42A;
            }
          }
        }
        .left2-row2 {
          display: flex;
          height: 4.77rem;
          .row2-item1 {
            background: url('../../../assets/statistic-dashboard/env-l-bg.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            width: 5.85rem;
            text-align: center;
            margin-right: .1rem;
            span {
              display: inline-block;
              margin-top: 1.5rem;
            }
          }
          .row2-item2 {
            margin-top: .6rem;
            div {
              margin: .7rem 1rem;
              position: relative;
              &::before {
                content: '';
                position: absolute;
                left: -0.98rem;
                top: .08rem;
                width: .46rem;
                height: .46rem;
                background-color: red;
                border-radius: .23rem;
              }
            }
            div:nth-of-type(1)::before {
              background-color: #0DCAD8;
            }
            div:nth-of-type(2)::before {
              background-color: #333D5F;
            }
          }
        }
      }
    }
    .center-wrap {
      flex: 860;
      .main-item {
        display: flex;
      }
      .center1 {
        height: 25rem;
        padding: 1rem 0 0 1rem;
        width: 100%;
        .center1-top {
          display: flex;
          justify-content: center;
          .item1-qw,.item1-sd,.item3-fs,.item3-zy {
            background: url('../../../assets/statistic-dashboard/enc-center-item.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            width: 7.62rem;
            height: 5.08rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2rem;
            .qw-wrap,.sd-wrap,.fs-wrap,.zy-wrap {
              display: flex;
              .img-wrap {
                width: 2.38rem;
                height: 2.38rem;
                margin-right: .7rem;
              }
              .value-wrap {
                line-height: 1.15rem;
              }
            }
          }
          .item2 {
            background: url('../../../assets/statistic-dashboard/env-center-bg.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            width: 14.54rem;
            height: 17.31rem;
            .item2-wrap {
              text-align: center;
              margin-top: 4rem;
              font-size: 1.62rem
            }
            .name {
              margin-top: 1.5rem;
            }
          }
        }
        .center1-bottom {
          width: 100%;
          #vehicle-LiquidFill {
             margin: 0 auto;
          }
        }
      }
      .center2{
        background: url('../../../assets/statistic-dashboard/env-c2-bro.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 9.15rem;
        padding: 0.5rem;
        margin: 0 1rem;
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
              background: url('../../../assets/statistic-dashboard/env-icon.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              width: 1.38rem;
              height: 1.54rem;
              vertical-align: middle;
            }
          }
        }
        #env-line {
          margin: 0 auto;
        }
      }
    }
    .right-wrap {
      flex: 486;
      .main-item {
        display: flex;
      }
      .right1 {
        display: flex;
        flex-wrap: wrap;
        flex: 586;
        padding: 0.5rem;
        background: url('../../../assets/statistic-dashboard/env-r-bro.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 34.3rem;
        .right1-main {
          width: 100%;
          .r-img-wrap {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 1.31rem;
            img {
              width:15.15rem;
              height: 18.08rem;
            }
          }
        }
      }
    }
    .dv-scroll-board {
      height: 12.5rem !important;
      .header {
        background: #132239 !important;
        color: #00FFF6;
        font-size: .64rem !important;
        // .header-item {
        //   width: 6.92rem !important;
        // }
      }
      .rows {
        height: 10.5rem !important;
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
