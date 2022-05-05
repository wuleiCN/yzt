<template>
  <div class="video">
    <el-form :inline="true" :model="dataForm">
      <div class="search-btn-style">
        <el-button v-permit="'sys_video_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
      </div>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in selectList" :key="index" :style="siteContentViewHeight" class="pane-wrap" :label="item.title" :name="item.id">
        <el-row v-if="dataList.length" class="row-video" :gutter="20">
          <el-col v-for="(ele, idx) in dataList" :key="idx" :span="8">
            <div class="video-item">
              <div class="title-wrap">
                <h3>{{ ele.name }}</h3>
                <el-tag v-if="ele.status === 0" effect="plain">未审核</el-tag>
                <el-tag v-if="ele.status === 1" effect="plain" type="success">审核通过</el-tag>
                <el-tag v-if="ele.status === 2" effect="plain" type="danger">审核失败</el-tag>
              </div>
              <a target="_blank" :href="ele.videoUrl"><img :src="ele.coverImg | http2HttpsFilter"></a>
              <el-button v-permit="'sys_video_btn_ques'" type="text" size="small" @click="questionHandle(ele)">试题管理</el-button>
              <div style="float:right;display:inline-block">
                <el-button v-if="!ele.status" slot="reference" v-permit="'sys_video_btn_audit'" type="text" size="small" @click="verifyHandle(ele)">审核</el-button>
                <el-button v-permit="'sys_video_btn_update'" type="text" size="small" @click="addOrUpdateHandle(ele)">修改</el-button>
                <el-button v-permit="'sys_video_btn_delete'" type="text" size="small" style="color: rgb(254, 27, 54);" @click="deleteHandle(ele.id)">删除</el-button>

              </div>
            </div>
          </el-col>
        </el-row>
        <div v-else style="text-align: center;margin-top:100px;color:#c3c3c3">暂无数据</div>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹窗, 新增 / @click="addOrUpdateHandle()" 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :select-list="newSelectList" @refreshDataList="getDataList" />
    <verify-modal v-if="verifyVisible" ref="verifyModal" @refreshDataList="getDataList" />
    <questions v-if="questionVisible" ref="questionModal" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './video-add-or-update'
import questions from './video-question'
import VerifyModal from './video-verify-modal'
import { optionList } from '@/api/project/train-topic'
import { getList, verify, del } from '@/api/sys/video'
export default {
  components: {
    AddOrUpdate,
    questions,
    VerifyModal
  },
  data() {
    return {
      dataForm: {
        type: ''
      },
      visible: false,
      activeName: '',
      dataList: [],
      list: [],
      selectList: [{ id: '', title: '全部课程' }],
      dataListLoading: false,
      verifyVisible: false,
      questionVisible: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  computed: {
    documentClientHeight: {
      get() { return this.$store.state.app.documentClientHeight },
      set(val) { this.$store.commit('app/updateDocumentClientHeight', val) }
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight - 50 - 30 - 2 - 170
      return { height: height + 'px' }
    }
  },
  created() {
    this.getDataList()
    this.getOptionList()
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
          this.dataList = data.result
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    },
    // 下拉课题类型
    getOptionList() {
      optionList({ category: 'TRAIN_TYPE' }).then(data => {
        this.selectList = [...this.selectList, ...data.result]
        this.newSelectList = data.result
      })
    },
    handleClick(tab, event) {
      this.dataForm.type = tab.name
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    // 审核
    verifyHandle(row) {
      this.verifyVisible = true
      this.$nextTick(() => {
        this.$refs.verifyModal.init({ ...row })
      })
    },
    // 审核
    questionHandle(row) {
      this.questionVisible = true
      this.$nextTick(() => {
        this.$refs.questionModal.init({ ...row })
      })
    },
    handleVerify(status, id) {
      verify({ status, id }).then(data => {
        if (data && data.code === 1000) {
          this.getDataList()
          this.visible = false
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
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
  .video {
    .pane-wrap {
      // max-height: 650px;
      overflow: auto;
      overflow-x: hidden;
    }
    .row-video {
      .video-item {
        height: 350px;
        border: 1px solid #dfe6ec;
        border-radius: 3px;
        margin-bottom: 20px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        padding: 15px 15px 5px;
        .title-wrap {
          display: flex;
          h3 {
            margin-right: 10px;
            flex: 2;
          }
        }
        img {
          width: 100%;
          height: 250px;
        }
        h3 {
          margin: 0 0 10px;
        }
      }
    }

  }
</style>
