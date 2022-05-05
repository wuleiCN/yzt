<template>
  <div class="file-upload">
    <el-form :inline="true" :model="dataForm">
      <el-form-item label="项目名称">
        <el-select
          v-if="userType === 1 || userType === 0"
          v-model="dataForm.projectId"
          clearable
          filterable
          placeholder="请选择项目名称"
          @change="e => searchHandle()"
        >
          <el-option
            v-for="item in pList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          >
            <span style="float: left">{{ item.projectName }}</span>
          </el-option>
        </el-select>
        <span v-else class="title">{{ proName }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button type="primary" @click="addOrUpdateHandle({})">新增</el-button>
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
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="url"
        show-overflow-tooltip
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="上传类型"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.type === 1 ? '图片' : '视频' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="是否启用"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.status == 1" size="small" type="success">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        label="排序"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
      />
      <el-table-column
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './file-upload-add-or-update'
import { getList, del, projectList } from '@/api-zhgd/sys/file-upload'
import { parseTime } from '@/utils'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        deviceType: '',
        supName: '',
        projectId: this.$store.state.user.loginInfo.projectId,
        isDel: 0
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      options: [
        { value: 1, label: '车牌' },
        { value: 2, label: '用电' },
        { value: 3, label: '扬尘' },
        { value: 4, label: '塔吊' },
        { value: 5, label: '升降机' },
        { value: 6, label: '人脸机' }
      ],
      statusOptions: [
        { value: 0, label: '正常' },
        { value: 1, label: '关闭' }
      ],
      proName: '',
      dataList: [],
      pList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  async created() {
    this.pList = await this.getProjectList()
    if (this.pList.length) {
      this.proName = this.pList[0].projectName
    }
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        queryType: 0,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            return item
          })
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    },
    getProjectList() {
      return projectList().then((data) => {
        if (data && data.code === 1000) {
          return data.result
        } else {
          return []
        }
      })
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row, projectId: this.dataForm.projectId }, this.options)
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
    }
  }
}
</script>

<style lang="scss">
  .file-upload{
    background: #fff;
  }
</style>
