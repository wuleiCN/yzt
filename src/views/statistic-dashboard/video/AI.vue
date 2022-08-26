<template>
  <div class="statistic-dashboard-ai">
    <div class="left-wrap">
      <div class="left-top-wrap">
        <div class="waring-wrap">
          <div class="waring-left">
            <div class="violation-count">
              <div class="title-wrap">
                <div class="title"><span class="icon" /> 违规报警统计</div>
              </div>
              <div class="today-count">
                <el-select v-model="value" :popper-append-to-body="false" class="select-class" @change="navClick()">
                  <el-option
                    v-for="(ele,idx) in warningData"
                    :key="idx"
                    :label="ele.name"
                    :value="ele.value"
                  />
                </el-select>
              </div>
              <TypePie :id="'AI-pie'" :width="'100%'" :height="'7.31rem'" />
            </div>
            <div class="waring-line">
              <div class="title-wrap">
                <div class="title"><span class="icon" /> 最近7天AI预警问题趋势</div>
              </div>
              <TypeLine :id="'AI-line'" :width="'100%'" :height="'7.69rem'" />
            </div>
          </div>
          <div class="ai-monitor">
            <div class="title-wrap">
              <div class="title"><span class="icon" /> AI监控画面</div>
            </div>
            <div class="video-area">
              <div v-for="(item,index) in (videoList.length ? videoList : activeClass)" :key="index" class="video-item">
                <div :class="selectIndex === index ? 'selectActive' : ''" class="video-item-block">
                  <iframe
                    :id="'container' + index"
                    class="video-style"
                    style="height:99%;width: 99%"
                    :src="item.deviceSerial"
                    allowfullscreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="left-bottom-wrap">
        <div class="title-wrap">
          <div class="title"><span class="icon" /> 今日智能报警拍照记录</div>
        </div>
        <div class="today-record">
          <div v-for="(item, idx) in 5" :key="idx" class="warning-img">
            <img src="" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="rigth-wrap">
      <div class="title-wrap">
        <div class="title"><span class="icon" /> AI摄像头列表</div>
      </div>
      <div class="camera-list">
        <div class="camera-count">
          AI摄像头总数
          <p>0</p><p>0</p><p>4</p>
          个
        </div>
        <div class="camera-scoll">
          <div v-for="(item, idx) in 8" :key="idx" class="camera">
            <div class="camera-frame" />
            <div class="camera-info">
              <div>钢筋加工棚</div>
              <div class="camera-paly">播放<i class="el-icon-video-play" style="margin-left: 0.27rem;color: #E4EEFF;" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { getMataierKC, getStockInfo, getWarStock } from '@/api/material/meterialDatav'
// import common from '../mixins/common'
// import { parseTime } from '@/utils'
import TypePie from './component/AIPie.vue'
import TypeLine from './component/AILine'
export default {
  components: {
    TypePie,
    TypeLine
  },
  // mixins: [common],
  data() {
    return {
      waringData: [

      ],
      initData: [],
      videoList: [],
      warningData: [],
      value: '今日',
      activeClass: 1,
      selectIndex: '',
      videoType: ''
    }
  },
  async mounted() {
    this.dataInit()
    // this.init(this.projectId)
  },
  methods: {
    init(id) {

    },
    // 初始化滚动表格数据
    dataInit() {
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    navClick() {},
    // 看板材料信息列表
    getMataierList() {
    }
  }
}
</script>
<style lang="scss" scoped>
// 计算方式 26px -> 1rem
.statistic-dashboard-ai {
  display: flex;
  flex-wrap: nowrap;
  .left-wrap {
    // flex: 3;
    width: 75%;
    .waring-wrap {
      display: flex;
      flex-wrap: nowrap;
      height: 23.69rem;
      .waring-left {
        flex: 220;
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-left: .54rem;
        .violation-count {
          flex: 1;
          background: url('../../../assets/statistic-dashboard/AIGroup@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          .today-count {
            margin: .38rem 0 0 60%;
            width: 4.23rem;
            ::v-deep .select-class {
              color: #2AAEF2;
              background: url('../../../assets/statistic-dashboard/nav-bro-bg.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              .el-input__inner {
                color: #2AAEF2;
                font-size: .6rem;
                height: 1.54rem;
                text-align: center;
                border: none;
                padding: 0 .38rem 0 0;
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
                .el-input__icon {
                  color: #2AAEF2 !important;
                }
              }
            }
          }
        }
        .waring-line {
          flex: 1;
          background: url('../../../assets/statistic-dashboard/AIGroup@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          margin-top: .77rem;
        }
        .title-wrap {
          background: url('../../../assets/statistic-dashboard/AITitle1@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
      }
      }
      .ai-monitor {
        flex: 380;
        height: 100%;
        background: url('../../../assets/statistic-dashboard/AIGroup8@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        margin: 0 .77rem;
        .title-wrap {
          background: url('../../../assets/statistic-dashboard/AITitle3@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          height: 1.31rem;
        }
        .video-area {
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          width: 95%;
          height: 21rem;
          margin: 0 .77rem .58rem;
          .video-item {
            width: 100%;
            height: 100%;
            .video-item-block {
              position: relative;
              background: #000;
              border: #00A8FF 1px solid;
              height: 95%;
              margin: .19rem;
              iframe {
                border: 0;
              }
              .zhezhao {
                position: absolute;
                top: 0;
                height: 80%;
                width: 95%;
                // 遮罩解决点击的问题
              }
              .video-style {
                height: calc(100% - 4px); // 选中粗细
                width: calc(100% - 4px); // 选中粗细
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
            .selectActive {
              background: green;
            }
          }
        }
      }
    }
    .left-bottom-wrap {
      height: 10.31rem;
      background: url('../../../assets/statistic-dashboard/AIGroup11@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      margin: .77rem;
      padding: .19rem;
      .title-wrap {
        background: url('../../../assets/statistic-dashboard/AITitle4@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        width: 99%;
        height: 1.31rem;
        .title {
          margin-left: .19rem;
        }
      }
      .today-record {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: .38rem .77rem;
        .warning-img {
          width: 11.92rem;
          height:6.92rem;
          background: url('../../../assets/statistic-dashboard/AIGroup12@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .rigth-wrap {
    width: 25%;
    height: 34.81rem;
    margin-right: .54rem;
    background: url('../../../assets/statistic-dashboard/AIGroup3@2x.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    .title-wrap {
      background: url('../../../assets/statistic-dashboard/AITitle1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      width: 99%;
      height: 1.31rem;
      .title {
        margin-left: .19rem;
      }
    }
    .camera-list {
      .camera-count {
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
      .camera-scoll {
        overflow-x: hidden;
        max-height: 28.85rem;
        transition-property: all;
        transition-duration: .5s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        .camera {
          display: flex;
          flex-wrap: nowrap;
          width: 16.62rem;
          height: 6.54rem;
          font-size: .77rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #E4EEFF;
          opacity: 0.8;
          margin-left: 50%;
          margin-bottom: .77rem;
          transform: translateX(-50%);
          .camera-frame {
            width: 11rem;
            height: 100%;
            background: url('../../../assets/statistic-dashboard/AIGroup6@2x.png') center no-repeat no-repeat;
            background-size: 100% 100%;
          }
          .camera-info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: .58rem;
            width: 4.85rem;
            text-align: center;
            cursor: pointer;
            .camera-paly {
              height: 1.77rem;
              line-height: 1.77rem;
              background: url('../../../assets/statistic-dashboard/AIGroup7@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              color: #00A8FF;
            }
          }
        }
      }
    }
  }
  .title-wrap {
    width: 100%;
    height: 1.21rem;
    margin: .5rem 0 0;
    // padding: 0rem 0 .5rem 0;
    font-size: .62rem;
    .title {
      margin-left: .38rem;
      .icon {
        display: inline-block;
        background: url('../../../assets/statistic-dashboard/deeptitle@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        width: 1.21rem;
        height: 1.11rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
