<template>
  <div class="data-v-container">
    <div class="header-nav">
      <div class="pro-name">
        <marquee v-if="prodetailInfo.projectName && prodetailInfo.projectName.length > 19" class="marquee" :content="prodetailInfo.projectName">
          <span>{{ prodetailInfo.projectName }}</span>
        </marquee>
        <div v-else class="marquee">
          <span>{{ prodetailInfo.projectName }}</span>
        </div>
      </div>
      <div class="header-img-wrap">
        <img class="header-logo" :src="$store.state.user.loginInfo.logoUrl || require('@/assets/datav-logo2.png')" alt="">
        <img class="header-img" src="@/assets/datav-header.png" alt="">
      </div>

    </div>
    <main>
      <div class="item-left">
        <div class="main-item weather-wrap">
          <div class="temperature">{{ todayWeather.tmp_min }}°C-{{ todayWeather.tmp_max }}°C {{ todayWeather.cond_txt_d }}</div>
          <div class="now-time"><span>{{ time || '00:00:00' }}</span><span class="day">星期{{ numTodaxie[(new Date()).getDay()] }}</span></div>
          <div class="date">{{ getTime().date }}</div>
        </div>

        <div class="main-item attendance-wrap">
          <div class="attendance-wrap-title">
            <img class="item-img" style="width:.130208rem" src="@/assets/jrcq.png" alt="">
            <span class="gradient-title">劳务出勤</span>
            <span :style="{ color : parseInt(todayaAtten.laborRate) < 50 ? '#FE1E36': '#10E87B'}">{{ todayaAtten.laborRate }}</span>
            <span class="gradient-title">|</span>
            <span class="gradient-title">管理出勤</span>
            <span :style="{ color : parseInt(todayaAtten.manageRate) < 50 ? '#FE1E36': '#10E87B'}">{{ todayaAtten.manageRate }}</span>
          </div>
          <div class="attendance-wrap-main">
            <div class="item-row">
              <div class="attendance-wrap-main-item" alt="">
                <img src="@/assets/blue.png" alt="">
                <div class="item">
                  <div class="item-title">劳务人员</div>
                  <div class="item-num">{{ todayaAtten.labor }}</div>
                </div>
              </div>
              <div class="attendance-wrap-main-item" alt="">
                <img src="@/assets/orange.png" alt="">
                <div class="item">
                  <div class="item-title">管理人员</div>
                  <div class="item-num">{{ todayaAtten.management }}</div>
                </div>
              </div>
            </div>
            <div class="item-row">
              <div class="attendance-wrap-main-item" alt="">
                <img src="@/assets/green.png" alt="">
                <div class="item">
                  <div class="item-title">进场人数</div>
                  <div class="item-num">{{ todayaAtten.enter }}</div>
                </div>
              </div>
              <div class="attendance-wrap-main-item" alt="">
                <img src="@/assets/purple.png" alt="">
                <div class="item">
                  <div class="item-title">未进场人数</div>
                  <div class="item-num">{{ todayaAtten.notEnter }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="main-item type-work-wrap">
          <div class="type-work-wrap-title gradient-title">
            <img class="item-img" src="@/assets/grfx.png" alt="">
            工种占比分析
            <img style="float:right;margin-top:.72rem" src="@/assets/arrow.png" alt="">
          </div>
          <div class="pie-char">
            <pie :id="id" :work-type-list="workTypeList" class="pie" />
          </div>
        </div>
      </div>
      <div class="item-center">
        <div class="main-item center-attendance-wrap">
          <div class="center-attendance-wrap-title gradient-title">
            <img class="item-img" src="@/assets/fbkq.png" alt="">
            分包考勤情况
            <img style="float:right;margin-top:.72rem" src="@/assets/arrow.png" alt="">
          </div>
          <div class="main-center-project-wrap">
            <dv-scroll-board
              :config="config"
            />
          </div>
        </div>
        <div class="main-item week-attendance-wrap">
          <div class="week-attendance-wrap-title gradient-title">
            <img class="item-img" src="@/assets/yzkq.png" alt="">
            一周考勤统计
            <img style="float:right;margin-top:.72rem" src="@/assets/arrow.png" alt="">
            <span style="float:right"><span class="item-line1" /><span class="label gradient-title">管理出勤率</span></span>
            <span style="float:right"><span class="item-line" /><span class="label gradient-title">劳务出勤率</span></span>
          </div>
          <div class="line-char">
            <line-chart :id="id" class="line" />
          </div>
        </div>
      </div>

      <div class="item-right">
        <div class="main-item new-attendance-wrap">
          <div class="new-attendance-wrap-title gradient-title">
            <img class="item-img" src="@/assets/zxdk.png" alt="">
            最新打卡
            <img style="float:right;margin-top:.72rem" src="@/assets/arrow.png" alt="">
          </div>
          <div class="new-attendance-main">
            <el-row style="width:100%">
              <el-col :span="12">
                <div class="new-attendance-main-item">
                  <div class="worker-img">
                    <img :src="newestAtten.faceUrl" alt="">
                  </div>
                  <div>对比照片</div>
                  <div class="ellipsis" :title="newestAtten.teamName">班组：{{ newestAtten.teamName }}</div>
                  <div>状态：
                    <span v-if="newestAtten.direction === 'in'">进</span>
                    <span v-if="newestAtten.direction === 'out'">出</span>
                    <span v-if="newestAtten.direction === 'none'">不分进出</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="new-attendance-main-item">
                  <div class="worker-img">
                    <img :src="newestAtten.sitePhoto" alt="">
                  </div>
                  <div>实时照片</div>
                  <div class="ellipsis" :title="newestAtten.workType">工种：{{ newestAtten.workType }}</div>
                  <div style="color: #10E87B">时间：{{ newestAtten.passedTime }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="main-item in-out-wrap">
          <div class="in-out-wrap-title gradient-title">
            <img class="item-img" src="@/assets/jcdt.png" alt="">
            进出动态
            <img style="float:right;margin-top:.72rem" src="@/assets/arrow.png" alt="">
          </div>
          <div class="in-out-wrap-main">
            <el-row class="table-header">
              <el-col :span="6">姓名</el-col>
              <el-col :span="8">进出/时间</el-col>
              <el-col :span="10">工种</el-col>
            </el-row>
            <div class="table-body-wrap">
              <el-row v-for="(item, index) in inOutList" :key="index" class="table-body">
                <el-col :span="6">{{ item.empName || '暂无信息' }}</el-col>
                <el-col :span="8">{{ item.direction }}/{{ item.passedTime }}</el-col>
                <el-col style="text-align:center" :title="item.title" class="ellipsis" :span="10">{{ item.title || '暂无信息' }}</el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Pie from './pie'
import LineChart from './line'
import Marquee from '@/components/marquee'
import { detail } from '@/api/project/project'
import axios from 'axios'
import { getTodayAttendance, getConsAttendance, getNewestAttendance, getAttendanceDynamic } from '@/api/datav'
import { parseTime } from '@/utils/index'
export default {
  components: {
    Pie,
    LineChart,
    Marquee
  },
  data() {
    const loginInfo = JSON.parse(sessionStorage.getItem('result'))
    return {
      time: '',
      fyData: {},
      todayaAtten: {},
      newestAtten: {},
      workTypeList: [],
      consAttenList: [],
      inOutList: [],
      todayWeather: {},
      prodetailInfo: {},
      permiList: this.$store.getters.roleList,
      config: {
        header: ['分包单位', '在场人数', '考勤人数', '考勤率'],
        headerBGC: ['transparent'],
        oddRowBGC: ['transparent'],
        evenRowBGC: ['transparent'],
        carousel: 'page',
        align: ['center', 'center', 'center', 'center']
      },
      config1: {
        header: ['姓名', '进出/时间', '工种'],
        headerBGC: ['transparent'],
        oddRowBGC: ['transparent'],
        evenRowBGC: ['transparent'],
        carousel: 'page',
        align: ['center', 'center', 'center']
      },
      isAdmin: loginInfo.userType === 0 && loginInfo.isManager === 1,
      id: this.$router.history.current.query.id,
      name: this.$router.history.current.query.name,
      numTodaxie: {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.time = this.getTime().time
    }, 1000)
    this.init()
    this.tiemer = setInterval(() => {
      this.getNewestAttendance()
      this.getAttendanceDynamic()
    }, 5000)
    this.tiemer1 = setInterval(() => {
      this.getTodayAttendance()
      this.getConsAttendance()
    }, 3600000)
    // 初始化
    this.setRem()
    // 改变窗口大小时重新设置 rem
    window.addEventListener('resize', this.setRem())
  },
  beforeDestroy() {
    document.documentElement.style.fontSize = '16px'
    window.removeEventListener('resize', this.setRem())
    clearInterval(this.tiemer)
    clearInterval(this.tiemer1)
  },
  methods: {
    setRem(size) {
      const baseSize = 26
      const basePc = baseSize / 1920
      let vW = window.innerWidth
      const vH = window.innerHeight
      const dueH = (vW * 1080) / 1920
      if (vH < dueH) vW = (vH * 1920) / 1080
      const rem = vW * basePc
      document.documentElement.style.fontSize = rem + 'px'
    },
    getNowWeather(prodetailInfo) {
      const { projectRegion, latitude, longitude } = prodetailInfo
      const cityCode = projectRegion ? projectRegion.split(',')[ projectRegion.split(',').length - 2] : ''
      axios.get(`https://free-api.heweather.net/s6/weather/forecast?key=17d2e87508694f82a19e156432920dbd&lat=${latitude}&lon=${longitude}&location=${cityCode}`)
        .then((response) => {
          this.todayWeather = response.data.HeWeather6[0].daily_forecast[0]
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    async init() {
      if (this.id) {
        this.prodetailInfo = await this.getProdetail()
      }
      this.getNowWeather(this.prodetailInfo)
      this.getTodayAttendance()
      this.getConsAttendance()
      this.getNewestAttendance()
      this.getAttendanceDynamic()
      // this.newestAttendanceAndEpidemic()
    },
    // 今日出勤状况
    getTodayAttendance() {
      getTodayAttendance({ id: this.id }).then((data) => {
        this.todayaAtten = data.result
        console.log(data.result)
      })
    },
    // 项目详情
    getProdetail() {
      return new Promise((resolve, reject) => {
        detail({ id: this.id }).then((data) => {
          if (data && data.code === 1000) {
            resolve(data.result)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 分包考勤情况
    getConsAttendance() {
      getConsAttendance({ id: this.id }).then((data) => {
        this.consAttenList = data.result
        this.consAttenList = data.result.map(item => {
          return [
            item.constructionName,
            `<span style="color:#e5b965;">${item.inCount}</span>`,
            `<span style="color:#e5b965;">${item.todayWorkersCount}</span>`,
            `<span style="color:${parseInt(item.rate) < 50 ? '#FE1E36' : '#10E87B'}">${item.rate}</span>`
          ]
        })
        console.log(data.result)
        this.config = {
          header: ['分包单位', '在场人数', '考勤人数', '考勤率'],
          headerBGC: ['transparent'],
          oddRowBGC: ['transparent'],
          evenRowBGC: ['transparent'],
          carousel: 'page',
          align: ['center', 'center', 'center', 'center'],
          data: this.consAttenList
        }
      })
    },
    // 最新打卡
    getNewestAttendance() {
      getNewestAttendance({ id: this.id }).then((data) => {
        this.newestAtten = data.result
        if (data.result.passedTime) this.newestAtten.passedTime = parseTime(data.result.passedTime, '{h}:{i}:{s}')
      })
    },
    // 进出动态
    getAttendanceDynamic() {
      getAttendanceDynamic({ id: this.id }).then((data) => {
        if (data.result && data.result.length) {
          data.result.map(item => {
            item.passedTime = item.passedTime ? parseTime(item.passedTime, '{h}:{i}') : ''
            item.direction = item.direction ? (item.direction === 'in' ? '进' : item.direction === 'out' ? '出' : '不分进出') : ''
            return item
          })
        }
        this.inOutList = data.result.filter(v => v.empName)
      })
    },
    // 防疫
    // newestAttendanceAndEpidemic() {
    //   newestAttendanceAndEpidemic({ id: this.id }).then((data) => {
    //     this.fyData = data.result || {}
    //     this.fyData.passedTime = data.result.passedTime ? parseTime(data.result.passedTime, '{h}:{i}:{s}') : ''
    //     this.fyData.nucleicAcid = data.result.nucleicAcid ? '阳性' : '阴性'
    //     this.fyData.vaccines = data.result.vaccines ? '已完成接种' : '未完成接种'
    //     this.fyData.healthCode = data.result.healthCode ? data.result.healthCode === 1 ? '黄码' : '红码' : '绿码'
    //     this.fyData.mucleicAcidTime = data.result.mucleicAcidTime ? parseTime(data.result.mucleicAcidTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
    //     this.fyData.direction = data.result.direction ? (data.result.direction === 'in' ? '进' : data.result.direction === 'out' ? '出' : '不分进出') : ''
    //   })
    // },
    getTime() {
      return {
        time: parseTime(new Date(), '{h}:{i}:{s}'),
        date: parseTime(new Date(), '{y}年{m}月{d}日')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.data-v-container {
  // background-color: #000; /* 不支持线性的时候显示 */
  // background-image: linear-gradient(to bottom right, #222 , #333);
  background: url('../../assets/datav-bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  color: #fff;
  width: 100%;
  height: 100vh;
  // font-size: .15625rem;
  .header-nav {
    height: 4.23rem;
    text-align: center;
    position: relative;
    .logo {
      width: 7.23rem;
      height: 2.04rem;
      float: left;
      margin: 1.23rem;
      margin: 1.23rem 0 .052083rem 1.23rem;
    }
    .header-img-wrap {
      margin: 0 auto;
      width: 100%;
      .header-logo {
        position: absolute;
        left: 1.23rem;
        top: 1.23rem;
        height: 2.04rem;
        // width: 0.208333rem;
      }
    }
    .header-img {
      float: left;
      display: block;
      width: 100%;
      height: 3.85rem;
    }
    .pro-name {
      color: #0686D8;
      font-size: 1.15rem;
      font-weight: 600;
      width: 20rem;
      .marquee {
        text-align: center;
        width: 20rem;
        cursor: pointer;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -30%);
      }
    }
  }
  main {
    display: flex;
    .gradient-title {
      background-image: -webkit-gradient(linear, 0 0, 1 bottom, from(#1ba8e4), to(#91c1fb));
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .main-item {
      // background-repeat: no-repeat;
      // background-size: 2px 8px, 8px 2px;
      .item-img {
        vertical-align: sub;
        width: 1.15rem;;
      }
    }
    .item-left {
      width:16.88rem;
      margin: 0 1.15rem;
      .weather-wrap {
        height: 8.85rem;
        padding: .68rem;
        background: url('../../assets/weather-bg.png');
        background-size: 100% 100%;
        .temperature {
          font-size: .77rem;
          height: 1.5rem;
          line-height: 1.5rem;
          text-align: right;
        }
        .now-time {
          font-size: 2.08rem;
          padding-bottom: 1.54rem;
           text-align: center;
          .day {
            font-size: .145833rem;
            padding-left: .078125rem;
          }
        }
        .date {
          text-align: center;
        }
      }
      .attendance-wrap {
        height: 15.38rem;
        margin: 1.15rem 0;
        background: url('../../assets/333.png');
        background-size: 100% 100%;
        .attendance-wrap-title {
          padding: 0 1.15rem;
          font-size: 1rem;
          text-align: left;
          height: 1.92rem;
          line-height: 1.92rem;
          border-bottom:1px solid rgba(27,202,242,0.2);
        }
        .attendance-wrap-main {
          // padding: .078125rem 0 .078125rem .104167rem;
          padding: 1rem 0 0 0;
          .item-row {
            width:11.54rem;
            margin:0 auto
          }
          .attendance-wrap-main-item {
            color: #fff;
            position: relative;
            display:inline-block;
            width: 5.38rem;
            height: 5.38rem;
            img {
              width:100%;
              height:100%
            }
            .item {
              position: absolute;
              width: 100%;
              text-align: center;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -35%);
              .item-title {
                font-size: .62rem;
              }
              .item-num {
                font-size: 1.08rem;
              }
            }
          }
        }

      }
      .type-work-wrap {
        height: 9.6rem;
        background: url('../../assets/type-work.png');
        background-size: 100% 100%;
        .type-work-wrap-title {
          padding: 0 1.31rem;
          font-size: 1rem;
          height: 1.92rem;
          line-height: 1.92rem;
          text-align: left;
          border-bottom:1px solid rgba(27,202,242,0.2);
        }
        .pie-char {
          .pie {
          width: 100%;
          height: 7.39rem;
          margin: 0 auto;
          }
        }
      }
    }
    .item-center {
      width: 44.38rem;
      .center-attendance-wrap {
        height: 20.38rem;
        background: url('../../assets/center.png');
        background-size: 100% 100%;
        .center-attendance-wrap-title {
          padding: 0 1.54rem;
          font-size: 1rem;
          text-align: left;
          height: 1.92rem;
          line-height: 1.92rem;
          border-bottom:1px solid rgba(27,202,242,0.2);
        }
        .main-center-project-wrap {
          padding: 1.15rem;

          .dv-scroll-board {
            height: 14.5rem !important;
            .header {
              font-size: .9rem !important;
            }
            .rows {
              height: 13.8rem !important;
              overflow: hidden;
              .row-item {
                font-size: .62rem !important;
                height: 1.55rem !important;
                line-height: 1.55rem !important;
              }
              // .row-item:nth-child(1) {
              //   background: red !important;
              // }
            }
          }
        }
      }
      .week-attendance-wrap {
        height: 14.55rem;
        margin-top: 1.15rem;
        background: url('../../assets/center.png');
        background-size: 100% 100%;
        .week-attendance-wrap-title {
          font-size: 1rem;
          text-align: left;
          padding: 0 1.15rem;
          height: 1.92rem;
          line-height: 1.92rem;
          border-bottom: 1px solid rgba(27,202,242,0.2);
          .label {
            font-size: .77rem;
            font-weight: 600;
            margin-right: 1.15rem;
          }
          .item-line {
            display: inline-block;
            vertical-align: middle;
            height: 1px;
            width: 1.15rem;
            border-top:.08rem solid #E0525E
          }
          .item-line1 {
            display: inline-block;
            vertical-align: middle;
            height:1px;
            width:1.15rem;
            border-top:.08rem solid #0BEB7B
          }
        }
        .line-char {
          .line {
            width: 100%;
            height: 12.08rem;
          }
        }
      }
    }
    .item-right {
      width: 18.31rem;
      margin: 0 1.15rem;
      .new-attendance-wrap {
        height: 15.92rem;
        background: url('../../assets/333.png');
        background-size: 100% 100%;
        .new-attendance-wrap-title {
          font-size: 1rem;
          text-align: left;
          padding: 0 1.15rem;
          height: 1.92rem;;
          line-height: 1.92rem;;
          border-bottom:1px solid rgba(27,202,242,0.2);
        }
        .new-attendance-main {
          // display: flex;
          font-size: .69rem;
          padding: 1.15rem 0;
          .new-attendance-main-item {
            flex: 1;
            text-align: center;
            line-height: 2rem;
            .worker-img {
                width: 5rem;
                height: 5.38rem;
                border:1px solid rgba(27,202,242,0.2);
              img {
                width: 5rem;
                height: 5.38rem;
              }
              margin: 0 auto;
            }
          }
        }
      }
      .in-out-wrap {
        height: 19rem;
        margin-top: 1.15rem;
        background: url('../../assets/333.png');
        background-size: 100% 100%;
        .in-out-wrap-title {
          font-size: 1rem;
          text-align: left;
          padding: 0 1.15rem;
          height: 1.92rem;
          line-height: 1.92rem;
          border-bottom:1px solid rgba(27,202,242,0.2);
        }
        .in-out-wrap-main {
          padding: 1.5rem .052083rem .15625rem .15625rem;
          .table-header {
            font-size: .90rem;
            margin-bottom: .104167rem;
            text-align: center;
          }
          .table-body-wrap {
            height: 12rem;
            overflow: auto;
          }
          .table-body {
            line-height: 2rem;
            font-size: .6rem;
            text-align: center;
            .num {
              color: #E5B965;
            }
            .attendance {
              color: #0DE779;
            }
          }
        }
      }
    }
  }
  .ellipsis {
    cursor: pointer;
    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:nowrap; //溢出不换行
  }
}
</style>
