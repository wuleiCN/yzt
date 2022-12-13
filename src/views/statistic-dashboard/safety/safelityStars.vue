<template>
  <div class="statistic-dashboard-safety">
    <div class="statistic-dashboard-main">
      <div class="elegant-display">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide
            v-for="(v,i) in styleInfo"
            :key="i"
          >
            <div class="swiper-wrap">
              <div class="img">
                <img :src="v.faseUrl" alt="">
              </div>
              <div class="wrap-info">
                <div class="content ellipsis">
                  <span />
                  <span>单位</span>
                  <span>{{ v.construction_name }}</span>
                </div>
                <div class="content ellipsis">
                  <span />
                  <span>项目</span>
                  <span>{{ v.project_name }}</span>
                </div>
                <div class="content ellipsis">
                  <span />
                  <span>名称</span>
                  <span>{{ v.emp_name }}</span>
                </div>
                <div class="content ellipsis">
                  <span />
                  <span>工种</span>
                  <span>{{ v.title }}</span>
                </div>
                <div class="content ellipsis">
                  <span />
                  <span>安全评分</span>
                  <span>{{ v.safty_pf }}</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div slot="button-prev" class="swiper-button-prev" />
          <div slot="button-next" class="swiper-button-next" />
        </swiper>
      </div>
      <div class="wrap-botton">
        <div class="manage-team">
          <div class="details-title title-style">
            <img class="item-img" src="@/assets/statistic-dashboard/realname-svg@2x.png" alt="">
            <div class="item-title">项目安全监督管理小组</div>
          </div>
          <div class="content-wrap">
            <div v-for="(v,i) in monTeam" :key="i" class="items-wrap">
              <div>
                <img class="team-img" :src="v.faseUrl" alt="">
              </div>
              <div class="contents">
                <div class="content-item ellipsis">
                  <span>单位</span>
                  <span>{{ v.title }}</span>
                </div>
                <div class="content-item ellipsis">
                  <span>姓名</span>
                  <span>{{ v.emp_name }}</span>
                </div>
                <div class="content-item ellipsis">
                  <span>电话</span>
                  <span>{{ v.emp_phon }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="honor-list">
          <div class="list-wrap">
            <div class="item-top">
              <img :src="quarterType1.faseUrl || ''" alt="">
              <div class="item-content">
                <div>季度安全之星</div>
                <div>单位：{{ quarterType1 && quarterType1.construction_name || '' }}</div>
                <div>项目：{{ quarterType1 && quarterType1.project_name }}</div>
                <div>姓名：{{ quarterType1 && quarterType1.emp_name }}</div>
                <div>工种：{{ quarterType1 && quarterType1.title }}</div>
              </div>
            </div>
            <div class="item-bottom">
              <div>项目寄语：</div>
              <div>{{ quarterType1 && quarterType1.message || '' }}</div>
            </div>
          </div>
          <div class="list-wrap">
            <div class="item-top">
              <img :src="quarterType2.faseUrl || ''" alt="">
              <div class="item-content">
                <div>月度安全之星</div>
                <div>单位：{{ quarterType2.construction_name }}</div>
                <div>项目：{{ quarterType2.project_name }}</div>
                <div>姓名：{{ quarterType2.emp_name }}</div>
                <div>工种：{{ quarterType2.title }}</div>
              </div>
            </div>
            <div class="item-bottom">
              <div>项目寄语：</div>
              <div>{{ quarterType2.message || '' }}</div>
            </div>
          </div>
          <div class="list-wrap">
            <div class="item-top">
              <img :src="quarterType3.faseUrl || ''" alt="">
              <div class="item-content">
                <div>周度安全之星</div>
                <div>单位：{{ quarterType3.construction_name }}</div>
                <div>项目：{{ quarterType3.project_name }}</div>
                <div>姓名：{{ quarterType3.emp_name }}</div>
                <div>工种：{{ quarterType3.title }}</div>
              </div>
            </div>
            <div class="item-bottom">
              <div>项目寄语：</div>
              <div>{{ quarterType3.message || '' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { queryStyleInfo, queryQuarte, getMonTeam } from '@/api/statistic-dashboard-data/safelityStars'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  // mixins: [common],
  data() {
    return {
      projectId: '',
      monTeam: [],
      styleInfo: [],
      quarterType1: {},
      quarterType2: {},
      quarterType3: {},
      quarterType: {
        faseUrl: '',
        construction_name: '',
        emp_name: '',
        project_name: '',
        title: ''
      },
      swiperOption: {
        slidesPerView: 3,
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
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    newsReload(projectId, item) {
      this.projectId = projectId
    },
    init() {
      queryStyleInfo().then(res => {
        if (res.code === 1000 && res.result) this.styleInfo = res.result
      })
      queryQuarte().then(res => {
        if (res.code === 1000 && res.result) {
          this.quarterType1 = res.result.find(v => v.quarter_type === 1) || this.quarterType
          this.quarterType2 = res.result.find(v => v.quarter_type === 2) || this.quarterType
          this.quarterType3 = res.result.find(v => v.quarter_type === 3) || this.quarterType
          console.log(this.quarterType1, this.quarterType2, this.quarterType3)
        }
      })
      getMonTeam().then(res => {
        if (res.code === 1000 && res.result) {
          this.monTeam = res.result.slice(0, 6)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// 计算方式 26px -> 1rem
.statistic-dashboard-safety {
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  background: url('../../../assets/statistic-dashboard/sq-bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 41.54rem;
  color: #fff;
  font-size: .77rem;
  .statistic-dashboard-main {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 .74rem;
    margin-bottom: .5rem;
    .elegant-display {
      height: 15.12rem;
      width: 100%;
      background: url('../../../assets/statistic-dashboard/safelity-bg1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .swiper {
        height: 15.12rem;
        margin: .38rem;
        .swiper-slide {
          background: url('../../../assets/statistic-dashboard/safelity-group@2x.png') center no-repeat no-repeat;
          background-size: 100% 85%;
          padding: 0 .38rem;
          margin: 0 !important;
          .swiper-wrap {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 2.69rem;
            .img {
              width: 6.35rem;
              height: 8.08rem;
              background: #FFFFFF;
              margin: .77rem 1.15rem;
              border-radius: 5%;
              img {
                width: 6.35rem;
                height: 8.08rem;
                border-radius: 5%;
              }
            }
            .wrap-info {
              margin-top: .96rem;
              .content {
                width: 12.69rem;
                margin-bottom: .77rem;
                span {
                  &:nth-child(1) {
                    display: inline-block;
                    width: .46rem;
                    height: .46rem;
                    background: #00FDF6;
                    border-radius: 50%;
                    margin-right: .38rem;
                  }
                  &:nth-child(2) {
                    width: 1.35rem;
                    height: .69rem;
                    font-size: .69rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #00FDF6;
                    margin-right: 1.15rem;
                  }
                  &:nth-child(3) {
                    width: 9.08rem;
                    height: .69rem;
                    font-size: .69rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #FFFFFF;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .wrap-botton {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .manage-team {
      width: 29.23rem;
      height: 19.54rem;
      // padding: .19rem 0;
      background: url('../../../assets/statistic-dashboard/safelity-bg2@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      .details-title {
        background: url('../../../assets/statistic-dashboard/safelity-title@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
      }
      .title-style {
        display: flex;
        padding-left: .38rem;
        padding: .77rem .38rem;
        margin: .38rem .38rem 0;
        font-size: .62rem;
        color: #F1F1F1;
        font-weight: bold;
        img {
          width: 1.46rem;
          height: 1.46rem;
        }
        div {
          line-height: 1.37rem;
        }
      }
      .content-wrap {
        display: flex;
        flex-direction: row;
        // justify-content: center;
        flex-wrap: wrap;
        .items-wrap {
          display: flex;
          flex-direction: row;
          justify-content: center;
          // width: 11.54rem;
          height: 4.31rem;
          background: rgba(113,205,249,.2);
          margin: 0 0 1.15rem 1.15rem;
          .team-img {
            width: 4.42rem;
            height: 4.31rem;
            // background: #FFFFFF;
            padding: .08rem;
          }
          .contents {
            .content-item {
              width: 8.46rem;
              margin: .38rem 0;
              span {
                // height: .69rem;
                font-size: .69rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                &:nth-child(1) {
                  color: #00FDF6;
                  margin: .45rem;
                }
                &:nth-child(2) {
                  color: #FFFFFF;
                }
              }
            }
          }
        }
      }
    }
    .honor-list {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 0 .77rem;
      width: 57%;
      .list-wrap {
        width: 14.85rem;
        height: 15.92rem;
        background: url('../../../assets/statistic-dashboard/safelity-group2@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
        &:nth-child(2) {
          margin: 1.92rem 1.15rem 0;
        }
        &:nth-child(3) {
          margin-top: 3.85rem;
        }
      }
      .item-top {
        height: 7.96rem;
        margin: .77rem 0;
        position: relative;
        img {
          position: absolute;
          width: 4.62rem;
          height: 4.62rem;
          background: #F1F1F1;
          border-radius: 50%;
          transform: translate(50%, 50%);
          transform: translate(50%, 50%);
          right: 68.5%;
          bottom: 60%;
        }
        .item-content {
          color: #FFFFFF;
          line-height: 1.35rem;
          text-shadow: 0 0 1px #fff,0 0 5px #0072FF,0 0 10px #0072FF,0 0 15px #0072FF;
          // text-align: end;
          div {
            width: 6.15rem;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
            &:nth-child(1) {
              font-size: .96rem;
              margin-left: 45%;
            }
            &:nth-child(2) {
              font-size: .65rem;
              margin-left: 55%;
            }
            &:nth-child(3) {
              font-size: .65rem;
              margin-left: 58%;
            }
            &:nth-child(4) {
              font-size: .65rem;
              margin-left: 55%;
            }
            &:nth-child(5) {
              font-size: .65rem;
              margin-left: 50%;
            }
          }
        }
      }
      .item-bottom {
        height: 7.96rem;
        div {
          color: #FFFFFF;
          text-shadow: 0 0 1px #fff,0 0 5px #0072FF,0 0 10px #0072FF,0 0 15px #0072FF;
          &:nth-child(1) {
            line-height: 1.35rem;
            font-size: .65rem;
            margin-left: 1.54rem;
          }
          &:nth-child(2) {
            text-align: center;
            padding: 0 1.73rem;
            font-size: .97rem;
          }
        }
      }
    }
  }
  .ellipsis {
    // cursor: pointer;
    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:nowrap; //溢出不换行
  }
}
</style>
