<template>
  <div class="realname-container">
    <div class="gyc-dashboard-header">
      <div class="gyc-full-screen-toggle" @click="toggleFullScreen()">
        <svg-icon :icon-class="iconStatus ? 'exit-full-screen' : 'full-screen'" />
        <span>{{ iconStatus ? '退出' : '全屏' }}</span>
      </div>
      <div class="now-time">
        <span>
          <div>{{ getTime().date }}</div>
          <div>{{ time || '00:00:00' }}</div>
          <div>星期{{ numTodaxie[(new Date()).getDay()] }}</div>
        </span>
      </div>
      <div class="pro-name">
        <div class="pro-marquee">
          <Marqueed v-if="compyName && compyName.length > 11" class="marqueed" :content="compyName">
            <span>{{ compyName }}</span>
          </Marqueed>
          <div v-else class="marqueed marquee">
            <span>{{ compyName }}</span>
          </div>
          <!-- <Panel @newsReload="newsReload" /> -->
        </div>
      </div>
      <div class="cpt-name">
        <!-- <span>{{ compyName }}</span> -->
      </div>
    </div>
    <main>
      <div class="left-item">
        <div class="left-item-title title-style">
          <img class="item-img" src="@/assets/statistic-dashboard/realname-svg@2x.png" alt="">
          <div class="item-title">项目人员动态管理</div>
        </div>
        <div class="item-card">
          <div class="item-card-n">
            <div class="card-name">出勤状况总览</div>
            <div class="card-count">{{ personData.dayCount }} / {{ personData.totalCount }}</div>
          </div>
          <div class="item-card-n">
            <div class="card-name">劳务人员出勤</div>
            <div class="card-count">{{ personData.laborDayCount }} / {{ personData.laborCount }}</div>
          </div>
          <div class="item-card-n">
            <div class="card-name">管理人员出勤</div>
            <div class="card-count">{{ personData.manageDayCount }} / {{ personData.manageCount }}</div>
          </div>
          <div class="item-card-n">
            <div class="card-name">监理人员出勤</div>
            <div class="card-count">{{ personData.atteDayCount }} / {{ personData.atteCount }}</div>
          </div>
        </div>
        <div class="attendance-bar">
          <ApdBar id="attBar" :workers="recordData" height="17.31rem" width="100%" />
        </div>
      </div>
      <div class="rigth-item">
        <div class="top-item">
          <div class="attendance-line">
            <div class="attendance-title title-style">
              <img class="item-img" src="@/assets/statistic-dashboard/realname-svg@2x.png" alt="">
              <div class="item-title">近7天考勤动态</div>
            </div>
            <div class="attr-line">
              <AttLine id="attLine" :init-data="atteData" height="16rem" width="100%" />
            </div>
          </div>
          <div class="epidemic-pie">
            <div class="epidemic-title title-style">
              <img class="item-img" src="@/assets/statistic-dashboard/realname-svg@2x.png" alt="">
              <div class="item-title">防疫信息化管理</div>
            </div>
            <div class="epd-fill">
              <JkmFill id="vehicle-JkmFill" :statistics="epidemicData" height="5.77rem" width="100%" />
            </div>
            <div class="epd-vehicle">
              <div class="epd-item1 epd-item">
                <span class="title">24小时核酸</span>
                <span class="conent">{{ nucleic.nucleic24 }}</span>
              </div>
              <div class="epd-item2 epd-item">
                <span class="title">48小时核酸</span>
                <span class="conent">{{ nucleic.nucleic48 }}</span>
              </div>
              <div class="epd-item3 epd-item">
                <span class="title">72小时核酸</span>
                <span class="conent">{{ nucleic.nucleic72 }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-item">
          <div class="details-title title-style">
            <img class="item-img" src="@/assets/statistic-dashboard/realname-svg@2x.png" alt="">
            <div class="item-title">项目出勤明细</div>
          </div>
          <div class="details-scroll-board">
            <div class="scroll-board-title">
              <span class="tilte-word">在线项目</span>
              <div v-for="(v, i) in 6" :key="i" class="count">{{ totalCount[5-i] || 0 }}</div>
              <span class="tilte-word">个</span>
            </div>
            <dv-scroll-board
              :config="config"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import fullScreen from '@/utils/fullScreen'
import ApdBar from './bar.vue'
import AttLine from './line.vue'
import JkmFill from './fill.vue'
import Marqueed from '@/components/marquee'
import { getAttendanceStatistics, getWeeklyStatistics, getProjectAttInfo, getEpervenInfo, getCompyName } from '@/api/realname'
import { parseTime } from '@/utils/index'
export default {
  components: {
    ApdBar,
    AttLine,
    JkmFill,
    Marqueed
  },
  data() {
    // eslint-disable-next-line new-cap
    const full = new fullScreen(() => {
      console.log('不支持全屏')
    })
    return {
      full,
      time: '',
      iconStatus: false,
      compyName: '',
      initData: [],
      atteData: [],
      recordData: [],
      nucleic: {
        nucleic24: 0,
        nucleic48: 0,
        nucleic72: 0
      },
      epidemicData: [],
      totalCount: [],
      consAttenList: [],
      personData: {
        dayCount: 0,
        totalCount: 0,
        laborDayCount: 0,
        laborCount: 0,
        manageDayCount: 0,
        manageCount: 0,
        atteDayCount: 0,
        atteCount: 0
      },
      config: {
        header: [' 项目名称', '总人数', '工人出勤', '管理出勤', '监理出勤', '总出勤率'],
        headerBGC: '#132239',
        oddRowBGC: 'rgba(36,86,126,.5)',
        evenRowBGC: '112c60',
        carousel: 'page',
        // columnWidth: [120],
        rowNum: 9,
        align: ['center', 'center', 'center', 'center', 'center', 'center'],
        data: []
      },
      // userType: JSON.parse(sessionStorage.getItem('result')).userType,
      // token: JSON.parse(sessionStorage.getItem('result')).token,
      projectIds: JSON.parse(sessionStorage.getItem('result')).projectId,
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
  created() {
    this.dataInit()
  },
  mounted() {
    this.init()
    setInterval(() => {
      this.time = this.getTime().time
    }, 1000)
    this.setRem(23)
    window.addEventListener('resize', () => {
      this.iconStatus = this.full.isElementFullScreen()
      this.setRem(23)
    })
  },
  beforeDestroy() {
    document.documentElement.style.fontSize = '16px'
  },
  methods: {
    setRem(size) {
      const baseSize = size
      const basePc = baseSize / 1920
      let vW = window.innerWidth
      const vH = window.innerHeight
      const dueH = (vW * 1080) / 1920
      if (vH < dueH) vW = (vH * 1920) / 1080
      const rem = vW * basePc
      document.documentElement.style.fontSize = rem + 'px'
    },
    init() {
      getCompyName().then(res => {
        if (res.code === 1000 && res.result) this.compyName = res.result.compyName
      })
      getAttendanceStatistics().then(res => {
        if (res.code === 1000 && res.result) {
          res.result.forEach(e => {
            if (e.type === 1) {
              this.personData.dayCount = e.dayCount
              this.personData.totalCount = e.totalCount
            } else if (e.type === 2) {
              this.personData.laborDayCount = e.dayCount
              this.personData.laborCount = e.totalCount
            } else if (e.type === 3) {
              this.personData.manageDayCount = e.dayCount
              this.personData.manageCount = e.totalCount
            } else if (e.type === 4) {
              this.personData.atteDayCount = e.dayCount
              this.personData.atteCount = e.totalCount
            }
          })
          this.recordData = res.result.filter(v => v.type !== 1)
        }
      })
      getEpervenInfo().then(res => {
        if (res.code === 1000 && res.result) {
          this.epidemicData = res.result.hearCode
          res.result.nucleic.forEach(v => {
            v.nucleic_acid === 24 && (this.nucleic.nucleic24 = v.necount)
            v.nucleic_acid === 48 && (this.nucleic.nucleic48 = v.necount)
            v.nucleic_acid === 72 && (this.nucleic.nucleic72 = v.necount)
          })
        }
      })
      getProjectAttInfo().then(res => {
        if (res.code === 1000 && res.result) {
          this.getFYNumber(res.result.zxPjCount)
          this.consAttenList = res.result.infoCount.map(item => {
            return [
              item.project_name,
              item.totalCount || 0,
              item.gongrenCount || 0,
              item.guanliCount || 0,
              item.jlCount || 0,
              (item.kql || 0) + '%'
            ]
          })
        }
        this.config = {
          header: [' 项目名称', '总人数', '工人出勤', '管理出勤', '监理出勤', '总出勤率'],
          headerBGC: '#132239',
          oddRowBGC: 'rgba(36,86,126,.5)',
          evenRowBGC: '112c60',
          carousel: 'page',
          // columnWidth: [120],
          rowNum: 9,
          align: ['center', 'center', 'center', 'center', 'center', 'center'],
          data: this.consAttenList.length ? this.consAttenList : this.initData
        }
      })
      getWeeklyStatistics().then(res => {
        if (res.code === 1000 && res.result) this.atteData = res.result
      })
    },
    getFYNumber(count) {
      for (let i = 0; i <= 6; i++) {
        this.totalCount[i] = (parseInt(count / Math.pow(10, i)) % 10)
      }
    },
    // 初始化滚动表格数据
    dataInit() {
      const obj = { a: '', b: '', c: '', d: '', e: '', f: '' }
      for (let i = 1; i <= 9; i++) {
        this.initData.push(obj)
      }
      this.initData = this.initData.map(item => {
        return [
          item.a,
          item.b,
          item.c,
          item.d,
          item.e,
          item.c,
          item.d,
          item.e
        ]
      })
      this.config = {
        header: [' 项目名称', '在场人数', '工人出勤', '管理出勤', '总出勤数', '总出勤率'],
        headerBGC: '#132239',
        oddRowBGC: 'rgba(36,86,126,.5)',
        evenRowBGC: '112c60',
        carousel: 'page',
        // columnWidth: [120],
        rowNum: 9,
        align: ['center', 'center', 'center', 'center', 'center', 'center'],
        data: this.initData
      }
    },
    getTime(Time) {
      return {
        time: parseTime(Time || new Date(), '{h}:{i}:{s}'),
        date: parseTime(Time || new Date(), '{y}/{m}/{d}')
      }
    },
    // 全屏 / 退出全屏
    toggleFullScreen() {
      this.iconStatus = !this.full.isElementFullScreen()
      if (this.full.isElementFullScreen()) {
        this.full.exitFullscreen()
      } else {
        this.full.Fullscreen('.realname-container')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.realname-container {
  background: url('../../assets/antiepidemic/bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  color: #fff;
  width: 100%;
  height: 100vh;
  // height: 41.54rem;
  .gyc-dashboard-header {
    position: relative;
    top: .62rem;
    height: 3.85rem;
    background: url('../../assets/antiepidemic/header1.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    .now-time {
        position: absolute;
        left: 3.54rem;
        top: 1.32rem;
        width: 14.12rem;
        height: .96rem;
        font-size: 1.06rem;
        font-weight: 400;
        color: #F1F1F1;
        line-height: 1.56rem;
        span {
          display: flex;
          justify-content: space-around;
        }
        }
    .pro-name {
      .pro-marquee {
        text-align: center;
        letter-spacing: .19rem;
        width: 20rem;
        cursor: pointer;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -30%);
        // font-size: 1.62rem;
        // font-family: Source Han Sans CN;
        // font-weight: bold;
        // color: #FFFFFF;
        // font-weight: 600;
        // background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
        // -webkit-text-fill-color: transparent;
        // background-clip: text;
        width: 20rem;
        .marqueed {
          height: 2.15rem;
          text-align: center;
          width: 20rem;
          letter-spacing: .19rem;
          font-size: 1.62rem;
          font-family: Source Han Sans CN;
          font-weight: 600;
          // line-height: 2.20rem;
          cursor: pointer;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .marquee {
          background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
    }
      }
    }
    .cpt-name {
      position: absolute;
      letter-spacing: .19rem;
      // width: 12.31rem;
      height: 1.27rem;
      top: 1.32rem;
      right: 3.54rem;
      font-size: 1.15rem;
      color: #FFFFFF;
      font-weight: bold;
      background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .gyc-full-screen-toggle {
      width: 4rem;
      line-height: 2.9rem;
      font-size: .9rem;
      color: #0686D8;
      cursor: pointer;
      position: absolute;
      top: .6rem;
      right: .32rem;
    }
    .header-time {
      position: absolute;
      top: 1.1rem;
      right: 1.92rem;
      font-size: .62rem;
      color: #0686D8;
    }
  }
  main {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    .left-item {
      width: 33.33%;
      height: 42.73rem;
      background: url('../../assets/statistic-dashboard/realname-bg@2x.png');
      background-size: 100% 100%;
      .left-item-title {
        background: url('../../assets/statistic-dashboard/realname-title3@2x.png') center no-repeat no-repeat;
        background-size: 97% 100%;
      }
      .item-card {
        display: flex;
        flex-wrap: wrap;
        margin-left: .38rem;
        height: 16.15rem;
        .item-card-total {
          width: 70% !important;
          margin: 0 15%;
          .card-name {
            margin-top: 15% !important;
          }
        }
        .item-card-n {
          width: 50%;
          height: 9.23rem;
          text-align: center;
          background: url('../../assets/antiepidemic/frame3.png');
          background-size: 100% 100%;
          .card-name {
            margin-top: 24%;
            font-size: 1rem;
            color: #FFFFFF;
            line-height: 1.12rem;
            text-shadow: 0 0 1px #fff,0 0 5px #0072FF,0 0 10px #0072FF,0 0 15px #0072FF;
            // transform: translateY(50%);
          }
          .card-count {
            margin-top: .96rem;
            font-size: 1.23rem;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color: #38F1A1;
          }
        }
      }
      .attendance-bar {
        height: 18rem;
        margin-top: 3.46rem;
      }
    }
    .rigth-item {
      width: 66.33%;
      display: flex;
      flex-direction: column;
      height: 42.88rem;
      .top-item {
        flex: 35;
        display: flex;
        // width: 61.54rem;
        .attendance-line, .epidemic-pie {
          flex: 50;
          // width: 23.08rem;
          height: 17.42rem;
          background: url('../../assets/statistic-dashboard/realname-bg3@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          .attendance-title, .epidemic-title {
            background: url('../../assets/statistic-dashboard/realname-title3@2x.png') center no-repeat no-repeat;
            background-size: 97% 100%;
          }
          .epd-fill {
            padding-left: 1.15rem;
          }
          .epd-vehicle {
            display: flex;
            justify-content: center;
            flex-direction: row;
            margin: 1.54rem 0;
            .epd-item {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              text-align: end;
              width: 7.31rem;
              height: 4rem;
              .title {
                font-size: .46rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #FFFFFF;
                margin-top: .38rem;
                margin-right: .58rem;
              }
              .conent {
                font-size: 1.42rem;
                font-family: Myriad Pro;
                font-weight: 400;
                color: #4BF3F9;
                margin-right: 1.15rem;
                margin-top: .77rem;
              }
            }
            .epd-item1 {
              background: url('../../assets/statistic-dashboard/realname-hs3@2x.png') center no-repeat no-repeat;
              background-size: 97% 100%;
            }
            .epd-item2 {
              margin: 0 1.35rem;
              background: url('../../assets/statistic-dashboard/realname-hs@2x.png') center no-repeat no-repeat;
              background-size: 97% 100%;
            }
            .epd-item3 {
              background: url('../../assets/statistic-dashboard/realname-hs2@2x.png') center no-repeat no-repeat;
              background-size: 97% 100%;
            }
          }
        }
      }
      .bottom-item {
        flex: 65;
        height: 100%;
        background: url('../../assets/statistic-dashboard/realname-bg2@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        .details-title {
          background: url('../../assets/statistic-dashboard/realname-title2@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
        }
        .details-scroll-board {
          .scroll-board-title {
            display: flex;
            justify-content: center;
            height: 1.92rem;
            margin-bottom: .77rem;
            .tilte-word {
              font-size: 1.15rem;
              line-height: 1.92rem;
              margin: 0 .38rem;
              color: #FFFFFF;
              text-shadow: 0 0 1px #fff,0 0 5px #0072FF,0 0 10px #0072FF,0 0 15px #0072FF;
            }
            .count {
              width: 1.8rem;
              height: 2.2rem;
              margin: 0 .19rem;
              line-height: 1.98rem;
              font-size: 1.98rem;
              font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
              text-align: center;
              color: #00FDF6;
              background: linear-gradient(0deg, #06296A, rgba(6, 41, 106, 0));
              border: 0.04px solid;
              border-image: linear-gradient(0deg, rgba(0, 182, 255, 0.8), rgba(0, 182, 255, 0.8)) 0.04 0.04;
              border-radius: 8%;
            }
          }
          ::v-deep .dv-scroll-board {
            width: 100%;
            height: 16.92rem;
            padding: 0 .77rem;
            .header {
              color: #48ECE7;
            }
            .rows {
              height: 100% !important;
              .row-item {
                height: 1.68rem !important;
                line-height: 1.68rem !important;
              }
            }
          }
        }
      }
    }
    .title-style {
      display: flex;
      padding-left: .38rem;
      padding: .38rem;
      margin: .38rem .38rem 0;
      font-size: .62rem;
      color: #F1F1F1;
      font-weight: bold;
      img {
        width: 1.46rem;
        height: 1.46rem;
      }
      div {
        line-height: 1.37rem;
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
