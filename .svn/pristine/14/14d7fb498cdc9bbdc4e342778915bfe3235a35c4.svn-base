<template>
  <div class="mod-role">
    <el-button v-permit="'sys_role_btn_saveRole'" type="primary" style="margin-bottom: 10px" @click="saveResources()">保存权限</el-button>
    <el-container>
      <el-aside class="left" width="280px">
        <el-tree
          ref="tree"
          :data="treeMenus"
          :props="multiProps"
          :show-checkbox="true"
          node-key="id"
          default-expand-all
          highlight-current
          :expand-on-click-node="true"
          :default-checked-keys="checkedId"
          :check-strictly="true"
          @check="clickDeal"
        />
      </el-aside>
      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
              <el-input v-model="dataForm.roleName" placeholder="角色名称" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDataList()">查询</el-button>
            </el-form-item>
            <div class="search-btn-style">
              <el-button v-permit="'sys_role_btn_add'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
            </div>
          </el-form>
          <el-table
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            highlight-current-row
            style="width: 100%;"
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
          >
            <el-table-column header-align="center" align="center" label="选择" width="55">
              <template slot-scope="scope">
                <el-radio v-model="tableRadio" :label="scope.row" @change.native="radioChangeHandle(scope.row)"><span /></el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              header-align="center"
              align="center"
              label="角色名称"
            />
            <el-table-column
              prop="status"
              header-align="center"
              align="center"
              label="状态"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.status ? 'success' : 'danger'">{{ dist.roleTags()[scope.row.status] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              header-align="center"
              align="center"
              width="150"
              label="创建时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.createTime ? parseTime(scope.row.createTime, '{y}-{m}-{d}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              header-align="center"
              align="center"
              label="修改时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.updateTime ? parseTime(scope.row.updateTime, '{y}-{m}-{d}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              v-if="basePermit('sys_role_btn_update') || basePermit('sys_role_btn_delete')"
              fixed="right"
              header-align="center"
              align="center"
              width="150"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button v-permit="'sys_role_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
                <el-button v-permit="'sys_role_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import AddOrUpdate from './role-add-or-update'
import { getRoleList, getRoleTree, del, resources, updresources } from '@/api/sys/role'
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import dist from '@/utils/dist'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dist,
      parseTime,
      dataForm: {
        roleName: ''
      },
      tableRadio: {},
      checkedId: [],
      treeMenus: [],
      multiProps: {
        children: 'children',
        label: 'name'
      },
      dataList: [],
      orgList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'loginInfo'
    ])
  },
  created() {
    this.userId = this.loginInfo.id
    this.getDataList()
    this.getTreeList()
  },
  methods: {
    // 获取角色列表
    getDataList() {
      this.dataListLoading = true
      getRoleList({ page: this.pageIndex, rows: this.pageSize, userId: this.userId, ...this.dataForm }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records
          this.tableRadio = data.result.records[0]
          this.radioChangeHandle(this.tableRadio)
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    radioChangeHandle(row) {
      this.id = row ? row.id : ''
      resources({ roleId: this.id }).then(data => {
        if (data && data.code === 1000) {
          this.$refs.tree.setCheckedKeys(data.result.map(item => {
            if (item !== null) return item.id
          }) || [])
        }
      })
    },
    saveResources() {
      const resourcesId = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).toString()
      updresources({ resourcesId, roleId: this.id }).then(data => {
        this.$message.success('操作成功')
      })
    },
    // 获取树列表
    getTreeList() {
      return new Promise((resolve, reject) => {
        getRoleTree({ userId: this.userId }).then(data => {
          if (data && data.code === 1000) {
            this.orgList = data.result
            this.treeMenus = data.result
            resolve(this.orgList)
          }
        })
      })
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
    // 双击table
    rowDblclick(row) {
      if (this.basePermit('sys_role_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    rowClick(row) {
      this.tableRadio = row
      this.radioChangeHandle(this.tableRadio)
    },
    clickDeal(currentObj, treeStatus) {
      this.clickCheck(currentObj, treeStatus, this.$refs.tree)
      console.log(currentObj, treeStatus, this.$refs.tree)
    },

    /**
     * 树形菜单复选框父子节点不关联实现父子节点联动回显
     *
     * @see selectedParent - 处理父节点为选中
     * @see uniteChildSame - 处理子节点为相同的勾选状态
     * @see removeParent   - 子节点全没选中取消父级的选中状态
     *
     * @param {Object} currentObj - 当前勾选节点的对象
     * @param {Object} treeStatus - 树目前的选中状态对象
     * @param {Object} ref - this.$refs.xxx
     **/
    clickCheck(currentObj, treeStatus, ref) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      const selected = treeStatus.checkedKeys.indexOf(currentObj.id) // -1未选中

      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedParent(currentObj, ref)
        // 统一处理子节点为相同的勾选状态
        this.uniteChildSame(currentObj, true, ref)
      } else {
        // 取消子节点的选中状态触发
        if (currentObj.parentId !== -1) {
          this.removeParent(currentObj, ref)
        }

        // 未选中 处理子节点全部未选中
        if (currentObj.children.length !== 0) {
          this.uniteChildSame(currentObj, false, ref)
        }
      }
    },

    /**   统一处理子节点为相同的勾选状态  **/
    uniteChildSame(treeList, isSelected, ref) {
      const treeListData = treeList.children
      const len = treeListData.length

      ref.setChecked(treeList.id, isSelected)

      for (let i = 0; i < len; i++) {
        this.uniteChildSame(treeListData[i], isSelected, ref)
      }
    },

    /**    统一处理父节点为选中    **/
    selectedParent(currentObj, ref) {
      const currentNode = ref.getNode(currentObj)
      if (currentNode.parent.key !== undefined) {
        ref.setChecked(currentNode.parent, true)
        return this.selectedParent(currentNode.parent, ref)
      }
    },

    /**    子节点全没选中取消父级的选中状态   **/
    removeParent(currentObj, ref) {
      let a = 0
      let b = 0
      const currentNode = ref.getNode(currentObj)
      if (currentNode.parent !== null) {
        if (currentNode.parent.key !== undefined) {
          ref.setChecked(currentNode.parent, true) // 根节点
          this.removeParent(currentNode.parent, ref) // 递归判断子节点
        }
      }

      // 不为0表示为父节点
      if (currentNode.childNodes.length !== 0) {
        // 循环判断父节点下的子节点
        for (let i = 0; i < currentNode.childNodes.length; i++) {
          // 判断父节点下的子节点是否全为false
          if (currentNode.childNodes[i].checked === false) {
            ++a

            // a === currentNode.childNodes.length 表明子节点全为false
            if (a === currentNode.childNodes.length) {
              // 等于 undefined 跳过,不等于继续执行
              if (currentNode.childNodes[i].parent.key !== undefined) {
                ref.setChecked(currentNode.childNodes[i].parent, false) // 父元素设置为false
                // 循环上级父节点下的子节点
                for (let i = 0; i < currentNode.parent.childNodes.length; i++) {
                  // 判断父节点下的子节点是否全为false
                  if (currentNode.parent.childNodes[i].checked === false) {
                    ++b

                    // b === currentNode.parent.childNodes.length 表明子节点全为false
                    if (b === currentNode.parent.childNodes.length) {
                      ref.setChecked(currentNode.parent.key, false) // 父元素设置为false
                      return this.removeParent(currentNode.parent, ref) // 继续递归循环判断
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定进行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del([id]).then((data) => {
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
  .mod-role {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      height: 700px;
    }
    .el-radio__label {
      padding: 0;
    }
  }
</style>
