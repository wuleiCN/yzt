<template>
  <div class="realtime-data">
    <div class="currentPane">
      <div>
        <span>基坑名称:</span>
        <span>-</span>
      </div>
      <div>
        <span>基坑深度:</span>
        <span>-</span>
      </div>
      <div>
        <span>基坑周长:</span>
        <span>-</span>
      </div>
      <div>
        <span>支护形式:</span>
        <span>-</span>
      </div>
      <div>
        <span>安全等级:</span>
        <span>-</span>
      </div>
      <div>
        <span>监测负责人:</span>
        <span>-</span>
      </div>
      <div>
        <span>施工时间:</span>
        <span>-</span>
      </div>
      <div>
        <span>监测人员:</span>
        <span>-</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // TypeMonitor,
    // HistoricalData
  },
  // mixins: [common],
  data() {
    return {

    }
  },
  async mounted() {},
  methods: {
    handleClick(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.realtime-data {
  width: 100%;

  .currentPane {
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    color: #959595;

    div {
      width: 33.3%;
      height: 53px;
      text-align: center;
      line-height: 53px;
      display: flex;

      // padding: 16px 24px;
      span {
        display: inline-block;
        font-weight: 400;
        font-size: 18px;

        &:nth-child(1) {
          width: 210px;
          border-right: 1px solid #e6ebf5;
          border-left: 1px solid #e6ebf5;
          background: #fafafa;
        }

        &:nth-child(2) {
          padding-left: 20px;
          width: 100%;
          text-align: start;
        }
      }

      &:nth-child(n-2) {
        border-bottom: 1px solid #e6ebf5;
      }
    }
  }
}
</style>
