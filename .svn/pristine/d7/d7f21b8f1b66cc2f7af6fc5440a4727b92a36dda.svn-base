<template>
  <div class="feedback">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="problem">
        <el-input v-model="dataForm.problem" clearable placeholder="问题" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'sys_feedback_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        prop="filePath"
        header-align="center"
        align="center"
        width="100"
        label="反馈图片"
      >
        <template slot-scope="scope">
          <div @click="handleClickImg(scope.row)">
            <el-avatar icon="el-icon-picture-outline" :size="30" :src="scope.row.filePath" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="ninkName"
        header-align="center"
        align="center"
        label="用户名称"
      />
      <el-table-column
        prop="problem"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="问题"
      />
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="电话"
      />
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱"
      />
      <el-table-column
        v-if="basePermit('sys_feedback_btn_delete')"
        fixed="right"
        header-align="center"
        align="center"
        label="操作"
        width="70"
      >
        <template slot-scope="scope">
          <el-button v-permit="'sys_feedback_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <el-dialog
      title="反馈照片"
      custom-class="feedback-avatar el-dialog_img"
      append-to-body
      width="400px"
      onselectstart="return false;"
      :close-on-click-modal="true"
      :visible.sync="dialogVisible"
    >
      <div style="width:100%;margin:0 auto">
        <img style="width: 100%;" :src="row.filePath" alt="">
      </div>
    </el-dialog>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import { getList, del } from '@/api/sys/feedback'
export default {
  data() {
    return {
      dataForm: {
        problem: ''
      },
      row: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dialogVisible: false,
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
    handleClickImg(row) {
      if (row.filePath) {
        this.dialogVisible = true
      } else {
        return this.$message.error('暂无照片')
      }
      this.row = row
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
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    }
  }
}
</script>

<style lang="scss">
  .feedback {
    .add-btn {
      float: right;
      margin-right: 0;
    }
  }
  .feedback-avatar {
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
