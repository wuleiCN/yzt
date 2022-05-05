<template>
  <div class="carousel">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="projectName">
        <el-input v-model.trim="dataForm.projectName" placeholder="项目名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'dashboard_data_carousel_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
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
    >
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        label="项目名称"
        show-overflow-tooltip
      />
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="url"
        show-overflow-tooltip
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="上传类型"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.type === 1 ? '图片' : '视频' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isEnable"
        header-align="center"
        align="center"
        label="是否启用"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnable == 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.isEnable == 1" size="small" type="success">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sortNum"
        header-align="center"
        align="center"
        label="排序"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
      />
      <el-table-column
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'dashboard_data_carousel_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'dashboard_data_carousel_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './carousel-add-or-update'
import { getList, del } from '@/api/statistic-dashboard-data/carousel'
import { parseTime } from '@/utils'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        projectName: ''
      },
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  async created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        queryType: 0,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            return item
          })
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row }, this.options)
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del([id]).then((data) => {
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
  .carousel{
    background: #fff;
  }
</style>
