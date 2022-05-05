<template>
  <div class="transfer">
    <div>
      <div class="transfer-title">
        <el-checkbox v-model="checkAll" style="display:inline-block" :indeterminate="isIndeterminate" @change="handleCheckAllChange" /> <span>未选中人员</span>
        <span style="float: right">{{ `${checkList.length}/${dataList.length}` }}</span>
      </div>
      <el-checkbox-group v-model="checkList" class="left-style" @change="handleCheckedCitiesChange">

        <div v-for="(item,index) in dataList" :key="index"> <el-checkbox :label="item.id">{{ item.empName }}</el-checkbox></div>
      </el-checkbox-group>
    </div>
    <el-button class="btn" type="primary" @click="toLeft"><i class="el-icon-arrow-left" /></el-button>
    <el-button class="btn" type="primary" @click="toRight"><i class="el-icon-arrow-right" /></el-button>
    <div>
      <div class="transfer-title">
        <el-checkbox v-model="checkAll1" style="display:inline-block" :indeterminate="isIndeterminate1" @change="handleCheckAllChange1" /> <span>选中人员</span>
        <span style="float: right">{{ `${rightCheckList.length}/${rightData.length}` }}</span>
      </div>
      <el-checkbox-group v-model="rightCheckList" class="left-style" @change="handleCheckedCitiesChange1">

        <div v-for="(item,index) in rightData" :key="index"> <el-checkbox :label="item.id">{{ item.empName }}</el-checkbox></div>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      checkAll: false,
      checkAll1: false,
      checkList: [],
      rightData: [],
      dataList: [],
      isIndeterminate: false,
      isIndeterminate1: false,
      rightCheckList: []
    }
  },
  methods: {
    toRight() {
      this.rightData = this.rightData.concat([...this.data].filter(item => {
        return this.checkList.includes(item.id)
      }))
      this.rightData = Array.from(new Set(this.rightData))
      this.dataList = [...this.data].filter(item => {
        return !this.rightData.includes(item)
      })
      this.dataList.sort((a, b) => a.index - b.index)
      this.rightCheckList = []
      this.checkList = []
    },
    toLeft() {
      this.dataList = this.dataList.concat([...this.rightData].filter(item => {
        return this.rightCheckList.includes(item.id)
      }))
      this.rightData = [...this.rightData].filter(item => {
        return !this.rightCheckList.includes(item.id)
      })
      this.dataList = Array.from(new Set(this.dataList))
      this.dataList.sort((a, b) => a.index - b.index)
      this.rightCheckList = []
      this.checkList = []
    },
    handleCheckAllChange(val) {
      this.checkList = val ? this.dataList.map(item => item.id) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.dataList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.dataList.length
    },
    handleCheckAllChange1(val) {
      this.rightCheckList = val ? this.rightData.map(item => item.id) : []
      this.isIndeterminate1 = false
    },
    handleCheckedCitiesChange1(value) {
      const checkedCount = value.length
      this.checkAll1 = checkedCount === this.rightData.length
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.rightData.length
    }
  }
}
</script>

<style lang="scss">
.transfer {
  display: flex;
  .left-style {
    border: 1px solid #DBDBDB;
    width: 225px;
    padding: 0 10px;
    height: 250px;
    overflow: auto;
  }
  .btn {
    margin: 0 5px;
    margin-top: 130px;
    height: 30px;
    vertical-align: middle;

  }
  .transfer-title {
    border: 1px solid #e6e6e6;
    background: #F3F7FF;
    padding: 0 10px;
  }
}

</style>
