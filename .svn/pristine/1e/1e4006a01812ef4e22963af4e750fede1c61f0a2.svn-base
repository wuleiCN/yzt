<template>
  <div>
    <div v-if="!showScore" class="exam-container">
      <div class="main">
        <h3>{{ name }}（试卷）</h3>
        <h4 v-if="!showMain">*注意：输入身份证号，开始答题！</h4>
        <div class="link-top" />
        <el-form
          v-if="!showMain"
          ref="dataForm"
          class="form-style"
          :inline="true"
          :rules="dataRule"
          :model="dataForm"
        >
          <el-form-item class="form-item-idcode" prop="idCode">
            <el-input
              v-model.trim="dataForm.idCode"
              size="medium"
              placeholder="请输入身份证"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              size="medium"
              type="primary"
              @click="dataFormSubmit()"
            >提交</el-button>
          </el-form-item>
        </el-form>
      <!-- <div>普工试卷</div> -->
      <!-- <div class="main-dec">共10题， 总分100分，答题时间不限</div> -->
      </div>
      <div v-if="showMain" class="exam-main-wrap">
        <h3>单选题</h3>
        <span class="dec">共10题， 共100分，每题10分</span>
        <div class="link-top" />
        <div class="main-content">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="main-content-item"
          >
            <div>{{ index + 1 }}、</div>
            <div class="item" style="width:100%">
              <div>{{ item.questionName }}</div>
              <img
                v-if="item.questionImg"
                class="item-topic-img"
                :src="item.questionImg"
                alt=""
              >
              <!-- <div class="item-answer">
              <div class="item-answer-item">A. 能</div>
              <div class="item-answer-item">B. 不能</div>
            </div> -->
              <div class="item-answer">
                <el-radio-group v-model.trim="item.option">
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
            </div>
          </div>
        </div>
        <el-button
          type="primary"
          size="medium"
          style="width:100%"
          @click="submit()"
        >提交试卷</el-button>
      </div>

    </div>
    <div v-else class="score-contriner">
      您的成绩是：<span class="score" :style="{'color': score >= 80 ? 'green' : 'red'}">{{ score }}</span> 分
      <el-button
        v-if="score < 80"
        type="primary"
        size="medium"
        style="width:100%"
        @click="againHandle()"
      >重新考试</el-button>
    </div>
  </div>
</template>

<script>
import { examList, verifyIdCode, getName, submit } from '@/api/exam'
export default {
  data() {
    return {
      // optionType: '',
      empId: '',
      name: '',
      score: 0,
      showMain: false,
      showScore: false,
      dataForm: {
        idCode: ''
      },
      list: [],
      dataRule: {
        idCode: [
          {
            required: true,
            message: '身份证不能为空',
            trigger: ['blur', 'change']
          }
        ]
      },
      trainId: this.$router.history.current.query.trainId,
      videoId: this.$router.history.current.query.videoId,
      // cs
      isClient: this.$router.history.current.query.isClient,
      projectId: this.$router.history.current.query.projectId
    }
  },
  created() {
    this.getName()
  },
  methods: {
    getExamList() {
      examList({ videoId: this.videoId, isClient: this.isClient, projectId: this.projectId }).then(data => {
        if (data && data.code === 1000) {
          this.showMain = true
          this.list = data.result
        } else {
          this.showMain = false
        }
      })
    },
    getName() {
      getName({ videoId: this.videoId, isClient: this.isClient, projectId: this.projectId }).then(data => {
        this.name = data.result
      })
    },
    againHandle() {
      this.showScore = !this.showScore
      this.getExamList()
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          verifyIdCode({ ...this.dataForm, trainId: this.trainId, videoId: this.videoId, isClient: this.isClient, projectId: this.projectId }).then(
            data => {
              if (data && data.code === 1000) {
                this.empId = data.result

                this.getExamList()
              } else {
                this.$message.error(data.message)
              }
            }
          )
        }
      })
    },
    submit() {
      this.$confirm('您确定要提交试卷?', '提示', {
        confirmButtonText: '提交试卷',
        cancelButtonText: '再看看',
        closeOnClickModal: false,
        customClass: 'exam-confirm-style',
        type: 'warning'
      })
        .then(() => {
          const answer = this.list.map(item => {
            item.option = item.option || ''
            return item
          })
          submit({
            answer,
            empId: this.empId,
            trainId: this.trainId,
            videoId: this.videoId,
            isClient: this.isClient, projectId: this.projectId
          }).then(data => {
            this.score = data.result
            this.showScore = true
          })
          this.$message({
            type: 'success',
            message: '已成功提交试卷!'
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: ''
          // })
        })
    }
  }
}
</script>

<style lang="scss">
.exam-container {
  color: #606266;
  background: #f5f6f8;
  // padding: 10px;
  .form-style {
    .form-item-idcode {
      width: 72%;
      .el-form-item__content {
        width: 100%;
      }
    }
  }
  .link-top {
    height: 1px;
    margin: 10px 0;
    border-top: 1px solid #e5e5e5;
  }
  .main {
    padding: 10px;
    background: #fff;
    .main-dec {
      margin: 20px 0 40px 0;
    }
    h3 {
      margin: 0;
    }
    h4 {
      color: red;
      margin: 5px;
    }
  }
  .exam-main-wrap {
    padding: 10px;
    width: 100%;
    margin-top: 20px;
    background: #fff;
    h3 {
      display: inline-block;
      margin: 0;
      margin-right: 10px;
    }
    .dec {
      color: #a8a8a8;
    }
  }
  .main-content-item {
    margin-bottom: 20px;
    display: flex;
    .item-topic-img {
      margin-top: 10px;
      width: 90%;
      height: 150px;
    }
    .item-answer {
      display: flex;
      // border-top: 1px dashed #ebebeb;
      border-bottom: 1px dashed #ebebeb;
      margin: 10px 0;
      padding: 20px 0;
      img {
        vertical-align: middle;
        width: 120px;
        height: 120px;
      }
      .item-answer-item {
        flex: 1;
      }
      .el-radio-group {
        width: 100%;
        .el-radio {
          width: 50%;
          margin: 0;
          vertical-align: top;
          .el-radio__label {
            white-space: normal;
          }
        }
      }
    }
  }
}
.score-contriner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .score {
    font-size: 40px;
  }
}
.exam-confirm-style {
  width: 80%;
}
</style>
