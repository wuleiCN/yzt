<template>
  <div class="progress-page">
    <el-container>
      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="contractName">
              <el-input v-model="dataForm.contractName" clearable placeholder="合同名称" />
            </el-form-item>
            <el-form-item prop="projectName">
              <el-input v-model="dataForm.projectName" clearable placeholder="项目名称" />
            </el-form-item>
            <el-form-item prop="yfName">
              <el-input v-model="dataForm.yfName" clearable placeholder="乙方单位" />
            </el-form-item>
            <div>
              <el-form-item>
                <el-button v-permit="'pro_add'" type="primary" @click="showDatalModal()">新增</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchHandle()">查询</el-button>
              </el-form-item>
            </div>
          </el-form>
          <el-table
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            tooltip-effect="light"
            highlight-current-row
          >
            <el-table-column
              prop="contractName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="合同名称"
            />
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="项目名称"
            />
            <el-table-column
              prop="yfName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="乙方单位"
            />
            <el-table-column
              prop="startDate"
              header-align="center"
              align="center"
              label="计划开始时间"
            />
            <el-table-column
              prop="endDate"
              header-align="center"
              align="center"
              label="计划结束时间"
            />
            <el-table-column
              prop="status"
              header-align="center"
              align="center"
              label="状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 0" type="danger">关闭</el-tag>
                <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="isSmsNotice"
              header-align="center"
              align="center"
              label="是否短信通知"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isSmsNotice === 0" type="danger">否</el-tag>
                <el-tag v-if="scope.row.isSmsNotice === 1" type="success">是</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              width="180"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button v-permit="'pro_update'" type="text" size="small" @click="showDatalModal(scope.row)">修改</el-button>
                <el-button v-permit="'progress_set'" type="text" size="small" @click="showNodeModal(scope.row)">节点设置</el-button>
                <el-button v-permit="'pro_del'" type="text" class="button" style="color: rgb(254, 27, 54);" @click="deleteHandle(scope.row.id)">删除</el-button>
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
          <AddOrUpdate v-if="saveOrUpdateVisible" ref="saveOrUpdateModal" @refreshDataList="getDataList" />
          <!-- 弹窗, 新增 / 修改 -->
          <NodeAddOrUpdate v-if="nodeModalVisible" ref="nodeModal" />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { getList, del } from '@/api/progress'
import AddOrUpdate from './progress-add-or-update'
import NodeAddOrUpdate from './progress-node-add-or-update'
import { parseTime } from '@/utils'
export default {
  components: {
    AddOrUpdate,
    NodeAddOrUpdate
  },
  data() {
    return {
      saveOrUpdateVisible: false,
      nodeModalVisible: false,
      dataForm: {
        title: '',
        projectName: '',
        constructionName: ''
      },
      dialogVisible: false,
      row: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
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
        page: this.pageIndex,
        rows: this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.startDate = item.startDate ? parseTime(item.startDate, '{y}-{m}-{d}') : ''
            item.endDate = item.endDate ? parseTime(item.endDate, '{y}-{m}-{d}') : ''
            return item
          })
          this.totalPage = data.result.total
          this.dataListLoading = false
        }
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
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
    },
    // 显示详情弹窗
    showDatalModal(row) {
      this.saveOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.saveOrUpdateModal.init({ ...row })
      })
    },
    // 显示详情弹窗
    showNodeModal(row) {
      this.nodeModalVisible = true
      this.$nextTick(() => {
        this.$refs.nodeModal.init({ ...row })
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
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }
  }
}
</script>

<style lang="scss">
  // .progress-page {
  // }
</style>
