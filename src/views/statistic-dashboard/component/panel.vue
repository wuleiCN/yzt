<template>
  <div id="panel" class="statistic-dashboard-panel">
    <div class="company-wrap">
      <div v-for="(item, idx) in proList" :key="idx" class="company-item" :style="{'color': index === idx ? '#00FF84' : '#00EAFF'}" @click="selectCompany(idx)">{{ item.companyName }}</div>
    </div>
    <div v-if="isShow" class="two-panel">
      <div v-for="(item, idx) in proList[index].projectList" :key="idx" class="project-item" @click="selectProject(item)">{{ item.projectName }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    proList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isShow: false,
      index: '',
      loginId: JSON.parse(sessionStorage.getItem('result')).id
    }
  },
  created() {
    if (this.loginId === '339693a0e31f84d1f10a037b45dac458') this.proList[0].companyName = '智慧工地'
  },
  methods: {
    selectCompany(index) {
      this.index = index
      this.isShow = true
    },
    selectProject(item) {
      this.$emit('closePanel', item)
    }
  }
}
</script>
<style lang="scss">
  .statistic-dashboard-panel {
    background: url('../../../assets/333.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    position: absolute;
    width: 20.88rem;
    height: 13.75rem;
    left: 50%;
    top: 3rem;
    transform: translate(-50%);
    z-index: 1000;
    color: #00EAFF;
    .company-wrap {
      height: 13.75rem;
      overflow-y: auto;
      margin-left: 2rem;
      .company-item {
        cursor: pointer;
        margin: .8rem 0;
        font-size: .8rem;
      }
    }
    .two-panel {
      background: url('../../../assets/333.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      position: absolute;
      width: 20.88rem;
      height: 13.75rem;
      overflow-y: auto;
      left: 100%;
      top: 0%;
      .project-item {
        cursor: pointer;
        margin: .8rem 0;
        font-size: .8rem;
      }
    }
  }
</style>
