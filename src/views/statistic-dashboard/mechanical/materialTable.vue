<template>
  <div class="statistic-dashboard-material-table dashboard-full-screen">
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
              <img src="@/assets/statistic-dashboard/materialImg@2x.png" alt="">
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
              <div v-for="(item, idx) in 5" :key="idx" class="num-wrap">{{ item-1 }}</div>
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
      <div class="elevator-center">
        <div class="main-item material-wrap">
          <div class="item-center1">
            <div class="item-center1-left">
              <div class="statistics-wrap">
                <el-row>
                  <el-col :span="12">
                    总数
                    <div v-for="(item, idx) in 2" :key="idx" class="num-wrap">{{ item - 1 }}</div>
                  </el-col>
                  <el-col :span="12">
                    在线
                    <div v-for="(item, idx) in 2" :key="idx" class="num-wrap">{{ item - 1 }}</div>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-row>
                  <el-col :span="9">
                    <div class="item">
                      <img class="item-img" src="@/assets/statistic-dashboard/elevator-speed.png" alt="">
                      <div class="item-value">
                        <div>X 倾角</div>
                        <div class="item-value-num">{{ data.speed || 0 }} kN.m</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="item">
                      <img class="item-img" src="@/assets/statistic-dashboard/elevavtor-wind-speed.png" alt="">
                      <div class="item-value">
                        <div>Y 倾角</div>
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
                        <div>重量百分比</div>
                        <div class="item-value-num">{{ data.height || 0 }} m</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="item">
                      <img class="item-img" src="@/assets/statistic-dashboard/elevavtor-floor.png" alt="">
                      <div class="item-value">
                        <div>重量信号</div>
                        <div class="item-value-num">{{ data.floor || 0 }} 层</div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="item-center1-right">
              <div class="item-right1">
                <div class="title-wrap">
                  <div class="title"><span class="icon" /> 近期报警</div>
                </div>
                <dv-scroll-board
                  :config="config"
                />
              </div>
            </div>
          </div>
          <div class="item-center2">
            <div class="title-wrap">
              <div class="title"><span class="icon" /> 24小时重量曲线</div>
            </div>
            <MaterialLine :id="'materialLine-line'" height="16.15rem" :width="'100%'" />
          </div>
        </div>
      </div>
      <!-- <div class="elevator-right-wrap">
        <div class="main-item item-right1">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 升降机报警汇总</div>
          </div>
        </div>
        <div class="main-item item-right2">
          <div class="title-wrap">
            <div class="title"><span class="icon" /> 升降机报警汇总</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
// import FullScreen from '../component/FullScreen.vue'
import MaterialLine from './component/materialLine.vue'
// import common from '../mixins/common'
// import { parseTime } from '@/utils'
export default {
  components: {
    MaterialLine
  },
  // mixins: [common],
  data() {
    return {
      // parseTime,
      deviceList: [],
      index: 0,
      data: { laod: '0' },
      initData: [],
      elevatorData: {
        elevatorTotal: '0',
        onLineTotal: '0'
      },
      config: {
        header: ['监控点', '报警描述', '数据值', '时间'],
        headerBGC: ['transparent'],
        oddRowBGC: ['#0D2244'],
        evenRowBGC: ['transparent'],
        rowNum: 6,
        carousel: 'page',
        align: ['center', 'center', 'center', 'center'],
        data: []
      }
    }
  },
  mounted() {
    this.newsReload('id')
  },
  methods: {
    init(projectId) {
      console.log(console.log(projectId))
    },
    newsReload(projectId) {
      const obj = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }
      for (let i = 1; i <= 7; i++) {
        this.initData.push(obj)
      }
      this.initData = this.initData.map(item => {
        return [
          '测试-185',
          '无',
          '无',
          '2023-2-22  18：00：00'
        ]
      })
      this.config = {
        header: ['监控点', '报警描述', '数据值', '时间'],
        headerBGC: ['transparent'],
        oddRowBGC: ['#0D2244'],
        evenRowBGC: ['transparent'],
        carousel: 'page',
        rowNum: 6,
        align: ['center', 'center', 'center', 'center'],
        data: this.initData
      }
      this.init(projectId)
    },
    changeDevice(type) {
      if (this.deviceList && this.deviceList.length) {
        if (type === 'prev' && this.index !== 0) {
          this.index--
        } else if (type === 'next' && (this.index < this.deviceList.length - 1)) {
          this.index++
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// 计算方式 26px -> 1rem
.statistic-dashboard-material-table {
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
      flex: 688;
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
              margin-left: 4.15rem;
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
      flex: 1834;
      margin: 0 1rem;
      .material-wrap {
        .main-item {
          display: flex;
        }
        .item-center1 {
          flex: 860;
          display: flex;
          flex-direction: row;
          height: 16rem;
          margin-left: 2rem;
          .item-center1-left {
            flex: 560;
            .statistics-wrap {
              display: flex;
              .el-row {
                width: 100%;
              }
            }
            .el-row {
              margin: .62rem 0 0 3rem;
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
              margin-left: 7.42rem;
            }
          }
          .item-center1-right {
            flex: 300;
            .item-right1 {
              padding: 0.5rem;
              background: url('../../../assets/statistic-dashboard/v-bro-right.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              height: 15.77rem;
              margin-bottom: 1rem;
            }
          }
        }
        .item-center2{
          flex: 486;
          background: url('../../../assets/statistic-dashboard/materialGroup@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          height: 18.57rem;
          padding: 0.5rem;
          .title-wrap {
            width: 100%;
            background: url('../../../assets/statistic-dashboard/materialTilte@2x.png') center no-repeat no-repeat;
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
  }
  ::v-deep .dv-scroll-board {
    height: 12.69rem !important;
    .header {
      background: #132239 !important;
      color: #00FFF6;
      font-size: .64rem !important;
      // .header-item {
      //   width: 6.92rem !important;
      // }
    }
    .rows {
      height: 10.77rem !important;
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
</style>
