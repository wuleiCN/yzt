<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="实时数据" name="monitor">
        <type-monitor />
      </el-tab-pane>
      <el-tab-pane label="历史数据" name="second">
        <historical-data />
      </el-tab-pane>
    </el-tabs>
    <el-form :inline="true" :model="dataForm">
      <el-form-item label="项目名称">
        <el-select
          v-model="dataForm.projectId"
          clearable
          filterable
          placeholder="请选择项目名称"
          @change="e => searchHandle()"
        >
          <el-option
            v-for="item in proList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          >
            <span style="float: left">{{ item.projectName }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="dataForm.projectId"
          clearable
          filterable
          placeholder="请选择设备名称"
          @change="e => searchHandle()"
        >
          <el-option
            v-for="item in devList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          >
            <span style="float: left">{{ item.projectName }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { vehicleProList } from '@/api-zhgd/vehicle-monitor'
import TypeMonitor from './formwork.vue'
import HistoricalData from './historical-data.vue'
export default {
  components: {
    TypeMonitor,
    HistoricalData
  },
  // mixins: [common],
  data() {
    return {
      dataForm: {
        deviceName: '',
        projectId: this.$store.state.user.loginInfo.projectId
      },
      activeName: 'monitor',
      proList: [],
      devList: []
    }
  },
  async mounted() {
    this.proList = await this.vehicleProListHandle()
    if (this.proList.length) {
      this.proName = this.proList[0].projectName
    }
  },
  methods: {
    vehicleProListHandle() {
      return new Promise(resolve => {
        vehicleProList().then(data => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          }
        })
      })
    },
    handleClick(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs {
  position: relative;
}
.el-form {
  position: absolute;
  top: 20px;
  left: 30%;
}
</style>
