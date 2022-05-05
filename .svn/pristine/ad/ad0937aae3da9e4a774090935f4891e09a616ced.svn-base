<template>
  <div class="warehousing-page">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="productName">
        <el-input v-model.trim="dataForm.productName" placeholder="产品名称" />
      </el-form-item>
      <el-form-item prop="model">
        <el-input v-model.trim="dataForm.model" placeholder="产品型号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'product_warehousing_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
      </div>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
      style="width: 100%;"
    >
      <el-table-column
        prop="productName"
        header-align="center"
        align="center"
        label="所属产品"
      >
        <template slot-scope="{row}">
          <span :style="{ color: row.kcLv <= 0.2 ? 'red' : row.kcLv <= 0.3 ? 'orange' : ''}">{{ row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="model"
        header-align="center"
        align="center"
        label="产品型号"
      />
      <el-table-column
        prop="nums"
        header-align="center"
        align="center"
        label="入库数量"
      />
      <el-table-column
        prop="zkNums"
        header-align="center"
        align="center"
        label="在库数量"
      />
      <el-table-column
        prop="nums"
        header-align="center"
        align="center"
        width="220"
        label="出库数量"
      >
        <template slot-scope="{row}">
          <div>
            <el-tag>出库{{ row.ckNums }}</el-tag>
            <el-tag type="warning">返修{{ row.fxNums }}</el-tag>
            <el-tag type="danger">报废{{ row.bfNums }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatorName"
        header-align="center"
        align="center"
        label="操作人"
      />
      <el-table-column
        prop="copyCreateTime"
        header-align="center"
        align="center"
        width="160"
        label="创建时间"
      />
      <el-table-column
        header-align="center"
        align="center"
        width="130"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'product_warehousing_detail'" type="text" size="small" @click="detailHandle(scope.row)">明细</el-button>
          <el-button v-permit="'product_warehousing_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'product_warehousing_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <detail-modal v-if="detailVisible" ref="detailModal" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './warehousing-add-or-update'
import DetailModal from './warehousing-detail'
import { getList, del } from '@/api/productPurchase'
import { parseTime } from '@/utils'
export default {
  components: {
    AddOrUpdate,
    DetailModal
  },
  data() {
    return {
      dataForm: {
        isEnable: '',
        companyName: '',
        brandName: '',
        productName: ''
      },
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: [],
      dataListLoading: false,
      detailVisible: false,
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
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.copyCreateTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
    tableRowClassName({ row }) {
      if (row.kcLv <= 0.2) {
        return 'warning-row'
      } else if (row.kcLv <= 0.3) {
        return 'success-row'
      }
      return ''
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    // 详情
    detailHandle(row) {
      this.detailVisible = true
      this.$nextTick(() => {
        this.$refs.detailModal.init({ ...row })
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
  .warehousing-page{
    .warning-row {
      color: red;
    }
    .success-row {
      color: orange;
    }
  }
</style>
