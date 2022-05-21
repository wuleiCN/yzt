<template>
  <div class="record">
    <towerCrane :table-data="tableData" :fixed="fixed" />
  </div>
</template>

<script>
import towerCrane from './component.vue'
import { getList, craneProList, del } from '@/api-zhgd/zhgd-tower-crane'
import { parseTime } from '@/utils'
export default {
  components: {
    towerCrane
  },
  data() {
    return {
      fixed: 'right',
      dataForm: {
        name: '',
        isDel: 0,
        projectId: this.$store.state.user.loginInfo.projectId
      },
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      proName: '',
      proList: [],
      dataList: [],
      tableData: [
        {
          id: 'projectName',
          prop: 'projectName',
          fixed: true,
          headerAlign: 'center',
          tableWidth: 300,
          aling: 'center',
          lable: '项目名称'
        },
        {
          id: 'contractorName',
          prop: 'contractorName',
          headerAlign: 'center',
          tableWidth: 180,
          aling: 'center',
          lable: '施工总承包单位'
        },
        {
          id: 'name',
          prop: 'name',
          headerAlign: 'center',
          tableWidth: 180,
          aling: 'center',
          lable: '设备名称'
        },
        {
          id: 'recordNumber',
          prop: 'recordNumber',
          headerAlign: 'center',
          tableWidth: 180,
          aling: 'center',
          lable: '设备备案号'
        },
        {
          id: 'buildingNumber',
          prop: 'buildingNumber',
          headerAlign: 'center',
          tableWidth: 180,
          aling: 'center',
          lable: '栋号'
        },
        {
          id: 'RegNumber',
          prop: 'RegNumber',
          headerAlign: 'center',
          tableWidth: 180,
          aling: 'center',
          lable: '设备使用登记编号'
        },
        {
          id: 'status',
          prop: 'status',
          headerAlign: 'center',
          tableWidth: 180,
          aling: 'center',
          lable: '申报状态'
        },
        {
          id: 'usageTime',
          prop: 'usageTime',
          headerAlign: 'center',
          tableWidth: 180,
          aling: 'center',
          lable: '使用时间'
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      bindVisible: false
    }
  },
  async created() {
    // this.proList = await this.craneProListHandle()
    // if (this.proList.length) {
    //   this.proName = this.proList[0].projectName
    // }
    // this.getDataList()
  },
  methods: {
    // 获取项目列表
    craneProListHandle() {
      return new Promise(resolve => {
        craneProList().then(data => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          }
        })
      })
    },
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d}') : ''
            return item
          })
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
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
    bindHxzHandle(row) {
      this.bindVisible = true
      this.$nextTick(() => {
        this.$refs.bindHxz.init({ ...row })
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
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    }
  }
}
</script>

<style lang="scss">
.zhgd-tower-crane-device {
  .el-divider {
    width: .13rem;
    height: 2.6rem;
  }
}
</style>
