<template>
  <div class="navbar">
    <el-menu :default-active="fullPath" :router="true" class="header-el-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item class="logo-style"><logo :collapse="false" style="width: 210px" /></el-menu-item>
      <el-menu-item v-for="route in menu" :key="route.path" :class="isRight && route.path === '/statistic-dashboard' ? 'zhgd' : ''" :index="route.path">
        <svg-icon :icon-class="route.meta.icon" />
        <span slot="title">{{ route.meta.title }}</span>
      </el-menu-item>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <el-avatar icon="el-icon-user-solid" :size="40" :src="loginInfo.ico" />
            <span class="user-name">{{ loginInfo.loginName }}<i class="el-icon-caret-bottom" /></span>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item divided @click.native="updatePsw">
              <span style="display:block;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退 出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <update-password v-if="visible" ref="UpdatePassword" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Sidebar/Logo'
import UpdatePassword from '@/views/login/update-password'

export default {
  components: {
    Logo,
    UpdatePassword
  },
  data() {
    return {
      isRight: true,
      visible: false,
      flag: sessionStorage.getItem('flag'),
      childrenRoutes: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'loginInfo',
      'avatar'
    ]),
    menu: {
      get() {
        return this.$store.state.user.menu.filter(item => {
          return (item.children.length <= 1) && item.isTop || item.path === '/statistic-dashboard'
        })
      }
    },
    fullPath() {
      const fullPath = '/' + this.$route.fullPath.split('/')[1]
      return fullPath
    }
  },
  watch: {
    $route() {
      this.handleSelect(this.fullPath, this.flag)
    }
  },
  created() {
    this.handleSelect(this.fullPath, this.flag)
  },
  methods: {
    // changeMenu() {
    //   sessionStorage.setItem('flag', '1')
    //   this.flag = sessionStorage.getItem('flag')
    //   this.flterRoutes(this.flag)
    // },
    // goNewSystem() {
    //   sessionStorage.removeItem('flag')
    //   this.flag = sessionStorage.getItem('flag')
    //   this.flterRoutes(this.flag)
    //   this.isRight = true
    //   this.$store.dispatch('app/toggleSideBar', true)
    //   this.$router.push('/dashboard')
    // },
    // async flterRoutes(flag) {
    //   // 智慧工地 1， 劳务平台 0
    //   sessionStorage.setItem('flag', flag)
    //   // 智慧工地按钮样式
    //   const routes = this.$router.getmenuList().filter(item => {
    //     return !item.hidden && item.sysType === flag
    //   })
    //   await this.$store.dispatch('user/setMenu', routes || [])
    // },
    async handleSelect(path, flag) {
      // 点击左上角logo切回劳务平台
      // if (path === null) {
      //   this.isRight = true
      //   this.$router.push('/dashboard')
      //   this.flterRoutes(0)
      // }
      // // 点击智慧工地逻辑
      // if (path === '/zhgd-dashboard') {
      //   this.isRight = false
      //   this.$store.dispatch('app/toggleSideBar', true)
      //   this.flterRoutes(1)
      // }
      // 点击看板逻辑
      if (path === '/statistic-dashboard') {
        this.$store.dispatch('app/toggleSideBar', false)
      } else {
        this.$store.dispatch('app/toggleSideBar', true)
      }
      // 展示二级菜单
      const currentPath = this.$router.getmenuList().filter(item => {
        return item.path === path
      })
      this.childrenRoutes = currentPath && currentPath.length ? currentPath[0].children : []
      // if (this.childrenRoutes && this.childrenRoutes.length) {
      //   this.childrenRoutes.shift()
      // }
      await this.$store.dispatch('permission/setchildrenRoutes', this.childrenRoutes || [])
    },
    updatePsw() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.UpdatePassword.init()
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')

      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name {
          cursor: pointer;
          margin-left: 10px;
          vertical-align: top;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
  .header-el-menu {
    height: 50px;
    li {
      height: 50px !important;
      line-height: 50px !important;
    }
    .zhgd:nth-last-child(2) {
      color: #DA0051 !important;
      position: absolute;
      font-weight: 700;
      right: 210px;
    }
  }
  .logo-style {
    padding: 0px !important;
    margin-right: 20px !important;
  }
  .sidebar-logo-container {
    border-bottom: 2px solid #2f6aba;
  }
</style>
