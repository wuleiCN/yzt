<template>
  <div class="mod-menu">
    <!-- {{ loginInfo }} -->
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-permit="'sys_menu_btn_add'" type="primary" @click="addOrUpdateHandle(row, 'add')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      stripe
      highlight-current-row
      row-key="id"
      style="width: 100%;"
      tooltip-effect="light"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
    >
      <!-- <el-table-column
        prop="menuId"
        header-align="center"
        align="center"
        width="80"
        label="ID"
      /> -->
      <el-table-column
        prop="name"
        header-align="center"
        align="left"
        width="180"
        label="名称"
      />
      <el-table-column
        prop="alias"
        header-align="center"
        align="center"
        width="180"
        label="别名"
      />
      <el-table-column
        prop="rules"
        header-align="center"
        align="center"
        width="180"
        label="访问路径"
      />
      <el-table-column
        prop="url"
        :show-overflow-tooltip="true"
        header-align="center"
        align="center"
        label="权限url"
      />
      <!-- <el-table-column
        prop="parentId"
        header-align="center"
        align="center"
        label="父id"
      /> -->
      <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="排序号"
      />
      <!-- <el-table-column
        prop="iconCls"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="菜单图标"
      /> -->
      <el-table-column
        v-if="basePermit('sys_menu_btn_update') || basePermit('sys_menu_btn_delete')"
        fixed="right"
        header-align="center"
        align="center"
        width="120"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'sys_menu_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'sys_menu_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import { getMenuTree, del } from '@/api/sys/menu'
import { mapGetters } from 'vuex'
import AddOrUpdate from './menu-add-or-update'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      row: {},
      dataForm: {},
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  computed: {
    ...mapGetters(['loginInfo'])
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getMenuTree({ userId: this.loginInfo.id }).then(data => {
        if (data && data.code === 1000) {
          this.dataList = data.result
          this.dataListLoading = false
        }
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(row, type) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row }, type)
      })
    },
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('sys_menu_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    rowClick(row, e) {
      this.row = row
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定进行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id }).then((data) => {
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
</script>

<style lang="scss">
.mod-menu {
  .el-table .success-row {
    background: #f0f9eb;
  }
}

</style>
