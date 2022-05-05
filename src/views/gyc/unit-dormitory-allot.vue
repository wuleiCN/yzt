<template>
  <el-dialog
    custom-class="gyc-community-modal"
    title="宿舍分配"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="first" label="宿舍分配" name="first">
        <el-container>
          <el-aside class="aside-tree">
            <el-tree
              ref="tree"
              :data="treeMenus"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="multiProps"
            />
          </el-aside>
          <el-main>
            <el-select
              v-model="constructionId"
              collapse-tags
              filterable
              style="width:100%"
              placeholder="请选择参建单位"
            >
              <el-option
                v-for="(item, index) in proList"
                :key="index"
                :label="item.construction.constructionName"
                :value="item.id"
              />
            </el-select>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="宿舍分配列表" name="second">

        <el-form :inline="true" :model="dataForm">
          <el-form-item prop="projectId">
            <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchHandle">查询</el-button>
          </el-form-item>
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
            prop="roomName"
            header-align="center"
            align="center"
            width="180"
            label="宿舍名称"
          />
          <el-table-column
            prop="projectName"
            header-align="center"
            align="center"
            label="所属项目"
          />
          <el-table-column
            prop="constructionName"
            header-align="center"
            align="center"
            label="参建单位"
          />
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
      </el-tab-pane>
    </el-tabs>

    <span v-if="activeName === 'first'" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  saveAllot,
  allotList,
  dormitoryTree,
  listByProId
} from '@/api/gyc/unit'
import { treeDataTranslate } from '@/utils'
export default {
  data() {
    return {
      activeName: 'first',
      projectId: this.$store.state.user.loginInfo.projectId,
      visible: false,
      dataListLoading: false,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataForm: {
        constructionName: ''
      },
      treeMenus: [],
      proList: [],
      constructionId: '',
      checkedId: [],
      multiProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.visible = true
      this.getDormitoryTree()
      this.getListByProId()
      this.getDataList()
    },
    handleClick() {},
    getDataList() {
      this.dataListLoading = true
      allotList({
        page: this.pageIndex,
        rows: this.pageSize,
        ...this.dataForm
      }).then(data => {
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
    getDormitoryTree() {
      dormitoryTree({ projectId: this.projectId }).then(data => {
        if (data && data.code === 1000) {
          data.result = data.result && data.result.map(item => {
            if (item.type === 1) item.disabled = true
            return item
          })
          this.treeMenus = treeDataTranslate(data.result, 'id')
          // 当楼栋没有宿舍就禁用
          this.treeMenus = this.treeMenus.map(item => {
            if (item.type === 1 && item.children) {
              item.children.map(ele => {
                if (ele.type === 2 && !ele.children) {
                  ele.disabled = true
                }
              })
            }
            return item
          })
        } else {
          this.$message.error(data.message)
        }
      })
    },
    getListByProId() {
      // 后台让写死 status: 0
      listByProId({ id: this.projectId, status: 0 }).then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result
        } else {
          this.$message.error(data.message)
        }
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
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 表单提交
    dataFormSubmit() {
      const checkArr = this.$refs.tree.getCheckedNodes()
      // 过滤数据，只传宿舍的ids
      const filterCheckArr = checkArr.filter(item => {
        return item._level === 3
      })
      const ids = filterCheckArr.map(item => item.id)
      if (!this.constructionId) return this.$message.error('请选择参建单位')
      if (ids.length === 0) return this.$message.error('请选择宿舍')
      saveAllot({ ids, constructionId: this.constructionId }).then(data => {
        if (data && data.code === 1000) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        } else {
          this.$message.error(data.message)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.gyc-community-modal {
  width: 1000px !important;
  .aside-tree {
    width: 300px;
    height: 400px;
    overflow-y: auto;
  }
}
</style>
