<template>
  <div class="zhgd-vehicle-device">
    <el-form :inline="true" :model="dataForm">
      <el-form-item label="项目名称">
        <el-select
          v-if="userType === 1 || userType === 0"
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
        <span v-else class="title">{{ proName }}</span>
      </el-form-item>
      <el-divider direction="vertical" />
      <el-form-item prop="deviceName">
        <el-input v-model="dataForm.deviceName" placeholder="设备名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button type="primary" @click="viewAsyncLog()">对接日志</el-button>
        <el-button type="primary" @click="addOrUpdateHandle({})">新增</el-button>
      </div>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
      tooltip-effect="light"
      highlight-current-row
      style="width: 100%;"
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
        label="项目名称"
      />
      <el-table-column
        prop="deviceName"
        header-align="center"
        align="center"
        label="设备名称"
      />
      <el-table-column
        prop="supAbbreviation"
        header-align="center"
        align="center"
        label="供应商名称"
      />
      <el-table-column
        prop="deviceId"
        header-align="center"
        align="center"
        width="300"
        label="设备ID"
      />
      <!-- <el-table-column
        prop="inOut"
        header-align="center"
        align="center"
        label="进出方向"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.inOut === 1">进</span>
          <span v-if="scope.row.inOut === 2">出</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="devType"
        header-align="center"
        align="center"
        label="摄像头类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.devType === 1">地面库</span>
          <span v-if="scope.row.devType === 2">地库</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="installAddress"
        header-align="center"
        align="center"
        label="安装位置"
      />
      <el-table-column
        prop="installDate"
        header-align="center"
        align="center"
        width="100"
        label="安装时间"
      />
      <el-table-column
        header-align="center"
        align="center"
        width="160"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button slot="reference" style="margin-right:5px" type="text" @click="settingGruop(scope.row)">对接设置</el-button>
          <el-button type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <!-- 对接设置弹窗 -->
    <asyncLog v-if="asyncLogVisible" ref="asyncLog" />
    <!-- 对接设置弹窗 -->
    <synDetial v-if="synDetialVisible" ref="synDetial" @refreshDataList="getDataList" />
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import synDetial from './list-synSet'
import asyncLog from './list-async-log'
import AddOrUpdate from './device-add-or-update'
import { getList, del } from '@/api-zhgd/vehicle-device'
import { vehicleProList } from '@/api-zhgd/vehicle-monitor'
import { parseTime } from '@/utils'
export default {
  components: {
    synDetial,
    asyncLog,
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        deviceName: '',
        projectId: this.$store.state.user.loginInfo.projectId,
        isDel: 0
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      proName: '',
      proList: [],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      asyncLogVisible: false,
      synDetialVisible: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  async created() {
    this.proList = await this.vehicleProListHandle()
    if (this.proList.length) {
      this.proName = this.proList[0].projectName
    }
    this.getDataList()
  },
  methods: {
    // 获取项目列表
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
    // 对接弹窗
    viewAsyncLog(row) {
      this.asyncLogVisible = true
      this.$nextTick(() => {
        this.$refs.asyncLog.init({ ...row })
      })
    },
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.installDate = item.installDate ? parseTime(item.installDate, '{y}-{m}-{d}') : ''
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
    // 对接弹窗
    settingGruop(row) {
      this.synDetialVisible = true
      this.$nextTick(() => {
        this.$refs.synDetial.init(row.id)
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
    rowDblclick(row) {
      if (this.basePermit('sys_dict_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id }).then((data) => {
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
.zhgd-vehicle-device {
  .el-divider {
    width: .13rem;
    height: 2rem;
  }
}
</style>
