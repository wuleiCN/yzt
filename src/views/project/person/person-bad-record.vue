<template>
  <el-table
    :data="badList"
    stripe
    style="width: 100%"
  >
    <el-table-column
      prop="empName"
      label="姓名"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="empCode"
      width="160"
      label="身份证号码"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="eventName"
      label="事件类别"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="cause"
      width="130"
      :show-overflow-tooltip="true"
      label="	不良纪录内容"
      header-align="center"
      align="center"
    />
    <!-- <el-table-column
      prop="startTime"
      width="130"
      label="	生效日期"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="endTime"
      width="130"
      label="	失效日期"
      header-align="center"
      align="center"
    /> -->
    <el-table-column
      prop="createTime"
      width="130"
      label="录入时间"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="remark"
      label="备注"
      header-align="center"
      align="center"
    />
    <el-table-column
      prop="url"
      label="附件"
      header-align="center"
      align="center"
    >
      <template slot-scope="scope">
        <a v-if="scope.row.url" style="color: rgb(24, 144, 255)" target="_blank" :href="scope.row.url">附件预览</a>
        <el-button v-else type="text" :disabled="true" size="small">附件预览</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

import { badRecordList } from '@/api/project/person'
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
      badList: [],
      dataForm: {},
      dataRule: {}
    }
  },
  mounted() {
    if (this.id) this.getList(this.id)
  },
  methods: {
    getList(id) {
      badRecordList({ id }).then(data => {
        this.badList = data.result.map(item => {
          item.startTime = item.startTime ? parseTime(item.startTime, '{y}-{m}-{d}') : ''
          item.endTime = item.endTime ? parseTime(item.endTime, '{y}-{m}-{d}') : ''
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
