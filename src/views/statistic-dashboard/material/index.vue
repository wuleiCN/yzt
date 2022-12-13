<template>
  <div class="statistic-dashboard">
    <div class="statistic-dashboard-left">
      <div class="item-project-general">
        <div class="item-warp1 project-general-wrap">
          <div class="title-wrap">
            <div class="title"><span class="icon" />材料库存信息</div>
          </div>
        </div>
        <dv-scroll-board
          :config="config"
        />
      </div>
      <div class="item-warp1 project-general-info">
        <div class="title-wrap">
          <div class="title"><span class="icon" />库存信息</div>
        </div>
        <div class="stock-info">
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="content-icon icon-item1" />
              <div>种类</div>
              <div>{{ stockInfo.typeCount || 0 }}</div>
            </div>
            <div>实际库存材料种类</div>
          </div>
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="content-icon icon-item2" />
              <div>记录</div>
              <div>{{ stockInfo.outCount || 0 }}</div>
            </div>
            <div>材料出库信息累计</div>
          </div>
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="content-icon icon-item3" />
              <div>记录</div>
              <div>{{ stockInfo.inCount || 0 }}</div>
            </div>
            <div>材料入库信息累计</div>
          </div>
        </div>
      </div>
    </div>
    <div class="statistic-dashboard-right">
      <div ref="itemWarp" class="item-warp2 item-news-wrap">
        <div ref="titleWrap" class="title-wrap">
          <div class="title"><span class="icon" />材料库存信息</div>
        </div>
        <MeaterialChart :id="'meaterial'" :height="'18.68rem'" :width="'100%'" />
      </div>
      <div class="item-warp2 item-pie-wrap">
        <div class="title-wrap">
          <div class="title"><span class="icon" />预警库存明细</div>
        </div>
        <dv-scroll-board
          :config="config1"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MeaterialChart from '../component/meaterial.vue'
import { getMataierKC, getStockInfo, getWarStock } from '@/api/material/meterialDatav'
// import common from '../mixins/common'
// import { parseTime } from '@/utils'
export default {
  components: {
    MeaterialChart
  },
  // mixins: [common],
  data() {
    return {
      initData: [],
      warningData: [],
      warStock: [],
      consAttenList: [],
      stockInfo: {},
      materialType: [
        { value: 0, label: '水泥' },
        { value: 1, label: '钢筋' },
        { value: 2, label: '木材' },
        { value: 3, label: '沙子' },
        { value: 4, label: '石子' },
        { value: 5, label: '砖' },
        { value: 6, label: '瓦' },
        { value: 7, label: '玻璃' },
        { value: 8, label: '油毡' },
        { value: 9, label: '石灰' }
      ],
      config: {
        header: ['材料类型', '材料规格', '数量', '单位'],
        headerBGC: '#0e5979',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
        data: []
      },
      config1: {
        header: ['材料类型', '材料规格', '单位', '剩余库存'],
        headerBGC: '#0e5979',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 5,
        align: ['center', 'center', 'center', 'center'],
        data: []
      }
    }
  },
  async mounted() {
    this.dataInit()
    this.getWarStockList()
    this.getMataierList()
    this.getStockInfoList()
    // this.init(this.projectId)
  },
  methods: {
    init(id) {

    },
    // 初始化滚动表格数据
    dataInit() {
      const obj = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }
      const obj1 = { a: '', b: '', c: '', d: '', f: '' }
      for (let i = 1; i <= 7; i++) {
        this.initData.push(obj)
        i < 4 || this.warningData.push(obj1)
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
      this.warningData = this.warningData.map(item => {
        return [
          item.a,
          item.b,
          item.c,
          item.d,
          item.e
        ]
      })
      this.config = {
        header: ['材料类型', '材料规格', '数量', '单位'],
        headerBGC: '#0e5979',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 7,
        align: ['center', 'center', 'center', 'center'],
        data: this.initData
      }
      this.config1 = {
        header: ['材料类型', '材料规格', '数量', '单位'],
        headerBGC: '#0e5979',
        oddRowBGC: '#112c60',
        evenRowBGC: '112c60',
        carousel: 'page',
        rowNum: 5,
        align: ['center', 'center', 'center', 'center'],
        data: this.warningData
      }
    },
    newsReload(projectId) {
      this.init(projectId)
    },
    // 看板材料信息列表
    getMataierList() {
      getMataierKC().then(data => {
        if (data.code === 1000 && data.result) {
          const consAttenList = data.result.map(item => {
            const s = this.materialType.find(v => v.value === item.materialType)
            return [
              (s && s.label) || '无',
              `<span style="color:#fff;">${item.materialSpec || '无'}</span>`,
              `<span style="color:#38F1A1;">${item.nowNumber || '0'}</span>`,
              `<span style="color:#38F1A1;">${item.unit || '无'}</span>`
            ]
          })
          this.config = {
            header: ['材料类型', '材料规格', '数量', '单位'],
            headerBGC: '#0e5979',
            oddRowBGC: '#112c60',
            evenRowBGC: '112c60',
            carousel: 'page',
            rowNum: 7,
            align: ['center', 'center', 'center', 'center'],
            data: consAttenList.length ? consAttenList : this.initData
          }
        }
      })
    },
    // 预警库存明细
    getWarStockList() {
      getWarStock().then(data => {
        if (data.code === 1000 && data.result) {
          const consAttenList = data.result.map(item => {
            const s = this.materialType.find(v => v.value === item.materialType)
            return [
              (s && s.label) || '无',
              `<span style="color:#fff;">${item.materialSpec || '无'}</span>`,
              `<span style="color:#38F1A1;">${item.minStock || '0'}</span>`,
              `<span style="color:#38F1A1;">${item.unit || '无'}</span>`
            ]
          })
          this.config1 = {
            header: ['材料类型', '材料规格', '数量', '单位'],
            headerBGC: '#0e5979',
            oddRowBGC: '#112c60',
            evenRowBGC: '112c60',
            carousel: 'page',
            rowNum: 5,
            align: ['center', 'center', 'center', 'center'],
            data: consAttenList.length ? consAttenList : this.warningData
          }
        }
      })
    },
    // 库存信息
    getStockInfoList() {
      getStockInfo().then(res => {
        if (res.code === 1000 && res.result) {
          this.stockInfo = res.result
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// 计算方式 26px -> 1rem
.statistic-dashboard {
  display: flex;
  background: url('../../../assets/statistic-dashboard/dashboard-bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 41.54rem;
  color: #fff;
  font-size: .77rem;
  .statistic-dashboard-left {
    // flex: 450;
    width: 45%;
    padding: 0 .38rem;
    .item-project-general {
      width: 100%;
      height: 22.31rem;
      background: url('../../../assets/statistic-dashboard/material_group1@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      padding: 0 .38rem;
      ::v-deep .dv-scroll-board {
        width: 100%;
        height: 22.31rem;
        padding: 0 20px;
        .header {
          justify-content: center;
          align-items: center;
          height: 2.92rem;
          font-size: .77rem;
          color: #14F409;
        }
        .rows {
          height: 16.15rem !important;
          .row-item {
            height: 2.3rem !important;
            line-height: 2.3rem !important;
          }
        }
      }
    }
    .project-general-info {
      width: 100%;
      height: 11.92rem;
      background: url('../../../assets/statistic-dashboard/material_group3@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      margin-top: .38rem;
      padding: 0 .38rem;
      .stock-info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        height: 8.92rem;
        .content-wrap {
          width: 7.31rem;
          height: 6.62rem;
          text-align: center;
          .content-wrap-item {
            width: 100%;
            height: 100%;
            background: url('../../../assets/statistic-dashboard/type@2x.png') center no-repeat no-repeat;
            background-size: 100% 100%;
            .content-icon {
              width: 2.92rem;
              height: 2.62rem;
              margin-bottom: .19rem;
              margin-left: 50%;
              transform: translateX(-50%);
            }
            .icon-item1 {
              background: url('../../../assets/statistic-dashboard/material@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
            }
            .icon-item2 {
              background: url('../../../assets/statistic-dashboard/warehouse@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
            }
            .icon-item3 {
              background: url('../../../assets/statistic-dashboard/warehousing@2x.png') center no-repeat no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
  .statistic-dashboard-right {
    display: flex;
    flex-wrap: wrap;
    width: 55%;
    height: 35.38rem;
    ::v-deep .dv-scroll-board {
        width: 100%;
        height: 22.31rem;
        padding: 0 20px;
        .header {
          justify-content: center;
          align-items: center;
          height: 2.92rem;
          font-size: .77rem;
          color: #14F409;
        }
        .rows {
          height:11.54rem !important;
          .row-item {
            height: 2.3rem !important;
            line-height: 2.3rem !important;
          }
        }
      }
    // flex: 550;
    .item-news-wrap, .item-pie-wrap {
      width: 100%;
      height: 50%;
      background: url('../../../assets/statistic-dashboard/material_group3@2x.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      // margin-top: .38rem;
      // padding: 0 .38rem;
    }
  }
  .item-warp1 {
    .title-wrap {
      background: url('../../../assets/statistic-dashboard/title1@2x.png') center no-repeat no-repeat;
      background-size: 98% 50%;
      background-position: bottom;
      margin: .5rem;
      font-size: .62rem;
      .title {
        padding: .38rem .38rem 0 .38rem;
        .icon {
          display: inline-block;
          background: url('../../../assets/statistic-dashboard/stock@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          width: 1.38rem;
          height: 1.54rem;
          vertical-align: middle;
        }
      }
    }
  }
    .item-warp2 {
    .title-wrap {
      background: url('../../../assets/statistic-dashboard/title-3@2x.png') center no-repeat no-repeat;
      background-size: 98% 50%;
      background-position: bottom;
      margin: .5rem;
      font-size: .62rem;
      .title {
        padding: .19rem .38rem 0 .38rem;
        .icon {
          display: inline-block;
          background: url('../../../assets/statistic-dashboard/stock@2x.png') center no-repeat no-repeat;
          background-size: 100% 100%;
          width: 1.38rem;
          height: 1.54rem;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
