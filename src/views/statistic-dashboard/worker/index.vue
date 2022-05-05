<template>
  <div class="statistic-dashboard-worker dashboard-full-screen">
    <!-- <div class="statistic-dashboard-header">
      <FullScreen ref="FullScreen" />
      <SelectProject @newsReload="newsReload" />
    </div>
    <Nav /> -->
    <div class="statistic-dashboard-main">

      <div class="main-item item-attendance-left">
        <div class="left-main">
          <!-- <Line ref="qual-pie" /> -->
          <div class="rate">
            考勤率
            <div v-for="(item, index) in workerInfo.rate.toString().split('')" :key="index" class="num-wrap">{{ item }}</div>
            %
          </div>
          <div class="laborCount-wrap left-item">
            <div class="item-value value1">{{ workerInfo.laborCount || 0 }} <span>人</span></div>
            <div class="item-name name1">劳务工人</div>
          </div>
          <div class="manageCount-wrap left-item">
            <div class="item-value value2">{{ workerInfo.manageCount || 0 }} <span>人</span></div>
            <div class="item-name name2">管理人员</div>
          </div>
          <div class="todayAttendanceCount-wrap left-item">
            <div class="item-value value3">{{ workerInfo.todayAttendanceCount || 0 }} <span>人</span></div>
            <div class="item-name name3">今日考勤人数</div>
          </div>
        </div>
      </div>
      <div class="main-item item-attendance-right">
        <div class="title-wrap">
          <div class="title"><span class="icon" />考勤管理</div>
        </div>
        <XLine id="x-line" class="x-line" :week-data="weekData" height="19.23rem" width="100%" />
      </div>
    </div>
    <div class="statistic-dashboard-footer">
      <div class="footer-item footer-item-1">
        <div class="title-wrap">
          <div class="title"><span class="icon" />考勤率统计</div>
        </div>
        <KqlPie id="kql-pie" class="kql-style" :worker-info="workerInfo" height="6.85rem" width="13.62rem" />
      </div>
      <div class="footer-item footer-item-2">
        <div class="title-wrap">
          <div class="title"><span class="icon" />工种统计</div>
        </div>
        <GzPie id="gz-pie-main" class="gz-style" :type-list="typeList" height="15.85rem" width="100%" />
      </div>
      <div class="footer-item footer-item-3">
        <div class="title-wrap">
          <div class="title"><span class="icon" />实名制</div>
        </div>
        <Bar id="pictorialBar" :workers="workers" height="8.85rem" width="100%" />
      </div>
      <div class="footer-item footer-item-4">
        <div class="title-wrap">
          <div class="title"><span class="icon" />培训类型统计</div>
        </div>
        <PxPie id="px-pie" class="center-style" :worker-info="workerInfo" height="15.85rem" width="100%" />
      </div>
    </div>
  </div>
</template>
<script>
// import FullScreen from '../component/FullScreen.vue'
// import SelectProject from '../component/SelectPro.vue'
// import common from '../mixins/common'
// import Nav from '../component/Nav.vue'
import XLine from './component/Line.vue'
import KqlPie from './component/KqlPie.vue'
import GzPie from './component/GztjPie.vue'
import PxPie from './component/PxPie.vue'
import Bar from './component/SmzBar.vue'
import { getWorkerInfo, weekAttendance, conWorkers, workTypeProportion } from '@/api/statistic-dashboard/worker'

export default {
  components: {
    // FullScreen,
    // SelectProject,
    // Nav,
    XLine,
    KqlPie,
    GzPie,
    PxPie,
    Bar
  },
  // mixins: [common],
  data() {
    return {
      workerInfo: {
        rate: '0'
      },
      weekData: [],
      workers: [],
      typeList: []
    }
  },
  mounted() {
  },
  methods: {
    init(projectId) {
      this.fetchWorkerInfo(projectId)
      this.fetchweekAttendance(projectId)
      this.fetchWorkers(projectId)
      this.fetchworkType(projectId)
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    // 人员信息
    fetchWorkerInfo(projectId) {
      getWorkerInfo({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.workerInfo = data.result || {}
        }
      })
    },
    // 考勤管理
    fetchweekAttendance(projectId) {
      weekAttendance({ projectId, model: 1 }).then((data) => {
        if (data && data.code === 1000) {
          this.weekData = data.result
        }
      })
    },
    // 实名制
    fetchWorkers(projectId) {
      conWorkers({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.workers = data.result
        }
      })
    },
    // 工种
    fetchworkType(projectId) {
      workTypeProportion({ id: projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.typeList = data.result
        }
      })
    }
  }
}
</script>
<style lang="scss">
// 计算方式 26px -> 1rem
.statistic-dashboard-worker {
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  background: url('../../../assets/statistic-dashboard/worker-bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 41.54rem;
  color: #fff;
  font-size: .77rem;
  .statistic-dashboard-header {
    position: relative;
    height: 3.85rem;
    background: url('../../../assets/statistic-dashboard/top-header.png') center no-repeat no-repeat;
    background-size: 100% 100%;
  }

  .statistic-dashboard-main {
    width: 99%;
    display: flex;
    margin: 0 .54rem;
    .main-item {
      display: flex;
      height: 16.88rem;
    }
    .item-attendance-right {
      flex: 600;
      height: 22.31rem;
      margin-right: .62rem;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/attendance-border-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-wrap: wrap;
      .title-wrap {
        width: 100%;
        height: 1rem;
        background: url('../../../assets/statistic-dashboard/attendance-bro-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        margin: .5rem;
        font-size: .62rem;
        .title {
          margin-top: -.5rem;
          .icon {
            display: inline-block;
            background: url('../../../assets/statistic-dashboard/worker-icon.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            width: 1.38rem;
            height: 1.54rem;
            vertical-align: middle;
          }
        }
      }
    }
    .item-attendance-left {
      flex: 488;
      margin-right: .3rem;
      display: flex;
      flex-wrap: wrap;
      height: 22.31rem;
      .left-main {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: url('../../../assets/statistic-dashboard/attendance-left-bg.png') center no-repeat no-repeat;
        background-size: 85% 85%;
        width: 32.69rem;
        position: relative;
        .left-item {
          // color: #02042B;
          font-weight: 500;
          font-size: .77rem;
        }
        .rate {
          position: absolute;
          left: 45%;
          top: 1%;
          font-size: 1rem;
          .num-wrap {
            background: url('../../../assets/statistic-dashboard/number-bg.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            width: 1.85rem;
            height: 2.31rem;
            line-height: 2.31rem;
            text-align: center;
            display: inline-block;
            vertical-align: middle;
            color: #00FDF6;
            font-size: 1.54rem;
            font-family: Impact;
          }
        }
        .name1 {
          position: absolute;
          color: #02042B;
          width: 2rem;
          font-weight: 600;
          top:20%;
          left:28.5%;
        }
        .name2 {
          position: absolute;
          color: #02042B;
          width: 2rem;
          font-weight: 600;
          top:40%;
          left:65%;
        }
        .name3 {
          position: absolute;
          color: #02042B;
          width: 3rem;
          font-weight: 600;
          top:72%;
          left:27%;
        }
        .value1 {
          position: absolute;
          font-size: 1.15rem;
          top:3%;
          left:15.5%;
          span {
            font-size: .69rem;
          }
        }
        .value2 {
          position: absolute;
          font-size: 1.15rem;
          top:29%;
          left:81%;
          span {
            font-size: .69rem;
          }
        }
        .value3 {
          position: absolute;
          font-size: 1.15rem;
          top:59%;
          left:13%;
          span {
            font-size: .69rem;
          }
        }
      }
    }
  }
  .statistic-dashboard-footer {
    display: flex;
    height: 12.5rem;
    width: 99%;
    margin: 0 .5rem;
    .footer-item {
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      margin-right: 1rem;
      background: url('../../../assets/statistic-dashboard/footer-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .title-wrap {
        width: 100%;
        height: 1rem;
        background: url('../../../assets/statistic-dashboard/title-item.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        margin: .5rem;
        font-size: .62rem;
        .title {
          margin-top: -.5rem;
          .icon {
            display: inline-block;
            background: url('../../../assets/statistic-dashboard/worker-icon.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            width: 1.38rem;
            height: 1.54rem;
            vertical-align: middle;
          }
        }
      }
    }
    .footer-item-1 {
      position: relative;
      flex: 404;
    }
    .footer-item-2 {
      position: relative;
      flex: 424;
    }
    .footer-item-3 {
      flex: 550;
    }
    .footer-item-4 {
      flex: 476;
      position: relative;
    }
    .kql-style {
      position: absolute;
      left: 50%;
      top: 70%;
      transform: translate(-50%, -70%);
    }
    .gz-style {
      position: absolute;
      left: 50%;
      top: -70%;
      transform: translate(-50%, 70%);
    }
    .center-style {
      position: absolute;
      left: 50%;
      top: -70%;
      transform: translate(-50%, 70%);
    }
  }
}
</style>
