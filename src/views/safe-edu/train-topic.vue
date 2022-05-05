<template>
  <div class="project-train-topic">
    <el-container>
      <transition name="tree">
        <div v-show="isShow" class="main">
          <el-aside v-if="loginInfo.userType !== 3" class="left" :style="siteContentViewHeight" width="280px">
            <el-tree :data="orgList" node-key="id" :default-expanded-keys="[companyId]" :props="defaultProps" @node-click="handleNodeClick">
              <span slot-scope="{ data }" class="custom-tree-node">
                <div class="long-text" :title="data.name">
                  <svg-icon :icon-class="data.id ? 'company' : 'project'" /> {{ data.name }}
                </div>
              </span>
            </el-tree>
          </el-aside>
        </div>
      </transition>

      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="projectName">
              <el-input v-model="dataForm.projectName" clearable placeholder="所属项目名称" />
            </el-form-item>
            <el-form-item prop="name">
              <el-input v-model="dataForm.name" clearable placeholder="课题名称" />
            </el-form-item>
            <el-form-item prop="lecturer">
              <el-input v-model="dataForm.lecturer" clearable placeholder="讲师" />
            </el-form-item>
            <el-form-item prop="TrainType">
              <el-select v-model.trim="dataForm.TrainType" clearable placeholder="请选择课题类型" @change="(e) => searchHandle(e, 'TrainType')">
                <el-option v-for="(item, index) in selectList" :key="index" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="category">
              <el-select v-model.trim="dataForm.category" clearable placeholder="请选择类别" @change="(e) => searchHandle(e, 'category')">
                <el-option label="线上" :value="1"> 线上 </el-option>
                <el-option label="线下" :value="2"> 线下 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
            <div class="search-btn-style">
              <el-button v-permit="'sys_train-topic_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
              <el-button v-permit="'sys_train-topic_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
            </div>
          </el-form>
          <div v-if="loginInfo.userType !== 3" class="tree-toggle-style" @click="isShow = !isShow">
            <span v-if="isShow"><i class="el-icon-arrow-left" /></span>
            <span v-else><i class="el-icon-arrow-right" /></span>
          </div>
          <el-table
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            highlight-current-row
            tooltip-effect="light"
            @selection-change="selectionChangeHandle"
            @row-dblclick="rowDblclick"
          >
            <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50"
            />
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              label="所属项目"
            />
            <el-table-column
              prop="name"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="课题名称"
            />
            <el-table-column
              prop="content"
              header-align="center"
              align="center"
              width="300"
              :show-overflow-tooltip="true"
              label="内容"
            />
            <el-table-column
              prop="lecturer"
              header-align="center"
              align="center"
              width="100"
              label="讲师"
            />
            <el-table-column
              prop="title"
              header-align="center"
              align="center"
              width="100"
              label="课题类型"
            />
            <el-table-column
              prop="categoryName"
              header-align="center"
              align="center"
              width="190"
              label="类别"
            />
            <el-table-column
              prop="startTime"
              header-align="center"
              align="center"
              width="160"
              label="开始时间"
            />
            <el-table-column
              prop="endTime"
              header-align="center"
              align="center"
              width="160"
              label="结束时间"
            />
            <el-table-column
              v-if="basePermit('sys_train-topic_btn_update') || basePermit('sys_train-topic_btn_delete')"
              fixed="right"
              header-align="center"
              align="center"
              width="180"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button v-permit="'sys_train-topic_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
                <el-button v-permit="'sys_train-topic_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                <el-dropdown class="dropdown" trigger="click">
                  <span class="el-dropdown-link">
                    更多操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-permit="'sys_train-topic_btn_export'">
                      <a target="_blank" :href="$http.baseUrl(`/trainTopic/exportSignForm?token=${token}&trainId=${scope.row.id}`)"><el-button type="text">导出签到表</el-button></a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-permit="'sys_train-topic_btn_study'" :disabled="!scope.row.videoNum" type="text" size="small" @click="studyHandle(scope.row.id)">
                        开始学习
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item v-permit="'sys_train-topic_btn_upload'">
                      <el-button type="text" size="small" @click="showUploadModal(scope.row)">
                        图片上传
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
          <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :select-list="selectList" @refreshDataList="getDataList" />
          <upload-img v-if="uploadImgVisible" ref="uploadImg" @refreshDataList="getDataList" />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { treeDataTranslate, parseTime } from '@/utils/index'
import AddOrUpdate from './train-topic-add-or-update'
import UploadImg from './train-topic-upload'
import { getProjectsTreeList } from '@/api/project/person'
import MixinItem from '@/components/mixin'
import { videoList } from '@/api/learn'
import { getList, del, optionList } from '@/api/project/train-topic'
export default {
  components: {
    AddOrUpdate,
    UploadImg
  },
  mixins: [MixinItem],
  data() {
    return {
      isShow: false,
      exportUrl: '',
      token: this.$store.state.user.loginInfo.token,
      dataForm: {
        projectName: '',
        name: '',
        lecturer: '',
        TrainType: '',
        category: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      vList: [],
      loginInfo: this.$store.state.user.loginInfo,
      companyId: '',
      type: '',
      dataList: [],
      dataListSelections: [],
      orgList: [],
      selectList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      uploadImgVisible: false
    }
  },
  async created() {
    if (this.loginInfo.userType !== 3) {
      const list = await this.getTreeList()
      if (list.length) {
        this.companyId = list[0].id || list[0].projectsId
        this.type = list[0].type
      }
    }
    this.getDataList()
    this.getOptionList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      const { userType, constructionId } = this.loginInfo
      getList({
        page: this.pageIndex,
        rows: this.pageSize,
        id: userType === 3 ? constructionId : this.companyId,
        type: userType === 3 ? 3 : this.type,
        ...this.dataForm
      }).then((data) => {
        this.dataList = data.result.records.map(item => {
          item.startTime = item.startTime ? parseTime(item.startTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          item.endTime = item.endTime ? parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          item.categoryName = item.category === 2 ? '线下' : '线上'
          return item
        })
        this.totalPage = data.result.total
        this.dataListLoading = false
        console.log(this.dataList)
      })
    },
    studyHandle(id) {
      this.getVideoList(id)
    },
    getVideoList(id) {
      videoList({ id }).then(data => {
        if (data && data.code === 1000) {
          this.vList = data.result
          if (this.vList.length === 0) {
            this.$message.error('没有要学习的内容')
          } else {
            window.open(this.$http.staticUrl(`/#/learn?id=${id}`))
          }
        }
      })
    },
    // 获取树列表
    getTreeList() {
      return new Promise((resolve, reject) => {
        getProjectsTreeList().then(data => {
          this.orgList = treeDataTranslate(data.result, 'id')
          resolve(this.orgList)
        })
      })
    },
    // 下拉课题类型
    getOptionList() {
      optionList({ category: 'TRAIN_TYPE' }).then(data => {
        this.selectList = data.result
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    // 图片上传弹窗
    showUploadModal(row) {
      this.uploadImgVisible = true
      this.$nextTick(() => {
        this.$refs.uploadImg.init({ ...row })
      })
    },
    rowDblclick(row) {
      if (this.basePermit('sys_train-topic_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 点击树中的某条
    handleNodeClick(data) {
      this.companyId = data.id || data.projectsId
      this.type = data.type
      this.getDataList(data.id)
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle(val, type) {
      this.pageIndex = 1
      this.dataForm[type] = val
      this.getDataList(this.companyId)
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`您确定进行[${id ? '删除' : '批量删除'}]操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(ids).then((data) => {
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
  .project-train-topic {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
    .dropdown {
      cursor: pointer;
      color:#1890ff;
      font-size: 12px;
      margin-left: 10px
    }
  }
</style>
