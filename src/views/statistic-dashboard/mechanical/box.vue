<template>
  <div class="statistic-dashboard-box dashboard-full-screen">
    <!-- <div class="statistic-dashboard-header">
      <FullScreen ref="FullScreen" />
      <SelectProject @newsReload="newsReload" />
    </div>
    <Nav /> -->
    <div class="statistic-dashboard-main">
      <div class="left-wrap">
        <div class="main-item left1">
          <div class="item-left1-main">
            <div class="toggle-wrap">
              <div @click="changeDevice('prev')"><img class="prev" src="../../../assets/statistic-dashboard/prev.png" alt=""></div>
              <!-- {{ deviceList }} -->
              <div class="elevator-name">{{ deviceList.length ? deviceList[index].deviceName : '暂无设备' }}</div>
              <div @click="changeDevice('next')"><img class="next" src="../../../assets/statistic-dashboard/next.png" alt=""></div>
            </div>
            <div class="img-wrap">
              <img src="../../../assets/statistic-dashboard/box-l.png" alt="">
            </div>
          </div>
        </div>
        <div class="main-item left2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 电箱数据</div>
          </div>
          <div class="bottom-wrap">
            <div class="chart">
              <div class="chart-item">
                <Pie id="box-pie" :worker-info="{value: deviceInfo.current, value1: 220, name: '漏电流'}" height="5.81rem" width="5.81rem" />
              </div>
              <div class="chart-item item2">
                <div>
                  <div class="title1">漏电流</div>
                  <div class="value-img value1">
                    <span>{{ deviceInfo.current || '0' }}</span> mA
                  </div>
                  <div class="title2">环境温度</div>
                  <div class="value-img value2">
                    <span>{{ nowTmp || '0' }}</span> °C
                  </div>
                </div>
              </div>
              <div class="chart-item">
                <Pie id="box-pie1" :worker-info="{value: nowTmp, value1: 100, name: '环境温度'}" height="5.81rem" width="5.81rem" />
              </div>
            </div>
            <div class="time">
              <img src="../../../assets/statistic-dashboard/bg-1.png" alt="">
              更新时间 {{ deviceInfo.tm ? parseTime(deviceInfo.tm, '{y}-{m}-{d} {h}:{i}:{s}') : '0000-00-00 00:00:00' }}
              <img src="../../../assets/statistic-dashboard/bg-2.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="main-item right-wrap">
        <div class="right1">
          <div class="right1-top">
            <div class="statistics-wrap">
              <el-row>
                <el-col :span="12">
                  总数
                  <div v-for="(item, idx) in boxData.boxTotal.toString().split('')" :key="idx" class="num-wrap">{{ item }}</div>
                </el-col>
                <el-col :span="12">
                  在线
                  <div v-for="(item, idx) in boxData.onLineTotal.toString().split('')" :key="idx" class="num-wrap">{{ item }}</div>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="9">
                  <div class="item">
                    <img class="item-img" src="@/assets/statistic-dashboard/b-wd.png" alt="">
                    <div class="item-value">
                      <div>a温度</div>
                      <div class="item-value-num">{{ deviceInfo.awarm ? deviceInfo.awarm + ' ℃' : '暂无数据' }}</div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="item">
                    <img class="item-img" src="@/assets/statistic-dashboard/b-wd1.png" alt="">
                    <div class="item-value">
                      <div>b温度</div>
                      <div class="item-value-num">{{ deviceInfo.bwarm ? deviceInfo.bwarm + ' ℃' : '暂无数据' }}</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="row-2">
                <el-col :span="12">
                  <div class="item">
                    <img class="item-img" src="@/assets/statistic-dashboard/b-wd.png" alt="">
                    <div class="item-value">
                      <div>c温度</div>
                      <div class="item-value-num">{{ deviceInfo.cwarm ? deviceInfo.cwarm + ' ℃' : '暂无数据' }}</div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="item">
                    <img class="item-img" src="@/assets/statistic-dashboard/b-wd1.png" alt="">
                    <div class="item-value">
                      <div>n温度</div>
                      <div class="item-value-num">{{ deviceInfo.nwarm ? deviceInfo.nwarm + ' ℃' : '暂无数据' }}</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="cable-wrap">
            <div class="main-item cable">
              <div class="title-wrap">
                <div class="title"><span class="icon" /> 设备报警</div>
              </div>
              <div class="img-wrap">
                <div class="img-wrap-item">
                  <div class="item-1">
                    <img :src="bgImg1">
                    <div class="val1">{{ deviceInfo.current > 50 ? '警报' : '正常' }}</div>
                  </div>
                  <div class="item-title">漏电流报警</div>
                </div>
                <div class="img-wrap-item">
                  <div class="item-2">
                    <img :src="bgImg2">
                    <div class="val2">{{ (deviceInfo.awarm > 70) || (deviceInfo.bwarm > 70) || deviceInfo.cwarm > 70 ? '警报' : '正常' }}</div>
                  </div>
                  <div class="item-title">线缆报警</div>
                </div>
                <div class="img-wrap-item">
                  <div class="item-3">
                    <img :src="nowTmpBgImg">
                    <!-- eslint-disable-next-line vue/no-parsing-error -->
                    <div class="val3">{{ (nowTmp < -20) || (nowTmp > 35) ? '警报' : '正常' }}</div>
                  </div>
                  <div class="item-title">环境报警</div>
                </div>
              </div>
              <div class="time">
                <img src="../../../assets/statistic-dashboard/bg-1.png" alt="">
                更新时间 {{ deviceInfo.tm ? parseTime(deviceInfo.tm, '{y}-{m}-{d} {h}:{i}:{s}') : '0000-00-00 00:00:00' }}
                <img src="../../../assets/statistic-dashboard/bg-2.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="main-item right2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 实时明细</div>
          </div>
          <dv-scroll-board
            :config="config"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import FullScreen from '../component/FullScreen.vue'
// import SelectProject from '../component/SelectPro.vue'
// import Nav from '../component/Nav.vue'
import Pie from './component/Pie.vue'
import axios from 'axios'
import { parseTime } from '@/utils'
import { findElectricityBoxRecordList, findNewElectRecordById, boxProList, boxSta } from '@/api-zhgd/box-monitor'
export default {
  components: {
    // FullScreen,
    // SelectProject,
    // Nav,
    Pie
  },
  data() {
    return {
      parseTime,
      nowTmp: '',
      nowtmpMin: '',
      nowtmpMax: '',
      nowTmpBgImg: require('@/assets/statistic-dashboard/item-yellow.png'),
      bgImg1: require('@/assets/statistic-dashboard/item-yellow.png'),
      bgImg2: require('@/assets/statistic-dashboard/item-yellow.png'),
      index: 0,
      deviceList: [],
      recordList: [],
      boxData: {
        boxTotal: '0',
        onLineTotal: '0'
      },
      deviceInfo: {},
      config: {
        header: ['设备名称', '漏电流', '线缆a温度', '线缆b温度', '线缆c温度', '线缆n温度', '运行时间'],
        headerBGC: ['transparent'],
        oddRowBGC: ['#0D2244'],
        evenRowBGC: ['transparent'],
        carousel: 'page',
        align: ['center', 'center', 'center', 'center', 'center', 'center', 'center']
      }
    }
  },
  mounted() {
  },
  methods: {
    async init(projectId, item) {
      this.getNowWeather(item)
      this.getBoxSta(projectId)
      const deviceId = await this.screenProHandle(projectId)
      if (deviceId) {
        this.getBoxList(deviceId)
        this.getRecordList(deviceId)
      }
    },
    newsReload(projectId, item) {
      this.init(projectId, item)
    },
    //
    getBoxList(deviceId) {
      findNewElectRecordById({ deviceId }).then((data) => {
        if (data && data.code === 1000) {
          this.deviceInfo = data.result || {}
          this.bgImg1 = (this.deviceInfo.current > 50) ? require(`@/assets/statistic-dashboard/item-red.png`) : require(`@/assets/statistic-dashboard/item-blue.png`)
          this.bgImg2 = ((this.deviceInfo.awarm > 70) || (this.deviceInfo.bwarm > 70) || this.deviceInfo.cwarm > 70) ? require(`@/assets/statistic-dashboard/item-red.png`) : require(`@/assets/statistic-dashboard/item-blue.png`)
        }
      })
    },
    changeDevice(type) {
      if (this.deviceList && this.deviceList.length) {
        if (type === 'prev' && this.index !== 0) {
          this.index--
        } else if (type === 'next' && (this.index < this.deviceList.length - 1)) {
          this.index++
        }
        this.getBoxList(this.deviceList[this.index].id)
        this.getRecordList(this.deviceList[this.index].id)
      }
    },
    //
    getRecordList(deviceId) {
      findElectricityBoxRecordList({ deviceId }).then((data) => {
        if (data && data.code === 1000) {
          this.recordList = data.result.records.map(item => {
            return [item.deviceName, item.current, item.awarm, item.bwarm, item.cwarm, item.nwarm, item.tm ? parseTime(item.tm, '{y}-{m}-{d} {h}:{i}:{s}') : '']
          })
          this.config = {
            header: ['设备名称', '漏电流', '线缆a温度', '线缆b温度', '线缆c温度', '线缆n温度', '运行时间'],
            headerBGC: ['transparent'],
            oddRowBGC: ['#0D2244'],
            evenRowBGC: ['transparent'],
            carousel: 'page',
            align: ['center', 'center', 'center', 'center', 'center', 'center', 'center'],
            data: this.recordList
          }
        }
      })
    },
    //
    screenProHandle(projectId) {
      return boxProList({}).then((data) => {
        if (data && data.code === 1000) {
          const project = data.result.find(item => item.id === projectId)
          this.deviceList = project ? project.deviceList : []
          const deviceId = project && project.deviceList.length ? project.deviceList[0].id : ''
          return deviceId
        }
      })
    },
    getBoxSta(projectId) {
      boxSta({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.boxData = data.result || {
            boxTotal: '0',
            onLineTotal: '0'
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取天气
    getNowWeather(prodetailInfo) {
      const { projectRegion, latitude, longitude } = prodetailInfo
      const cityCode = projectRegion ? projectRegion.split(',')[ projectRegion.split(',').length - 2] : ''
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
          this.nowTmpBgImg = (this.nowTmp < -20) || (this.nowTmp > 35) ? require(`@/assets/statistic-dashboard/item-red.png`) : require(`@/assets/statistic-dashboard/item-blue.png`)
          this.nowtmpMin = +response[1].data.HeWeather6[0].daily_forecast[0].tmp_min
          this.nowtmpMax = +response[1].data.HeWeather6[0].daily_forecast[0].tmp_max
        })
        .catch(function(error) {
          console.log(error)
        })
    }
    //
    // fetchQuestionByType(projectId) {
    //   questionByType({ type: 1, projectId }).then((data) => {
    //     if (data && data.code === 1000) {
    //       this.typeList = data.result
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss">
// 计算方式 26px -> 1rem
.statistic-dashboard-box {
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
        background: url('../../../assets/statistic-dashboard/box-icon.png') center no-repeat no-repeat;
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
      flex: 513;
      .main-item {
        display: flex;
      }
      .left1 {
        display: flex;
        flex-wrap: wrap;
        height: 20.23rem;
        .item-left1-main {
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
            width: 100%;
            justify-content: center;
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
              height: 18.46rem
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
        .bottom-wrap {
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
              .value-img {
                background: url('../../../assets/statistic-dashboard/b-v-bro.png') center no-repeat no-repeat;
                background-size: 100% 100%;
                width: 5.15rem;
                height: 1.46rem;
                line-height: 1.46rem;
                text-align: center;
                margin: .69rem 0;
              }
              .value1 {
                span {
                  color: #FCB31E;
                  font-weight: 700;
                }
              }
              .value2 {
                span {
                  color: #46EDE8;
                  font-weight: 700;
                }
              }
              .title2 {
                text-align: right;
              }
            }
          }
          .time {
            display: flex;
            justify-content: center; /* 水平居中 */
            img {
              width: 3.77rem;
              height: .77rem;
            }
          }
        }
      }
    }
    .right-wrap {
      flex: 1363;
      .main-item {
        display: flex;
      }
      .right1 {
        display: flex;
        flex: wrap;
        .right1-top {
          height: 14.8rem;
          flex: 856;
          margin-left: 2rem;
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
        .cable-wrap {
          flex: 486;
          .main-item {
            display: flex;
          }
          .cable {
            display: flex;
            flex-wrap: wrap;
            width: 22.62rem;
            padding: 0.5rem;
            background: url('../../../assets/statistic-dashboard/v-bro-right.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            height: 14.5rem;
          }
          .img-wrap {
            display: flex;
            width: 100%;
            .img-wrap-item {
              flex: 1;
            }
            .item-title {
              margin: .4rem 1.2rem;
              text-align: center;
            }
            img {
              width: 4.38rem;
              height: 4.38rem;
            }
            .item-1 {
              // background: url('../../../assets/statistic-dashboard/item-blue.png') center no-repeat no-repeat;
              // background-size: 100% 100%;
              width: 4.38rem;
              height: 4.38rem;
              position: relative;
              margin: 0 auto;
              .val1 {
                position: absolute;
                left: 32%;
                top:30%;
              }
            }
            .item-2 {
              // background: url('../../../assets/statistic-dashboard/item-yellow.png') center no-repeat no-repeat;
              // background-size: 100% 100%;
              width: 4.38rem;
              height: 4.38rem;
              position: relative;
              margin: 0 auto;
              .val2 {
                position: absolute;
                left: 32%;
                top:30%;
              }
            }
            .item-3 {
              // background: url('../../../assets/statistic-dashboard/item-red.png') center no-repeat no-repeat;
              // background-size: 100% 100%;
              width: 4.38rem;
              height: 4.38rem;
              position: relative;
              margin: 0 auto;
              .val3 {
                position: absolute;
                left: 32%;
                top:30%;
              }
            }
          }
          .time {
            width: 100%;
            height: .77rem;
            display: flex;
            justify-content: center; /* 水平居中 */
          }
        }
      }
      .right2{
        background: url('../../../assets/statistic-dashboard/v-bro-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 19.35rem;
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
              background: url('../../../assets/statistic-dashboard/box-icon.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              width: 1.38rem;
              height: 1.54rem;
              vertical-align: middle;
            }
          }
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
        height: 13.8rem !important;
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
