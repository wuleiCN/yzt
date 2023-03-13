<template>
  <div class="statistic-dashboard-cruing dashboard-full-screen">
    <div class="statistic-dashboard-main">

      <div class="main-item item-attendance-left">
        <div class="title-wrap title-wrap-left">
          <div class="title"><span class="icon" />养护室状态</div>
        </div>
        <div class="item-warp">
          <div class="item-warp-top">
            <div class="item-wrap-left">
              <el-select v-model="value" :popper-append-to-body="false" class="select-class" @change="navClick">
                <el-option
                  v-for="(ele,idx) in roomList"
                  :key="idx"
                  :label="ele.label"
                  :value="ele.value"
                />
              </el-select>
              <div class="carpet-area">室内面积：600平方米</div>
            </div>
            <div class="item-wrap-right">
              <div class="control-item temp">
                <span class="temp-icon1" />
                <div v-text="'温度范围：20° < 测量值 < 38°'" />
                <span class="temp-icon2" />
              </div>
              <div class="control-item humidity">
                <span class="temp-icon1" />
                <div v-text="'湿度范围：20° < 测量值 < 38°'" />
                <span class="temp-icon2" />
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
          <div class="title"><span class="icon" />历史记录</div>
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
          <div class="title"><span class="icon" />温/湿度调控</div>
        </div>
        <div class="t-h-control">
          <TypeLine id="cruing-line" height="10.96rem" width="100%" />
        </div>
      </div>
      <div class="footer-item footer-item-2">
        <div class="title-wrap title-wrap-right">
          <div class="title"><span class="icon" />近期报警</div>
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

import TypeLine from './component/cruingLine.vue'

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
        header: ['测点名称', '在线状态', '温度', '湿度', '采集时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center'],
        data: []
      },
      config2: {
        header: ['湿度%', '温度°C', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: []
      },
      config3: {
        header: ['监控点', '报警描述', '数据值', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
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
          '1号养护室',
          `<span style="color:#1FED09;">${'正常'}</span>`,
          `<span style="color:#FFFFFF;">${'26°'}</span>`,
          `<span style="color:#38F1A1;">${'60%'}</span>`,
          `<span style="color:#FFFFFF;">${'2023-2-22  18：00：00'}</span>`
        ]
      })
      this.historyData = this.historyData.map(item => {
        return [
          `<span style="color:#38F1A1;">${'60%'}</span>`,
          '26°',
          '2023-2-22  18：00：00'
        ]
      })
      this.warningData = this.warningData.map(item => {
        return [
          '1号养护室',
          `<span style="color:#ffa500;">${'湿度过低'}</span>`,
          `<span style="color:#ffa500;">${'湿度过低'}</span>`,
          '2023-2-22  18：00：00'
        ]
      })
      this.config = {
        header: ['测点名称', '在线状态', '温度', '湿度', '采集时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center'],
        data: this.initData
      }
      this.config2 = {
        header: ['湿度%', '温度°C', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: this.historyData
      }
      this.config3 = {
        header: ['监控点', '报警描述', '数据值', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
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
.statistic-dashboard-cruing {
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
        background: url('../../../assets/statistic-dashboard/cruingIcon@2x.png') center no-repeat no-repeat;
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
      flex-basis: 31.65rem;
      // margin-right: .62rem;
      // height: 18.89rem;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/cruingGroup4@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-wrap: wrap;
      .cruing-history {
        width: 31.5rem;
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
          width: 36.08rem;
          height: 3.88rem;
          margin-bottom: .77rem;
          .item-wrap-left {
            ::v-deep .select-class {
              height: 2rem;
              margin-bottom: .77rem;
              background: url('../../../assets/statistic-dashboard/nav-bro-sel-bg.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              .el-input__inner {
                height: 2rem;
                color: #2AAEF2;
                font-size: .7rem;
                text-align: center;
                border: none;
                background: transparent;
              }
              .el-select-dropdown {
                background: rgb(5, 34, 80) !important;
                border: 0;
                .el-select-dropdown__item {
                  color: #fff;
                  &.hover, &:hover {
                    background-color: rgb(2, 14, 49) !important;
                  }
                }
              }
              .el-input__suffix {
                top: -0.12rem;
                color: #2AAEF2;
              }
            }
            .carpet-area {
              font-size: .85rem;
              font-family: Source Han Sans CN;
              font-weight: bold;
              color: #F1F1F1;
              text-align: center;
            }
          }
          .item-wrap-right {
            .temp {
              display: flex;
              margin: 0 0 .96rem 5.8rem;
            }
            .humidity {
              display: flex;
              margin: 0 0 .96rem 5.8rem;
            }
            .temp-icon1 {
              width: 5rem;
              height: .85rem;
              background: url('../../../assets/statistic-dashboard/cruingImg2@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
            }
            .temp-icon2 {
              width: 5rem;
              height: .85rem;
              background: url('../../../assets/statistic-dashboard/cruingImg1@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
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
        width: 100%;
        height: 10.96rem;
      }
    }
    .footer-item-2 {
      flex-basis: 31.65rem;
      background: url('../../../assets/statistic-dashboard/cruingGroup4@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .cruing-waring {
        // padding: 0 15px;
        width: 31.5rem;
        height: 10.96rem;
      }
    }
  }
  ::v-deep .dv-scroll-board {
    width: 100%;
    padding: .58rem;
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
