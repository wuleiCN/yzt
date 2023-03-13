<template>
  <div id="panel" class="gyc-panel">
    <div class="company-wrap">
      <div v-for="(item, idx) in proList" :key="idx" class="company-item" :style="{'color': index === idx ? '#00FF84' : '#0686D8'}" @click="selectCompany(idx)">{{ item.companyName }}</div>
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
  .gyc-panel {
    background: url('../../assets/img-zhgd/panel.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    position: absolute;
    width: 20rem;
    height: 10rem;
    left: 50%;
    top: 2.8rem;
    transform: translate(-50%);
    z-index: 1000;
    color: #0686D8;
    .company-wrap {
      height: 10rem;
      overflow-y: auto;
      .company-item {
        cursor: pointer;
        margin: 1.35rem 2rem;
        font-size: 1rem;
      }
    }

    .two-panel {
      background: url('../../assets/img-zhgd/panel-sub.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      position: absolute;
      width: 20rem;
      height: 10.75rem;
      overflow-y: auto;
      left: 90%;
      top: 50%;
      .project-item {
        cursor: pointer;
        margin: 1.35rem 2rem;
        font-size: 1rem;
      }
    }
  }
</style>
