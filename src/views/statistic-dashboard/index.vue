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
import MaterialIndex from './material/index.vue'
import WorkerIndex from './worker/index.vue'
import QualityIndex from './quality/index.vue'
import SafetyIndex from './safety/securityManage.vue'
import SafelityStars from './safety/safelityStars.vue'
import SmokeSensation from './safety/smokeSensation.vue'
import ScrewTightness from './safety/screwTightness'
import EnvIndex from './env/evn.vue'
import CruingRoom from './env/cruing-room.vue'
import ElevatorIndex from './mechanical/elevator.vue'
import CraneIndex from './mechanical/crane.vue'
import VehicleIndex from './mechanical/vehicle.vue'
import HighFormwork from './mechanical/highFormwork.vue'
import DeepExcavation from './mechanical/deepExcavation'
import MaterialTable from './mechanical/materialTable'
import HangingBasket from './mechanical/hangingBasket'
import BoxIndex from './mechanical/box.vue'
import videoIndex from './video/index.vue'
import videoAI from './video/AI.vue'
import FullScreen from './component/FullScreen.vue'
import SelectProject from './component/SelectPro.vue'
import common from './mixins/common'
export default {
  components: {
    ProjectIndex,
    EnergyIndex,
    MaterialIndex,
    WorkerIndex,
    QualityIndex,
    SafetyIndex,
    SafelityStars,
    SmokeSensation,
    ScrewTightness,
    EnvIndex,
    CruingRoom,
    ElevatorIndex,
    CraneIndex,
    VehicleIndex,
    HighFormwork,
    DeepExcavation,
    MaterialTable,
    HangingBasket,
    BoxIndex,
    videoIndex,
    videoAI,
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
        { content: MaterialIndex, path: '/statistic-dashboard/material/index', name: '生产管理' },
        { content: QualityIndex, path: '/statistic-dashboard/quality/index', name: '质量管理' },
        { content: SafetyIndex, path: '/statistic-dashboard/safety/securityManage', name: '安全管理' },
        { content: SafelityStars, path: '/statistic-dashboard/safety/safelityStars', name: '安全之星' },
        { content: SmokeSensation, path: '/statistic-dashboard/safety/smokeSensation', name: '烟感监测' },
        { content: ScrewTightness, path: '/statistic-dashboard/safety/screwTightness', name: '螺丝松紧' },
        { content: EnvIndex, path: '/statistic-dashboard/env/evn', name: 'AQI质量管理' },
        { content: CruingRoom, path: '/statistic-dashboard/env/cruing-room', name: '养护室管理' },
        { content: ElevatorIndex, path: '/statistic-dashboard/mechanical/elevator', name: '升降机管理' },
        { content: CraneIndex, path: '/statistic-dashboard/mechanical/crane', name: '塔吊机管理' },
        { content: VehicleIndex, path: '/statistic-dashboard/mechanical/vehicle', name: '车辆管理' },
        { content: BoxIndex, path: '/statistic-dashboard/mechanical/box', name: '电箱管理' },
        { content: HighFormwork, path: '/statistic-dashboard/mechanical/highFormwork', name: '高支模' },
        { content: DeepExcavation, path: '/statistic-dashboard/mechanical/deepExcavation', name: '深基坑监测' },
        { content: MaterialTable, path: '/statistic-dashboard/mechanical/materialTable', name: '料台监测' },
        { content: HangingBasket, path: '/statistic-dashboard/mechanical/hangingBasket', name: '吊篮监测' },
        { content: EnergyIndex, path: '/statistic-dashboard/energy/index', name: '能耗管理' },
        { content: videoIndex, path: '/statistic-dashboard/video/index', name: '视频监控管理' },
        { content: videoAI, path: '/statistic-dashboard/video/AI', name: 'AI视频监控' }
      ]
    }
  },
  methods: {
    newsReload(projectId, item) {
      this.projectId = projectId
      this.$nextTick(() => {
        this.$refs[this.current.name].newsReload(projectId, item || {})
        // this.$refs.FullScreen && this.$refs.FullScreen.full.isElementFullScreen() ? this.setRem(26) : this.setRem(23)
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
