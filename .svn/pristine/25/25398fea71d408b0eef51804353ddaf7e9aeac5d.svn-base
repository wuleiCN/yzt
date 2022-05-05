<template>
  <div class="gyc-dashboard">
    <div class="gyc-dashboard-header">
      <div class="gyc-full-screen-toggle" @click="toggleFullScreen()">
        <svg-icon :icon-class="iconStatus ? 'exit-full-screen' : 'full-screen'" />
        <span>{{ iconStatus ? '退出' : '全屏' }}</span>
      </div>
      <div class="pro-name">
        <marquee v-if="pName && pName.length > 19" class="marquee">
          <span @mouseover="showPanel(true)">{{ pName }}</span>
        </marquee>
        <div v-else class="marquee">
          <span @mouseover="showPanel(true)">{{ pName }}</span>
        </div>
      </div>
      <Panel v-if="firstPanelVisible" ref="first-panel" :pro-list="proList" @closePanel="closePanel" />
      <div class="header-time">{{ nowTime }}</div>
    </div>
    <div class="gyc-dashboard-nav">
      <div class="nav-item pro-num">
        <div>在/退场 <span class="nav-item-value">{{ proData.zcNum || 0 }} / {{ proData.tcNum || 0 }}</span></div>
      </div>
      <div class="nav-item livearea-num">
        <div>外出/归宿 <span class="nav-item-value">{{ proData.outNum || 0 }} / {{ proData.inNum || 0 }}</span></div>
      </div>
      <div class="nav-item phone-num">
        <marquee v-if="isShowMarquee">
          <span v-for="(item, index) in proData.contacts || []" :key="index" class="nav-item-value">{{ item }}</span>
        </marquee>
      </div>
      <div class="nav-item unit-num">
        <div>楼栋总数 <span class="nav-item-value">{{ proData.unitNum || 0 }}</span></div>
      </div>
      <div class="nav-item room-num">
        <div>房间总数 <span class="nav-item-value">{{ proData.roomNum || 0 }}</span></div>
      </div>
    </div>
    <div class="gyc-dashboard-main">
      <div class="main-item item-pro-intro">
        <div class="pro-intro-wrap">
          <div class="title">项目概括</div>
          <div class="pro-info">
            <div>项目城市：{{ proData.projectRegion }}</div>
            <div>项目工时：{{ proData.workDays }}天</div>
            <div>项目地址：{{ proData.address }}</div>
            <div>建筑面积：{{ proData.acreage }} m²</div>
            <div>项目造价：{{ proData.projectCost }} 万元</div>
          </div>
        </div>
      </div>
      <div class="main-item item-construction">
        <div class="construction-table-wrap">
          <dv-scroll-board
            :config="config"
          />
        </div>
      </div>
      <div class="main-item item-rooms">
        <dv-scroll-board
          :config="config1"
        />
      </div>
      <div class="main-item item-real">
        <div class="real-wrap">
          <div class="title">最新进出</div>
          <div class="real-info">
            <div class="real-info-avatar">
              <img v-if="newAttData.sitePhoto" :src="newAttData.sitePhoto" alt="">
              <img v-else style="padding: .8rem" src="../../assets/gyc-dashboard/photo-default.png" alt="">
            </div>
            <div class="real-info-bottom">
              <div>姓名：{{ newAttData.empName || '暂无数据' }}</div>
              <div :title="newAttData.roomName" class="ellipsis">房间号：{{ newAttData.roomName || '暂无数据' }}</div>
              <div>单位：{{ newAttData.constructionName || '暂无数据' }}</div>
              <div>状态：{{ newAttData.direction === "in" ? '进' : newAttData.direction === "out" ? '出' : '暂无数据' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gyc-dashboard-footer">
      <div class="footer-item footer-left">
        <div class="left-item footer-left-1">
          <div class="title">年龄比例</div>
          <Pie :age-data="ageData" />
        </div>
        <div class="left-item footer-left-2">
          <div class="title">男女比例</div>
          <div class="left-2-main">
            <div class="left-2-main-left">
              <Bar :dust-data="{aqi: menNumPercentage, womenNumPercentage, color: '#2C6CC4', name: 'AQI'}" />
              <div class="chart-value-wrap">
                <div><span class="percentage" style="color: #00FFF6">{{ menNumPercentage }}</span><span style="color: #00FFF6">%</span> <span>男性</span></div>
                <div>女性 <span style="color: #DD41F6" class="percentage">{{ womenNumPercentage }}</span><span style="color: #DD41F6">%</span></div>
              </div>
            </div>
            <div class="left-2-main-right">
              <div class="footer-item-title">男性人数</div>
              <div class="footer-item-value">
                <div v-for="(item,index) in sexData.menNum + '' || ''" :key="index" class="value-wrap">{{ item }}</div>
              </div>
              <div class="footer-item-title1">女性人数</div>
              <div class="footer-item-value1">
                <div v-for="(item,index) in sexData.womenNum + '' || ''" :key="index" class="value-wrap">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-item footer-left-3">
          <div class="title">床位比例</div>
          <div class="left-3-main">
            <div class="left-3-main-left">
              <Bar :dust-data="{aqi: allNums ? (liveNums / allNums * 100).toFixed(1) : 0, color: '#2C6CC4', name: 'AQI'}" />
              <div class="chart-value-wrap">
                <div>已使用</div>
                <div><span class="percentage" style="color: #00FFF6">{{ allNums ? (liveNums / allNums * 100).toFixed(1) : 0 }}</span><span style="color: #00FFF6">%</span></div>
              </div>
            </div>
            <div class="left-3-main-right">
              <div class="footer-item-title">床位总数</div>
              <div class="footer-item-value">
                <div v-for="(item,index) in allNums + ''" :key="index" class="value-wrap">{{ item }}</div>
              </div>
              <div class="footer-item-title1">已使用</div>
              <div class="footer-item-value1">
                <div v-for="(item,index) in liveNums + ''" :key="index" class="value-wrap">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-item footer-right">
        <div class="footer-right-wrap">
          <div class="title">对比照</div>
          <div class="footer-right-main">
            <div class="footer-right-avatar">
              <img v-if="newAttData.faceUrl" :src="newAttData.faceUrl" alt="">
              <img v-else style="padding: .8rem" src="../../assets/gyc-dashboard/photo-default.png" alt="">
            </div>
            <div>{{ newAttData.passedTime ? parseTime(newAttData.passedTime, '{y}-{m}-{d} {h}:{i}:{s}') : '暂无数据' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fullScreen from '@/utils/fullScreen'
import { parseTime } from '@/utils/index'
import Panel from './panel'
import { pList } from '@/api-zhgd/zhgd-dashboard'
import { proDetail, consList, roomList, ageStatistics, sexStatistics, newAttendance } from '@/api/gyc/gyc-dashboard'
import Pie from './gyc-dashboard-pie'
import Bar from './gyc-dashboard-bar'
export default {
  components: {
    Pie,
    Panel,
    Bar
  },
  data() {
    // eslint-disable-next-line new-cap
    const full = new fullScreen(() => {
      console.log('不支持全屏')
    })
    return {
      full,
      isShowMarquee: false,
      parseTime,
      pName: '',
      allNums: 0,
      liveNums: 0,
      menNumPercentage: 0,
      womenNumPercentage: 0,
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      dustData: {},
      proData: {},
      sexData: {},
      newAttData: {},
      cList: [],
      rList: [],
      ageData: [],
      nowTime: '',
      timer: null,
      timer1: null,
      timer2: null,
      config: {},
      config1: {},
      firstPanelVisible: false,
      iconStatus: false
    }
  },
  async mounted() {
    const pro0 = await this.getPList()
    this.init(pro0.id)
    this.setRem(23)
    window.addEventListener('resize', () => {
      this.iconStatus = this.full.isElementFullScreen()
      this.full.isElementFullScreen() ? this.setRem(26) : this.setRem(23)
    })
    document.addEventListener('click', (e) => {
      e.stopPropagation()
      if (e.target.className === 'company-wrap' || e.target.className === 'company-item') {
        this.firstPanelVisible = true
      } else {
        this.firstPanelVisible = false
      }
    })
  },
  beforeDestroy() {
    window.clearInterval(this.timer)
    window.clearInterval(this.timer1)
    window.clearInterval(this.timer2)
  },
  methods: {
    init(projectId) {
      this.getConsListHandle(projectId)
      this.getRoomListHandle(projectId)
      this.getproDetailHandle(projectId)
      this.getAgeStatisticsHandle(projectId)
      this.getSexStatisticsHandle(projectId)
      this.getNewAttendanceHandle(projectId)
      this.timer = setInterval(() => {
        this.nowTime = this.getTime()
      }, 1000)
      this.timer1 = setInterval(() => {
        this.getNewAttendanceHandle(projectId)
      }, 10000)
      this.timer2 = setInterval(() => {
        this.getConsListHandle(projectId)
        this.getRoomListHandle(projectId)
        this.getproDetailHandle(projectId)
        this.getAgeStatisticsHandle(projectId)
        this.getSexStatisticsHandle(projectId)
      }, 3600000)
    },
    showPanel(status) {
      // 是集团或者公司才能选择项目
      if (this.userType === 1 || this.userType === 0) {
        this.firstPanelVisible = status
      }
    },
    closePanel(item) {
      this.projectId = item.id
      this.pName = item.projectName
      window.clearInterval(this.timer1)
      window.clearInterval(this.timer2)
      this.allNums = 0
      this.liveNums = 0
      this.init(this.projectId)
      this.firstPanelVisible = false
    },
    getPList() {
      return pList().then((data) => {
        if (data && data.code === 1000) {
          this.proList = data.result
          this.pName = this.proList[0].projectList[0].projectName
          return this.proList[0].projectList[0]
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getConsListHandle(projectId) {
      consList({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.cList = data.result
          this.cList = this.cList.map(item => {
            return [item.constructionName, item.status ? '退场' : '在场', item.sumNum, item.rzNum]
          })
          this.config = {
            header: ['参建单位', '状态', '总人数', '入住人数'],
            headerBGC: ['transparent'],
            oddRowBGC: ['transparent'],
            evenRowBGC: ['transparent'],
            carousel: 'page',
            align: ['center', 'center', 'center', 'center'],
            columnWidth: [200, 80, 80, 80],
            data: this.cList
          }
        }
      })
    },
    getRoomListHandle(projectId) {
      roomList({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.rList = data.result
          if (this.rList.length) {
            this.allNums = this.rList.map(item => item.allNums).reduce((total, num) => { return total + num })
            this.liveNums = this.rList.map(item => item.liveNums).reduce((total, num) => { return total + num })
            this.rList = this.rList.map(item => {
              return [item.roomName, item.allNums, item.allNums - item.liveNums]
            })
            // this.$set(this.config1, 'data', this.rList)
          }
          this.config1 = {
            header: ['房间动态', '总床数', '剩余床位'],
            headerBGC: ['transparent'],
            oddRowBGC: ['transparent'],
            evenRowBGC: ['transparent'],
            carousel: 'page',
            align: ['center', 'center', 'center'],
            data: this.rList
          }
        }
      })
    },
    getproDetailHandle(projectId) {
      proDetail({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.isShowMarquee = true
          this.proData = data.result || {}
        }
      })
    },
    getAgeStatisticsHandle(projectId) {
      ageStatistics({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.ageData = data.result || []
        }
      })
    },
    getSexStatisticsHandle(projectId) {
      sexStatistics({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.sexData = data.result || {}
          this.menNumPercentage = this.sexData.menNum ? (this.sexData.menNum / (this.sexData.menNum + this.sexData.womenNum) * 100).toFixed(1) : 0
          this.womenNumPercentage = this.sexData.womenNum ? (this.sexData.womenNum / (this.sexData.menNum + this.sexData.womenNum) * 100).toFixed(1) : 0
        }
      })
    },
    getNewAttendanceHandle(projectId) {
      newAttendance({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.newAttData = data.result || {}
        }
      })
    },
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
    getTime() {
      return parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
    },
    // 全屏 / 退出全屏
    toggleFullScreen() {
      this.iconStatus = !this.full.isElementFullScreen()
      if (this.full.isElementFullScreen()) {
        this.full.exitFullscreen()
      } else {
        this.full.Fullscreen('.gyc-dashboard')
      }
    }
  }
}
</script>
<style lang="scss">
// 计算方式 26px -> 1rem
.gyc-dashboard {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url('../../assets/gyc-dashboard/gyc-dashboard-bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 41.54rem;
  padding: .77rem 1.15rem 0;
  color: #fff;
  font-size: .77rem;
  .gyc-dashboard-header {
    position: relative;
    height: 3.08rem;
    background: url('../../assets/gyc-dashboard/top-header.png') center no-repeat no-repeat;
    background-size: 100% 100%;
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
        top: 45%;
        transform: translate(-50%, -30%);
      }
    }
    .gyc-full-screen-toggle {
      width: 4rem;
      line-height: 2.9rem;
      margin-left: 1.92rem;
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
  .gyc-dashboard-nav {
    display: flex;
    height: 3.92rem;
    .nav-item {
      background: url('../../assets/gyc-dashboard/nav-item-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      height: 3.85rem;
      line-height: 3.85rem;
      margin-right: .96rem;
      padding-left: 1.54rem;
      .nav-item-value {
        padding-left: 1.92rem;
      }
    }
    .pro-num {
      flex: 11.54;
    }
    .livearea-num {
      flex: 11.54;
    }
    .unit-num {
      flex: 11.54;
    }
    .room-num {
      flex: 11.54;
      margin-right: 0;
    }
    .phone-num {
      padding: 0 1.54rem;
      font-size: 1rem;
      flex: 20.77;
      height: 3.27rem;
      line-height: 3.27rem;
      margin-top: .57rem;
      color: #ECA00E;
    }
  }
  .gyc-dashboard-main {
    display: flex;
    margin: .65rem 0;
    .main-item {
      display: flex;
      height: 16.88rem;
    }
    .item-pro-intro {
      border: 1px solid #043881;
      box-shadow: 0 0 30px #043881 inset;
      width: 16.54rem;
      flex: 16.54;
      margin-right: .65rem;
      .pro-intro-wrap {
        width: 100%;
        .title {
          margin: 0 .19rem;
          text-align: center;
          background: url('../../assets/gyc-dashboard/title-item.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          margin-top: .70rem
        }
        .pro-info {
          color: #00FFF6;
          padding: 2.04rem;
          line-height: 1.73rem;
        }
      }

    }
    .item-construction {
      border: 1px solid #043881;
      box-shadow: 0 0 30px #043881 inset;
      // width: 24.08rem;
      flex: 24.08;
      margin-right: .65rem;
      .construction-table-wrap {
        width: 100%;
        height: 100%;
      }
    }
    .dv-scroll-board {
      height: 100%;
      padding: .6rem 0 0;
      .header {
        color: #00FFF6;
        font-size: .8rem !important;
        .header-item:nth-of-type(1) {
          width: 11rem !important;
        }
        .header-item:nth-of-type(2) {
          width: 4rem !important;
        }
        .header-item:nth-of-type(3) {
          width: 4rem !important;
        }
        .header-item:nth-of-type(4) {
          width: 4rem !important;
        }
      }
      .rows {
        height: 12.5rem !important;
        overflow: hidden;
        .row-item {
          font-size: .62rem !important;
          height: 2rem !important;
          line-height: 2rem !important;
          .ceil:nth-of-type(1) {
            // background: red !important;
            width: 11rem !important;
          }
          .ceil:nth-of-type(2) {
            width: 4rem !important;
          }
          .ceil:nth-of-type(3) {
            width: 4rem !important;
          }
        }
      }
    }
    .item-rooms {
      border: 1px solid #043881;
      box-shadow: 0 0 30px #043881 inset;
      // width: 15.31rem;
      flex: 15.31;
      margin-right: .65rem;
    }
    .item-real {
      border: 1px solid #043881;
      box-shadow: 0 0 30px #043881 inset;
      // width: 13.54rem;
      flex: 13.54;
      .real-wrap {
        width: 100%;
        text-align: center;
        .title {
          margin: 0 .19rem;
          text-align: center;
          background: url('../../assets/gyc-dashboard/title-item.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          margin-top: .70rem
        }
        .real-info {
          // text-align: left;
          padding: .77rem;
          line-height: 1.73rem;
          font-size: .69rem;
          .real-info-avatar {
            img {
              width: 100%;
              height: 100.8%;
              border-radius: .28rem;
              // padding: .69rem;
            }
            border: .12rem solid #0686D8;
            border-radius: .38rem;
            width: 5.77rem;
            height: 6.92rem;
            margin: 0 auto;
          }
          // .real-info-bottom {
          //   padding-left: 4rem;
          // }
        }
      }
    }
  }
  .gyc-dashboard-footer {
    display: flex;
    .footer-item {
      height: 13.77rem;
    }
    .footer-left {
      flex: 57.31;
      border: 1px solid #043881;
      box-shadow: 0 0 30px #043881 inset;
      margin-right: .65rem;
      display: flex;
      text-align: center;
      padding: .77rem;
      .left-item {
        .title {
          margin: 0 1rem;
          text-align: center;
          background: url('../../assets/gyc-dashboard/title-item.png') center no-repeat no-repeat;
          background-size: 100% 100%;
        }
      }
      .footer-left-1 {
        flex: 1;
      }
      .footer-left-2 {
        flex: 1;
        .left-2-main {
          display: flex;
          height: 11rem;
          .left-2-main-left {
            flex: 1.8;
            // border:1px solid red;
            position: relative;
          }
          .left-2-main-right {
            flex: 1;
            padding: 1.95rem 0 0 0;
          }
        }
      }
      .chart-value-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 7rem;
        transform: translate(-50%, -50%);
        font-size: .77rem;
        .percentage {
          font-size: 2rem;
        }
      }
      .footer-item-title,.footer-item-title1 {
        font-size: .53rem;
        width: 4.23rem;
        height: 1.15rem;
        line-height: 1.15rem;
        background: url('../../assets/gyc-dashboard/title-wrap-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        margin-bottom: .77rem;
      }
      .footer-item-value,.footer-item-value1 {
        display: flex;
        .value-wrap {
          background: url('../../assets/gyc-dashboard/value-wrap-bg.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          width: 1.23rem;
          height: 1.38rem;
          line-height: 1.38rem;
          font-size: .96rem;
        }
        margin-bottom: 1.31rem;
      }
      .footer-left-3 {
        flex: 1;
        .left-3-main {
          display: flex;
          height: 11rem;
          .left-3-main-left {
            flex: 1.8;
            // border:1px solid red;
            position: relative;
          }
          .left-3-main-right {
            flex: 1;
            padding: 1.95rem 0 0 0;
          }
        }
      }
    }
    .footer-right {
      flex: 13.94;
      border: 1px solid #043881;
      box-shadow: 0 0 30px #043881 inset;
      .footer-right-wrap {
        width: 100%;
        text-align: center;
        .title {
          margin: 0 .19rem;
          text-align: center;
          background: url('../../assets/gyc-dashboard/title-item.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          margin-top: .70rem
        }
        .footer-right-main {
          padding: .77rem;
          line-height: 1.73rem;
          .footer-right-avatar {
            img {
              width: 100%;
              height: 100.8%;
              border-radius: .28rem;
              // padding: .69rem;
            }
            border: .12rem solid #0686D8;
            border-radius: .38rem;
            width: 5.77rem;
            height: 6.92rem;
            margin: .8rem auto;
          }
        }
      }
    }
    .ellipsis {
      overflow:hidden; //超出的文本隐藏
      text-overflow:ellipsis; //溢出用省略号显示
      white-space:nowrap; //溢出不换行
    }
  }
}
</style>
