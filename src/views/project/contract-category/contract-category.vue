<template>
  <div class="contract-category">
    <el-button v-permit="'project_category_btn_add'" style="margin-bottom: 20px" type="primary" @click="addOrUpdateHandle()">新增</el-button>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
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
        prop="name"
        header-align="center"
        align="center"
        width="250"
        label="模板类型"
      />
      <el-table-column
        prop="contractType"
        header-align="center"
        align="center"
        label="类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.contractType === 1">进场</span>
          <span v-if="scope.row.contractType === 2">退场</span>
          <span v-if="scope.row.contractType === 3">安全培训</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="basePermit('project_category_btn_update') || basePermit('project_category_btn_delete')"
        fixed="right"
        header-align="center"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'project_category_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-permit="'project_category_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import AddOrUpdate from './contract-add-or-update'
import { getList, del } from '@/api/project/contractCategory'
export default {
  name: 'List',
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        companyName: null,
        suid: null
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
          this.dataList = data.result.records
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
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('project_category_btn_update')) this.addOrUpdateHandle(row.id)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    handleClear() {
      this.dataForm.suid = null
      this.dataForm.companyName = null
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
  // .contract-category {}
</style>
