<template>
  <div class="statistic-dashboard-smoke dashboard-full-screen">
    <div class="statistic-dashboard-main">

      <div class="main-item item-attendance-left">
        <div class="title-wrap title-wrap-left">
          <div class="title"><span class="icon" />设备统计</div>
        </div>
        <div class="item-warp">
          <div class="item-warp-top">
            <div class="item-wrap-left">
              <div class="item-warp-count">
                设备总数:
                <p v-for="i in 3" :key="i">{{ i || 0 }}</p>
              </div>
            </div>
            <div class="item-wrap-right">
              <div class="item-warp-count">
                今日报警:
                <p v-for="i in 3" :key="i">{{ i || 0 }}</p>
              </div>
            </div>
          </div>
          <div class="item-warp-footer">
            <dv-scroll-board
              :config="config"
            />
          </div>
        </div>
      </div>
      <div class="main-item item-attendance-right">
        <div class="title-wrap title-wrap-right">
          <div class="title"><span class="icon" />近期报警</div>
        </div>
        <div class="cruing-history">
          <dv-scroll-board
            :config="config2"
          />
        </div>
      </div>
    </div>
    <div class="statistic-dashboard-footer">
      <div class="footer-item footer-item-1">
        <div class="title-wrap title-wrap-left">
          <div class="title"><span class="icon" />报警统计</div>
        </div>
        <div class="t-h-control">
          <TypeLine id="cruing-line" height="10.96rem" width="100%" />
        </div>
      </div>
      <div class="footer-item footer-item-2">
        <div class="title-wrap title-wrap-right">
          <div class="title"><span class="icon" />安全员列表</div>
        </div>
        <div class="cruing-waring">
          <dv-scroll-board
            :config="config3"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import TypeLine from './component/smokeLine.vue'

export default {
  components: {
    TypeLine
  },
  // mixins: [common],
  data() {
    return {
      roomList: [
        {
          label: '1号养护室',
          value: 1
        },
        {
          label: '2号养护室',
          value: 2
        }
      ],
      value: 1,
      config: {
        header: ['测点名称', '目前状态', '最后报警时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: []
      },
      config2: {
        header: ['测点名称', '报警描述', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: []
      },
      config3: {
        header: ['姓名', '联系方式', '备注'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: []
      },
      initData: [],
      warningData: [],
      historyData: []
    }
  },
  mounted() {
    this.dataInit()
  },
  methods: {
    init(projectId) {
      console.log(projectId)
    },
    dataInit() {
      const obj = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }
      const obj1 = { a: '', b: '', c: '', d: '', f: '' }
      const obj2 = { a: '', b: '', c: '' }
      for (let i = 1; i <= 7; i++) {
        this.initData.push(obj)
        this.historyData.push(obj2)
        i < 4 || this.warningData.push(obj1)
      }
      this.initData = this.initData.map(item => {
        return [
          '24#',
          `<span style="color:#1FED09;">${'正常'}</span>`,
          `<span style="color:#FFFFFF;">${'2023-2-22  18：00：00'}</span>`
        ]
      })
      this.historyData = this.historyData.map(item => {
        return [
          '展厅02',
          '烟感报警',
          '2023-2-22  18：00：00'
        ]
      })
      this.warningData = this.warningData.map(item => {
        return [
          '张三',
          '联系方式',
          '13433336666'
        ]
      })
      this.config = {
        header: ['测点名称', '目前状态', '最后报警时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: this.initData
      }
      this.config2 = {
        header: ['测点名称', '报警描述', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: this.historyData
      }
      this.config3 = {
        header: ['姓名', '联系方式', '备注'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: this.warningData
      }
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    navClick() {}
  }
}
</script>
<style lang="scss" scoped>
// 计算方式 26px -> 1rem
.statistic-dashboard-smoke {
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
  .title-wrap {
    width: 100%;
    height: 2.27rem;
    font-size: .62rem;
    .title {
      padding-left: .77rem;
      .icon {
        display: inline-block;
        background: url('../../../assets/statistic-dashboard/cruingIcon2@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        width: 1.38rem;
        height: 1.54rem;
        vertical-align: middle;
      }
    }
  }

  .title-wrap-left {
    background: url('../../../assets/statistic-dashboard/cruingGroup2@2x.png') center no-repeat no-repeat;
    background-size: 100% 100%;
  }

  .title-wrap-right {
    background: url('../../../assets/statistic-dashboard/cruingGroup5@2x.png') center no-repeat no-repeat;
    background-size: 100% 100%;
  }

  .statistic-dashboard-main {
    width: 99%;
    display: flex;
    margin: 0 .54rem;
    padding-bottom: .96rem;
    .main-item {
      display: flex;
      height: 18.89rem;
    }
    .item-attendance-right {
      flex-basis: 29.5rem;
      // margin-right: .62rem;
      // height: 18.89rem;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/cruingGroup4@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-wrap: wrap;
      .cruing-history {
        width: 29.5rem;
        height: 16.15rem;
      }
    }
    .item-attendance-left {
      flex-basis: 58.35rem;
      // height: 18.89rem;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/cruingGroup1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-wrap: wrap;
      .item-warp {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        .item-warp-top {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: flex-end;
          width: 26.15rem;
          height: 3rem;
          margin-bottom: .77rem;
          .item-wrap-left {
            // width: 10.77rem;
            height: 2.69rem;
            .item-warp-count {
              text-align: center;
              // height: .88rem;
              font-size: .92rem;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #E4EEFF;
              opacity: 0.8;
              p {
                width: 1.69rem;
                height: 2.15rem;
                line-height: 2.15rem;
                margin: .58rem 0;
                font-size: 1.58rem;
                font-family: Impact;
                font-weight: 400;
                color: #00FDF6;
                display: inline-block;
                background: url('../../../assets/statistic-dashboard/AIGroup5@2x.png') center no-repeat no-repeat;
                background-size: 100% 100%;
              }
            }
          }
          .item-wrap-right {
            // width: 10.77rem;
            height: 2.69rem;
            .item-warp-count {
              text-align: center;
              // height: .88rem;
              font-size: .92rem;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #E4EEFF;
              opacity: 0.8;
              p {
                width: 1.69rem;
                height: 2.15rem;
                line-height: 2.15rem;
                margin: .58rem 0;
                font-size: 1.58rem;
                font-family: Impact;
                font-weight: 400;
                color: #D20509;
                display: inline-block;
                background: url('../../../assets/statistic-dashboard/AIGroup5@2x.png') center no-repeat no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
        .item-warp-footer {
          height: 10.96rem;
          width: 37.5rem;
        }
      }
    }
  }
  .statistic-dashboard-footer {
    display: flex;
    height: 15.38rem;
    width: 99%;
    margin: 0 .5rem;
    .footer-item {
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      // margin-right: .62rem;
    }
    .footer-item-1 {
      flex-basis: 58.35rem;
      background: url('../../../assets/statistic-dashboard/cruingGroup3@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .t-h-control {
        // width: 100%;
        width: 100%;
        height: 10.96rem;
      }
    }
    .footer-item-2 {
      flex-basis: 29.5rem;
      background: url('../../../assets/statistic-dashboard/cruingGroup4@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .cruing-waring {
        // padding: 0 15px;
        width: 29.5rem;
        height: 10.96rem;
      }
    }
  }
  ::v-deep .dv-scroll-board {
    width: 100%;
    padding: 0 .58rem;
    // height: 22.31rem;
    // padding: 0 20px;
    .header {
      justify-content: center;
      align-items: center;
      height: 1.62rem;
      font-size: .69rem;
      color: #48ECE7;
    }
  }
}
</style>
