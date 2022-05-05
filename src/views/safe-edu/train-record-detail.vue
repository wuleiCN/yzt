<template>
  <div>
    <el-dialog
      custom-class="train-record-detail"
      title="人员培训详情"
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
            prop="name"
            label="课题名称"
          />
          <el-table-column
            prop="title"
            label="课题类型"
          />
          <el-table-column
            prop="empName"
            label="	员工名称"
          />
          <el-table-column
            prop="idCode"
            width="180"
            label="身份证号"
          />
          <el-table-column
            prop="empPhon"
            label="	手机号"
          />
          <el-table-column
            prop="status"
            label="	状态"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == '未完成'" size="small" type="danger">未完成</el-tag>
              <el-tag v-if="scope.row.status == '已完成'" size="small" type="success">已完成</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="left"
            label="操作"
            width="190"
          >
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.answers" :key="index" class="answer-item" @click="viewScore(item)">
                <div>{{ index+ 1 }}、{{ item.videoName }} ({{ item.score }}分)</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <!-- 查看成绩 -->

    </el-dialog>
    <train-score v-if="trainScoreVisible" ref="trainScoreModal" />
  </div>
</template>

<script>
import { getPersonList } from '@/api/project/train-record'
import TrainScore from './train-score'
export default {
  components: {
    TrainScore
  },
  data() {
    return {
      visible: false,
      trainScoreVisible: false,
      row: {},
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
      getPersonList({ id }).then((data) => {
        if (data && data.code === 1000) {
          this.tableList = data.result
        } else {
          this.tableList = []
        }
        this.dataListLoading = false
      })
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
