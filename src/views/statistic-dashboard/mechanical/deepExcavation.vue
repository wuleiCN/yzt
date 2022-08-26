<template>
  <div class="statistic-dashboard-deepExcavation">
    <div class="deepExcavation">
      <div class="waring-count">
        <div class="title-wrap">
          <div class="title"><span class="icon" /> 近7天预警次数</div>
          <div class="typePie">
            <TypePie :id="'deepExcavation-pie'" :cat-type="catType" height="7.77rem" width="100%" />
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
      <div class="excavation-reveal">
        <div class="title-wrap">
          <div class="title"><span class="icon" /> 深基坑展示</div>
        </div>
        <div class="reveal-content">
          <div class="reveal-warp">
            <div class="prev" @click="changeDevice('prev')"><img src="../../../assets/statistic-dashboard/prev.png" alt=""></div>
            <div class="content"><img :src="revealList[index]" alt=""></div>
            <div class="next" @click="changeDevice('next')"><img src="../../../assets/statistic-dashboard/next.png" alt=""></div>
          </div>
        </div>
      </div>
      <div class="excavation-value">
        <div class="title-wrap">
          <div class="title"><span class="icon" /> 监测信息</div>
          <div class="formwork-wrap">
            <div>
              <span />
              <span>基坑名称</span>
              1号基坑
            </div>
            <div>
              <span />
              <span>基坑深度</span>
              18m
            </div>
            <div>
              <span />
              <span>基坑周长</span>
              10000m
            </div>
            <div>
              <span />
              <span>支护形式</span>
              XXXXX建筑劳务有限公司
            </div>
            <div>
              <span />
              <span>安全等级</span>
              A级
            </div>
            <div>
              <span />
              <span>监测负责人</span>
              张某某
            </div>
            <div>
              <span />
              <span>施工时间</span>
              2022年8月12日
            </div>
            <div>
              <span />
              <span>监测人员</span>
              张某某
            </div>
          </div>
          <!-- <TypeLine id="formwork-line" height="12.31rem" width="100%" /> -->
        </div>
      </div>
    </div>
    <div class="deepExcavation-scroll">
      <div class="title-wrap">
        <div class="title"><span class="icon" /> 深基坑展示</div>
      </div>
      <div class="excavation-data">
        <div class="data-wrap">
          <el-select v-model="value" :popper-append-to-body="false" class="select-class hd" @change="navClick('hdData')">
            <el-option
              v-for="(ele,idx) in hdData"
              :key="idx"
              :label="ele.name"
              :value="ele.value"
            />
          </el-select>
          <el-select v-model="cvalue" :popper-append-to-body="false" class="select-class cv" @change="navClick('cvalue')">
            <el-option
              v-for="(ele,idx) in hdData"
              :key="idx"
              :label="ele.name"
              :value="ele.value"
            />
          </el-select>
          <div class="time">
            <span :style="{color: out === 1 ? '#2AAEF2' : '#FFFFFF'}" @click="outFn(1)">实时</span>
            <span :style="{color: out === 2 ? '#2AAEF2' : '#FFFFFF'}" @click="outFn(2)">7天</span>
            <span :style="{color: out === 3 ? '#2AAEF2' : '#FFFFFF'}" @click="outFn(3)">30天</span>
          </div>
          <div class="unit">单位：mm</div>
        </div>
        <TypeLine :id="'deepExcavation-line'" :height="'15.38rem'" :width="'100%'" />
      </div>
    </div>
  </div>
</template>
<script>
// import { getMataierKC, getStockInfo, getWarStock } from '@/api/material/meterialDatav'
// import common from '../mixins/common'
// import { parseTime } from '@/utils'
import TypePie from './component/deepExcavationPie.vue'
import TypeLine from './component/deepExcavationLine.vue'
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
          name: '地下水位',
          color: '#00D98B',
          count: 10
        },
        {
          name: '周边地标竖向位移',
          color: '#FDB628',
          count: 10
        },
        {
          name: '基坑周边位移',
          color: '#0091F1',
          count: 10
        },
        {
          name: '深层水平测斜',
          color: '#00E4EC',
          count: 10
        },
        {
          name: '锚杆内力',
          color: '#EB6F49',
          count: 10
        }
      ],
      hdData: [
        {
          name: 'x',
          value: 0
        },
        {
          name: 'y',
          value: 1
        }
      ],
      value: '深层水平位移',
      cvalue: '计算值',
      revealList: [],
      index: 0,
      initData: [],
      catType: {},
      out: 1
    }
  },
  async mounted() {
    this.dataInit()
    // this.init(this.projectId)
  },
  methods: {
    init(id) {

    },
    // 基坑监测数据
    dataInit() {

    },
    navClick(value) {
      if (value === 'hdData') this.value = '深层水平位移'
      else if (value === 'cvalue') this.cvalue = '计算值'
    },
    outFn(v) {
      this.out = v
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
    newsReload(projectId) {
      this.init(projectId)
    },
    // 看板监测信息列表
    getMataierList() {
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
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/formworkGroup1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      // height: 16.8rem;
      margin: 0 .38rem;
      margin-bottom: .5rem;
    }
    .excavation-reveal {
      flex: 2;
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/formworkGroup2@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      // height: 16.8rem;
      margin: 0 .38rem;
      margin-bottom: .5rem;
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
        }
      }
    }
    .excavation-value {
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem;
      background: url('../../../assets/statistic-dashboard/formworkGroup1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      // height: 16.8rem;
      margin: 0 .38rem;
      margin-bottom: .5rem;
      flex: 1;
    }
    .formwork-wrap {
      width: 100%;
      font-size: .92rem;
      margin-top: .77rem;
      div {
        margin-bottom: .77rem;
        span:nth-child(1) {
          float: left;
          width: .46rem;
          height: .46rem;
          background: #00E4EC;
          border-radius: 50%;
          margin: .27rem .38rem 0 0;
        }
        span:nth-child(2) {
          color: #2AAEF2;
        }
      }
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: center;
      // align-items: center;
    }
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
        background: url('../../../assets/statistic-dashboard/deeptitle@2x.png') center no-repeat no-repeat;
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
    background: url('../../../assets/statistic-dashboard/deepGroup@2x.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    .title-wrap {
      background: url('../../../assets/statistic-dashboard/deepTitleGroup@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      // height: 1.73rem;
    }
    .excavation-data {
      .data-wrap {
        margin: .38rem 0 0 60%;
        font-size: 16px;
        .hd {
          width: 6.92rem;
        }
        .cv {
          width: 5.38rem;
        }
        .time {
          display: inline-block;
          width: 8.08rem;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background: url('../../../assets/statistic-dashboard/nav-bro-bg.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          span {
            cursor: pointer;
            &:nth-child(1) {
              padding-right: .19rem;
            }
            &:nth-child(2) {
              padding: 0 .38rem;
              border-right: #2AAEF2 2px solid;
              border-left: #2AAEF2 2px solid;
            }
            &:nth-child(3) {
              padding-left: .19rem;
            }
          }
        }
        .unit {
          display: inline-block;
          padding-left: .58rem;
        }
        ::v-deep .select-class {
          color: #2AAEF2;
          background: url('../../../assets/statistic-dashboard/nav-bro-bg.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          .el-input__inner {
            color: #2AAEF2;
            font-size: .7rem;
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
  }
}
</style>
