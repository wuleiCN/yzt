<template>
  <div class="formwork-list">
    <el-container>
      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="projectState">
              <el-select v-model="dataForm.projectState" clearable placeholder="请选择项目名称" @change="(e) => selectChangeHandle(e, 'enterAndRetreatCondition')">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <div class="search-btn-style">
              <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
            </div>
          </el-form>
          <el-table
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            tooltip-effect="light"
            highlight-current-row
            @row-dblclick="rowDblclick"
          >
            <el-table-column
              prop="pitName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="基坑名称"
            />
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              label="工程造价（万元）"
            />
            <el-table-column
              prop="pitDepth"
              header-align="center"
              align="center"
              width="100"
              label="基坑深度(m)"
            />
            <el-table-column
              prop="pitPerimeter"
              header-align="center"
              align="center"
              label="基坑周长(m)"
            />
            <el-table-column
              prop="support"
              header-align="center"
              align="center"
              width="120"
              label="支护形式"
            />
            <el-table-column
              prop="safetyLevel"
              header-align="center"
              align="center"
              label="安全等级"
            />
            <el-table-column
              prop="monitoringPrincipal"
              header-align="center"
              align="center"
              label="监测负责人"
            />
            <el-table-column
              prop="monitoringPersonnel"
              header-align="center"
              align="center"
              label="监测人员"
            />
            <el-table-column
              prop="dataTime"
              header-align="center"
              align="center"
              label="施工时间"
            />
            <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              label="操作"
              width="190"
            >
              <template slot-scope="scope">
                <el-button v-permit="'project_list_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                <el-button v-permit="'project_list_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
        </div>
      </el-main>
    </el-container>
    <pot-dialog ref="addOrUpdate" />
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import PotDialog from './potManage-add-or-update'
export default {
  components: {
    PotDialog
  },
  data() {
    return {
      parseTime,
      options: [
        { value: 0, label: '中国化学工程集团北京科贸' },
        { value: 1, label: '演示平台' }
      ],
      dataForm: {
        projectName: '',
        projectState: null
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      // this.dataListLoading = true
    },
    // 获取公司列表
    getTreeList() {
      this.dataListLoading = true
      return new Promise((resolve, reject) => {

      })
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startDate = val && val.length ? val[0] : ''
        this.dataForm.endDate = val && val.length ? val[1] : ''
      }
      this.dataForm[type] = val
      this.getDataList()
    },
    handleNodeClick(data) {
      this.companyId = data.id
      this.getDataList(data.id)
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
      this.getDataList(this.companyId)
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
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
      this.addOrUpdateHandle(row.id)
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('de;')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
</style>
