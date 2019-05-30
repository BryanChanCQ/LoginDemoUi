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
      >新增</el-button>
      <el-table
        v-loading="listLoading"
        ref="singleTable"
        :data="list"
        style="min-height:363px;"
        border
        fit
        highlight-current-row
        @row-dblclick="editIssue"
      >
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="标题">
          <template slot-scope="scope">
            <span>{{ scope.row.issueTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.issueIdentifier }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="优先级">
          <template slot-scope="scope">
            <span>{{ scope.row.priorityLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="问题日期">
          <template slot-scope="scope">
            <span>{{ scope.row.issueCreateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理组">
          <template slot-scope="scope">
            <span>{{ scope.row.handleIssueGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理人">
          <template slot-scope="scope">
            <span>{{ scope.row.handleIssueStaff }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            <el-button type="danger" size="small" @click="handleSubmit(scope.row)">提交</el-button>
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
    </div>
    <el-dialog :visible.sync="showIssueDialog" :title="dialogTitle" width="45%">
      <el-form ref="issueForm" :model="issueForm" :rules="rules" size="medium">
        <table class="gridtable">
          <tbody>
            <tr>
              <th>问题编码</th>
              <td>
                <el-form-item>
                  <el-input :disabled="true" v-model="issueForm.issueIdentifier"/>
                </el-form-item>
              </td>
              <th>问题提出机构</th>
              <td>
                <el-form-item>
                  <el-input v-model="issueForm.institution" suffix-icon="el-icon-edit"/>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>联系方式</th>
              <td>
                <el-form-item>
                  <el-input v-model="issueForm.contact" suffix-icon="el-icon-edit"/>
                </el-form-item>
              </td>
              <th>报告人</th>
              <td>
                <el-form-item>
                  <el-input v-model="issueForm.issueReporter" suffix-icon="el-icon-edit"/>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>问题优先级</th>
              <td>
                <el-form-item prop="desc">
                  <el-select v-model="issueForm.priorityLevel" placeholder="请选择">
                    <el-option v-for="item in options" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </td>
              <th>问题发生日期</th>
              <td>
                <el-form-item prop="type">
                  <el-date-picker
                    v-model="issueForm.issueCreateDate"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>问题标题</th>
              <td colspan="3">
                <el-form-item prop="resource">
                  <el-input v-model="issueForm.issueTitle"/>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>问题描述</th>
              <td colspan="3">
                <el-form-item prop="desc">
                  <el-input v-model="issueForm.description"/>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>问题处理组</th>
              <td>
                <el-form-item label prop="desc">
                  <el-select v-model="issueForm.handleIssueGroup" placeholder="请选择">
                    <el-option v-for="item in options" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </td>
              <th>问题处理人</th>
              <td>
                <el-form-item prop="desc">
                  <el-select v-model="issueForm.handleIssueStaff" placeholder="请选择">
                    <el-option v-for="item in options" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>问题状态</th>
              <td>
                <el-form-item label prop="desc">
                  <el-select v-model="issueForm.status" placeholder="请选择">
                    <el-option v-for="item in options" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </td>
              <th>附件</th>
              <td>
                <el-form-item prop="desc">
                  <el-upload
                    ref="upload"
                    :headers="headers"
                    :data="testData"
                    :auto-upload="false"
                    :file-list="uploadFileList"
                    :on-remove="deleteUploadFile"
                    :on-preview = "downloadAttachmentFile"
                    list-type="text"
                    class="upload-demo"
                    action="http://localhost:9088/Issue/uploadAttechmentFile"
                  >
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button
                      style="margin-left: 10px;"
                      size="small"
                      type="success"
                      @click="submitUpload"
                    >上传到服务器</el-button>
                  </el-upload>
                </el-form-item>
              </td>
            </tr>
          </tbody>
          <el-button
            v-waves
            type="primary"
            size="small"
            class="filter-item"
            style="margin-left: 10px;"
            icon="el-icon-plus"
            @click="saveIssue"
          >保存</el-button>
        </table>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import Tinymce from '@/views/components-demo/tinymce'
import Cookies from 'js-cookie'
import {
  getList,
  addIssue,
  submitIssue,
  uploadAttechmentFile,
  getUploadFileList,
  deleteUploadFile,
  downloadAttachmentFile
} from '@/api/issue/addIssue'
export default {
  name: 'AddIssue',
  directives: {
    waves
  },
  components: {
    'v-Tinymce': Tinymce
  },
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
      errorPath: '/errorPage/404',
      showIssueDialog: false,
      showUploadDialog: false,
      headers: {
        jwtHeader: Cookies.get('jwtHeader')
      },
      uploadFileList: [],
      list: null,
      listLoading: true,
      dialogTitle: '',
      listQuery: {
        page: 0,
        limit: 10,
        sort: 'asc'
      },
      testData: {
        id: ''
      },
      fileObj: {
        name: '',
        url: ''
      },
      issueForm: {
        issueIdentifier: '',
        institution: '',
        contact: '',
        issueReporter: '',
        priorityLevel: '',
        issueCreateDate: '',
        issueTitle: '',
        description: '',
        handleIssueGroup: '',
        handleIssueStaff: '',
        method: ''
      },
      options: ['test1', 'test2']
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    submitUpload() {
      this.testData.id = this.issueForm.issueIdentifier
      this.$refs.upload.submit()
    },
    deleteUploadFile(file, fileList) {
      console.log(file)
      deleteUploadFile({ fileUrl: file.url, id: file.id })
        .then(response => {
          console.log('success')
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    downloadAttachmentFile(file) {
      debugger
      downloadAttachmentFile({ fileUrl: file.url })
        .then(response => {
          debugger
          console.log('success')
          if (!response) {
            return
          }
          const blob = new Blob([response.data], { type: 'application/octet-stream;charset=utf-8' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          // 获取文件名
          let fileName = null
          debugger
          if (file.url.indexOf('/') !== -1) {
            fileName = file.url.substring(file.url.lastIndexOf('/') + 1)
          } else {
            fileName = file.url
          }
          // download 属性定义了下载链接的地址而不是跳转路径
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
        .then(() => {})
        .catch(() => {})
    },
    handleCreate() {
      this.showIssueDialog = true
      this.dialogTitle = '新增问题'
      this.fileList = []
      this.issueForm = {
        issueIdentifier: 'QC' + new Date().getTime(),
        institution: '',
        contact: '',
        issueReporter: '',
        priorityLevel: '',
        issueCreateDate: '',
        issueTitle: '',
        description: '',
        handleIssueGroup: '',
        handleIssueStaff: '',
        method: 'add'
      }
      this.$nextTick(function() {
        this.$refs.issueForm.clearValidate() // 移除校验结果
      })
    },
    editIssue(row) {
      this.showIssueDialog = true
      this.dialogTitle = '修改问题'
      this.issueForm = Object.assign({}, row)
      this.issueForm.method = 'edit'
      this.uploadFileList = []
      getUploadFileList({ issueIdentifier: row.issueIdentifier })
        .then(response => {
          this.convertUploadFileList(response.data.data)
        })
        .catch(error => {
          debugger
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
      this.$nextTick(function() {
        this.$refs.issueForm.clearValidate()
      })
    },
    convertUploadFileList(list) {
      for (var i = 0; i < list.length; i++) {
        const fileObj = {
          id: '',
          name: '',
          url: ''
        }
        fileObj.id = list[i].id
        fileObj.name = list[i].attachmentName
        fileObj.url = list[i].attachmentPath
        this.uploadFileList.push(fileObj)
      }
    },
    saveIssue() {
      if (this.issueForm.method === 'add') {
        addIssue(this.issueForm)
          .then(response => {
            this.showIssueDialog = false
            this.listloading = true
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
    },
    handleSubmit(row) {
      submitIssue(row)
        .then(response => {
          this.$message.success('提交成功')
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    uploadAttechmentFile() {
      uploadAttechmentFile()
        .then(response => {
          this.$message.success('提交成功')
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    }
  }
}
</script>

<style scoped>
table.gridtable {
  margin: 0 auto;
  margin-top: 10px;
  font-family: verdana, arial, sans-serif;
  font-size: 12px;
  color: #333333;
  border-width: 1px;
  border-color: #ddd;
  border-collapse: collapse;
}
table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #ddd;
  background-color: #eee;
}
table.gridtable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #ddd;
  background-color: #ffffff;
}
</style>
