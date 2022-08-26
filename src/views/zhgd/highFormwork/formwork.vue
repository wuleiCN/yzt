<template>
  <div class="zhgd-formwork">
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
        type="index"
        header-align="center"
        align="center"
        width="120"
        label="序号"
      />
      <el-table-column
        prop="serialNumber"
        header-align="center"
        align="center"
        label="部位编号"
      />
      <el-table-column
        prop="pointNo"
        header-align="center"
        align="center"
        label="测点编号"
      />
      <el-table-column
        prop="pointType"
        header-align="center"
        align="center"
        label="测点类型"
      />
      <el-table-column
        prop="pointValue"
        header-align="center"
        align="center"
        width="300"
        label="测点值"
      />
      <el-table-column
        prop="state"
        header-align="center"
        align="center"
        label="报警状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == 0" size="small" type="success">正常</el-tag>
          <el-tag v-if="scope.row.state == 1" size="small" type="danger">异常</el-tag>
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
    <div class="tips">
      <span class="anticon"><i class="el-icon-warning" style="color: #ffa42e;" /></span>
      <div class="ant-alert-message">
        <p>1、测点数据为设备自动上报，自动更新，请参照实际生产工况；</p>
        <p>1、如需在平面图监测测点，请先上传平面图，并在平面图点击左键设置监测位置；</p>
        <p>1、更换平面图，会移除已配置的测点位置；</p>
      </div>
    </div>
    <div class="drag-warp">
      <div class="tags">
        <div class="tags-tilte">
          <span>
            <span style="background-color: #46cf84;" />
            <span>正常</span>
          </span>
          <span>
            <span style="background-color: #e0e0e0;" />
            <span>离线</span>
          </span>
          <span>
            <span style="background-color: #ff7570;" />
            <span>报警</span>
          </span>
          <span>
            <span style="background-color: #ffa42e;" />
            <span>预警</span>
          </span>
        </div>
        <div class="upload-lmg">
          <upload-img :limit="'image'" :title="'上传平面图'" />
        </div>
      </div>
      <div class="tags-warp">
        <div class="tags-points">
          <p>配置位置测点</p>
          <div class="points-list">
            <span v-for="(item, idx) in 5" :key="idx">{{ idx + 1 }}</span>
          </div>
        </div>
        <div class="tags-plan" @click="showMarkModal">
          <img src="https://medusa-test.oss-cn-hangzhou.aliyuncs.com/csm-storage/2022-06-01-16:18:23/T1eUC_B4KT1RCvBVdK.png">
          <span
            v-for="(item, ids) in pointsList"
            :key="ids"
            class="points-plan"
            :style="{
              left: item.longitude + 'px',
              top: item.latitude + 'px',
            }"
            @click="e => updatePoint(e, item)"
          >
            {{ item.id }}
          </span>
        </div>
      </div>
    </div>
    <MarkModal v-if="markVisible" ref="markPoints" @refreshDataList="getPoints" />
  </div>
</template>
<script>
import UploadImg from '@/components/upload.vue'
import MarkModal from './mark-points.vue'
export default {
  components: {
    UploadImg,
    MarkModal
  },
  data() {
    return {
      dataForm: {
        deviceName: '',
        projectId: this.$store.state.user.loginInfo.projectId,
        isDel: 0
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      dataList: [
        {
          serialNumber: '001',
          pointNo: '#121321',
          pointType: '立杆轴力',
          pointValue: '46.3',
          state: 0
        },
        {
          serialNumber: '001',
          pointNo: '#121321',
          pointType: '水平位移',
          pointValue: '46.3',
          state: 0
        },
        {
          serialNumber: '001',
          pointNo: '#121321',
          pointType: '模板沉降',
          pointValue: '46.3',
          state: 0
        },
        {
          serialNumber: '001',
          pointNo: '#121321',
          pointType: '立杆倾斜',
          pointValue: '46.3',
          state: 0
        },
        {
          serialNumber: '001',
          pointNo: '#121321',
          pointType: '地基沉降',
          pointValue: '46.3',
          state: 0
        }
      ],
      pointsList: [],
      dataListLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      pointXY: {
        top: 0,
        left: 0
      },
      markVisible: false
    }
  },
  async created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      // this.dataListLoading = true
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    showMarkModal(e) {
      this.markVisible = true
      this.$nextTick(() => {
        this.$refs.markPoints.init({ offsetX: e.offsetX, offsetY: e.offsetY, id: null, is: null })
      })
    },
    updatePoint(e, r) {
      e.stopPropagation()
      this.markVisible = true
      this.$nextTick(() => {
        this.$refs.markPoints.init({ offsetX: e.offsetX, offsetY: e.offsetY, id: r.id, is: true })
      })
    },
    getPoints(emit, s) {
      if (s) {
        if (this.pointsList.length) {
          if (!this.pointsList.some(v => v.id === emit.id)) this.pointsList.push({ ...emit })
          else {
            this.pointsList.map((s, i) => {
              if (s.id === emit.id && i === 0) this.pointsList.splice(0, 1, { ...emit })
              else if (s.id === emit.id && i !== 0) {
                this.pointsList.splice(i, 1, { ...emit })
              }
            })
          }
        } else {
          this.pointsList.push({ ...emit })
        }
      } else {
        this.pointsList = this.pointsList.filter(v => v.id !== emit.id)
        console.log(emit, this.pointsList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zhgd-formwork {
  .tips {
    display: flex;
    width: 99.5%;
    background: #f0f3ff;
    border: 1px solid #a1adff;
    border-radius: 3px;
    .ant-alert-message {
      color: #7c7c7c;
      p {
        font-size: 16px;
      }
    }
    .anticon {
      width: 44px;
      height: 44px;
      text-align: center;
      line-height: 50px;
    }
  }
  .drag-warp {
    height: 560px;
    background: #f2f2f2;
    margin-top: 25px;
    padding: 24px 0;
    .tags {
      display: flex;
      justify-content: flex-end;
      .tags-tilte {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: rgba(0,0,0,.85);
        span {
          span:nth-child(1) {
            width: 12px;
            height: 12px;
            display: inline-block;
            margin-left: 10px;
            border-radius: 50%;
          }
        }
      }
      .upload-lmg {
        margin: 0 20%;
      }
    }
    .tags-warp {
      display: flex;
      width: 700px;
      height: 420px;
      margin-top:20px;
      margin-left: 50%;
      transform: translateX(-50%);
      .tags-points {
        width: 144px;
        height: 100%;
        background: #e0e0e0;
        padding: 10px;
        .points-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          span {
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #fff;
            background: #46cf84;
            display: inline-block;
            margin: 5px;
            border-radius: 50%;
          }
        }
      }
      .tags-plan {
        position: relative;
        width: 100%;
        border: #e0e0e0 1px solid;
        img {
          width: 100%;
          height: 100%;
          margin: 0;
          border: 0;
        }
        .points-plan {
          position: absolute;
          width: 32px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          color: #fff;
          background: #46cf84;
          display: inline-block;
          margin: 5px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
