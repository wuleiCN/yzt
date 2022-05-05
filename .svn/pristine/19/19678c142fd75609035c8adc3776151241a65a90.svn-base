<template>
  <div class="sys-blacklist">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="type">
        <el-select v-model.trim="dataForm.type" clearable placeholder="请选择类型" @change="(e) => searchHandle(e, 'type')">
          <el-option label="员工" :value="1"> 员工 </el-option>
          <el-option label="参建单位" :value="2"> 参建单位 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model.trim="dataForm.status" clearable placeholder="请选择状态" @change="(e) => searchHandle(e, 'status')">
          <el-option label="生效中" :value="1"> 生效中 </el-option>
          <el-option label="已撤销" :value="2"> 已撤销 </el-option>
        </el-select>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'sys_blacklist_btn_revoke'" type="primary" :disabled="dataListSelections.length <= 0" @click="revokeHandle()">撤销</el-button>
        <el-button v-permit="'sys_blacklist_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
        prop="eventName"
        header-align="center"
        align="center"
        label="不良记录"
      />
      <el-table-column
        prop="empName"
        header-align="center"
        align="center"
        label="对象"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        width="110"
        label="类型"
      />
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        width="110"
        label="状态"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="160"
        label="创建时间"
      />
      <el-table-column
        v-if="basePermit('sys_blacklist_btn_update') || basePermit('sys_blacklist_btn_delete')"
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'sys_blacklist_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import { getList, del, revoke } from '@/api/sys/blacklist'
export default {
  name: 'List',
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        type: '',
        status: ''
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
            item.status = item.status ? (item.status === 1 ? '生效中' : '已撤销') : ''
            item.type = item.type ? (item.type === 1 ? '员工' : '参建单位') : ''
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
      if (this.basePermit('sys_blacklist_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    handleClear() {
      this.dataForm.suid = null
      this.dataForm.companyName = null
    },
    // 删除
    revokeHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`您确定进行撤销操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        revoke(ids).then((data) => {
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
  // .sys-blacklist {}
</style>
