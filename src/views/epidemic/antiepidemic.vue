<template>
  <div class="data-v-container1">
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
        <div class="marquee">
          <span>防疫大数据平台</span>
        </div>
      </div>
      <div class="cpt-name">
        <span>{{ compyName }}</span>
      </div>
    </div>
    <main>
      <div class="item-left">
        <div class="main-item weather-wrap">
          <div class="weather-title gradient-title">
            <img class="item-img" src="@/assets/antiepidemic/security.png" alt="">
            <div class="item-title">项目防疫情况一览表</div>
          </div>
          <dv-scroll-board
            :config="config"
          />
        </div>
        <div class="main-item type-work-wrap">
          <div class="type-work-wrap-title gradient-title">
            <img class="item-img" src="@/assets/antiepidemic/security.png" alt="">
            <div class="item-title">近7天防疫情况</div>
          </div>
          <div class="pie-char">
            <ApdBar id="apdBar" :workers="weekData" height="10.95rem" width="100%" />
            <JkmFill id="vehicle-JkmFill" :statistics="recordData" height="100%" width="100%" />
          </div>
        </div>
      </div>
      <div class="item-center">
        <div class="main-item center-attendance-wrap">
          <div class="main-item-content1">
            <div class="main-item-content-title wrap-content">当天防疫人数</div>
            <div class="wrap-content">
              <div v-for="(v, i) in 7" :key="i" class="num">{{ totalCount[6-i] || 0 }}</div>
            </div>
            <div class="main-item-content-title wrap-content">防疫累计人次</div>
            <div class="wrap-content">
              <div v-for="(v, i) in 7" :key="i" class="num">{{ totalNumber[6-i] || 0 }}</div>
            </div>
          </div>
          <div class="main-item-content2">
            <div class="main-item-content-title2">健康防疫管理运行</div>
            <div class="item-time-content">
              <div v-for="(v, i) in 3" :key="i" class="date">{{ totalDay[2-i] || 0 }}</div>
              <div class="day">天</div>
              <div v-for="(v, s) in 2" :key="s+'a'" class="date">{{ totalHours[1-s] || 0 }}</div>
              <div class="hour">小时</div>
            </div>
          </div>
        </div>
        <div class="main-item week-attendance-wrap">
          <div class="week-attendance-wrap-title">
            <img class="item-img" src="@/assets/antiepidemic/security.png" alt="">
            <div class="item-title">地方码记录</div>
          </div>
          <div class="item-code">
            <div v-for="(r, i) in localCode" :key="i" :class="{ 'local-code': true, 'flip-vertical-right': animation }">
              <div class="local">{{ r.name }}</div>
              <div class="count">{{ r.localCount }}次</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 如果是admin账号默认隐藏防疫模块 -->
      <!-- v-permit="'datav_fy_btn'" -->
      <div class="item-right-fy">
        <div class="main-item new-attendance-wrap">
          <div class="new-attendance-wrap-title gradient-title">
            <img class="item-img" src="@/assets/antiepidemic/security.png" alt="">
            <div class="item-title">防疫电子哨兵设备表</div>
          </div>
          <dv-scroll-board
            :config="config2"
          />
        </div>
        <div class="main-item in-out-wrap">
          <div class="in-out-wrap-title gradient-title">
            <img class="item-img" src="@/assets/antiepidemic/security.png" alt="">
            <div class="item-title">通行记录</div>
          </div>
          <dv-scroll-board
            :config="config1"
          />
        </div>
        <div class="block" />
      </div>
    </main>
  </div>
</template>

<script>
import ApdBar from '../datav/apdBar'
import JkmFill from '../datav/jkmFill'
import fullScreen from '@/utils/fullScreen'
import { codeList } from './codeList'
import { getEpidemicConsAttendance, getEpidemicTrafficRecord, weekHeaCode, getFYNumber, getAttlist, getLocalCodeList } from '@/api/datav'
import { parseTime } from '@/utils/index'
export default {
  components: {
    ApdBar,
    JkmFill
  },
  data() {
    // eslint-disable-next-line new-cap
    const full = new fullScreen(() => {
      console.log('不支持全屏')
    })
    return {
      full,
      time: '',
      compyName: '',
      localCode: [],
      animation: true,
      initData: [],
      initData1: [],
      initData2: [],
      totalNumber: [],
      totalCount: [],
      totalDay: [],
      totalHours: [],
      consAttenList: [],
      inOutList: [],
      resultConfig: [],
      proList: [],
      permiList: this.$store.getters.roleList,
      config: {
        header: ['项目简称', '在场/进场', '绿码人数', '核酸检验', '体温检验'],
        headerBGC: '#132239',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        columnWidth: [180],
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center'],
        data: []
      },
      config1: {
        header: ['姓名', '健康码', '核酸', '体温', '疫苗', '通行时间'],
        headerBGC: '#132239',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center', 'center'],
        data: []
      },
      config2: {
        header: ['项目简称', '设备总数', '在线设备', '掉线设备'],
        headerBGC: '#132239',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        columnWidth: [180],
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
        data: []
      },
      weekData: [],
      recordData: [],
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      token: JSON.parse(sessionStorage.getItem('result')).token,
      userId: JSON.parse(sessionStorage.getItem('result')).id,
      iconStatus: false,
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
    this.init()
  },
  mounted() {
    this.dataInit()
    setInterval(() => {
      this.time = this.getTime().time
    }, 1000)
    this.setRem(23)
    window.addEventListener('resize', () => {
      this.iconStatus = this.full.isElementFullScreen()
      this.full.isElementFullScreen() ? this.setRem(26) : this.setRem(23)
    })
  },
  beforeDestroy() {
    document.documentElement.style.fontSize = '16px'
    clearInterval(this.tiemer)
    clearInterval(this.tiemer1)
    clearInterval(this.tiemer2)
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
    async init(item) {
      this.getEpidemicConsAttendance()
      this.tiemer = setInterval(() => {
        if (this.proList.length) {
          this.weekHeaCode()
          this.getEpidemicTrafficRecord()
        }
        this.getsArr(codeList, 9)
      }, 5000)
      this.tiemer1 = setInterval(() => {
        if (this.proList.length) {
          this.getFYNumber()
          this.getLocalCodeList()
        }
      }, 60000)
      this.tiemer2 = setInterval(() => {
        this.animation = !this.animation
      }, 2400)
    },
    // 获取项目id
    getPList(data) {
      return (this.proList = data.result.map(i => i.projectId))
    },
    // 全屏 / 退出全屏
    toggleFullScreen() {
      this.iconStatus = !this.full.isElementFullScreen()
      if (this.full.isElementFullScreen()) {
        this.full.exitFullscreen()
      } else {
        this.full.Fullscreen('.data-v-container1')
      }
    },
    dataInit() {
      const obj = { a: '', b: '', c: '', d: '', e: '', f: '' }
      for (let i = 1; i <= 6; i++) {
        this.initData1.push(obj)
        this.initData.push(obj)
        this.initData2.push(obj)
      }
      this.initData = this.initData.map(item => {
        return [
          item.a,
          item.a,
          item.b,
          item.c,
          item.d
        ]
      })
      this.initData1 = this.initData1.map(item => {
        return [
          item.a,
          item.b,
          item.c,
          item.d,
          item.e,
          item.f
        ]
      })
      this.initData2 = this.initData2.map(item => {
        return [
          item.a,
          item.b,
          item.c,
          item.d
        ]
      })
      this.config = {
        header: ['项目简称', '在场/进场', '绿码人数', '核酸检验', '体温检验'],
        headerBGC: '#132239',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        columnWidth: [180],
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center'],
        data: this.initData
      }
      this.config1 = {
        header: ['姓名', '健康码', '核酸', '体温', '疫苗', '通行时间'],
        headerBGC: '#132239',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center', 'center'],
        data: this.initData1
      }
      this.config2 = {
        header: ['项目简称', '设备总数', '在线设备', '掉线设备'],
        headerBGC: '#132239',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        columnWidth: [120],
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
        data: this.initData2
      }
    },
    // 项目防疫情况
    getEpidemicConsAttendance() {
      getEpidemicConsAttendance({ 'token': this.token }).then((data) => {
        if (data.code === 1000 && data.result) {
          this.getPList(data)
          this.consAttenList = data.result.map(item => {
            return [
              item.constructionName,
              `<span style="color:#fff;">${item.todayWorkersCount + '/' + item.inCount}</span>`,
              `<span style="color:#38F1A1;">${item.lmCount}</span>`,
              `<span style="color:#38F1A1;">${item.hsCount}</span>`,
              `<span style="color:#38F1A1;">${item.twCount}</span>`
            ]
          })
          this.getAttlist()
          this.getFYNumber()
          this.getLocalCodeList()
          this.getEpidemicTrafficRecord()
          this.weekHeaCode()
        }
        this.config = {
          header: ['项目简称', '在场/进场', '绿码人数', '核酸检验', '体温检验'],
          headerBGC: '#132239',
          oddRowBGC: '#112c60',
          evenRowBGC: '112c60',
          carousel: 'page',
          columnWidth: [180],
          rowNum: 7,
          align: ['center', 'center', 'center', 'center', 'center'],
          data: this.consAttenList.length ? this.consAttenList : this.initData
        }
        // this.proList[0] = data.result[0].projectId
      })
    },
    // 设备列表
    getAttlist() {
      getAttlist({ userId: this.userId }).then((data) => {
        if (data.code === 1000 && data.result) {
          this.resultConfig = data.result.map(item => {
            return [
              item.project_name,
              `<span style="color:#fff;">${item.totalCount}</span>`,
              `<span style="color:#38F1A1;">${item.zxCount}</span>`,
              `<span style="color:#FF4E2B;">${item.dxCount}</span>`
            ]
          })
          this.config2 = {
            header: ['项目简称', '设备总数', '在线设备', '掉线设备'],
            headerBGC: '#132239',
            oddRowBGC: '#112c60',
            evenRowBGC: '112c60',
            carousel: 'page',
            // columnWidth: [180],
            rowNum: 7,
            align: ['center', 'center', 'center', 'center'],
            data: this.resultConfig.length ? this.resultConfig : this.initData2
          }
        }
      })
    },
    // 通行记录
    getEpidemicTrafficRecord() {
      getEpidemicTrafficRecord({ projectIds: this.proList }).then((data) => {
        if (data.code === 1000 && data.result) {
          this.inOutList = data.result.map(item => {
            var nucleic
            item.nucleic_acid ? nucleic = '阴性' : nucleic = '阳性'
            item.nucleic_acid > 1 && (nucleic = item.nucleic_acid + '小时内阴性')
            return [
              item.name,
              `<span style="color:#38F1A1;">${item.health_code || '无'}</span>`,
              `<span style="color:#38F1A1;">${nucleic}</span>`,
              `<span style="color:#38F1A1;">${item.tw}</span>`,
              `<span style="color:#fff;">${item.vaccines}</span>`,
              `<span style="color:#e5b965;">${item.txsj}</span>`
            ]
          })
          this.config1 = {
            header: ['姓名', '健康码', '核酸', '体温', '疫苗', '通行时间'],
            headerBGC: '#132239',
            oddRowBGC: '#112c60',
            evenRowBGC: '112c60',
            carousel: 'single',
            rowNum: 7,
            align: ['center', 'center', 'center', 'center', 'center', 'center'],
            data: this.inOutList.length ? this.inOutList : this.initData1
          }
        }
      })
    },
    getFYNumber() {
      getFYNumber([
        {
          projectIds: this.proList,
          userId: this.userId
        }
      ]).then((data) => {
        if (data.code === 1000 && data.result) {
          this.compyName = data.result.compyName
          for (let i = 0; i <= 6; i++) {
            this.totalNumber[i] = (parseInt(data.result.totalNumber / Math.pow(10, i)) % 10)
            this.totalCount[i] = (parseInt(data.result.dayNumber / Math.pow(10, i)) % 10)
            i <= 2 && (this.totalDay[i] = (parseInt(data.result.days / Math.pow(10, i)) % 10))
            i <= 1 && (this.totalHours[i] = (parseInt(data.result.hours / Math.pow(10, i)) % 10))
          }
        }
      })
    },
    // 防疫
    weekHeaCode() {
      weekHeaCode({ projectIds: this.proList }).then((data) => {
        if (data.code === 1000 && data.result) this.recordData = this.weekData = data.result
      })
    },
    // 地方码记录
    getLocalCodeList() {
      getLocalCodeList({ 'projectIds': this.proList }).then((data) => {
        if (data.code === 1000 && data.result) {
          data.result.map(v => {
            codeList.forEach(r => {
              if (v.localCode === r.localCode) r.localCount = v.localCount
            })
          })
          console.log('data', data)
          this.getsArr(codeList, 9)
        }
      })
    },
    getTime() {
      return {
        time: parseTime(new Date(), '{h}:{i}:{s}'),
        date: parseTime(new Date(), '{y}/{m}/{d}')
      }
    },
    getsArr(arr, num) {
      const a = []
      const b = []
      const retunArr = []
      while (a.length < num) {
        arr.forEach((v, i) => b.push(i))
        var temp = (Math.random() * arr.length - 1) >> 0
        a.push(b.splice(temp, 1)[0])
      }
      // eslint-disable-next-line no-return-assign
      a.map((v, i) => retunArr[i] = arr[v])
      this.localCode = retunArr
    }
  }
}
</script>

<style lang="scss">
.flip-vertical-right {
	-webkit-animation: flip-vertical-right 0.5s linear;
	animation: flip-vertical-right 0.5s linear;
}

@-webkit-keyframes flip-vertical-right {
  0% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
  }
  100% {
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
  }
}
@keyframes flip-vertical-right {
  0% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
  }
  100% {
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
  }
}
.data-v-container1 {
  background: url('../../assets/antiepidemic/bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  color: #fff;
  width: 100%;
  // height: 100vh;
  height: 41.54rem;
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
      .marquee {
        text-align: center;
        letter-spacing: .19rem;
        width: 20rem;
        cursor: pointer;
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -30%);
        font-size: 1.62rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
        font-weight: 600;
        background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
        -webkit-text-fill-color: transparent;
        background-clip: text;
        width: 20rem;
      }
    }
    .cpt-name {
      position: absolute;
      letter-spacing: .19rem;
      width: 12.31rem;
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
      margin-left: .58rem;
      font-size: .9rem;
      color: #0686D8;
      cursor: pointer;
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
    width: 100%;
    .gradient-title {
      display: flex;
      padding-left: .38rem;
      font-size: .62rem;
      color: #F1F1F1;
      font-weight: bold;
      background: url('../../assets/antiepidemic/header.png') center no-repeat no-repeat;
      background-size: 23.92rem 1.37rem;
      div {
        line-height: 1.37rem;
      }
    }
    .main-item {
      // background-repeat: no-repeat;
      // background-size: 2px 8px, 8px 2px;
      .item-img {
        vertical-align: sub;
        width: 1.25rem;
        height: 1.42rem;
      }
      .dv-scroll-board {
        width: 100%;
        height: 13.04rem;
        .header {
          color: #48ECE7;
        }
        .rows {
          .row-item {
            height: 1.68rem !important;
            line-height: 1.68rem !important;
          }
        }
      }
    }
    .item-left {
      width: 37%;
      margin-left: .5rem;
      .weather-wrap {
        height: 17.46rem;
        padding: .5rem;
        background: url('../../assets/antiepidemic/frame2.png');
        background-size: 100% 100%;
         .weather-title {
          text-align: left;
          height: 1.92rem;
        }
      }
      .type-work-wrap {
        height: 19.19rem;
        padding: .5rem;
        background: url('../../assets/antiepidemic/frame4.png');
        background-size: 100% 100%;
        .type-work-wrap-title {
          height: 1.92rem;
          text-align: left;
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
      width: 26%;
      .center-attendance-wrap {
        height: 19.38rem;
        padding-top: 1.54rem;
        margin-left: .19rem;
        .main-item-content1 {
          display: flex;
          height: 10.77rem;
          flex-direction: column;
          align-content: center;
          .wrap-content {
            padding: 0 .96rem;
            margin-top: .58rem;
            display: flex;
            justify-content: space-between;
            .num {
              width: 1.8rem;
              height: 2.2rem;
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
          .main-item-content-title {
            padding: 0 1.35rem;
            height: 1.12rem;
            font-size: 1rem;
            color: #FFFFFF;
            line-height: 1.12rem;
            text-shadow: 0 0 1px #fff,0 0 5px #0072FF,0 0 10px #0072FF,0 0 15px #0072FF;
          }
        }
        .main-item-content2 {
          // display: flex;
          // flex-direction: column;
          // align-content: center;
          width: 18.3rem;
          height: 6.65rem;
          margin-right: .58rem;
          background: url('../../assets/antiepidemic/frame1.png');
          background-size: 100% 100%;
          .main-item-content-title2 {
            padding-top: 0.73rem;
            height: 1.12rem;
            font-size: 1rem;
            text-align: center;
            color: #FFFFFF;
            line-height: 1.12rem;
            text-shadow: 0 0 1px #fff,0 0 5px #0072FF,0 0 10px #0072FF,0 0 15px #0072FF;
          }
          .item-time-content {
            margin-top: 2.04rem;
            display: flex;
            justify-content: center;
            height: 2.2rem;
            .date {
              width: 1.8rem;
              height: 2.2rem;
              margin-right: .38rem;
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
            .day, .hour {
              height: 2.2rem;
              font-size: 0.8rem;
              padding-right: .38rem;
              line-height: 3.27rem !important;
              color: #FFFFFF;
              line-height: 1.12rem;
              text-shadow: 0 0 1px #fff,0 0 5px #0072FF,0 0 10px #0072FF,0 0 15px #0072FF;
            }
          }
        }
      }
      .week-attendance-wrap {
        height: 17.35rem;
        width: 100%;
        padding-top: .38rem;
        margin-left: .19rem;
        background: url('../../assets/antiepidemic/frame.png');
        background-size: 100% 100%;
        .week-attendance-wrap-title {
          text-align: left;
          padding: 0 1.15rem;
          width: 17.92;
          height: 1.77rem;
          display: flex;
          padding-left: .38rem;
          font-size: .62rem;
          color: #F1F1F1;
          font-weight: bold;
          background: url('../../assets/antiepidemic/header3.png') center no-repeat no-repeat;
          background-size: 16.92rem 1.77rem;
          .item-title {
            line-height: 1.37rem;
          }
        }
        .item-code {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          padding: .58rem 0.31rem 0;
          width: 100%;
          height: 12.42rem;
          .local-code {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 30%;
            height: 4.35rem;
            background: url('../../assets/antiepidemic/frame3.png');
            background-size: 100% 100%;
            .local {
              width: 100%;
              height: 2.15rem;
              line-height: 3.15rem;
              font-size: .69rem;
              color: #FFFFFF;
            }
            .count {
              width: 100%;
              height: 2.15rem;
              line-height: 1.55rem;
              font-size: 0.92rem;
              color: #38F1A1;
            }
          }
        }
      }
    }
    .item-right-fy {
      width: 37%;
      margin: 0 .5rem;
      .new-attendance-wrap {
        padding: .5rem;
        height: 17.46rem;
        width: 98%;
        background: url('../../assets/antiepidemic/frame2.png');
        background-size: 100% 100%;
        .new-attendance-wrap-title {
          text-align: left;
          height: 1.92rem;;
          line-height: 1.92rem;;
        }
        .new-attendance-main {
          display: flex;
          justify-content: space-between;
          padding-left: .38rem;
          line-height: 1.2rem;
          font-size: .62rem;
          .fy-item-1 {
            display: flex;
            flex-direction: column;
            width: 19.23rem;
            height: 16rem;
            .worker-img {
              display: flex;
              width: 16.34rem;
              height: 5.98rem;
              .info-base {
                width: 5.77rem;
                padding: .58rem;
                font-size: 0.77rem;
                color: #FFFFFF;
                .centigrade {
                  color: #3BFBA6;
                }
              }
              img {
                width: 4.51rem;
                height: 5.98rem;
              }
            }
          .info-woker {
            width: 100%;
            font-size: 0.77rem;
            .styles {
              display: flex;
              margin-bottom: .96rem;
              height: .77rem;
              .radius {
                width: 0.46rem;
                height: 0.46rem;
                margin-top: 1.08rem;
                border-radius: 50%;
                background: #00FDF6;
              }
              .style1 {
                color: #00FDF6;
                margin-right: .38rem;
              }
              .style2 {
                color: #FFFFFF;
              }
            }
            .in-time {
              display: flex;
              // width: 12.23rem;
              justify-content: center;
              padding-top: .38rem;
              font-size: .62rem;
              color: #F1F1F1;
              div {
                &:nth-child(1) {
                  margin-top: .31rem;
                  width: 3.54rem !important;
                  height: .58rem;
                  width: 50%;
                  background: url('../../assets/antiepidemic/footer.png') center no-repeat no-repeat;
                  background-size: 3.54rem .58rem;
                }
                &:nth-child(3) {
                  margin-top: .31rem;
                  width: 3.54rem !important;
                  height: .58rem;
                  width: 50%;
                  background: url('../../assets/antiepidemic/footer.png') center no-repeat no-repeat;
                  background-size: 3.54rem .58rem;
                }
              }
            }
          }
        }
          .fy-item-2 {
            display: flex;
            flex-direction: column;
            align-content: space-between;
            width: 100%;
            div {
              // width: 6.55rem;
              height: 4.77rem;
              background: url('../../assets/antiepidemic/frame3.png') center no-repeat no-repeat;
              background-size: 6.25rem 5.05rem;
              text-align: center;
              p {
                margin: 0;
                &:nth-child(1) {
                  font-size: .77rem;
                  margin-top: 1.15rem;
                }
                &:nth-child(2) {
                  font-size: .92rem;
                  color: #38F1A1;
                }
              }
            }
          }
        }
      }
      .block {
        width: 100%;
        height: .04rem;
      }
      .in-out-wrap {
        height: 19.59rem;
        width: 98%;
        padding: .5rem;
        background: url('../../assets/antiepidemic/frame2.png') center no-repeat no-repeat;
        background-size: 100% 100%;
         .weather-title {
          text-align: left;
          height: 1.92rem;
        }
        .in-out-wrap-title {
          text-align: left;
          height: 1.92rem;
        }
        .in-out-wrap-main {
          padding: 1.5rem .052083rem .15625rem .15625rem;
          .table-header {
            font-size: .90rem;
            margin-bottom: .104167rem;
            text-align: center;
          }
          .table-body-wrap {
            height: 8rem;
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
