<template>
  <div class="statistic-dashboard dashboard-full-screen">
    <div class="statistic-dashboard-main">
      <div class="main-item item-project-general">
        <div class="project-general-wrap">
          <div class="title-wrap">
            <div class="title"><span class="icon" />项目概括</div>
          </div>
          <div class="pro-info">
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">设计单位</div>
              <div class="item-content">{{ projectInfo.designCompany || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">监理单位</div>
              <div class="item-content">{{ projectInfo.supervisorCompany || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">总包单位</div>
              <div class="item-content">{{ projectInfo.contractorCompany || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">劳务单位</div>
              <div class="item-content">{{ projectInfo.labourCompany || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">项目规模</div>
              <div class="item-content">{{ projectInfo.projectScale || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">占地面积</div>
              <div class="item-content">{{ projectInfo.coverArea || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">建筑面积</div>
              <div class="item-content">{{ projectInfo.acreage || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">建筑高度</div>
              <div class="item-content">{{ projectInfo.projectHeight || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">项目位置</div>
              <div class="item-content">{{ projectInfo.projectAddress || '暂无数据' }}</div>
            </div>
            <div class="pro-info-item">
              <div class="item-circle" />
              <div class="item-label">建设单位</div>
              <div class="item-content">{{ projectInfo.buildCompany || '暂无数据' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-item item-progress">
        <!-- <div class="progress-top-wrap">
        </div> -->
        <div class="carousel">
          <div class="carousel-main">
            <el-carousel ref="carousel" height="100%" :interval="videoDuration" indicator-position="none" arrow="always" @change="changeVideo">
              <el-carousel-item v-for="(item, idx) in carousels" :key="item.id" :name="`${idx}`">
                <video
                  v-if="index === idx && item.type === 2"
                  id="videoPlayer"
                  :loop="carousels.length === 1"
                  class="video-style"
                  :src="item.url"
                  muted="muted"
                  :autoplay="index === idx"
                  @ended="handleEnd(index + 1)"
                />
                <img v-if="index === idx && item.type === 1" class="video-style" :src="item.url">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="progress-bottom-wrap">
          <Pie id="progress-pie" :progress-data="{allDays, doneDays}" height="6rem" width="4rem" />
          <div class="bottom-wrap-title">工程进度（总工期{{ allDays }}天）</div>
          <div class="node-wrap">
            <div v-for="(item, idx) in nodes" :key="idx">
              <img class="node" src="@/assets/statistic-dashboard/node-bg.png" alt="">
              <div class="date">{{ item.startDate }}</div>
              <div class="nodeName">{{ item.nodeName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-item item-right-wrap">
        <div class="item-news-wrap">
          <div class="title-wrap">
            <div class="title"><span class="icon" />信息传递</div>
          </div>
          <div class="news-content">
            <div v-for="item in articles" :key="item.id">{{ item.title }} <span class="news-date">{{ item.createTime }}</span></div>
          </div>
        </div>
        <div class="item-pie-wrap">
          <div class="title-wrap">
            <div class="title"><span class="icon" />质量安全</div>
          </div>
          <QualPie id="qual-pie" class="qual-pie" :project-info="projectInfo" height="10.38rem" width="18.08rem" />
        </div>
      </div>
    </div>
    <div class="statistic-dashboard-footer">
      <div class="footer-item">
        <div class="left footer-item-1" />
        <div class="right-wrap">
          <div class="right-title">劳务人员</div>
          <div class="right"><span>{{ projectInfo.labourCount }}</span> 人</div>
          <div class="right-title1">管理员</div>
          <div class="right"><span>{{ projectInfo.manageCount }}</span> 人</div>
        </div>
      </div>
      <div class="footer-item">
        <div class="left footer-item-2" />
        <div class="right-wrap">
          <div class="right-title">劳务分包</div>
          <div class="right"><span>{{ projectInfo.consCount }}</span></div>
          <div class="right-title1">班组</div>
          <div class="right"><span>{{ projectInfo.teamCount }}</span></div>
        </div>
      </div>
      <div class="footer-item">
        <div class="left footer-item-3" />
        <div class="right-wrap">
          <div class="right-title">完成安全教育</div>
          <div class="right"><span>{{ projectInfo.trainedCount }}</span> 人</div>
          <div class="right-title1">未完成安全教育</div>
          <div class="right"><span>{{ projectInfo.untrainedCount }}</span> 人</div>
        </div>
      </div>
      <div class="footer-item">
        <div class="left footer-item-4" />
        <div class="right-wrap">
          <div class="right-title">获得奖励人员</div>
          <div class="right"><span>{{ projectInfo.rewardCount }}</span> 人</div>
          <div class="right-title1">违规人员</div>
          <div class="right"><span>{{ projectInfo.punishmentCount }}</span> 人</div>
        </div>
      </div>
      <div class="footer-item">
        <div class="left footer-item-5" />
        <div class="right-wrap">
          <div class="right-title">总床位</div>
          <div class="right"><span>{{ projectInfo.totalBedsCount }}</span> 人</div>
          <div class="right-title1">已入住</div>
          <div class="right"><span>{{ projectInfo.occupancyCount }}</span> 人</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QualPie from '../component/QualPie.vue'
import Pie from '../component/Pie.vue'
// import common from '../mixins/common'
import { getProjectInfo, getCarousel, getSchedule, getArticle } from '@/api/statistic-dashboard/index'
import { parseTime } from '@/utils'
export default {
  components: {
    QualPie,
    Pie
  },
  // mixins: [common],
  data() {
    return {
      videoDuration: 0,
      index: 0,
      projectInfo: {},
      carousels: [],
      nodes: [],
      doneDays: '',
      allDays: '',
      articles: []
    }
  },
  async mounted() {
    // this.init(this.projectId)
  },
  methods: {
    init(projectId) {
      this.fetchProjectInfo(projectId)
      this.fetchCarousel(projectId)
      this.fetchSchedule(projectId)
      this.fetchArticle(projectId)
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    // 工程信息
    fetchProjectInfo(projectId) {
      getProjectInfo({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.projectInfo = data.result || {}
        }
      })
    },
    // 获取轮播
    fetchCarousel(projectId) {
      getCarousel({ projectId, model: 1 }).then((data) => {
        if (data && data.code === 1000) {
          this.carousels = data.result
        } else {
          this.carousels = []
        }
      })
    },
    // 工程进度
    fetchSchedule(projectId) {
      getSchedule({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.nodes = data.result.nodes.map(item => {
            item.startDate = item.startDate ? parseTime(item.startDate, '{y}-{m}-{d}') : ''
            return item
          })
          this.doneDays = data.result.doneDays
          this.allDays = data.result.allDays
        } else {
          this.nodes = []
        }
      })
    },
    // 工程文章
    fetchArticle(projectId) {
      getArticle({ projectId }).then((data) => {
        if (data && data.code === 1000) {
          this.articles = data.result.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d}') : ''
            return item
          })
        }
      })
    },
    changeVideo(index) {
      this.index = index
    },
    handleEnd(index) {
      this.$refs.carousel.setActiveItem(`${index}`)
    }
  }
}
</script>
<style lang="scss">
// 计算方式 26px -> 1rem
.statistic-dashboard {
  background: url('../../../assets/statistic-dashboard/dashboard-bg.png') center no-repeat no-repeat;
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
    // width: 99%;
    display: flex;
    margin: 0 .54rem;
    .main-item {
      display: flex;
      height: 16.88rem;
    }
    .title-wrap {
      background: url('../../../assets/statistic-dashboard/title-item.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      margin: .5rem;
      font-size: .62rem;
      .title {
        .icon {
          display: inline-block;
          background: url('../../../assets/statistic-dashboard/project-icon.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          width: 1.38rem;
          height: 1.54rem;
          vertical-align: middle;
        }
      }
    }
    .item-project-general {
      // width: 21.31rem;
      flex: 540;
      height: 26.35rem;
      margin-right: .62rem;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/project-border-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .project-general-wrap {
        width: 100%;
        .pro-info {
          color: #00FFF6;
          padding: 0 .8rem;
          font-size: .69rem;
          font-weight: 400;
          .pro-info-item {
            display: flex;
            line-height: 1.45rem;
            .item-circle {
              width: .46rem;
              height: .46rem;
              margin-top: .6rem;
              border-radius: 50%;
              background:#9011E1;
            }
            .item-label {
              width: 3.27rem;
              color:#2AAEF2;
              margin: 0 .81rem 0 .54rem;
            }
            .item-content {
              width: 12.04rem;
              color:#fff;
            }
          }
        }
      }

    }
    .item-progress {
      // width: 30.54rem;
      flex: 790;
      margin-right: .3rem;
      display: flex;
      flex-wrap: wrap;
      .carousel {
        height: 19.3rem;
        background: transparent;
        margin-top: .3rem;
        width: 100%;
        .carousel-main {
          padding: .3rem;
          background: url('../../../assets/img-zhgd/center-ad.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          height: 19rem;
          // width: 30.54rem;
          .video-style {
            margin: 1rem;
            height: 97%;
            margin: 0 auto;
            width: 100%;
            background: #000;
          }
        }
        .el-carousel__container {
          height: 19rem !important;
        }
        .el-carousel__item {
          height: 19rem !important;
        }
      }
      .progress-bottom-wrap {
        background: url('../../../assets/statistic-dashboard/progress-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 6.85rem;
        width: 100%;
        padding: 1rem 1.5rem;
        display: flex;
        position: relative;
        .bottom-wrap-title {
          position: absolute;
          left: 23%;
        }
        .node-wrap {
          width: 15.38rem;
          display: flex;
          .node {
            width: 2.94rem;
            height: 1.38rem;
            // margin: 0 -0.11rem;
            margin-top: 1.8rem;
          }
          .date {
            width: 2.94rem;
            text-align: center;
            font-size: .38rem;
          }
          .nodeName {
            width: 2.94rem;
            text-align: center;
            font-size: .46rem;
          }
        }

      }
    }
    .item-right-wrap {
      // width: 19.62rem;
      flex: 510;
      display: flex;
      flex-wrap: wrap;
      .item-news-wrap {
        padding: .8rem .8rem 0 .8rem;
        background: url('../../../assets/statistic-dashboard/news-bro-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 13.15rem;
        width: 100%;
        .news-content {
          font-size: .54rem;
          line-height: 32px;
          cursor: pointer;
          .news-date {
            display: block;
            float: right;
          }
        }
      }
      .item-pie-wrap {
        position: relative;
        width: 100%;
        padding: .8rem .8rem 0 .8rem;
        background: url('../../../assets/statistic-dashboard/news-bro-bg.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        height: 13.15rem;
        .qual-pie {
          position: absolute;
          left: 50%;
          top: 80%;
          transform: translate(-50%, -80%);
        }
      }
    }
  }
  .statistic-dashboard-footer {
    display: flex;
    background: url('../../../assets/statistic-dashboard/footer-bro-bg.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    height: 8.2rem;
    margin: 0 .34rem;
    .footer-item {
      height: 8.2rem;
      display: flex;
      padding-top: 1rem;
      flex: 1;
      .left {
        width: 5.31rem;
        height: 4.77rem;
        margin: 1rem;
        background-size: 100% 100%;
      }
      .right-title,.right-title1 {
        margin-bottom: .38rem;
      }
      .right {
        background: url('../../../assets/statistic-dashboard/footer-item-bg.png') center no-repeat no-repeat;
        width: 5.31rem;
        height: 1.46rem;
        line-height: 1.46rem;
        background-size: 100% 100%;
        margin-bottom: .58rem;
        font-size: .54rem;
        color: #DCDCDC;
        span {
          font-size: .92rem;
          font-family: Adobe Heiti Std;
          color: #46EDE8;
          display: inline-block;
          margin: 0 1rem 0 2rem;
        }
      }
    }
    .footer-item-1 {
      background: url('../../../assets/statistic-dashboard/footer-item-1.png') center no-repeat no-repeat;
    }
    .footer-item-2 {
      background: url('../../../assets/statistic-dashboard/footer-item-2.png') center no-repeat no-repeat;
    }
    .footer-item-3 {
      background: url('../../../assets/statistic-dashboard/footer-item-3.png') center no-repeat no-repeat;
    }
    .footer-item-4 {
      background: url('../../../assets/statistic-dashboard/footer-item-4.png') center no-repeat no-repeat;
    }
    .footer-item-5 {
      background: url('../../../assets/statistic-dashboard/footer-item-5.png') center no-repeat no-repeat;
    }
  }
}
</style>
