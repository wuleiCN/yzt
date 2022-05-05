<template>
  <div class="work-type">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="title">
        <el-input v-model="dataForm.title" clearable placeholder="工种名称" />
      </el-form-item>
      <el-form-item prop="category">
        <el-select v-model.trim="dataForm.category" clearable placeholder="请选择工种类型" @change="(e) => searchHandle(e, 'category')">
          <el-option label="全部" value=""> 全部 </el-option>
          <el-option label="深圳" value="WORK_TYPE"> 深圳 </el-option>
          <el-option label="惠州" value="JOB_NAME_HZZJJ"> 惠州 </el-option>
          <el-option label="揭阳" value="JOB_NAME_GDJY"> 揭阳 </el-option>
          <el-option label="福建省" value="JOB_NAME_FJS"> 福建省 </el-option>
          <el-option label="河南省" value="JOB_NAME_HENAN"> 河南省 </el-option>
          <el-option label="星河工种" value="JOB_NAME_XINGHE"> 星河工种 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model.trim="dataForm.type" clearable placeholder="请选择工种类型" @change="(e) => searchHandle(e, 'type')">
          <el-option label="全部" value=""> 全部 </el-option>
          <el-option label="管理人员" :value="1"> 管理人员 </el-option>
          <el-option label="劳务人员" :value="2"> 劳务人员 </el-option>
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
      <el-table-column
        prop="暂无"
        header-align="center"
        align="center"
        label="所属地区"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.category === 'WORK_TYPE'">深圳</span>
          <span v-if="scope.row.category === 'JOB_NAME_HZZJJ'">惠州</span>
          <span v-if="scope.row.category === 'JOB_NAME_GDJY'">揭阳</span>
          <span v-if="scope.row.category === 'JOB_NAME_FJS'">福建省</span>
          <span v-if="scope.row.category === 'JOB_NAME_HENAN'">河南省</span>
          <span v-if="scope.row.category === 'JOB_NAME_XINGHE'">星河工种</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="tag"
        header-align="center"
        align="center"
        label="工种代码"
      /> -->
      <el-table-column
        prop="groupTitle"
        header-align="center"
        align="center"
        label="工种属性"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="工种类型"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;" @click="editHandle(scope.row)">
            <span v-if="!scope.row.canEdit" style="color:#1890ff">{{ scope.row.type === 1 ? '管理人员' : scope.row.type === 2 ? '劳务人员' : '' }}</span>
            <template v-else>
              <el-select v-model="scope.row.type" :disabled="!basePermit('work_type_select')" style="width:120px" placeholder="请选择" @change="(type) => handleChange(type, scope.row)">
                <el-option label="管理人员" :value="1"> 管理人员 </el-option>
                <el-option label="劳务人员" :value="2"> 劳务人员 </el-option>
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
import { getList, changeType } from '@/api/project/work-type'
export default {
  name: 'List',
  data() {
    return {
      dataForm: {
        title: '',
        category: '',
        type: ''
      },
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
      changeType({ type, id: row.id }).then((data) => {
        if (data && data.code === 1000) {
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
