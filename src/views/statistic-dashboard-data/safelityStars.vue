<template>
  <div class="news">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="projectName">
        <el-input v-model.trim="empName" placeholder="人员姓名" />
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model.trim="dataForm.type" style="width:100%" placeholder="请选择类型" @change="getDataList">
          <el-option v-for="(item, index) in type" :key="index" :label="item.dictLabel" :value="item.value">{{ item.dictLabel }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button type="primary" @click="addOrUpdateHandle(dataForm)">新增</el-button>
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
        prop="faseUrl"
        header-align="center"
        width="200"
        align="center"
        label="人员照片"
      >
        <template slot-scope="scope">
          <div @click="handleClickImg(scope.row)">
            <el-avatar
              icon="el-icon-user-solid"
              :size="30"
              :src="scope.row.faseUrl | http2HttpsFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="empName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="人员姓名"
      />
      <!-- <el-table-column
        prop="content"
        header-align="center"
        align="center"
        label="文章内容"
      /> -->
      <el-table-column
        v-if="dataList.length && dataList[0].type === 1"
        prop="saftyPf"
        header-align="center"
        align="center"
        label="安全评分"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="安全评分类型"
      >
        <template slot-scope="scope">
          <span>{{ types[scope.row.type - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="dataList.length && dataList[0].type === 3"
        prop="type"
        header-align="center"
        align="center"
        label="季度榜"
      >
        <template slot-scope="scope">
          <span>{{ quarterType[scope.row.quarterType - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="200"
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
    <el-dialog
      :title="row.empName"
      custom-class="person-avatar el-dialog_img"
      append-to-body
      width="400px"
      onselectstart="return false;"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
    >
      <!-- <div style="height: 500px;width: 100%;margin:0 auto;text-align:center"> -->
      <img
        style="width: 100%;height:600px"
        :src="row.faseUrl | http2HttpsFilter"
        alt=""
      >
      <!-- </div> -->
    </el-dialog>
  </div>
</template>

<script>
import AddOrUpdate from './safelity-add-update.vue'
// import { parseTime } from '@/utils'
import { getStalyStartList, delStalyStart } from '@/api/statistic-dashboard-data/safelityStars'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        id: null,
        saftyPf: 0,
        message: '以身作则，安全第一',
        employeeId: null,
        type: 1,
        quarterType: 1,
        projectId: this.$store.state.user.loginInfo.projectId
      },
      empName: '',
      type: [
        {
          dictLabel: '风采展示',
          value: 1
        },
        {
          dictLabel: '监督管理小组',
          value: 2
        },
        {
          dictLabel: '季度榜',
          value: 3
        }
      ],
      dataList: [],
      row: {},
      types: ['风采展示', '监督管理小组', '季度榜'],
      quarterType: ['季度', '月度', '周度'],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      dialogVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getStalyStartList({
        type: this.dataForm.type,
        empName: this.empName
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    // 查询
    searchHandle() {
      this.getDataList()
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行${id ? '删除' : '批量删除'}操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStalyStart({ ids: id }).then((data) => {
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
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
      console.log(row)
    }
  }
}
</script>

<style lang="scss">
  // .news {}
</style>
