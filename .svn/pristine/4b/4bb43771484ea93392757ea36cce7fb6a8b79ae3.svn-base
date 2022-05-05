<template>
  <div>
    <el-dialog
      custom-class="train-record-detail"
      title="进度详情"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <div>
        <el-table
          :data="tableList"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="handleResult"
            header-align="center"
            align="center"
            label="处理情况描述"
          />
          <el-table-column
            prop="handlePho"
            header-align="center"
            align="center"
            label="处理照片"
          >
            <template slot-scope="scope">
              <div @click="handleClickImg(scope.row, 'handlePho')">
                <el-avatar
                  icon="el-icon-picture"
                  :size="30"
                  :src="scope.row.handlePho && scope.row.handlePho.split(',').length ? (scope.row.handlePho.split(',')[0] ) : ''"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="operationProcess"
            header-align="center"
            align="center"
            label="	操作流程步骤"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.operationProcess === 0" style="color:#fff;background: #479BFF">发起安全整改</el-tag>
              <el-tag v-if="scope.row.operationProcess === 1" style="color:#fff;background: #F59A23">整改完成</el-tag>
              <el-tag v-if="scope.row.operationProcess === 2" style="color:#fff;background: #F59A23">复查通过</el-tag>
              <el-tag v-if="scope.row.operationProcess === 3" style="color:#fff;background: #F59A23">复查不通过</el-tag>
              <el-tag v-if="scope.row.operationProcess === 4" style="color:#fff;background: #F59A23">异常</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="recheckIdea"
            header-align="center"
            align="center"
            width="180"
            label="复查意见"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.recheckIdea === 0" type="success">通过</el-tag>
              <el-tag v-if="scope.row.recheckIdea === 1" type="danger">不通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="recheckResult"
            header-align="center"
            align="center"
            label="	复查情况描述"
          />
          <el-table-column
            prop="recheckPho"
            header-align="center"
            align="center"
            label="复查照片"
          >
            <template slot-scope="scope">
              <div @click="handleClickImg(scope.row, 'recheckPho')">
                <el-avatar
                  icon="el-icon-picture"
                  :size="30"
                  :src="scope.row.recheckPho && scope.row.recheckPho.split(',').length ? (scope.row.recheckPho.split(',')[0] ) : ''"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            label="创建时间"
            width="155"
          />
        </el-table>
      </div>
      <el-dialog
        title="照片详情"
        custom-class="safety-avatar"
        append-to-body
        onselectstart="return false;"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
      >
        <div class="img-wrap">
          <div v-for="(ele, index) in item[type] && item[type].split(',')" :key="index">
            <h1>照片 {{ index+ 1 }}</h1>
            <img
              style="width: 100%;height:600px"
              :src="ele | http2HttpsFilter"
              alt=""
            >
          </div>

        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { processList } from '@/api/safety'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      trainScoreVisible: false,
      row: {},
      type: '',
      item: {},
      dialogVisible: false,
      tableList: []
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.row = row
      this.visible = true
      this.$nextTick(() => {
        this.getList(row.id)
      })
    },
    // 某人培训列表
    getList(id) {
      processList({ id }).then((data) => {
        if (data && data.code === 1000) {
          this.tableList = data.result.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            return item
          })
        } else {
          this.tableList = []
        }
        this.dataListLoading = false
      })
    },
    handleClickImg(item, type) {
      this.dialogVisible = true
      this.item = item
      this.type = type
    },
    // 查看成绩
    viewScore(row) {
      this.trainScoreVisible = true
      this.$nextTick(() => {
        this.$refs.trainScoreModal.init(row)
      })
    }
  }
}
</script>
<style lang="scss">
  .train-record-detail {
    width: 1000px;
    .el-dialog__body {
      padding: 15px;
      padding-bottom: 20px;
    }
    .answer-item {
      color: #1890ff;
      font-size: 13px;
      cursor: pointer;
    }
  }
</style>
