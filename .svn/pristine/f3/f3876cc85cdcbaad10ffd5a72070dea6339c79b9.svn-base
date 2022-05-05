<template>
  <div class="work-type">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="title">
        <el-input v-model="dataForm.title" clearable placeholder="工种名称" />
      </el-form-item>
      <el-form-item prop="paltform">
        <el-select v-model.trim="dataForm.paltform" clearable placeholder="请选择平台" @change="(e) => searchHandle(e, 'paltform')">
          <!-- <el-option label="全部" value=""> 全部 </el-option>
          <el-option label="深圳" value="WORK_TYPE"> 深圳 </el-option> -->
          <el-option v-for="item in areaOptionList" :key="item.id" :label="item.title" :value="item.tag"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
      style="width: 100%;"
    >
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="工种名称"
      />
      <!-- <el-table-column
        prop="paltform"
        header-align="center"
        align="center"
        label="地区"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;" @click="editHandle(scope.row)">
            <template>
              <el-select v-model="scope.row.paltform" style="width:120px" placeholder="请选择" @change="(type) => handleChange(correspond1, scope.row)">
                <el-option v-for="item in oList" :key="item.id" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
              </el-select>
            </template>
          </div>

        </template>
      </el-table-column> -->
      <el-table-column
        prop="correspond1"
        header-align="center"
        align="center"
        label="人员类型"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;" @click="editHandle(scope.row)">
            <template>
              <el-select v-model="scope.row.correspond1" :disabled="!basePermit('worker_type_select')" style="width:70%" placeholder="请选择" @change="(type) => handleChange(correspond1, scope.row)">
                <el-option v-for="item in oList" :key="item.id" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
              </el-select>
            </template>
          </div>

        </template>
      </el-table-column>
      <el-table-column
        prop="correspond2"
        header-align="center"
        align="center"
        label="工种岗位"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;" @click="editHandle(scope.row)">
            <template>
              <el-select v-model="scope.row.correspond2" :disabled="!basePermit('worker_correspond_select')" style="width:70%" placeholder="请选择" @change="(type) => handleChange(correspond2, scope.row)">
                <el-option v-for="item in oList1" :key="item.id" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
              </el-select>
            </template>
          </div>

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
import { getList, optionList, areaOptionList, update } from '@/api/sys/work-type-select'
export default {
  name: 'List',
  data() {
    return {
      dataForm: {
        title: '',
        paltform: ''
      },
      dataList: [],
      areaOptionList: [],
      oList: [],
      oList1: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  created() {
    this.getDataList()
    this.getAreaOptionList()
    this.getOptionList()
    this.getOptionList1()
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
            item.canEdit = false
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
    getOptionList() {
      optionList({ category: 'EMP_TYPR_SZZJJ' }).then(data => {
        if (data && data.code === 1000) {
          this.oList = data.result
        }
      })
    },
    getAreaOptionList() {
      areaOptionList().then(data => {
        if (data && data.code === 1000) {
          this.areaOptionList = data.result
        }
      })
    },
    getOptionList1() {
      optionList({ category: 'JOB_TYPENAME_SZZJJ' }).then(data => {
        if (data && data.code === 1000) {
          this.oList1 = data.result
        }
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    editHandle(row) {
      this.dataList = this.dataList.map(item => {
        if (row.id !== item.id) item.canEdit = false
        return item
      })
      this.$set(row, 'canEdit', !row.canEdit)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 查询
    searchHandle(val, type) {
      this.pageIndex = 1
      this.dataForm[type] = val
      this.getDataList()
    },
    // 选择工种类型
    handleChange(type, row) {
      this.$set(row, 'canEdit', false)
      update({ type, ...row }).then((data) => {
        if (data && data.code === 1000) {
          this.getDataList()
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message.error(data.message)
        }
      })
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
  .work-type {
    .add-btn {
      float: right;
      margin-right: 0;
    }
  }
</style>
