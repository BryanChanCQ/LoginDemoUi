<template>
  <div>
    <span style="color:#3b7f9e;fontStyle:normal;fontSize:18px">{{ name }}</span>
    <el-table :data="tableData" style="width: 100%;min-height:300px;padding-top: 15px;">
      <el-table-column label="应用名">
        <template slot-scope="scope">
          {{ scope.row.appName }}
        </template>
      </el-table-column>
      <el-table-column label="版本号" align="center">
        <template slot-scope="scope">
          {{ scope.row.version }}
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateBy }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { fetchList } from '@/api/transaction'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
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
