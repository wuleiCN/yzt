<template>
  <div class="main-page dashboard-full-screen">
    <div class="main-page-header">
      <FullScreen ref="FullScreen" />
      <SelectProject @newsReload="newsReload" />
    </div>
    <Nav @navClick="navClick" />
    <!-- <ProjectIndex ref="ProjectIndex" /> -->
    <!-- :ref="item.name" -->
    <component :is="current.content" :ref="current.name" />
  </div>
</template>
<script>
import Nav from './component/Nav.vue'
import ProjectIndex from './project/index.vue'
import EnergyIndex from './energy/index.vue'
import WorkerIndex from './worker/index.vue'
import QualityIndex from './quality/index.vue'
import SafetyIndex from './safety/index.vue'
import EnvIndex from './env/index.vue'
import ElevatorIndex from './mechanical/elevator.vue'
import CraneIndex from './mechanical/crane.vue'
import VehicleIndex from './mechanical/vehicle.vue'
import BoxIndex from './mechanical/box.vue'
import videoIndex from './video/index.vue'
import FullScreen from './component/FullScreen.vue'
import SelectProject from './component/SelectPro.vue'
import common from './mixins/common'
export default {
  components: {
    ProjectIndex,
    EnergyIndex,
    WorkerIndex,
    QualityIndex,
    SafetyIndex,
    EnvIndex,
    ElevatorIndex,
    CraneIndex,
    VehicleIndex,
    BoxIndex,
    videoIndex,
    Nav,
    SelectProject,
    FullScreen
  },
  mixins: [common],
  data() {
    return {
      current: { content: ProjectIndex, path: '/statistic-dashboard', name: '工程信息管理' },
      paths: [
        { content: ProjectIndex, path: '/statistic-dashboard/project/index', name: '工程信息管理' },
        { content: WorkerIndex, path: '/statistic-dashboard/worker/index', name: '人员管理' },
        { content: QualityIndex, path: '/statistic-dashboard/quality/index', name: '质量管理' },
        { content: SafetyIndex, path: '/statistic-dashboard/safety/index', name: '安全管理' },
        { content: EnvIndex, path: '/statistic-dashboard/env/index', name: '绿色施工管理' },
        { content: ElevatorIndex, path: '/statistic-dashboard/mechanical/elevator', name: '升降机管理' },
        { content: CraneIndex, path: '/statistic-dashboard/mechanical/crane', name: '塔吊机管理' },
        { content: VehicleIndex, path: '/statistic-dashboard/mechanical/vehicle', name: '车辆管理' },
        { content: BoxIndex, path: '/statistic-dashboard/mechanical/box', name: '电箱管理' },
        { content: EnergyIndex, path: '/statistic-dashboard/energy/index', name: '能耗管理' },
        { content: videoIndex, path: '/statistic-dashboard/video/index', name: '视频监控管理' }
      ]
    }
  },
  methods: {
    newsReload(projectId, item) {
      this.projectId = projectId
      this.$nextTick(() => {
        this.$refs[this.current.name].newsReload(projectId, item || {})
        this.$refs.FullScreen && this.$refs.FullScreen.full.isElementFullScreen() ? this.setRem(26) : this.setRem(23)
      })
    },
    navClick(path) {
      this.current = this.paths.find(item => item.path === path)
      this.newsReload(this.projectId)
    }
  }
}
</script>
<style lang="scss">
// 计算方式 26px -> 1rem
.main-page {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url('../../assets/statistic-dashboard/dashboard-bg.png') center no-repeat no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 41.54rem;
  color: #fff;
  font-size: .77rem;
  .main-page-header {
    position: relative;
    height: 3.85rem;
    background: url('../../assets/statistic-dashboard/top-header.png') center no-repeat no-repeat;
    background-size: 100% 100%;
  }
}
</style>
