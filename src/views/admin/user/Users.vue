<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddUser">新增用户</el-button>

    <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="90">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="员工号" width="120">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="员工姓名" width="220">
        <template slot-scope="scope">{{ scope.row.displayName }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="所属机构">
        <template slot-scope="scope">{{ scope.row.orgCode }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="电子邮件">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="用户角色">
        <template slot-scope="scope">{{ showRoles(scope.row.roles) }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
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
      <el-form :model="usr" label-width="80px" label-position="left">
        <el-form-item label="员工号">
          <el-input v-model="usr.userName" placeholder="员工工号"/>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="usr.displayName" placeholder="员工姓名"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="usr.password" type="password"/>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-autocomplete
            v-model="usr.orgCode"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入机构号"
            @select="handleSelect"
          />
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input v-model="usr.email" placeholder="邮箱地址"/>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmUser">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addUser, deleteUserById, editUser } from '@/api/user'
import { getAllBranchs } from '@/api/bran'

const defaultUser = {
  id: 0,
  userNo: '',
  password: '',
  username: '',
  orgCode: '',
  email: '',
  enabled: '',
  lastPasswordResetDate: '',
  roles: [],
  branchInfo: {}
}

export default {
  name: 'Users',
  data() {
    return {
      usr: Object.assign({}, defaultUser),
      routes: [],
      userList: [],
      branList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      listLoading: false,
      roleGroup: [],
      listQuery: {
        page: 0,
        pageSize: 10,
        sort: 'asc'
      },
      restaurants: [],
      timeout: null,
      total: 0
    }
  },
  computed: {
    routesData() {
      return this.routes
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
    async getList() {
      getList(this.listQuery)
        .then(response => {
          this.userList = response.data.data.content
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

      await getAllBranchs()
        .then(response => {
          this.branList = response.data.data
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    handleAddUser() {
      this.usr = Object.assign({}, defaultUser)
      this.hasAdded()
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.usr = scope.row
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the User?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteUserById({ id: row.id })
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    async confirmUser() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await editUser(this.usr)
      } else {
        await addUser(this.usr)
          .then(response => {
            this.userDialogVisible = false
            this.listloading = true
            if (response.data.success) {
              this.$message.success(response.data.msg)
            } else {
              this.$message.error(response.data.msg)
            }
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
      }

      this.getList()
      const { userNo, id, username } = this.usr
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${id}</div>
            <div>Role Nmae: ${username}</div>
            <div>Description: ${userNo}</div>
          `,
        type: 'success'
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
      this.usr.orgCode = item.orgCode
    },

    hasAdded() {
      this.branList.forEach(element => {
        const ak = {}
        ak.value = element.branCode + ':' + element.branName
        ak.orgCode = element.branCode
        this.restaurants.push(ak)
      })
    },
    showRoles(scope) {
      const arr = []
      scope.forEach(role => {
        arr.push(role.name)
      })
      return arr.toString()
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
<style>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
