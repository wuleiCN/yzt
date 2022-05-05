<template>
  <div id="panel" class="panel">
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
      index: ''
    }
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
  .panel {
    background: url('../../../assets/img-zhgd/panel.png') center no-repeat no-repeat;
    background-size: 100% 100%;
    position: absolute;
    width: 38.88rem;
    height: 21.75rem;
    left: 50%;
    top: 4.5rem;
    transform: translate(-50%);
    z-index: 1000;
    color: #00EAFF;
    .company-wrap {
      height: 21.75rem;
      overflow-y: auto;
      .company-item {
        cursor: pointer;
        margin: 1.35rem 0;
        font-size: 1.55rem;
      }
    }

    .two-panel {
      background: url('../../../assets/img-zhgd/panel-sub.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      position: absolute;
      width: 38.88rem;
      height: 21.75rem;
      overflow-y: auto;
      left: 80%;
      top: 20%;
      .project-item {
        cursor: pointer;
        margin: 1.35rem 0;
        font-size: 1.55rem;
      }
    }
  }
</style>
