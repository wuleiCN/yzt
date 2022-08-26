<template>
  <div class="historical-data">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        header-align="center"
        align="center"
        prop="terminalNumber"
        fixed
        label="终端编号"
        width="150"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="测点1"
      >
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor1.number"
          label="编号"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor1.type"
          label="类型"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor1.record"
          label="数据"
        />
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="测点2"
      >
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor2.number"
          label="编号"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor2.type"
          label="类型"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor2.record"
          label="数据"
        />
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="测点3"
      >
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor3.number"
          label="编号"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor3.type"
          label="类型"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="monitor3.record"
          label="数据"
        />
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="date"
        align="center"
        label="测点2"
      />
      <el-table-column
        header-align="center"
        prop="date"
        align="center"
        label="测点2"
      />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {

      },
      tableData: [
        {
          terminalNumber: '#00101',
          monitor1: {
            number: '#10011',
            type: '立杆轴力',
            record: '	27.6'
          },
          monitor2: {
            number: '#10011',
            type: '立杆轴力',
            record: '	27.6'
          },
          monitor3: {
            number: '#10011',
            type: '立杆轴力',
            record: '	27.6'
          },
          date: '2016-05-03'
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    }
  },
  methods: {
    init(row) {

    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
