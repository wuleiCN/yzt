<template>
  <div class="statistic-dashboard-deepExcavation">
    <div class="deepExcavation">
      <div class="waring-count">
        <div class="title-wrap title-wrap-right">
          <div class="title"><span class="icon" />测点分组名称</div>
        </div>
        <div class="item-warp-right">
          <dv-scroll-board
            :config="config"
          />
        </div>
      </div>
      <div class="excavation-reveal">
        <div class="device-top">
          <div class="title-wrap title-device-top">
            <div class="title"><span class="icon" />设备及报警数</div>
          </div>
          <div class="device-box">
            <div class="device-count">
              <div class="device-icon">
                <span class="count-icon" />
                <p>设备</p>
                <p>0</p>
              </div>
              <p>设备总数</p>
            </div>
            <div class="device-count">
              <div class="device-icon">
                <span class="num-icon" />
                <p>设备</p>
                <p>0</p>
              </div>
              <p>报警设备数</p>
            </div>
          </div>
        </div>
        <div class="device-footer">
          <div class="title-wrap title-device-footer">
            <div class="title"><span class="icon" />责任人列表</div>
          </div>
          <div class="item-warp-liable">
            <dv-scroll-board
              :config="config3"
            />
          </div>
        </div>
      </div>
      <div class="excavation-value">
        <div class="title-wrap title-wrap-right">
          <div class="title"><span class="icon" />历史记录</div>
        </div>
        <div class="item-warp-history">
          <dv-scroll-board
            :config="config2"
          />
        </div>
      </div>
    </div>
    <div class="deepExcavation-scroll">
      <div class="title-wrap deepExcavation-title">
        <div class="title"><span class="icon" /> 报警分析</div>
      </div>
      <div class="excavation-data">
        <TypeLine :id="'screwTightness-line'" height="13.73rem" :width="'100%'" />
      </div>
    </div>
  </div>
</template>
<script>
// import { getMataierKC, getStockInfo, getWarStock } from '@/api/material/meterialDatav'
// import common from '../mixins/common'
// import { parseTime } from '@/utils'
import TypeLine from './component/screwLine.vue'
export default {
  components: {
    TypeLine
  },
  // mixins: [common],
  data() {
    return {
      config: {
        header: ['测点名称', '通讯状态', '松紧状态', '上班时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
        data: []
      },
      config2: {
        header: ['监控点名称', '描述', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: []
      },
      config3: {
        header: ['姓名', '联系方式'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center'],
        data: []
      },
      initData: [],
      historyData: [],
      liableData: []
    }
  },
  async mounted() {
    this.dataInit()
    // this.init(this.projectId)
  },
  methods: {
    init(id) {

    },
    dataInit() {
      const obj = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }
      for (let i = 1; i <= 7; i++) {
        this.initData.push(obj)
        this.historyData.push(obj)
        this.liableData.push(obj)
      }
      this.initData = this.initData.map(item => {
        return [
          '测试螺母-185#',
          `<span style="color:#1FED09;">${'正常'}</span>`,
          `<span style="color:#1FED09;">${'正常'}</span>`,
          `<span style="color:#FFFFFF;">${'2023-2-22  18：00：00'}</span>`
        ]
      })
      this.historyData = this.historyData.map(item => {
        return [
          '测试螺母-185#',
          '---',
          '2023-2-22   18：00：00'
        ]
      })
      this.liableData = this.liableData.map(item => {
        return [
          '张三',
          '1343033XXXX'
        ]
      })
      this.config = {
        header: ['测点名称', '通讯状态', '松紧状态', '上班时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'single',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
        data: this.initData
      }
      this.config2 = {
        header: ['监控点名称', '描述', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'single',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: this.historyData
      }
      this.config3 = {
        header: ['姓名', '联系方式'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'single',
        rowNum: 3,
        align: ['center', 'center'],
        data: this.liableData
      }
    },
    newsReload(projectId) {
      this.init(projectId)
    }
  }
}
</script>
<style lang="scss" scoped>
// 计算方式 26px -> 1rem
.statistic-dashboard-deepExcavation {
  .deepExcavation {
    display: flex;
    background-size: 100% 100%;
    width: 100%;
    height: 18.85rem;
    .waring-count {
      // flex-basis: 41.56rem;
      width: 41.56%;
      padding-left: 0.5rem;
      padding-top: 0.5rem;
      padding: .5rem .3rem 0 .5rem;
      margin-left: .38rem;
      background: url('../../../assets/statistic-dashboard/screwGroup1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .title-wrap-right {
        background: url('../../../assets/statistic-dashboard/screwTitle@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
      }
      .item-warp-right {
        width: 100%;
        height: 14.88rem;
      }
    }
    .excavation-reveal {
      // flex-basis: 22.27rem;
      width: 22.60%;
      display: flex;
      flex-direction: column;
      // padding-top: 0.5rem;
      .device-top {
        width: 100%;
        height: 11.08rem;
        padding-top: 0.5rem;
        background: url('../../../assets/statistic-dashboard/screwGroup4@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        .title-device-top {
          background: url('../../../assets/statistic-dashboard/screwTitle4@2x.png') center no-repeat no-repeat;
          background-size: 90% 90%;
        }
        .device-box {
          display: flex;
          flex-direction: row;
          .device-count {
            width: 100%;
            text-align: center;
            .device-icon {
              height: 5.38rem;
              background: url('../../../assets/statistic-dashboard/screwDevice3@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              p {
                position: relative;
                top: -0.58rem;
                font-size: .85rem;
                font-family: Adobe Heiti Std;
                font-weight: normal;
                color: #FFFFFF;
              }
              span {
                width: 2.88rem;
                height: 2.88rem;
                display: inline-block;
              }
              .count-icon {
                background: url('../../../assets/statistic-dashboard/screwDevice2@2x.png') center no-repeat no-repeat;
                background-size: 100% 100%;
              }
              .num-icon {
                background: url('../../../assets/statistic-dashboard/screwDevice2@2x.png') center no-repeat no-repeat;
                background-size: 100% 100%;
              }
            }
            p {
              margin: 0;
              font-size: .62rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #FFFFFF;
            }
          }
        }
      }
      .device-footer {
        width: 100%;
        height: 11.08rem;
        padding-top: 0.5rem;
        background: url('../../../assets/statistic-dashboard/screwGroup4@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        .title-device-footer {
          background: url('../../../assets/statistic-dashboard/screwTitle4@2x.png') center no-repeat no-repeat;
          background-size: 90% 90%;
        }
        .item-warp-liable {
          width: 100%;
          height: 6.15rem;
          margin: .19rem;
        }
      }
    }
    .excavation-value {
      // flex-basis: 34.35rem
      width: 34.88%;
      padding: .5rem .5rem 0 .3rem;
      margin-right: .38rem;
      background: url('../../../assets/statistic-dashboard/screwGroup3@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .title-wrap-right {
        background: url('../../../assets/statistic-dashboard/screwTitle3@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
      }
      .item-warp-history {
        width: 100%;
        height: 14.62rem;
      }
    }
  }
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
  .deepExcavation-scroll {
    height: 15.81rem;
    margin: 0 .58rem;
    padding: 0.5rem;
    background: url('../../../assets/statistic-dashboard/screwGroup2@2x.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    .deepExcavation-title {
      background: url('../../../assets/statistic-dashboard/screwTitle2@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
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
