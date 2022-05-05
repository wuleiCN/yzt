<template>
  <div class="sys-bad">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="empName">
        <el-input v-model="dataForm.empName" clearable placeholder="姓名" />
      </el-form-item>
      <el-form-item prop="empCode">
        <el-input v-model="dataForm.empCode" clearable placeholder="身份证号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'sys_bad_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
        <el-button v-permit="'sys_bad_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
        :show-overflow-tooltip="true"
        label="所属项目"
      />
      <el-table-column
        prop="eventName"
        header-align="center"
        align="center"
        width="100"
        label="惩罚类别"
      />
      <el-table-column
        prop="empName"
        header-align="center"
        align="center"
        label="姓名"
        width="100"
      />
      <el-table-column
        prop="empCode"
        header-align="center"
        align="center"
        width="160"
        label="身份证号"
      />
      <el-table-column
        prop="cause"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="不良记录内容"
      />
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        width="110"
        label="附件地址"
      >
        <template slot-scope="scope">
          <el-button type="text" :disabled="!scope.row.url">
            <a v-if="scope.row.url" target="_blank" :href="scope.row.url">附件</a>
            <a v-else>附件</a>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="160"
        label="创建时间"
      />
      <el-table-column
        v-if="basePermit('sys_bad_btn_addBlacklist') || basePermit('sys_bad_btn_update') || basePermit('sys_bad_btn_delete')"
        fixed="right"
        header-align="center"
        align="center"
        width="170"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'sys_bad_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'sys_bad_btn_addBlacklist'" type="text" size="small" @click="addBlacklist(scope.row.id)">加入黑名单</el-button>
          <el-button v-permit="'sys_bad_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import AddOrUpdate from './bad-add-or-update'
import { parseTime } from '@/utils'
import { getList, del, addBlacklist } from '@/api/sys/bad-record'
export default {
  name: 'List',
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        empName: '',
        empCode: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
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
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    rowDblclick(row) {
      if (this.basePermit('sys_bad_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    handleClear() {
      this.dataForm.suid = null
      this.dataForm.companyName = null
    },
    // 加入黑名单
    addBlacklist(id) {
      this.$confirm(`您确定进行加入黑名单操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addBlacklist({ id }).then((data) => {
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
      this.$confirm(`您确定进行[${id ? '删除' : '批量删除'}]操作吗?`, '提示', {
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
  // .sys-bad {}
</style>
