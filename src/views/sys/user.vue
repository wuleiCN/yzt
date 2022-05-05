<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model.trim="dataForm.projectName" clearable placeholder="项目名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="dataForm.loginName" clearable placeholder="用户名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="dataForm.nickName" clearable placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="dataForm.phone" clearable placeholder="电话号码" />
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="dataForm.constructionName" clearable placeholder="参建单位名称" />
      </el-form-item>
      <el-form-item>
        <el-button v-permit="'sys_user_btn_add'" type="primary" @click="searchHandle">查询</el-button>
      </el-form-item>
      <div>
        <el-form-item>
          <el-button v-permit="'sys_user_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-permit="'sys_user_btn_set'" :disabled="!dataListSelections.length" type="primary" @click="setLogo()">用户设置</el-button>
          <el-button v-permit="'sys_user_btn_setLock'" :disabled="!dataListSelections.length" type="primary" @click="setLock()">解锁</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
      :data="dataList"
      border
      stripe
      tooltip-effect="light"
      highlight-current-row
      style="width: 100%;"
      @selection-change="selectionChangeHandle"
      @row-dblclick="addOrUpdateHandle"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        prop="ico"
        header-align="center"
        align="center"
        width="90"
        label="用户头像"
      >
        <template slot-scope="scope">
          <el-avatar icon="el-icon-user-solid" :size="30" :src="scope.row.ico" />
        </template>
      </el-table-column>
      <el-table-column
        prop="loginName"
        header-align="center"
        align="center"
        width="120"
        label="用户名称"
      />
      <el-table-column
        prop="nickName"
        header-align="center"
        align="center"
        width="120"
        label="姓名"
      />
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        width="120"
        label="电话号码"
      />
      <el-table-column
        prop="isLock"
        header-align="center"
        align="center"
        width="120"
        label="是否锁定"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isLock" type="danger">锁定</el-tag>
          <el-tag v-else>正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        header-align="center"
        align="center"
        width="90"
        label="用户性别"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sex ? (scope.row.sex === 1 ? '男' : '女') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="userType"
        header-align="center"
        align="center"
        width="100"
        label="用户类型"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.userType === 1 ? '企业' : scope.row.userType === 2 ? '项目' : scope.row.userType === 0 ? '集团' : '参建单位' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="companyName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="所属公司"
      />
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="所属项目"
      />
      <el-table-column
        prop="constructionName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="所属参建单位"
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <!-- :disabled="(scope.row.userType !== 0 && loginInfo.isManager === 1 && loginInfo.userType === 0) || (scope.row.userType !== 1 && loginInfo.isManager === 0 && loginInfo.userType === 0) || (scope.row.userType !== 2 && loginInfo.isManager === 0 && loginInfo.userType === 1)" -->
        <template slot-scope="scope">
          <el-button
            v-permit="'sys_user_btn_update'"
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row)"
          >修改</el-button>
          <el-button v-permit="'sys_user_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row)">删除</el-button>
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
    <user-set-logo v-if="setlogoVisible" ref="setlogo" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import { getList, del, unlock } from '@/api/sys/user'
import AddOrUpdate from './user-add-or-update'
import UserSetLogo from './user-set-logo'
export default {
  components: {
    AddOrUpdate,
    UserSetLogo
  },
  data() {
    return {
      dataForm: {
        nickName: '',
        loginName: '',
        projectName: '',
        phone: '',
        constructionName: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      userId: JSON.parse(sessionStorage.getItem('result')).id,
      loginInfo: JSON.parse(sessionStorage.getItem('result')),
      totalPage: 0,
      dataListSelections: [],
      dataListLoading: false,
      addOrUpdateVisible: false,
      setlogoVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getList({ id: this.userId, page: this.pageIndex, rows: this.pageSize, ...this.dataForm }).then(data => {
        this.dataList = data.result.records
        this.totalPage = data.result.total
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = false
      this.showMsg(row)
      if (this.addOrUpdateVisible) {
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row.id)
        })
      }
    },
    setLogo() {
      this.setlogoVisible = true
      this.$nextTick(() => {
        var users = this.dataListSelections.map(item => {
          return item.id
        })
        if (users.length > 1) return this.$message.error('只能单选')
        this.$refs.setlogo.init(users.length && users[0])
      })
    },
    setLock() {
      const ids = this.dataListSelections.filter(item => item.isLock).map(item => item.id)
      this.$confirm(`确定进行解锁操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        unlock(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message.success('操作成功')
            this.getDataList()
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {})
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    showMsg(row) {
      if (row.userType !== 0 && this.loginInfo.isManager === 1 && this.loginInfo.userType === 0) {
        if (row.userType === 1) return this.$message.error('请登录集团账号操作')
        if (row.userType === 2) return this.$message.error('请登录企业账号操作')
        if (row.userType === 3) return this.$message.error('请登录项目账号操作')
      }
      if (row.userType !== 1 && this.loginInfo.isManager === 0 && this.loginInfo.userType === 0) {
        if (row.userType === 2) return this.$message.error('请登录企业账号操作')
        if (row.userType === 3) return this.$message.error('请登录项目账号操作')
      }
      if (row.userType !== 2 && this.loginInfo.isManager === 0 && this.loginInfo.userType === 1) {
        if (row.userType === 3) return this.$message.error('请登录项目账号操作')
      }
      this.addOrUpdateVisible = true
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
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 删除
    deleteHandle(row) {
      this.addOrUpdateVisible = false
      this.showMsg(row)
      if (this.addOrUpdateVisible) {
        this.$confirm(`确定进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del([row.id]).then((data) => {
            if (data && data.code === 1000) {
              this.$message.success('操作成功')
              this.getDataList()
            } else {
              this.$message.error(data.message)
            }
          })
        }).catch(() => {})
      }
    }
  }
}
</script>

<style lang="scss">
// .mod-user {
//   .el-table .success-row {
//     background: #f0f9eb;
//   }
// }

</style>
