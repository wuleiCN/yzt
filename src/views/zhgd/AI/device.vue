<template>
  <div class="zhgd-ai-device">
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
      <el-form-item prop="videoName">
        <el-input v-model="dataForm.videoName" placeholder="设备名称" clearable />
      </el-form-item>
      <el-form-item prop="isControl">
        <el-select v-model.trim="dataForm.isControl" clearable style="width:100%" placeholder="平台类型" @change="searchHandle">
          <el-option label="硬盘录像机" :value="2"> 硬盘录像机 </el-option>
          <el-option label="萤石云" :value="1"> 萤石云 </el-option>
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
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="devName"
        header-align="center"
        align="center"
        label="AI盒子名称"
      />
      <el-table-column
        prop="devId"
        header-align="center"
        align="center"
        label="AI盒子序列号"
      />
      <el-table-column
        prop="videoName"
        header-align="center"
        align="center"
        label="设备名称"
      />
      <el-table-column
        prop="isControl"
        header-align="center"
        align="center"
        label="平台类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.isControl === 2" type="danger">硬盘录像机</span>
          <span v-if="scope.row.isControl === 1" type="success">萤石云</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="videoSn"
        header-align="center"
        align="center"
        label="设备编号"
      />
      <el-table-column
        prop="area"
        header-align="center"
        align="center"
        label="区域位置"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
      />
      <!-- <el-table-column
        prop="isControl"
        header-align="center"
        align="center"
        label="是否支持云端控制"
      /> -->
      <!-- <el-table-column
        prop="videoWay"
        header-align="center"
        align="center"
        label="工地监控"
      /> -->
      <el-table-column
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button> -->
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
import { getList, delVideo, videoProList } from '@/api-zhgd/video-AI'
import { parseTime, deepClone } from '@/utils'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        videoName: '',
        isControl: '',
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
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  async created() {
    this.proList = await this.videoProListHandle()
    if (this.proList.length) {
      this.proName = this.proList[0].projectName
      // this.dataForm.projectId = this.proList[0].id
    }
    this.getDataList()
  },
  methods: {
    // 获取项目列表
    videoProListHandle() {
      return new Promise(resolve => {
        videoProList().then(data => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          }
        })
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
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
        this.$refs.addOrUpdate.init(deepClone(row))
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
        delVideo({ id }).then((data) => {
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
  .zhgd-ai-device {
    .el-divider {
      width: .13rem;
      height: 2rem;
    }
  }
</style>
