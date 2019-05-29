<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        icon="el-icon-plus"
        @click="handleCreate"
      >编辑</el-button>
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        icon="el-icon-plus"
        @click="handleCreate"
      >删除</el-button>
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        icon="el-icon-search"
        @click="showSearchDialog=true"
      >高级搜索</el-button>
      <el-table
        v-loading="listLoading"
        ref="singleTable"
        :data="list"
        style="min-height:363px;"
        border
        fit
        highlight-current-row
        @row-dblclick="test"
      >
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="标题">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="分类">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="部门">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报告人">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="部门">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理组">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理人">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="showSearchDialog" title="高级搜索">
      <el-form :model="form" inline="true" label-position="left" label-width="80px" size="small">
        <el-form-item :label-width="formLabelWidth" label="创建时间">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="结束时间">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="公司">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报告人">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="分类">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="处理人">
          <el-input v-model="form.name" suffix-icon="user"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="服务目录">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="编号">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="标题">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="标签">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="描述">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="状态">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="问题来源">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="影响范围">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="优先级">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="紧急度">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="处理组">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="showSearchDialog = false">重 置</el-button>
        <el-button @click="showSearchDialog = false">取 消</el-button>
        <el-button type="primary" @click="showSearchDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  deleteRoleResourceById,
  addRoleResource,
  editRoleResource
} from '@/api/permission'

import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'AddIssue',
  directives: {
    waves
  },
  data() {
    return {
      errorPath: '/errorPage/404',
      list: [{ ip: '111' }],
      showSearchDialog: false,
      form: {
        name: '',
        region: ''
      }
    }
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    test() {
      this.$router.push({ path: '/issue/addIssue' })
    },
    getList() {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
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
    onRoleSelectChange(id) {
      const role = this.roles.find(function(item) {
        return item.id === id
      })
      this.roleResourceForm.roleName = role.name
      this.roleResourceForm.roleId = role.id
    },
    onResourceSelectChange(id) {
      const resource = this.resources.find(function(item) {
        return item.id === id
      })
      this.roleResourceForm.resourceName = resource.name
    },
    onResourceTypeSelectChange(id) {
      const resource = this.options.find(function(item) {
        return item.value === id
      })
      this.roleResourceForm.resourceTypeName = resource.label
    },
    submit() {
      if (this.roleResourceForm.method === 'add') {
        this.$refs.roleResourceForm.validate(valid => {
          if (valid) {
            addRoleResource(this.roleResourceForm)
              .then(response => {
                this.roleResourceDialogVisible = false
                if (response.data.success) {
                  this.$message.success(response.data.msg)
                  this.getList()
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
        })
      } else {
        this.$refs.roleResourceForm.validate(valid => {
          if (valid) {
            editRoleResource(this.roleResourceForm)
              .then(response => {
                this.roleResourceDialogVisible = false
                if (response.data.success) {
                  this.$message.success(response.data.msg)
                  this.getList()
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
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listQuery.roleName = this.roleName
      this.getList()
    },
    handleDelete(id) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRoleResourceById({ id: id })
            .then(response => {
              if (response.data.success) {
                this.$message.success(response.data.msg)
                this.getList()
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
        })
        .catch(() => {})
    },
    handleCreate() {
      this.roleResourceDialogVisible = true
      this.dialogTitle = '角色资源配置新增'
      this.roleResourceForm = {
        id: '',
        roleId: '',
        roleName: '',
        resourceId: '',
        resourceName: '',
        resourceType: '',
        resourceTypeName: '',
        method: 'add'
      }
      this.$nextTick(function() {
        this.$refs.roleResourceForm.clearValidate() // 移除校验结果
      })
    },
    handleEdit(row) {
      this.roleResourceDialogVisible = true
      this.dialogTitle = '角色资源配置修改'
      this.roleResourceForm = Object.assign({}, row)
      this.roleResourceForm.method = 'edit'
      this.$nextTick(function() {
        this.$refs.roleResourceForm.clearValidate()
      })
    }
  }
}
</script>
