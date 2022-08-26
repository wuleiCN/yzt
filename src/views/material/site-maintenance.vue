<template>
  <div class="safety-page">
    <el-container>
      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm" @keyup.enter.native="searchHandle()">
            <el-form-item prop="title">
              <el-input v-model="dataForm.siteName" clearable placeholder="场所名称" @clear="searchHandle()" />
            </el-form-item>
            <div>
              <el-form-item>
                <el-button type="primary" @click="searchHandle()">查询</el-button>
                <el-button type="primary" :disabled="userType !== 2" @click="showDatalModal({})">新增</el-button>
                <el-button type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
                <a target="_blank" :href="$http.baseUrl(exportUrl)" style="margin-left: 10px;"><el-button type="primary">导出</el-button></a>
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
              type="index"
              label="序号"
              align="center"
              width="50"
            />
            <el-table-column
              prop="siteName"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="场所名称"
            />
            <el-table-column
              prop="siteCode"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="场所编号"
            />
            <el-table-column
              prop="personCharge"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="责任人"
            />
            <el-table-column
              prop="personPhone"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="责任电话"
            />
            <el-table-column
              prop="remarks"
              header-align="center"
              align="center"
              label="备注"
            />
            <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              width="100"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showDatalModal(scope.row)">查看</el-button>
                <el-button type="text" size="small" style="color:#D9001B;" @click="deleteHandle(scope.row.id)">删除</el-button>
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
          <project-modal v-if="ProjectModalVisible" ref="recordModal" @refreshDataList="getDataList" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ProjectModal from './maintenance-add-or-update.vue'
import { getList, deleteById } from '@/api/material/materialSite'
// import { parseTime } from '@/utils/index'
export default {
  components: {
    ProjectModal
  },
  data() {
    return {
      ProjectModalVisible: false,
      dataForm: {
        siteName: ''
      },
      dialogVisible: false,
      row: {},
      dataList: [],
      dataListSelections: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      token: JSON.parse(sessionStorage.getItem('result')).token,
      exportUrl: '',
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      dataListLoading: false
    }
  },
  mounted() {
    this.getDataList()
    this.exportUrl = `/materialSite/export?token=${this.token}&page=${this.pageIndex}&rows=9999`
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = false
      getList({
        page: this.pageIndex,
        rows: this.pageSize,
        ...this.dataForm
      }).then(res => {
        if (res.result && res.code === 1000) {
          this.dataList = res.result.records
          this.totalPage = res.result.total
        } else this.$message.error(res.message)
      })
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 显示详情弹窗
    showDatalModal(row) {
      this.ProjectModalVisible = true
      this.$nextTick(() => {
        this.$refs.recordModal.init(row)
      })
    },
    // 双击table
    rowDblclick(row) {
      this.showDatalModal(row)
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
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
          return item.id
        })
      this.$confirm('您确定进行删除操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteById(ids).then(res => {
            if (res.code === 1000) {
              this.getDataList()
              this.$message.success('删除成功！')
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {})
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
  // .safety-page {
  // }
  .safety-avatar {
    // margin-top: 15vh !important;
    .img-wrap {
      height: 600px;
      overflow-y: auto;
    }
    .el-dialog__header {
      padding: 8px;
    }
    .el-dialog__headerbtn {
      top: 12px;
    }
    .el-dialog__body {
      padding: 10px;
    }
    .el-dialog__footer {
      display: none;
    }
  }
</style>
