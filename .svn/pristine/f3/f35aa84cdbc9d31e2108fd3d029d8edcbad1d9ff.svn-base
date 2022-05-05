<template>
  <el-dialog
    custom-class="train-score"
    title="成绩预览"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <h3>{{ row.videoName }} - 成绩单：
      <span style="font-size: 30px" :style="{color: row.score >= 80 ? '#67C23A' : 'red'}">{{ row.score }}</span>
      分</h3>
    <div class="link-top" />
    <div class="exam-main-wrap">
      <div class="main-content">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="main-content-item"
        >
          <div class="item-index">{{ index + 1 }}、</div>
          <div class="item" style="width:100%">
            <div>
              {{ item.questionName }}<span style="font-size: 16px" :style="{color: item.choose === item.correctOption ? '#67C23A' : 'red'}">{{ item.choose === item.correctOption ? '（ 正确 √ ）' : '（ 错误 X ）' }}</span>
            </div>
            <img
              v-if="item.questionImg"
              class="item-topic-img"
              :src="item.questionImg"
              alt=""
            >
            <div class="score-item-answer">
              <el-radio-group v-model.trim="item.choose" :disabled="true">
                <el-radio label="A">
                  <div v-if="item.optionType === 2">
                    <span>A、</span><img :src="item.optionA" alt="">
                  </div>
                  <span v-else> A、{{ item.optionA }}</span>
                </el-radio>
                <el-radio label="B">
                  <div v-if="item.optionType === 2">
                    <span>B、</span><img :src="item.optionB" alt="">
                  </div>
                  <span v-else> B、{{ item.optionB }}</span>
                </el-radio>
              </el-radio-group>
            </div>
            <div style="color: #E6A23C">正确答案为：{{ item.correctOption }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { viewAnswer } from '@/api/project/train-record'
export default {
  data() {
    return {
      visible: false,
      row: {},
      list: []
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
      viewAnswer({ id }).then((data) => {
        if (data && data.code === 1000) {
          this.list = data.result
        } else {
          this.list = []
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .train-score {
    width: 800px;
    h3 {
      margin: 0;
    }
    .link-top {
      height: 1px;
      margin: 10px 0;
      border-top: 1px solid #e5e5e5;
    }
    .el-dialog__body {
      padding: 15px;
      padding-bottom: 20px;
      height: 600px;
      overflow: auto;
    }
    .exam-main-wrap {
      padding: 10px;
      width: 100%;
      margin-top: 20px;
      background: #fff;
      .dec {
        color: #a8a8a8;
      }
    }
    .main-content-item {
      margin-bottom: 20px;
      display: flex;
      .item-index {
        width: 32px;
      }
      .item-topic-img {
        margin-top: 10px;
        width: 80%;
      }
      .score-item-answer {
        display: flex;
        border-bottom: 1px dashed #ebebeb;
        margin: 10px 0;
        padding: 20px 0;
        img {
          vertical-align: middle;
          width: 120px;
          height: 120px;
        }
        .el-radio-group {
          width: 80%;
          .el-radio {
            width: 50%;
            margin: 0;
          }
        }
      }
    }
  }
</style>
