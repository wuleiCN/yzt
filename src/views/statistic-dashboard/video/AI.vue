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
              <TypePie :id="'AI-pie'" :width="'100%'" :height="'6.92rem'" :cat-type="waringData" :alarm="AiEnum" />
            </div>
            <div class="waring-line">
              <div class="title-wrap">
                <div class="title"><span class="icon" /> 最近7天AI预警问题趋势</div>
              </div>
              <TypeLine :id="'AI-line'" :width="'100%'" :height="'7.69rem'" :trend-data="trend" />
            </div>
          </div>
          <div class="ai-monitor">
            <div class="title-wrap">
              <div class="title"><span class="icon" /> AI监控画面</div>
            </div>
            <div class="video-area">
              <div class="video-item">
                <div class="selectActive">
                  <iframe
                    id="container"
                    class="video-style"
                    style="height:99%;width: 99%"
                    :src="videoAddress"
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
          <div class="title">
            <span class="icon" />
            今日智能报警拍照记录
            <span class="history" @click="showHistory()">查看历史</span>
          </div>
        </div>
        <div class="today-record">
          <swiper :options="swiperOption">
            <swiper-slide
              v-for="(slide, index) in swiperSlides"
              :key="index"
              class="warning-img"
            >
              <img :src="slide.image" alt="">
              <span class="date">
                {{ slide.location + '：' + slide.datetime }}
              </span>
            </swiper-slide>
            <div slot="button-prev" class="swiper-button-prev" />
            <div slot="button-next" class="swiper-button-next" />
          </swiper>
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
          <p v-for="i in 3" :key="i">{{ AICount[3-i] || 0 }}</p>
          个
        </div>
        <div class="camera-scoll">
          <div v-for="(item, idx) in videoList" :key="idx" class="camera">
            <div class="camera-frame" />
            <div class="camera-info">
              <div class="ellipsis" :class="[item.heart ? 'online' : 'err']">{{ item.videoName }}</div>
              <div class="camera-paly" @click="playAiVideo(item)">播放<i class="el-icon-video-play" style="margin-left: 0.27rem;color: #E4EEFF;" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      custom-class="history-modal"
      :append-to-body="true"
      title="历史记录"
      :visible.sync="historyVisible"
    >
      <div class="warning-img">
        <div v-for="(slide, index) in swiperSlides" :key="index" class="history-img">
          <img :src="slide.image" alt="">
        </div>
      </div>
      <el-pagination
        background
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
      />
    </el-dialog>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { getAiEnum, getViolationAlarm, getAIEarlyWarningTrend, getIntelligentPhotoRecord, getFindNewsVideoList } from '@/api/statistic-dashboard/ai'
// import common from '../mixins/common'
// import { parseTime } from '@/utils'
import TypePie from './component/AIPie.vue'
import TypeLine from './component/AILine'
export default {
  components: {
    TypePie,
    TypeLine,
    Swiper,
    SwiperSlide
  },
  // mixins: [common],
  data() {
    return {
      waringData: [],
      AiEnum: [],
      trend: [],
      videoList: [],
      AICount: [],
      videoAddress: '',
      swiperSlides: [],
      historyVisible: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      projectId: this.$store.state.user.loginInfo.projectId,
      warningData: [
        {
          name: '1日',
          value: 1
        },
        {
          name: '3日',
          value: 2
        },
        {
          name: '7日',
          value: 4
        }
      ],
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 30,
        slidesPerGroup: 1,
        // loop: true,
        // loopFillGroupWithBlank: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      value: 4,
      activeClass: 1,
      selectIndex: '',
      videoType: ''
    }
  },
  async mounted() {
    this.dataInit()
    this.init()
    // this.init(this.projectId)
  },
  beforeDestroy() {
    clearInterval(this.tiemer)
  },
  methods: {
    init(id) {
      getAiEnum().then(v => {
        if (v.code === 1000 && v.result) this.AiEnum = v.result
      })
      getAIEarlyWarningTrend({ pId: this.projectId }).then(v => {
        if (v.code === 1000 && v.result) this.trend = v.result
      })
      getFindNewsVideoList({
        isDel: 0,
        rows: 100,
        page: 1,
        projectId: this.projectId
      }).then(e => {
        if (e.code === 1000 && e.result) {
          this.videoList = e.result.result
          for (let i = 0; i <= 2; i++) {
            this.AICount[i] = (parseInt(this.videoList.length / Math.pow(10, i)) % 10)
          }
          console.log(this.videoList.length, this.AICount)
          const params = this.videoList.find(v => v.heart === 1)
          const lastStr = params.videoAddress ? params.videoAddress.split('/')[params.videoAddress.split('/').length - 1] : ''
          if (params.isControl === 2 && params.videoAddress) {
            this.videoAddress = `https://open.ys7.com/ezopen/h5/iframe?url=${params.videoAddress.replace(lastStr, `${params.channelNo + 1}.hd.live`)}&autoplay=1&accessToken=${params.accessToken}`
          } else if (params.isControl === 1 && params.videoAddress) {
            this.videoAddress = 'https://open.ys7.com/ezopen/h5/iframe?url=' + params.videoAddress + '&autoplay=1&accessToken=' + params.accessToken
          }
        }
      })
      this.getViolationAlarmData()
      this.getIntelligentPhotoRecordFn()
      this.tiemer = setInterval(() => {
        this.getIntelligentPhotoRecordFn()
        this.getViolationAlarmData()
      }, 60000)
    },
    dataInit() {},
    showHistory() {
      this.historyVisible = true
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      // this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      // this.getDataList()
    },
    getViolationAlarmData() {
      getViolationAlarm({ pId: this.projectId, type: this.value }).then(v => {
        if (v.code === 1000 && v.result) this.waringData = v.result
      })
    },
    getIntelligentPhotoRecordFn() {
      getIntelligentPhotoRecord({ pId: this.projectId }).then(e => {
        if (e.code === 1000 && e.result) {
          e.result.forEach(v => {
            v.datetime = v.datetime.slice(10)
          })
        }
        this.swiperSlides = e.result
      })
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    navClick() {
      this.getViolationAlarmData()
    },
    playAiVideo(params) {
      const lastStr = params.videoAddress ? params.videoAddress.split('/')[params.videoAddress.split('/').length - 1] : ''
      if (params.isControl === 2 && params.videoAddress && params.heart) {
        this.videoAddress = `https://open.ys7.com/ezopen/h5/iframe?url=${params.videoAddress.replace(lastStr, `${params.channelNo}.hd.live`)}&autoplay=1&accessToken=${params.accessToken}`
      } else if (params.isControl === 1) {
        this.videoAddress = 'https://open.ys7.com/ezopen/h5/iframe?url=' + params.videoAddress + '&autoplay=1&accessToken=' + params.accessToken
      } else if (params.heart === 0) {
        this.$message.error('该设备不在线')
      }
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
              height: 21rem;
              background: #111111;
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
          .history {
            margin-left: 80%;
            border-bottom: 1px #fff solid;
            cursor: pointer;
          }
        }
      }
      .today-record {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: .38rem .77rem;
        .swiper-container {
          width: 100%;
          .swiper-wrapper {
            width: 100%;
          }
        }
        .warning-img {
          width: 11.92rem;
          height:6.92rem;
          img{
            width: 100%;
            height: 100%;
            margin-right: 10px;
          }
          .date {
            display: inline-block;
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: .96rem;
            text-align: center;
            font-size: .62rem;
            line-height: .96rem;
            background: rgba(169, 169, 169, .5);
          }
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
            border: #2AAEF2 1px solid;
            background: #696969;
          }
          .camera-info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: .58rem;
            width: 4.85rem;
            text-align: center;
            .online {
              color: green;
            }
            .err {
              color: red;
            }
            .camera-paly {
              height: 1.77rem;
              line-height: 1.77rem;
              background: url('../../../assets/statistic-dashboard/AIGroup7@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              color: #00A8FF;
              cursor: pointer;
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
  .ellipsis {
    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:nowrap; //溢出不换行
  }
}
::v-deep .el-dialog {
    margin-top: 15vh !important;
    width: 46.15rem;
    height:50%;
    .warning-img {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
          img{
            width: 8.85rem;
            height: 6.54rem;
            padding-right: .19rem;
          }
        }
  }
</style>
