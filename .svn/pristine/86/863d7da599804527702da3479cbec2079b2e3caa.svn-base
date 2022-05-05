<template>
  <div class="device">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="projectName">
        <el-input v-model="dataForm.projectName" clearable placeholder="所属项目名称" @clear="handleClear" />
      </el-form-item>
      <el-form-item prop="deviceName">
        <el-input v-model="dataForm.deviceName" clearable placeholder="设备名称" @clear="handleClear" />
      </el-form-item>
      <el-form-item prop="deviceNo">
        <el-input v-model="dataForm.deviceNo" clearable placeholder="设备编号" @clear="handleClear" />
      </el-form-item>
      <el-form-item prop="deviceFactory">
        <el-select v-model.trim="dataForm.deviceFactory" clearable placeholder="请选择设备厂家" @change="(e) => searchHandle()">
          <!-- <el-option label="YZTHQ" value="hq"> YZTHQ </el-option>
          <el-option label="YZTYF" value="yf"> YZTYF </el-option>
          <el-option label="YZTHW" value="hw"> YZTHW </el-option>
          <el-option label="YZTAHYT" value="ahyt"> YZTAHYT </el-option>
          <el-option label="YZTSYD" value="syd"> YZTSYD </el-option>
          <el-option label="YZTXYD" value="xyd"> YZTXYD </el-option>
          <el-option label=" YZTQY" value="qy">  YZTQY </el-option> -->
          <el-option v-for="(item, index) in factoryList" :key="index" :label="item.title" :value="item.tag"> {{ item.title }} </el-option>
          <!-- <el-option label="RLSBADX" value="hs"> RLSBADX </el-option>
          <el-option label="RLSBHK" value="ys"> RLSBHK </el-option>
          <el-option label="RLSBYS" value="yushi"> RLSBYS </el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item prop="direction">
        <el-select v-model.trim="dataForm.direction" clearable placeholder="进出标识" @change="(e) => searchHandle()">
          <el-option label="进" value="in"> 进 </el-option>
          <el-option label="出" value="out"> 出 </el-option>
          <el-option label="不分进出" value="none"> 不分进出 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'project_device_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
        <el-button v-permit="'project_device_btn_carried'" type="primary" @click="detailHandle()">设备执行明细</el-button>
        <el-button v-permit="'project_device_btn_setsystime'" type="primary" :disabled="dataListSelections.length <= 0" @click="setsystimeHandle()">设置系统时间</el-button>
        <el-button v-permit="'project_device_btn_open'" type="primary" :disabled="dataListSelections.length <= 0" @click="openHandle()">远程开门</el-button>
        <!-- <el-button v-permit="'project_device_btn_subscribe'" type="primary" :disabled="dataListSelections.length <= 0" @click="subscribeModal()">接入服务</el-button> -->
        <el-button v-permit="'project_device_btn_upgrade'" type="primary" :disabled="dataListSelections.length <= 0" @click="upgradeModal()">设备升级</el-button>
        <el-button v-permit="'project_device_btn_gjt'" type="primary" :disabled="dataListSelections.length <= 0" @click="gjtModal()">桂建通</el-button>
        <el-button v-permit="'project_device_btn_restart'" type="primary" :disabled="dataListSelections.length <= 0" @click="restartHandle()">设备重启</el-button>
        <!-- <el-button v-permit="'project_device_btn_hkinit'" type="primary" size="small" @click="initHandle()">初始化海康设备</el-button> -->
        <el-button v-permit="'project_device_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
      </div>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
      highlight-current-row
      style="width: 100%;"
      tooltip-effect="light"
      @selection-change="selectionChangeHandle"
      @row-dblclick="rowDblclick"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        width="300"
        :show-overflow-tooltip="true"
        label="所属项目"
      />
      <el-table-column
        prop="deviceNo"
        header-align="center"
        align="center"
        label="设备编号"
      />
      <el-table-column
        prop="deviceName"
        header-align="center"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
        label="设备名称"
      />
      <el-table-column
        prop="deviceFactory"
        header-align="center"
        align="center"
        label="设备厂家"
      />
      <el-table-column
        prop="direction"
        header-align="center"
        align="center"
        label="进出标识"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.direction === 'in'">{{ '进' }}</div>
          <div v-if="scope.row.direction === 'out'">{{ '出' }}</div>
          <div v-if="scope.row.direction === 'none'">{{ '不分进出' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="statusName"
        header-align="center"
        align="center"
        label="状态"
      />
      <el-table-column
        prop="deviceIp"
        header-align="center"
        align="center"
        width="130"
        label="设备IP"
      />
      <el-table-column
        prop="connectDate"
        header-align="center"
        align="center"
        width="160"
        label="最近连接时间"
      >
        <template slot-scope="scope">
          <span :style="{'color': scope.row.connectTimeStyle ? 'red' : '#67C23A'}">{{ scope.row.connectDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="basePermit('project_device_btn_update') || basePermit('project_device_btn_delete') || basePermit('project_device_btn_sync') || basePermit('project_device_btn_issued')"
        fixed="right"
        header-align="center"
        align="center"
        width="220"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'project_device_btn_sync'" type="text" size="small" @click="syncWorkerHandle(scope.row)">同步人员</el-button>
          <el-button v-permit="'project_device_btn_issued'" :disabled="scope.row.deviceFactory !== 'hq'" type="text" size="small" @click="issuedHandle(scope.row)">图片下发</el-button>
          <el-button v-permit="'project_device_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'project_device_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :factory-list="factoryList" @refreshDataList="getDataList" />
    <!-- 图片下发 -->
    <device-issued v-if="issuedVisible" ref="issued" @refreshDataList="getDataList" />
    <!-- 设备执行明细 -->
    <device-detail v-if="detailDeviceVisible" ref="detailDevice" @refreshDataList="getDataList" />
    <!-- 订阅认证 -->
    <device-subscribe v-if="subscribeDeviceVisible" ref="subscribeDevice" @refreshDataList="getDataList" />
    <!-- 设备升级 -->
    <device-upgrade v-if="upgradeDeviceVisible" ref="upgradeDevice" @refreshDataList="getDataList" />
    <!-- 设备升级 -->
    <device-gjt v-if="gjtDeviceVisible" ref="gjtDevice" />
    <!-- 同步人员 -->
    <sync-worker v-if="syncWorkerVisible" ref="syncWorker" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './device-add-or-update'
import DeviceIssued from './device-issued'
import DeviceDetail from './device-detail'
import DeviceSubscribe from './device-subscribe'
import DeviceUpgrade from './device-upgrade'
import DeviceGjt from './device-gjt'
import SyncWorker from './device-sync-worker'
import { parseTime } from '@/utils/index'
import { setList } from '@/api/project/project'
import { getList, del, setsystime, openDoor, subscribe, upgrade, rebootdevice, hkSetFree } from '@/api/project/device'
export default {
  components: {
    AddOrUpdate,
    DeviceIssued,
    DeviceSubscribe,
    DeviceUpgrade,
    DeviceGjt,
    SyncWorker,
    DeviceDetail
  },
  data() {
    return {
      dataForm: {
        direction: '',
        deviceFactory: '',
        deviceName: '',
        deviceNo: '',
        projectName: ''
      },
      timer: null,
      dataList: [],
      factoryList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      syncWorkerVisible: false,
      detailDeviceVisible: false,
      subscribeDeviceVisible: false,
      upgradeDeviceVisible: false,
      gjtDeviceVisible: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      issuedVisible: false
    }
  },
  created() {
    this.getDataList()
    this.settingHandle()
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getDataList()
    }, 300000)
  },
  beforeDestroy() {
    window.clearTimeout(this.timer)
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        'userId': JSON.parse(sessionStorage.getItem('result')).id,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.connectDate = item.connectTime ? parseTime(item.connectTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            if (new Date() - item.connectTime >= 600000) {
              item.connectTimeStyle = true
            } else {
              item.connectTimeStyle = false
            }
            item.statusName = item.status === 1 ? '上传' : '不上传'
            return item
          })
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 对接设置
    settingHandle() {
      setList({ category: 'DEVICE_FACTORY' }).then(data => {
        this.factoryList = data.result
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    // 图片下发
    issuedHandle(row) {
      this.issuedVisible = true
      this.$nextTick(() => {
        this.$refs.issued.init({ ...row })
      })
    },
    // 设备执行明细
    detailHandle(row) {
      this.detailDeviceVisible = true
      this.$nextTick(() => {
        this.$refs.detailDevice.init({ ...row })
      })
    },
    // 接入服务弹窗
    subscribeModal() {
      var ids = this.dataListSelections.map(item => {
        return item.id
      })
      if (ids.length > 1) return this.$message.error('接入服务只能单选')
      this.subscribeDeviceVisible = true
      this.$nextTick(() => {
        this.$refs.subscribeDevice.init(ids[0])
      })
    },
    // 设备升级弹窗
    upgradeModal() {
      var ids = this.dataListSelections.map(item => {
        return item.id
      })
      if (ids.length > 1) return this.$message.error('设备升级只能单选')
      if (this.dataListSelections.length === 1 && this.dataListSelections[0].deviceFactory === 'hw') {
        return this.$message.error('汉王设备不能设备升级')
      }
      if (this.dataListSelections.length === 1 && this.dataListSelections[0].deviceFactory === 'AHYT') {
        return this.$message.error('爱华盈通设备不能设备升级')
      }
      this.upgradeDeviceVisible = true
      this.$nextTick(() => {
        this.$refs.upgradeDevice.init(ids[0])
      })
    },
    // 桂建通弹窗
    gjtModal() {
      var ids = this.dataListSelections.map(item => {
        return item.id
      })
      if (ids.length > 1) return this.$message.error('桂建通只能单选')
      if (this.dataListSelections.length === 1 && this.dataListSelections[0].deviceFactory === 'hw') {
        return this.$message.error('汉王设备没有桂建通功能')
      }
      this.gjtDeviceVisible = true
      this.$nextTick(() => {
        this.$refs.gjtDevice.init(this.dataListSelections.length && this.dataListSelections[0])
      })
    },
    // 同步人员
    syncWorkerHandle(row) {
      this.syncWorkerVisible = true
      this.$nextTick(() => {
        this.$refs.syncWorker.init(row)
      })
    },
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('project_device_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    handleClear() {
      this.dataForm.suid = null
      this.dataForm.companyName = null
    },
    // 设置系统时间
    setsystimeHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`您确定进行设置系统时间操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setsystime(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 设置远程开门
    openHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`您确定进行远程开门操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        openDoor(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 订阅认证
    subscribeHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.deviceNo
      })
      this.$confirm(`您确定进行订阅认证操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        subscribe({ deviceNoS: ids.length ? ids.toString() : '' }).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 设备升级
    upgradeHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.deviceNo
      })
      this.$confirm(`您确定进行设备升级操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        upgrade({ deviceNoS: ids.length ? ids.toString() : '' }).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 设备重启
    restartHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      if (ids.length > 1) return this.$message.error('设备重启只能单选')
      this.$confirm(`您确定进行设备重启操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rebootdevice({ id: ids.length ? ids[0] : '' }).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 初始化海康设备
    initHandle() {
      this.$confirm(`您确定初始化海康设备的操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hkSetFree().then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`设备会重新入库，是否确认操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
  // .device {}
</style>
