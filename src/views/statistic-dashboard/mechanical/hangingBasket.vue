<template>
  <div class="hanging-basket-main">
    <div class="basket-wrap-left">
      <div class="basket-device">
        <div class="title-wrap title-wrap-left">
          <div class="title"><span class="icon" />设备</div>
        </div>
        <div class="device-box">
          <div class="device-info">
            <div class="device-info-name">
              <div class="device-name">
                <p>设备名称：</p>
                <el-select v-model="value" :popper-append-to-body="false" class="select-class" @change="navClick">
                  <el-option
                    v-for="(ele,idx) in deviceList"
                    :key="idx"
                    :label="ele.label"
                    :value="ele.value"
                  />
                </el-select>
              </div>
              <div class="device-name">
                <p>设备编号：</p>
                <p>YHDL001</p>
              </div>
              <div class="device-name">
                <p>更新时间：</p>
                <p>2020-07-20 11:56:20</p>
              </div>
            </div>
            <div class="device-info-status">
              停机状态
            </div>
          </div>
          <div class="device-data">
            <div class="device-data-item">
              <div class="device-data-icon device-data-icon1" />
              <div>
                <p>重量</p>
                <p>0T</p>
              </div>
            </div>
            <div class="device-data-item">
              <div class="device-data-icon device-data-icon2" />
              <div>
                <p>加速度</p>
                <p>9.8m/s</p>
              </div>
            </div><div class="device-data-item">
              <div class="device-data-icon device-data-icon3" />
              <div>
                <p>报警状态</p>
                <p>正常</p>
              </div>
            </div><div class="device-data-item">
              <div class="device-data-icon device-data-icon4" />
              <div>
                <p>倾角</p>
                <p>1.758°</p>
              </div>
            </div><div class="device-data-item">
              <div class="device-data-icon device-data-icon5" />
              <div>
                <p>用电电流</p>
                <p>0A</p>
              </div>
            </div><div class="device-data-item">
              <div class="device-data-icon device-data-icon6" />
              <div>
                <p>当前状态</p>
                <p>tin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="basket-history">
        <div class="title-wrap title-wrap-left">
          <div class="title"><span class="icon" />运行记录</div>
        </div>
        <dv-scroll-board
          :config="config2"
        />
      </div>
    </div>
    <div class="basket-wrap-right">
      <div class="waring-history-weeks">
        <div class="title-wrap title-wrap-right">
          <div class="title"><span class="icon" />近七天报警记录</div>
        </div>
        <dv-scroll-board
          :config="config"
        />
      </div>
      <div class="device-status">
        <div class="title-wrap title-wrap-right">
          <div class="title"><span class="icon" />设备状态</div>
        </div>
        <dv-scroll-board
          :config="config3"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deviceList: [],
      value: '',
      config: {
        header: ['设备编号', '使用状态', '报警状态', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
        data: []
      },
      config2: {
        header: ['上班时间', '重量', '倾角', '电流', '使用状态', '运行模式', '加速度', '状态'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
        data: []
      },
      config3: {
        header: ['设备名称', '设备编号', '当前状态'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: []
      },
      initData: [],
      weekData: [],
      statusData: []
    }
  },
  mounted() {
    this.dataInit()
  },
  methods: {
    dataInit() {
      const obj = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }
      for (let i = 1; i <= 7; i++) {
        this.initData.push(obj)
        this.weekData.push(obj)
        this.statusData.push(obj)
      }
      this.initData = this.initData.map(item => {
        return [
          '2023-02-22',
          '6t',
          '36°',
          '10A',
          '正常',
          '在线',
          '9.98m/s',
          '在线'
        ]
      })
      this.weekData = this.weekData.map(item => {
        return [
          'A000001',
          '正常',
          '坠落',
          '2023-2-22'
        ]
      })
      this.statusData = this.statusData.map(item => {
        return [
          'YZTCS-01',
          'A0000001',
          '离线'
        ]
      })
      this.config = {
        header: ['设备编号', '使用状态', '报警状态', '时间'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
        data: this.weekData
      }
      this.config2 = {
        header: ['上班时间', '重量', '倾角', '电流', '使用状态', '运行模式', '加速度', '状态'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
        data: this.initData
      }
      this.config3 = {
        header: ['设备名称', '设备编号', '当前状态'],
        headerBGC: '#132539',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center'],
        data: this.statusData
      }
    },
    newsReload() {},
    navClick() {}
  }
}
</script>

<style lang="scss" scoped>
.hanging-basket-main {
  width: 100%;
  height: 35.38rem;
  display: flex;
  flex-direction: row;
  .title-wrap {
    width: 100%;
    height: 2.27rem;
    font-size: .62rem;
    .title {
      padding-left: .77rem;
      margin-top: .58rem;
      .icon {
        display: inline-block;
        background: url('../../../assets/statistic-dashboard/basketIcon@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        width: 1.38rem;
        height: 1.54rem;
        vertical-align: middle;
      }
    }
  }
  .basket-wrap-left {
    // flex: 1360;
    width: 72%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title-wrap-left {
      background: url('../../../assets/statistic-dashboard/materialTilte@2x.png') center no-repeat no-repeat;
      background-size: 99% 100%;
    }
    .device-box {
      display: flex;
      flex-direction: row;
      height: 13.46rem;
      .device-info, .device-data {
        width: 50%;
      }
      .device-info {
        display: flex;
        flex-direction: row;
        background: url('../../../assets/statistic-dashboard/basketDevice@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        .device-info-name {
          width: 50%;
          margin: 1.23rem 0;
          .device-name {
            display: flex;
            flex-direction: row;
            height: 3.58rem;
            text-align: center;
            line-height:3.58rem;
            &:nth-child(3) {
              margin-top: .38rem;
            }
            p {
              width: 4.62rem;
              margin: 0;
              &:nth-child(1) {
                font-size: .77rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #2AAEF2;
              }
              &:nth-child(2) {
                width: 9.23rem;
              }
            }
            ::v-deep .select-class {
              height: 2rem;
              width: 8.08rem;
              margin-top: .77rem;
              line-height: 1.96rem;
              background: url('../../../assets/statistic-dashboard/nav-bro-sel-bg.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              .el-input {
                height: 2rem;
              }
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
          }
        }
        .device-info-status {
          width: 50%;
          text-align: center;
          line-height: 13.25rem;
          padding-right: .77rem;
        }
      }
      .device-data {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        .device-data-item {
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 8.08rem;
          height: 5.88rem;
          background: url('../../../assets/statistic-dashboard/basketWarp@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          &:nth-child(odd) {
            margin-bottom: .58rem;
          }
          p {
            margin: 0;
            &:nth-child(1) {
              margin: 1.73rem 0 .38rem 0;
            }
          }
          .device-data-icon {
            width: 2.88rem;
            height: 2.88rem;
            margin-top: 50%;
            transform: translateY(-90%);
          }
          .device-data-icon1 {
            background: url('../../../assets/statistic-dashboard/basketIcon1@2x.png') center no-repeat no-repeat;
            background-size: 100% 100%;
          }
          .device-data-icon2 {
            background: url('../../../assets/statistic-dashboard/basketIcon2@2x.png') center no-repeat no-repeat;
            background-size: 100% 100%;
          }
          .device-data-icon3 {
            background: url('../../../assets/statistic-dashboard/basketIcon3@2x.png') center no-repeat no-repeat;
            background-size: 100% 100%;
          }
          .device-data-icon4 {
            background: url('../../../assets/statistic-dashboard/basketIcon4@2x.png') center no-repeat no-repeat;
            background-size: 100% 100%;
          }
          .device-data-icon5 {
            background: url('../../../assets/statistic-dashboard/basketIcon5@2x.png') center no-repeat no-repeat;
            background-size: 100% 100%;
          }
          .device-data-icon6 {
            background: url('../../../assets/statistic-dashboard/basketIcon6@2x.png') center no-repeat no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .basket-device, .basket-history {
      height: 50%;
      // width: 52.15rem;
      background: url('../../../assets/statistic-dashboard/basketGroup1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      margin-left: .58rem;
    }
  }
  .basket-wrap-right {
    // flex: 534;
    width: 28%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title-wrap-right {
      background: url('../../../assets/statistic-dashboard/basketTilte2@2x.png') center no-repeat no-repeat;
      background-size: 98% 100%;
      width: 20.54rem;
    }
    .waring-history-weeks, .device-status {
      height: 50%;
      // width: 20.54rem;
      background: url('../../../assets/statistic-dashboard/basketGroup2@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      margin-right: .58rem;
    }
  }
  ::v-deep .dv-scroll-board {
    width: 100%;
    padding: 0 .58rem;
    height: 15.38rem;
    padding: 0 20px;
    .header {
      justify-content: center;
      align-items: center;
      height: 1.62rem;
      font-size: .69rem;
      color: #48ECE7;
    }
    .rows {
      height: 11.92rem !important;
    }
  }
}
</style>
