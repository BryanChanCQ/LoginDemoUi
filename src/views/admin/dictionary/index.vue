<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="dictionaryForm.name"
        size="small"
        style="width: 200px;"
        class="filter-item"
        placeholder="配置名"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        v-waves
        type="primary"
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        icon="el-icon-plus"
        @click="handleCreate"
      >新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      ref="singleTable"
      :data="list"
      style="min-height:363px;"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="父配置名">
        <template slot-scope="scope">
          <span>{{ scope.row.parentName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="配置名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="配置值">
        <template slot-scope="scope">
          <span>{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
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

    <el-dialog :visible.sync="dictionaryDialogVisible" :title="dialogTitle">
      <el-form
        ref="dictionaryForm"
        :model="dictionaryForm"
        :rules="formValidateRules"
        label-position="top"
      >
        <el-form-item label="父配置">
          <el-select
            v-model="dictionaryForm.parentName"
            filterable
            style="width: 100%"
            placeholder="请选择"
            @change="onParentSelectChange"
          >
            <el-option v-for="item in parents" :label="item.name" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="配置名" prop="name">
          <el-input v-model="dictionaryForm.name"/>
        </el-form-item>
        <el-form-item label="配置值" prop="key">
          <el-input v-model="dictionaryForm.key"/>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="submit">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList, queryParentDictionary, addDictionary, deleteDictionaryById, updateDictionaryById } from '@/api/dictionary'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'UserMgr',
  directives: {
    waves
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('配置名不能为空'))
      } else {
        callback()
      }
    }

    const validatekey = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('配置值不能为空'))
      } else {
        callback()
      }
    }

    return {
      list: null,
      total: null,
      listLoading: true,
      errorPath: '/errorPage/404',
      listQuery: {
        page: 0,
        pageSize: 10,
        sort: 'asc'
      },
      dictionaryForm: {
        id: '',
        parentId: '',
        parentName: '',
        name: '',
        key: '',
        method: ''
      },
      formValidateRules: {
        name: [{ required: true, trigger: 'change', validator: validateName }],
        key: [{ required: true, trigger: 'change', validator: validatekey }]
      },
      dictionaryDialogVisible: false,
      dialogTitle: '配置字典'
    }
  },
  created() {
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
          this.list = response.data.data.content
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
      queryParentDictionary({ page: 0, pageSize: 100, parentId: 0 })
        .then(response => {
          this.parents = response.data.data
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    onParentSelectChange(id) {
      const parent = this.parents.find(function(item) {
        return item.id === id
      })
      this.dictionaryForm.parentName = parent.name
      this.dictionaryForm.parentId = parent.id
    },
    submit() {
      if (this.dictionaryForm.method === 'add') {
        this.$refs.dictionaryForm.validate(valid => {
          if (valid) {
            if (!this.dictionaryForm.parentId) {
              this.dictionaryForm.parentId = 0
            }
            addDictionary(this.dictionaryForm)
              .then(response => {
                this.dictionaryDialogVisible = false
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
        this.$refs.dictionaryForm.validate(valid => {
          if (valid) {
            updateDictionaryById(this.dictionaryForm)
              .then(response => {
                this.dictionaryDialogVisible = false
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
      this.listQuery.page = 0
      this.listQuery.name = this.dictionaryForm.name
      this.getList()
    },
    handleDelete(id) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDictionaryById({ id: id })
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
      this.dictionaryDialogVisible = true
      this.dialogTitle = '配置字典新增'
      this.dictionaryForm = {
        id: '',
        parentId: '',
        parentName: '',
        name: '',
        key: '',
        method: 'add'
      }
      this.$nextTick(function() {
        this.$refs.dictionaryForm.clearValidate() // 移除校验结果
      })
    },
    handleEdit(row) {
      this.dictionaryDialogVisible = true
      this.dialogTitle = '配置字典修改'
      this.dictionaryForm = Object.assign({}, row)
      this.dictionaryForm.method = 'edit'
      this.$nextTick(function() {
        this.$refs.dictionaryForm.clearValidate()
      })
    }
  }
}
</script>
