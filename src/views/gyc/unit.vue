<template>
  <div class="gyc-unit-page">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="projectId">
        <el-select v-model="dataForm.projectId" filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="liveAreaId">
        <el-select v-model="dataForm.liveAreaId" filterable style="width:100%" placeholder="请选择生活区" @change="(e) => searchHandle(e, 'liveAreaId')">
          <el-option v-for="(item, index) in communityList" :key="index" :label="item.liveAreaName" :value="item.id">{{ item.liveAreaName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-permit="'gyc_unit_btn_allot'" type="primary" @click="dormitoryAllotHandle">宿舍分配</el-button>
      </el-form-item>
    </el-form>
    <div class="unit-container">
      <el-card shadow="never" class="unit-card-wtap">
        <div slot="header" class="clearfix">
          <span>楼栋管理</span>
          <span>{{ unitList.length ? `(${unitList[0].liveAreaName})` : '' }} </span>
          <el-button v-permit="'gyc_unit_btn_add'" style="float: right;font-size: 16px;padding: 0px" type="text" @click="addOrUpdateUnitHandle({})">新增楼栋</el-button>
        </div>
        <div v-for="(item, index) in unitList" :key="item.id" :class="index === activeIndex ? 'activeClass' : ''" class="unit-item">
          <div style="padding: 5px 10px;" @click="selectUnitCard(index, item)">
            <el-row>
              <el-col :span="12"><span>名称：{{ item.unitName }}</span></el-col>
              <el-col :span="12"><span>楼层：{{ item.floor }}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span>房间数(层)：{{ item.roomNums }}</span></el-col>
              <el-col :span="12"><span>类型：{{ item.unitTypeTitle }}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span>是否开启：{{ item.isOpen ? '是' : '否' }}</span></el-col>
              <el-col :span="12"><span>责任人：{{ item.personLiable }}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span>责任人电话：{{ item.personLiablePhone }}</span></el-col>
            </el-row>
            <div class="clearfix bottom">
              <el-button v-permit="'gyc_unit_btn_update'" type="text" class="button" @click="addOrUpdateUnitHandle(item)">修改</el-button>
              <el-button v-permit="'gyc_unit_btn_delete'" type="text" class="button" style="color: rgb(254, 27, 54);" @click="deleteHandle(item.id)">删除</el-button>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
      <el-card style="margin-top:15px" shadow="never" class="dormitory-card-wtap">
        <div slot="header" class="clearfix">
          <span>宿舍管理</span>
          <div style="float: right;">
            <el-button v-permit="'gyc_dormitory_btn_update'" style="font-size: 16px;padding: 0px" :disabled="!!!dormList.filter(item => item.isSelect).length" type="text" @click="addDormitoryHandle('update')">批量修改</el-button>
            <el-divider direction="vertical" />
            <el-button v-permit="'gyc_dormitory_btn_delete'" style="font-size: 16px;padding: 0px" :disabled="!!!dormList.filter(item => item.isSelect).length" type="text" @click="delDormitoryHandle">批量删除</el-button>
          </div>
        </div>
        <div v-for="(item,index) in Object.keys(newdormList)" :key="index">
          <div style="font-size: 20px;font-weight: 600;margin-top:5px">{{ item }}</div>
          <el-card
            v-for="(ele, idx) in newdormList[item]"
            :key="idx"
            :style="ele.isSelect ? 'border: 2px solid #E6A23C;padding:3px': ''"
            :class="[ele.isOpen ? '' : 'close-style']"
            class="item-card-dormitory"
            :body-style="{ padding: '0px' }"
          >
            <div style="padding: 5px 10px;" @click="selectDormCard(ele)">
              <div>门牌：{{ ele.houseNumber }} ({{ ele.sex }})</div>
              <div>已住/可住: {{ ele.liveNums }}/{{ ele.allNums }}</div>
              <div>是否开启：{{ ele.isOpen ? '是' : '否' }}</div>
              <div>收费：{{ ele.cost || 0 }}</div>
              <el-button type="text" class="button" @click="dormDetailHandle(ele)">查看</el-button>
              <div v-if="ele.liveNums === ele.allNums" class="full-style">已住满</div>
            </div>
          </el-card>
        </div>
        <el-card v-if="!dormList.length" class="item-card-dormitory" style="margin: 10px" :body-style="{ padding: '5px' }">
          <div class="add-unit-btn" @click="addDormitoryHandle('add')">
            <i class="el-icon-plus" />
          </div>
        </el-card>
      </el-card>
      <generate-dormitory v-if="generateVisible" ref="generate" @refreshDataList="getdormitoryList" />
      <dormitory-allot v-if="dormitoryAllotVisible" ref="dormitoryAllot" @refreshDataList="getdormitoryList" />
      <dormitory-detail v-if="dormitoryDetailVisible" ref="dormitoryDetail" @refreshDataList="getdormitoryList" />
    </div>
  </div>
</template>
<script>
import AddOrUpdate from './unit-add-or-update'
import DormitoryAllot from './unit-dormitory-allot'
import GenerateDormitory from './unit-generate-dormitory'
import DormitoryDetail from './unit-dormitory-detail'
import { proOptionList } from '@/api/gyc/community'
import { liveAreaList, unitList, optionList, del, dormitoryList, delDormitory } from '@/api/gyc/unit'
export default {
  components: {
    AddOrUpdate,
    DormitoryAllot,
    DormitoryDetail,
    GenerateDormitory
  },
  data() {
    return {
      dataForm: {
        projectId: '',
        liveAreaId: ''
      },
      activeIndex: '',
      addOrUpdateVisible: false,
      dormitoryDetailVisible: false,
      generateVisible: false,
      dormitoryAllotVisible: false,
      proList: [],
      DormIndexArr: [],
      areaUnitTypes: [],
      unitList: [],
      newdormList: {},
      dormList: [],
      communityList: []
    }
  },
  async mounted() {
    await this.getProOptionList()
    this.getOptionList()
  },
  methods: {
    // 下拉生活区楼栋类型
    getOptionList() {
      optionList({ category: 'AREA_UNIT_TYPE' }).then(data => {
        this.areaUnitTypes = data.result
      })
    },
    // 添加楼栋 / 修改楼栋
    addOrUpdateUnitHandle(row) {
      if (!this.dataForm.liveAreaId) return this.$message.error('请选择生活区')
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row, ...this.dataForm, areaUnitTypes: this.areaUnitTypes })
      })
    },
    // 宿舍分配
    dormitoryAllotHandle(row) {
      this.dormitoryAllotVisible = true
      this.$nextTick(() => {
        this.$refs.dormitoryAllot.init({ ...row })
      })
    },
    // 单个宿舍分配
    dormDetailHandle(row) {
      this.dormitoryDetailVisible = true
      this.$nextTick(() => {
        this.$refs.dormitoryDetail.init({ ...row })
      })
    },
    addDormitoryHandle(type) {
      let ids = []
      if (type === 'update') {
        const fList = this.dormList.filter(item => item.isSelect)
        ids = fList.map(item => item.id)
      } else {
        ids = []
      }
      if (this.activeIndex === '') return this.$message.error('请选择楼栋')
      this.generateVisible = true
      this.$nextTick(() => {
        const unitItem = this.unitList && this.unitList.length ? this.unitList[this.activeIndex] : {}
        this.$refs.generate.init({ ...unitItem, ids })
      })
    },
    delDormitoryHandle() {
      const fList = this.dormList.filter(item => item.isSelect)
      const ids = fList.map(item => item.id)
      this.$confirm(`您确定进行删除宿舍操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDormitory(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getdormitoryList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 选择楼栋
    selectUnitCard(index, item) {
      this.activeIndex = index
      this.item = item
      this.dataForm.unitId = this.item.id
      this.newdormList = []
      this.getdormitoryList()
    },
    // 选择宿舍
    selectDormCard(item) {
      this.$set(item, 'isSelect', !item.isSelect)
    },
    searchHandle(val, type) {
      this.pageIndex = 1
      this.dataForm[type] = val
      if (type === 'projectId') {
        this.unitList = []
        this.communityList = []
        this.newdormList = []
        this.getLiveAreaList()
      }
      if (type === 'liveAreaId') {
        this.activeIndex = ''
        this.newdormList = []
        this.getDataList()
      }
    },
    // 获取楼栋列表
    getDataList() {
      return new Promise(resolve => {
        unitList({ liveAreaId: this.dataForm.liveAreaId }).then((data) => {
          if (data && data.code === 1000) {
            this.unitList = data.result
            this.dataForm.unitId = this.unitList.length ? this.unitList[0].id : ''
            if (this.dataForm.unitId) {
              this.activeIndex = 0
              this.getdormitoryList()
            }
            resolve(this.unitList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 获取宿舍列表
    getdormitoryList() {
      return new Promise(resolve => {
        dormitoryList({ unitId: this.dataForm.unitId }).then((data) => {
          if (data && data.code === 1000) {
            this.dormList = data.result
            this.newdormList = []
            this.dormList.map(item => {
              if (Object.keys(this.newdormList).indexOf(item.floor) === -1) {
                this.newdormList[item.floor] = []
              }
              this.newdormList[item.floor].push(item)
              return item
            })
            this.activeNames = Object.keys(this.newdormList)
            resolve(this.dormList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 获取项目下拉
    getProOptionList() {
      return new Promise(resolve => {
        proOptionList().then((data) => {
          if (data && data.code === 1000) {
            this.proList = data.result
            this.dataForm.projectId = this.proList.length ? this.proList[0].id : ''
            if (this.dataForm.projectId) this.getLiveAreaList()
            resolve(this.proList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    getLiveAreaList() {
      return new Promise(resolve => {
        liveAreaList({ projectId: this.dataForm.projectId }).then((data) => {
          if (data && data.code === 1000) {
            this.communityList = data.result
            this.dataForm.liveAreaId = this.communityList.length ? this.communityList[0].id : ''
            if (this.dataForm.liveAreaId) this.getDataList()
            resolve(this.communityList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id }).then((data) => {
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
  .gyc-unit-page {
    .unit-container {
      // display: flex;
      .el-row {
        line-height: 25px;
      }
      .el-card__body {
        padding: 0;
      }
      .close-style {
        color: #fff;
        background: #c0c4cc;
      }
      .full-style {
        position: absolute;
        border-radius: 45px;
        height: 25px;
        width: 60px;
        padding-top: 2px;
        text-align: center;
        color: #fff;
        background: red;
        bottom: 3px;
        right: 10px;
      }
      .dormitory-card-wtap {
        .el-card__body {
          height: 430px;
          overflow-y: auto;
        }
      }
      .unit-card-wtap {
        .unit-item {
          border: 1px solid #e6ebf5;
          box-shadow: 0 2px 12px 0 #e6ebf5;
          cursor: pointer;
          display: inline-block;
          width:270px;
          height: 145px;
          overflow-y: auto;
          margin: 10px;
          font-size: 15px;
        }
      }
      .item-card-dormitory {
        position: relative;
        cursor: pointer;
        width: 135px;
        font-size: 14px;
        margin: 0 10px;
        height: 125px;
        line-height: 22px;
        display: inline-block;
      }
      .activeClass {
        background: url('../../assets/gyc-unit-bg.png') center no-repeat no-repeat;
        background-size: 150% 150%;
      }
      .add-unit-btn {
        text-align: center;
        i {
          font-size: 100px;
        }
      }
    }

  }
</style>
