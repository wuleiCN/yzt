<template>
  <div class="zhgd-curing-room">
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
      <el-form-item prop="deviceNumber">
        <el-input v-model="dataForm.deviceNumber" placeholder="设备名编号" clearable />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="dataForm.groupId"
          clearable
          filterable
          placeholder="请选择分组名称"
          @change="e => searchHandle()"
        >
          <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="item.groupName"
            :value="item.id"
          >
            <span style="float: left">{{ item.groupName }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model.trim="dataForm.type" clearable style="width:100%" placeholder="在线状态" @change="searchHandle">
          <el-option label="在线" :value="0"> 在线 </el-option>
          <el-option label="离线" :value="8"> 离线 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
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
        prop="deviceName"
        header-align="center"
        align="center"
        label="所属分组"
      />
      <el-table-column
        prop="supAbbreviation"
        header-align="center"
        align="center"
        label="设备编号"
      />
      <el-table-column
        prop="devType"
        header-align="center"
        align="center"
        label="在线状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.devType === 1">地面库</span>
          <span v-if="scope.row.devType === 2">地库</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="installDate"
        header-align="center"
        align="center"
        label="最后上报时间"
      />
      <el-table-column
        prop="deviceName"
        header-align="center"
        align="center"
        label="温度"
      />
      <el-table-column
        prop="deviceName"
        header-align="center"
        align="center"
        label="湿度"
      />
      <el-table-column
        prop="installDate"
        header-align="center"
        align="center"
        label="登记时间"
      />
      <el-table-column
        header-align="center"
        align="center"
        width="160"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './device-add-or-update'
import { getList, del } from '@/api-zhgd/vehicle-device'
import { vehicleProList } from '@/api-zhgd/vehicle-monitor'
// import { parseTime } from '@/utils'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        deviceName: '',
        projectId: this.$store.state.user.loginInfo.projectId,
        isDel: 0
      },
      groupList: [],
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
.zhgd-curing-room {
  .el-divider {
    width: .13rem;
    height: 2rem;
  }
}
</style>
