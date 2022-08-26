<template>
  <div class="statistic-dashboard-highFormwork">
    <div class="highFormwork">
      <div class="waringCount">
        <div class="title-wrap">
          <div class="title"><span class="icon" /> 近7天预警次数</div>
          <div class="typePie">
            <TypePie id="formwork-pie" :cat-type="catType" height="7.77rem" width="100%" />
            <div class="legend">
              <div v-for="(item, i) in waringData" :key="i" :style="{color: item.color}">
                <i class="el-icon-bangzhu" style="margin: .31rem" />
                {{ item.name + '：' + item.count }}
                <span style="paddingLeft: .19rem">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="formworkReveal">
        <div class="title-wrap">
          <div class="title"><span class="icon" /> 高支模展示</div>
        </div>
        <div class="reveal-content">
          <div class="reveal-warp">
            <div class="prev" @click="changeDevice('prev')"><img src="../../../assets/statistic-dashboard/prev.png" alt=""></div>
            <div class="content"><img :src="revealList[index]" alt=""></div>
            <div class="next" @click="changeDevice('next')"><img src="../../../assets/statistic-dashboard/next.png" alt=""></div>
            <div class="reveal-count">
              <div v-for="(s, i) in 5" :key="i" class="reveal-index">{{ s }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="formworkValue">
        <div class="title-wrap">
          <div class="title"><span class="icon" /> 高支模数值变化</div>
          <div class="formwork-wrap">
            <div class="toggle-wrap">
              <div @click="changeDevice('prev')"><img class="prev" src="@/assets/statistic-dashboard/prev.png" alt=""></div>
              <div class="elevator-name">{{ '暂无设备' }}</div>
              <div @click="changeDevice('next')"><img class="next" src="@/assets/statistic-dashboard/next.png" alt=""></div>
            </div>
          </div>
          <TypeLine id="formwork-line" height="12.31rem" width="100%" />
        </div>
      </div>
    </div>
    <div class="highFormwork-scroll">
      <dv-scroll-board
        :config="config"
      />
    </div>
  </div>
</template>
<script>
// import { getMataierKC, getStockInfo, getWarStock } from '@/api/material/meterialDatav'
// import common from '../mixins/common'
// import { parseTime } from '@/utils'
import TypePie from './component/highFormworkPie.vue'
import TypeLine from './component/highFormworkLine.vue'
export default {
  components: {
    TypePie,
    TypeLine
  },
  // mixins: [common],
  data() {
    return {
      waringData: [
        {
          name: '水平位移',
          color: '#00D98B',
          count: 10
        },
        {
          name: '立杆倾斜',
          color: '#FDB628',
          count: 10
        },
        {
          name: '地基沉降',
          color: '#0091F1',
          count: 10
        },
        {
          name: '立杆轴力',
          color: '#00E4EC',
          count: 10
        },
        {
          name: '模板沉降',
          color: '#EB6F49',
          count: 10
        }
      ],
      revealList: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210F2130512J47-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663221505&t=41f97f3adcbd992433b71fee3bc1bebc',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21031FKU44S6-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663221505&t=a33d51c44fc14d415899adc512a7c114'
      ],
      initData: [],
      config: {
        header: ['序号', '部位编号', '测点编号', '测点类型', '测点值', '报警状态'],
        headerBGC: '#132239',
        oddRowBGC: '#102c4f',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 6,
        align: ['center', 'center', 'center', 'center', 'center', 'center'],
        data: []
      },
      index: 0,
      catType: {}
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
      const obj = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }
      for (let i = 1; i <= 6; i++) {
        this.initData.push(obj)
      }
      this.initData = this.initData.map(item => {
        return [
          item.a,
          item.b,
          item.c,
          item.d,
          item.e,
          item.f,
          item.g
        ]
      })
      this.config = {
        header: ['序号', '部位编号', '测点编号', '测点类型', '测点值', '报警状态'],
        headerBGC: '#132239',
        oddRowBGC: '#102c4f',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 6,
        align: ['center', 'center', 'center', 'center', 'center', 'center'],
        data: this.initData
      }
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    // 看板材料信息列表
    getMataierList() {
    },
    changeDevice(type) {
      if (this.revealList && this.revealList.length) {
        if (type === 'prev' && this.index !== 0) {
          this.index--
        } else if (type === 'next' && (this.index < this.revealList.length - 1)) {
          this.index++
        } else {
          this.index = 0
        }
      }
    },
    // 预警库存明细
    getWarStockList() {
    },
    // 库存信息
    getStockInfoList() {
    }
  }
}
</script>
<style lang="scss" scoped>
// 计算方式 26px -> 1rem
.statistic-dashboard-highFormwork {
  .highFormwork {
    display: flex;
    background-size: 100% 100%;
    width: 100%;
    height: 18.85rem;
    .waringCount {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/formworkGroup1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      // height: 16.8rem;
      margin: 0 .38rem;
      margin-bottom: 1rem;
    }
    .formworkReveal {
      flex: 2;
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/formworkGroup2@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      // height: 16.8rem;
      margin: 0 .38rem;
      margin-bottom: 1rem;
      .title-wrap {
        background: url('../../../assets/statistic-dashboard/titleFormwork2@2x.png') center no-repeat no-repeat;
        background-size: 100% 100%;
      }
      .reveal-content {
        width: 100%;
        height: 16.15rem;
        .reveal-warp {
          display: flex;
          flex-wrap: nowrap;
          .prev {
            flex: 1;
            img {
              position: relative;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              cursor: pointer;
            }
          }
          .content {
            flex: 7.64;
            height: 15.38rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .next {
            flex: 1;
            img {
              position: relative;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              cursor: pointer;
            }
          }
          .reveal-count {
            flex: 1;
            .reveal-index {
              color: #111;
              font-size: 1.15rem;
              text-align: center;
              line-height: 2.77rem;
              width: 2.77rem;
              height: 2.77rem;
              background: url('../../../assets/statistic-dashboard/ball@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
              border-radius: 50%;
              margin-bottom: .38rem;
            }
          }
        }
      }
    }
    .formworkValue {
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/formworkGroup1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      // height: 16.8rem;
      margin: 0 .38rem;
      margin-bottom: 1rem;
      flex: 1;
    }
    .title-wrap {
      width: 100%;
      height: 1rem;
      background: url('../../../assets/statistic-dashboard/vehicle-bro-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      margin: .5rem .5rem 0 .5rem;
      padding: 0rem 0 .5rem 0;
      font-size: .62rem;
      .title {
        margin-top: -.5rem;
        .icon {
          display: inline-block;
          background: url('../../../assets/statistic-dashboard/titleFormwork@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          width: 1.38rem;
          height: 1.54rem;
          vertical-align: middle;
        }
      }
    }
    .formwork-wrap {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .toggle-wrap {
        display: flex;
        flex: wrap;
        margin-top: .96rem;
        // line-height: 2rem;
        .elevator-name {
          line-height: 2rem;
          margin: 0 2.12rem
        }
        .next, .prev {
          width: 2.62rem;
          height: 2rem;
          cursor: pointer;
        }
      }
    }
  }
  .highFormwork-scroll {
    ::v-deep .dv-scroll-board {
      width: 100%;
      // height: 15.38rem;
      .header {
        justify-content: center;
        align-items: center;
        color: #48ECE7;
        height: 2.35rem !important;
        line-height: 2.35rem !important;
      }
      .rows {
        .row-item {
          height: 2.35rem !important;
          line-height: 2.35rem !important;
        }
      }
    }
  }
}
</style>
