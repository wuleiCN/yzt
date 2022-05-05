<template>
  <div class="my-checkbox">
    <el-row>
      <el-col class="col-wrap" :span="24">
        <el-checkbox-group v-model="checkList" :style="{'height': toggle ? 'auto' : '30px'}" @change="changeHandle">
          <el-checkbox label="">不限</el-checkbox>
          <el-checkbox v-for="(item, index) in option" :key="index" :label="item.title">{{ item.title }}</el-checkbox>
        </el-checkbox-group>
        <div v-if="isShowToggle">
          <div v-if="!toggle" class="toggle-btn" @click="toggleHandle">展开 <i class="el-icon-arrow-down" /></div>
          <div v-else class="toggle-btn" @click="toggleHandle">收起 <i class="el-icon-arrow-up" /></div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: Array,
      default: () => {
        return []
      }
    },
    isShowToggle: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      toggle: false,
      checkList: ['']
    }
  },
  methods: {
    toggleHandle() {
      this.toggle = !this.toggle
    },
    changeHandle(selectList) {
      const select = [...selectList].pop()
      if (!select) {
        this.checkList = ['']
      } else {
        if (selectList.length) {
          this.checkList = selectList.filter(item => item !== '')
        } else {
          this.checkList = ['']
        }
      }
      this.$emit('change', this.checkList.filter(item => item !== ''))
    }
  }
}
</script>
<style lang="scss">
  .my-checkbox {
    .el-checkbox-group {
      // display: flex;
      overflow: hidden;
      // flex-wrap: wrap;
      line-height: 25px;
    }
    .el-checkbox__inner {
      display: none;
    }
    .el-checkbox {
      margin-bottom: 5px;
      margin-right: 10px;
    }
    .el-checkbox__label {
      padding: 0 10px;
      height: 30px;
      // background: red;
      font-size: 15px;
      line-height: 32px;
    }
    .is-checked {
      background: #1890ff;
      border-radius: 3px;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #fff;
    }
    .toggle-btn {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      color: #1890ff;
    }
    .col-wrap {
      padding-right: 100px;
    }
  }
</style>
