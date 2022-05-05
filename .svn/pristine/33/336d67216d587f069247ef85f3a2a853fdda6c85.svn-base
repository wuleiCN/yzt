<template>
  <div class="salary-plan">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="name">
        <el-input v-model="dataForm.name" clearable placeholder="方案名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'salary_plan_btn_add'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-permit="'salary_plan_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
        prop="code"
        header-align="center"
        align="center"
        label="方案代码"
      />
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="方案名称"
      />
      <el-table-column
        prop="nums"
        header-align="center"
        align="center"
        width="110"
        label="项目数"
      />
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="描述"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
        label="创建时间"
      />
      <el-table-column
        v-if="basePermit('salary_plan_btn_update') || basePermit('salary_plan_btn_delete') || basePermit('salary_plan_btn_preview')"
        fixed="right"
        header-align="center"
        align="center"
        width="160"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'salary_plan_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-permit="'salary_plan_btn_preview'" type="text" size="small" @click="planTempHandle(scope.row.content)">薪资格式</el-button>
          <el-button v-permit="'salary_plan_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <!-- 薪资格式预览 -->
    <plan-temp v-if="planTempVisible" ref="planTemp" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './plan-add-or-update'
import PlanTemp from './plan-temp'
import { parseTime } from '@/utils'
import { getList, del } from '@/api/salary/plan'
export default {
  components: {
    AddOrUpdate,
    PlanTemp
  },
  data() {
    return {
      dataForm: {
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      planTempVisible: false
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
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 新增 / 修改
    planTempHandle(content) {
      this.planTempVisible = true
      this.$nextTick(() => {
        this.$refs.planTemp.init(content)
      })
    },
    rowDblclick(row) {
      if (this.basePermit('salary_plan_btn_update')) this.addOrUpdateHandle(row.id)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
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
  .salary-plan {
    .add-btn {
      float: right;
      margin-right: 0;
    }
  }
</style>
