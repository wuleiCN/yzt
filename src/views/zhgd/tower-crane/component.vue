<template>
  <div class="zhgd-tower-crane-device">
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      max-height="600px"
      border
      stripe
      tooltip-effect="light"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        v-for="(v, i) in tableData"
        :key="i"
        :prop="v.prop"
        :width="v.tableWidth"
        :fixed="v.fixed"
        :header-align="v.headerAlign"
        :align="v.aling"
        :label="v.lable"
      />
      <el-table-column
        header-align="center"
        :fixed="fixed"
        align="center"
        width="180"
        :label="label"
      >
        <template slot-scope="scope">
          <el-button v-if="operation === 1" type="text" size="medium " icon="el-icon-paperclip" @click="addOrUpdateHandle(scope.row)" />
          <el-button v-if="operation === 2" type="text" size="small" @click="bindHxzHandle(scope.row)">绑定黑匣子</el-button>
          <el-button v-if="operation === 3" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
</template>

<script>
import { getList, craneProList, del } from '@/api-zhgd/zhgd-tower-crane'
import { parseTime } from '@/utils'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    fixed: {
      type: [Boolean, String],
      default: () => {
        return false
      }
    },
    label: {
      type: String,
      default: () => {
        return '操作'
      }
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    operation: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      dataForm: {
        name: '',
        isDel: 0,
        projectId: this.$store.state.user.loginInfo.projectId
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      proList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      bindVisible: false
    }
  },
  async created() {
    // this.show()
    // this.proList = await this.craneProListHandle()
    // this.getDataList()
  },
  methods: {
    show() {
      this.dataListLoading = true
      this.dataList.length || (this.dataListLoading = false)
    },
    // 获取项目列表
    craneProListHandle() {
      return new Promise(resolve => {
        craneProList().then(data => {
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
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d}') : ''
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
    bindHxzHandle(row) {
      this.bindVisible = true
      this.$nextTick(() => {
        this.$refs.bindHxz.init({ ...row })
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id }).then((data) => {
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
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.$nextTick(() => {
        console.log(row)
      })
    }
  }
}
</script>

<style lang="scss">
.zhgd-tower-crane-device {
  .el-divider {
    width: .13rem;
    height: 2.6rem;
  }
}
</style>
