<template>
  <div class="select-project">
    <Panel v-if="firstPanelVisible" ref="first-panel" :pro-list="proList" @closePanel="closePanel" />
    <div class="project-name">
      <marquee v-if="projectName && projectName.length > 19" class="marquee">
        <div @mouseover="showPanel(true)">{{ projectName }}</div>
      </marquee>
      <div v-else class="marquee">
        <span @mouseover="showPanel(true)">{{ projectName }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Panel from './panel'
import { pList } from '@/api-zhgd/zhgd-dashboard'
export default {
  components: { Panel },
  data() {
    return {
      projectName: '',
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectId: this.$store.state.user.loginInfo.projectId,
      firstPanelVisible: false
    }
  },
  async mounted() {
    const pro0 = await this.getPList()
    this.init(pro0.id, pro0)
    document.addEventListener('click', (e) => {
      e.stopPropagation()
      if (e.target.className === 'company-wrap' || e.target.className === 'company-item') {
        this.firstPanelVisible = true
      } else {
        this.firstPanelVisible = false
      }
    })
  },
  methods: {
    init(projectId, item) {
      this.$emit('newsReload', projectId, item)
    },
    getPList() {
      return pList().then((data) => {
        if (data && data.code === 1000) {
          this.proList = data.result
          this.projectName = this.proList[0].projectList[0].projectName
          return this.proList[0].projectList[0]
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    showPanel(status) {
      // 是集团或者公司才能选择项目
      if (this.userType === 1 || this.userType === 0) {
        this.firstPanelVisible = status
      }
    },
    closePanel(item) {
      this.projectId = item.id
      this.projectName = item.projectName
      this.$emit('newsReload', this.projectId, item)
      this.firstPanelVisible = false
    }
  }
}
</script>
<style lang='scss'>
.select-project {
  .project-name {
    color: #0686D8;
    font-size: 1.15rem;
    font-weight: 600;
    width: 20rem;
    .marquee {
      height: 2.15rem;
      text-align: center;
      width: 20rem;
      cursor: pointer;
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -30%);
    }
  }
}
</style>
