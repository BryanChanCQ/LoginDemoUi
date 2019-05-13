<template>
  <div>
    <span style="color:#3b7f9e;fontStyle:normal;fontSize:18px">{{ name }}</span>
    <el-table ref="singleTable" :data="tableData" border fit highlight-current-row>
      <el-table-column align="center" label="发布计划名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布计划时间">
        <template slot-scope="scope">
          <span>{{ scope.row.windowDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发起人" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.createBy }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { fetchList } from '@/api/transaction'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
