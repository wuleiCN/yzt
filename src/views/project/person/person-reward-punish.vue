<template>
  <el-table
    :data="list"
    stripe
    style="width: 100%"
  >
    <el-table-column
      prop="type"
      label="类别"
      header-align="center"
      align="center"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.type === 1 ? '奖励' : '惩罚' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="projectName"
      label="所属项目"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="amount"
      label="奖惩金额"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="categoryName"
      label="	奖惩类别"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="levelName"
      label="	奖惩级别"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="createTime"
      label="	时间"
      header-align="center"
      align="center"
    />
  </el-table>
</template>

<script>

import { rewardPunishList } from '@/api/project/person'
import { parseTime } from '@/utils'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      list: [],
      dataForm: {},
      dataRule: {}
    }
  },
  created() {
    if (this.id) this.getList(this.id)
  },
  methods: {
    getList(id) {
      rewardPunishList({ id }).then(data => {
        this.list = data.result.map(item => {
          item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d}') : ''
          return item
        })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
