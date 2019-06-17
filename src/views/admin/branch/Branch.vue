<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddBran">新增机构</el-button>

    <el-table :data="branList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="机构号" width="120">
        <template slot-scope="scope">{{ scope.row.branCode }}</template>
      </el-table-column>
      <el-table-column align="center" label="机构名称">
        <template slot-scope="scope">{{ scope.row.branName }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="上级机构" width="220">
        <template slot-scope="scope">{{ scope.row.supperBran }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page + 1"
        :page-sizes="[10,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'用户修改':'用户新增'">
      <el-form :model="bran" label-width="80px" label-position="left">
        <el-form-item label="机构号">
          <el-input v-model="bran.branCode" placeholder="机构编码"/>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="bran.branName" placeholder="机构名称"/>
        </el-form-item>
        <el-form-item label="上级机构">
          <el-input v-model="bran.supperBran" placeholder="上级机构"/>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="comfirmBran">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBran, deleteBran, updateBran, getList } from '@/api/bran'

const defaultBran = {
  branCode: '',
  branName: '',
  supperBran: ''
}

export default {
  name: 'Branch',
  data() {
    return {
      bran: Object.assign({}, defaultBran),
      branList: [],
      dialogVisible: false,
      dialogType: 'new',
      listQuery: {
        page: 0,
        limit: 10,
        sort: 'asc'
      }
    }
  },
  computed: {
    branData() {
      return this.bran
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val - 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.branList = response.data.data.content
          this.total = response.data.data.totalElements
          setTimeout(() => {
            this.listLoading = false
          }, 200)
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    handleAddBran() {
      this.bran = Object.assign({}, defaultBran)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.bran = scope.row
    },
    handleDelete(scope) {
      console.log(scope)
      this.$confirm('你确定需要删除该机构信息?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          console.log(scope)
          deleteBran({ branCode: scope.branCode }).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    async comfirmBran() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateBran(this.bran)
        this.getList()
      } else {
        const data = await addBran(this.bran)
        this.bran.branCode = data.branCode
        this.getList()
      }

      const { branCode, branName, supperBran } = this.bran
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>机构号: ${branCode}</div>
            <div>机构名称: ${branName}</div>
            <div>上级机构: ${supperBran}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
