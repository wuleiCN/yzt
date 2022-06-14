<template>
  <div class="statistic-dashboard-nav">
    <div v-for="(item, index) in paths" :key="index" :class="activeIndex === index ? 'active-class' : ''" class="nav-item" @click="navClick(item.path, index)">
      <div v-if="item.children">
        <el-select v-model="value" :popper-append-to-body="false" class="select-class" @change="navClick">
          <el-option
            v-for="(ele,idx) in item.children"
            :key="idx"
            :label="ele.name1"
            :value="ele.path"
          />
        </el-select>
      </div>
      <div v-if="!item.children">{{ item.name1 }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      activeIndex: 0,
      value: '机械设备管理'
      // paths: [
      //   { path: '/statistic-dashboard', name: '工程信息管理' },
      //   { path: '/statistic-dashboard/worker/index', name: '人员管理' },
      //   { path: '/statistic-dashboard/quality/index', name: '质量管理' },
      //   { path: '/statistic-dashboard/safety/index', name: '安全管理' },
      //   { path: '/statistic-dashboard/env/index', name: '绿色施工管理' },
      //   {
      //     type: 'select',
      //     options: [
      //       { path: '', name: '机械设备管理' },
      //       { path: '/statistic-dashboard/mechanical/elevator', name: '升降机管理' },
      //       { path: '/statistic-dashboard/mechanical/crane', name: '塔吊机管理' },
      //       { path: '/statistic-dashboard/mechanical/vehicle', name: '车辆管理' },
      //       { path: '/statistic-dashboard/mechanical/box', name: '电箱管理' }
      //     ]
      //   }
      //   // { path: '/statistic-dashboard/video/index', name: '视频监控管理' },

      // ]
    }
  },
  computed: {
    paths: {
      get() {
        var arr = this.$store.state.user.menu.find(item => item.path === '/statistic-dashboard')
        var path = []
        if (arr) {
          path = arr.children[0].children.filter(item => item.name)
        }
        return path// 过滤智慧看板路由
      }
    }
  },
  mounted() {
    console.log(this.$store.state.user.menu)
  },
  methods: {
    navClick(path, index) {
      this.value = '机械设备管理'
      this.activeIndex = index
      if (path) {
        this.$emit('navClick', path)
      }
    }
  }
}
</script>
<style lang='scss'>
  .statistic-dashboard-nav {
    display: flex;
    height: 2rem;
    margin: 0 .54rem .5rem;
    .nav-item {
      color: #2AAEF2;
      background: url('../../../assets/statistic-dashboard/nav-bro-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
      width: 8.23rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      margin-right: .9rem;
      cursor: pointer;
    }
    .active-class {
      background: url('../../../assets/statistic-dashboard/nav-bro-sel-bg.png') center no-repeat no-repeat;
      background-size: 100% 100%;
    }
    .select-class {
      .el-input__inner {
        color: #2AAEF2;
        font-size: .7rem;
        text-align: center;
        border: none;
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
        top: -0.12rem;
        color: #2AAEF2;
      }
    }
  }
</style>
