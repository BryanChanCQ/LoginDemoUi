<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="eventTitle"
        size="small"
        style="width: 200px;"
        class="filter-item"
        placeholder="标题"
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
      <el-table
        v-loading="listLoading"
        ref="singleTable"
        :data="list"
        style="min-height:363px;"
        border
        fit
        highlight-current-row
        @row-dblclick="editEvent"
      >
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="事件编号">
          <template slot-scope="scope">
            <span>{{ scope.row.eventIdentifier }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标题">
          <template slot-scope="scope">
            <span>{{ scope.row.eventTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="优先级">
          <template slot-scope="scope">
            <span>{{ scope.row.showPriorityLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="事件日期">
          <template slot-scope="scope">
            <span>{{ scope.row.eventCreateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理组">
          <template slot-scope="scope">
            <span>{{ scope.row.showHandleEventGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理人">
          <template slot-scope="scope">
            <span>{{ scope.row.showHandleEventStaff }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.showStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column width="150%" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 'save'"
              type="danger"
              size="small"
              @click="deleteEvent(scope.row)"
            >删除</el-button>
            <el-button
              v-if="scope.row.status === 'save'"
              type="success"
              size="small"
              @click="handleSubmit(scope.row)"
            >提交</el-button>
            <el-button
              v-if="scope.row.status === 'submit' || scope.row.status === 'handle'"
              type="warning"
              size="small"
              @click="closeProcess(scope.row)"
            >关闭</el-button>
            <el-button
              v-if="scope.row.status === 'done' || scope.row.status === 'close'"
              type="info"
              size="small"
              @click="editEvent(scope.row)"
            >查看</el-button>
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
    <el-dialog
      :visible.sync="showEventDialog"
      :before-close="Notify"
      :title="dialogTitle"
      :fullscreen="true"
      center
    >
      <el-button
        v-waves
        v-if="isEdit === false"
        type="primary"
        size="small"
        class="filter-item"
        style="margin-left: 1150px;"
        @click="saveEvent"
      >保存</el-button>
      <el-form ref="eventForm" :model="eventForm" :rules="formValidateRules" size="medium">
        <table class="gridtable">
          <tbody>
            <tr>
              <th>事件编码</th>
              <td>
                <el-form-item >
                  <el-input
                    :disabled="true"
                    v-model="eventForm.eventIdentifier"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
              <th>事件提出机构</th>
              <td>
                <el-form-item prop="institution" >
                  <el-select
                    :disabled="isEdit"
                    v-model="eventForm.institution"
                    filterable
                    style="width: 100%;float:left;margin-top: 20px;"
                    placeholder="请选择"
                    @change="onInstitutionSelectChange"
                  >
                    <el-option
                      v-for="item in institutions"
                      :label="item.branName"
                      :value="item.branCode"
                      :key="item.branCode"
                    />
                  </el-select>
                </el-form-item>
              </td>
              <th>联系方式</th>
              <td>
                <el-form-item prop="contact" >
                  <el-input
                    :disabled="isEdit"
                    v-model="eventForm.contact"
                    suffix-icon="el-icon-edit"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
              <th>联系人</th>
              <td>
                <el-form-item prop="eventContactor" >
                  <el-input
                    :disabled="isEdit"
                    v-model="eventForm.eventContactor"
                    suffix-icon="el-icon-edit"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>事件优先级</th>
              <td>
                <el-form-item prop="priorityLevel" >
                  <el-select
                    :disabled="isEdit"
                    v-model="eventForm.priorityLevel"
                    filterable
                    style="width: 100%;float:left;margin-top: 20px;"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in priorityLevels"
                      :key="item.id"
                      :label="item.name"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </td>
              <th>事件发生日期</th>
              <td>
                <el-form-item prop="eventCreateDate" >
                  <el-date-picker
                    :disabled="isEdit"
                    v-model="eventForm.eventCreateDate"
                    type="date"
                    style="float:left;margin-top: 20px;"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </td>
              <th>事件处理组</th>
              <td>
                <el-form-item prop="handleEventGroup" >
                  <el-select
                    :disabled="isEdit"
                    v-model="eventForm.handleEventGroup"
                    filterable
                    style="width: 100%;float:left;margin-top: 20px;"
                    placeholder="请选择"
                    @change="onHandleEventGroupSelectChange"
                  >
                    <el-option
                      v-for="item in handleEventGroups"
                      :label="item.branName"
                      :value="item.branCode"
                      :key="item.branCode"
                    />
                  </el-select>
                </el-form-item>
              </td>
              <th>事件处理人</th>
              <td>
                <el-form-item prop="handleEventStaff" >
                  <el-select
                    :disabled="isEdit"
                    v-model="eventForm.handleEventStaff"
                    placeholder="请选择"
                    style="float:left;margin-top: 20px;"
                  >
                    <el-option
                      v-for="item in handleEventStaffs"
                      :key="item.id"
                      :label="item.displayName"
                      :value="item.userName"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>事件标题</th>
              <td colspan="3">
                <el-form-item prop="eventTitle" >
                  <el-input
                    :disabled="isEdit"
                    v-model="eventForm.eventTitle"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
              <th>事件类型</th>
              <td colspan="3">
                <el-form-item prop="eventType" >
                  <el-select
                    :disabled="isEdit"
                    v-model="eventForm.eventType"
                    placeholder="请选择"
                    style="float:left;margin-top: 20px;"
                  >
                    <el-option
                      v-for="item in eventTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>事件描述</th>
              <td colspan="7">
                <el-form-item prop="description">
                  <el-input
                    :disabled="isEdit"
                    v-model="eventForm.description"
                    :autosize="{ minRows: 8, maxRows: 10 }"
                    type="textarea"
                    style="float:left;margin-top: 20px;"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>附件</th>
              <td
                style="padding-left: 1px;padding-bottom: 1px;padding-right: 1px;padding-top: 1px;"
                colspan="7"
              >
                <el-form-item>
                  <el-upload
                    ref="upload"
                    :disabled="isEdit"
                    :headers="headers"
                    :data="uploadExtraData"
                    :auto-upload="false"
                    :show-file-list="true"
                    :file-list="uploadFileList"
                    :on-remove="deleteUploadFile"
                    :on-preview="downloadAttachmentFile"
                    :action="findAction"
                    :on-success="onSuccessFileList"
                    list-type="text"
                    style="float:left;margin-top: 20px;"
                    class="upload-demo"
                  >
                    <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
                    <el-button
                      type="primary"
                      icon="el-icon-check"
                      style="margin-left: 380px;"
                      circle
                      @click="submitUpload"
                    />
                    <el-button
                      slot="trigger"
                      type="primary"
                      style="margin-left: 280px;margin-top: 10px;"
                      icon="el-icon-upload"
                      circle
                    />
                  </el-upload>
                </el-form-item>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import Cookies from 'js-cookie'
import {
  getList,
  saveEvent,
  deleteEvent,
  editEvent,
  submitEvent,
  getUploadFileList,
  deleteUploadFile,
  downloadAttachmentFile,
  queryInstitution,
  queryDictionary,
  queryHandleEventGroup,
  queryHandleEventStaff,
  getCurrentOptionResult,
  closeProcess
} from '@/api/event/addEvent'
export default {
  name: 'AddEvent',
  directives: {
    waves
  },
  data() {
    const validateInstitution = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('事件提出机构不能为空'))
      } else {
        callback()
      }
    }
    const validateContact = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('联系方式不能为空'))
      } else {
        callback()
      }
    }
    const validateEventContactor = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('联系人不能为空'))
      } else {
        callback()
      }
    }
    const validatePriorityLevel = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('事件优先级不能为空'))
      } else {
        callback()
      }
    }
    const validateEventCreateDate = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('事件发生日期不能为空'))
      } else {
        callback()
      }
    }
    const validateEventTitle = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('事件标题不能为空'))
      } else {
        callback()
      }
    }
    const validateEventType = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('事件类型不能为空'))
      } else {
        callback()
      }
    }
    const validateDescription = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('事件描述不能为空'))
      } else {
        callback()
      }
    }
    const validateHandleEventGroup = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('事件处理组不能为空'))
      } else {
        callback()
      }
    }
    const validatehandleEventStaff = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('事件处理人不能为空'))
      } else {
        callback()
      }
    }
    return {
      errorPath: '/errorPage/404',
      showEventDialog: false,
      showUploadDialog: false,
      findAction: process.env.BASE_API + '/Event/uploadAttachmentFile',
      headers: {
        jwtHeader: Cookies.get('jwtHeader')
      },
      institutions: [],
      priorityLevels: [],
      handleEventGroups: [],
      handleEventStaffs: [],
      eventTypes: [],
      uploadFileList: [],
      list: null,
      isEdit: false,
      total: null,
      eventTitle: '',
      listLoading: true,
      dialogTitle: '',
      listQuery: {
        page: 0,
        limit: 10,
        sort: 'asc'
      },
      uploadExtraData: {
        id: ''
      },
      eventForm: {
        eventIdentifier: '',
        eventType: '',
        institution: '',
        contact: '',
        eventContactor: '',
        priorityLevel: '',
        eventCreateDate: '',
        eventTitle: '',
        description: '',
        handleEventGroup: '',
        handleEventStaff: '',
        method: ''
      },
      formValidateRules: {
        institution: [
          { required: true, trigger: 'blur', validator: validateInstitution }
        ],
        contact: [
          { required: true, trigger: 'blur', validator: validateContact }
        ],
        eventContactor: [
          { required: true, trigger: 'blur', validator: validateEventContactor }
        ],
        priorityLevel: [
          { required: true, trigger: 'blur', validator: validatePriorityLevel }
        ],
        eventCreateDate: [
          {
            required: true,
            trigger: 'blur',
            validator: validateEventCreateDate
          }
        ],
        eventTitle: [
          { required: true, trigger: 'blur', validator: validateEventTitle }
        ],
        eventType: [
          { required: true, trigger: 'blur', validator: validateEventType }
        ],
        description: [
          { required: true, trigger: 'blur', validator: validateDescription }
        ],
        handleEventGroup: [
          {
            required: true,
            trigger: 'blur',
            validator: validateHandleEventGroup
          }
        ],
        handleEventStaff: [
          {
            required: true,
            trigger: 'blur',
            validator: validatehandleEventStaff
          }
        ]
      }
    }
  },
  created() {
    this.getList()
    queryInstitution()
      .then(response => {
        this.institutions.push(response.data.data)
      })
      .catch(error => {
        if (error.response === undefined) {
          this.$router.push({ path: this.errorPath })
        } else {
          this.$message.error(error.response.data.message)
        }
      })
    queryDictionary({ key: 'issuePriority' })
      .then(response => {
        this.priorityLevels = response.data.data
      })
      .catch(error => {
        if (error.response === undefined) {
          this.$router.push({ path: this.errorPath })
        } else {
          this.$message.error(error.response.data.message)
        }
      })
    queryDictionary({ key: 'eventType' })
      .then(response => {
        this.eventTypes = response.data.data
      })
      .catch(error => {
        if (error.response === undefined) {
          this.$router.push({ path: this.errorPath })
        } else {
          this.$message.error(error.response.data.message)
        }
      })
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery)
        .then(response => {
          this.convertData(response.data.data.ListEvent)
          this.total = response.data.data.page.totalElements
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
    onInstitutionSelectChange(branCode) {
      const institution = this.institutions.find(function(item) {
        return item.branCode === branCode
      })
      this.handleEventGroups = []
      queryHandleEventGroup({ branCode: institution.branCode })
        .then(response => {
          this.handleEventGroups.push(response.data.data)
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    closeProcess(row) {
      this.eventForm = Object.assign({}, row)
      var date = this.eventForm.eventCreateDate
      date = date.replace(/-/g, '/')
      var timestamp = new Date(date).getTime()
      this.eventForm.eventCreateDate = timestamp
      closeProcess(this.eventForm)
        .then(response => {
          this.$message.success(response.data.msg)
          this.getList()
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    onHandleEventGroupSelectChange(branCode) {
      const handleEventGroup = this.handleEventGroups.find(function(item) {
        return item.branCode === branCode
      })
      this.handleEventGroups = []
      queryHandleEventStaff({ branCode: handleEventGroup.branCode })
        .then(response => {
          this.handleEventStaffs = response.data.data
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    convertData(listData) {
      this.convertList = []
      for (var i = 0; i < listData.length; i++) {
        var d = new Date(listData[i].eventCreateDate)
        var times =
          d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        listData[i].eventCreateDate = times
        this.convertList.push(listData[i])
      }
      this.list = this.convertList
    },
    Notify() {
      if (this.dialogTitle === '新增事件') {
        this.$confirm('事件还未保存，确认关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.showEventDialog = false
          })
          .catch(() => { })
      } else {
        this.showEventDialog = false
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val - 1
      this.getList()
    },
    submitUpload() {
      this.uploadExtraData.id = this.eventForm.eventIdentifier
      this.$refs.upload.submit()
    },
    deleteUploadFile(file, fileList) {
      deleteUploadFile({ fileUrl: file.url, id: file.id })
        .then(response => {
          this.$message.success(response.data.msg)
          this.getUploadFileList(
            this.eventForm.eventIdentifier,
            this.eventForm.createdBy
          )
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
      downloadAttachmentFile({ fileUrl: file.url }).then(response => {
        if (!response) {
          return
        }
        const url = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // 获取文件名
        let fileName = null
        if (file.url.indexOf('/') !== -1) {
          fileName = file.url.substring(file.url.lastIndexOf('/') + 1)
        } else {
          fileName = file.url
        }
        // download 仅适用于chorme FireFox给downLoad属性设置文件名
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val - 1
      this.getList()
    },
    handleFilter() {
      this.listQuery.page = 0
      this.listQuery.eventTitle = this.eventTitle
      this.getList()
    },
    deleteEvent(row) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteEvent({ id: row.id, eventIdentifier: row.eventIdentifier })
            .then(response => {
              this.$message.success('删除成功')
              this.getList()
            })
            .catch(error => {
              if (error.response === undefined) {
                this.$router.push({ path: this.errorPath })
              } else {
                this.$message.error(error.response.data.message)
              }
            })
        })
        .catch(() => { })
    },
    handleCreate() {
      this.uploadFileList = []
      this.showEventDialog = true
      this.dialogTitle = '新增事件'
      this.isEdit = false
      this.handleEventGroups = []
      this.handleEventStaffs = []
      this.eventForm = {
        eventIdentifier: 'QC' + new Date().getTime(),
        eventType: '',
        institution: '',
        contact: '',
        eventContactor: '',
        priorityLevel: '',
        eventCreateDate: '',
        eventTitle: '',
        description: '',
        handleEventGroup: '',
        handleEventStaff: '',
        method: 'add'
      }
      this.$nextTick(function() {
        this.$refs.eventForm.clearValidate() // 移除校验结果
      })
    },
    getUploadFileList(eventIdentifier, createdBy) {
      this.uploadFileList = []
      eventIdentifier = this.eventForm.eventIdentifier
      if (!this.eventForm.createdBy) {
        createdBy = null
      } else {
        createdBy = this.eventForm.createdBy
      }
      getUploadFileList({
        eventIdentifier: eventIdentifier,
        createdBy: createdBy
      })
        .then(response => {
          this.convertUploadFileList(response.data.data)
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
        })
    },
    editEvent(row) {
      this.showEventDialog = true
      if (row.status !== 'save') {
        this.dialogTitle = '查看事件'
      } else {
        this.dialogTitle = '修改事件'
      }
      this.eventForm = Object.assign({}, row)
      this.eventForm.method = 'edit'
      if (row.status !== 'save') {
        this.isEdit = true
      }
      this.getUploadFileList(row.eventIdentifier, row.createdBy)
      this.getCurrentOptionResult()
      this.$nextTick(function() {
        this.$refs.eventForm.clearValidate()
      })
    },
    getCurrentOptionResult() {
      getCurrentOptionResult()
        .then(response => {
          this.handleEventGroups.push(response.data.data.handleEventGroups)
          this.handleEventStaffs = response.data.data.handleEventStaffs
        })
        .catch(error => {
          if (error.response === undefined) {
            this.$router.push({ path: this.errorPath })
          } else {
            this.$message.error(error.response.data.message)
          }
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
    saveEvent() {
      if (this.eventForm.method === 'add') {
        this.$refs.eventForm.validate(valid => {
          if (valid) {
            saveEvent(this.eventForm)
              .then(response => {
                this.showEventDialog = false
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
        this.$refs.eventForm.validate(valid => {
          if (valid) {
            var date = this.eventForm.eventCreateDate
            date = date.replace(/-/g, '/')
            var timestamp = new Date(date).getTime()
            this.eventForm.eventCreateDate = timestamp
            editEvent(this.eventForm)
              .then(response => {
                this.showEventDialog = false
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
    handleSubmit(row) {
      this.$confirm('此操作将提交, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var date = row.eventCreateDate
        date = date.replace(/-/g, '/')
        var timestamp = new Date(date).getTime()
        row.eventCreateDate = timestamp
        submitEvent(row)
          .then(response => {
            this.$message.success('提交成功')
            this.getList()
          })
          .catch(error => {
            if (error.response === undefined) {
              this.$router.push({ path: this.errorPath })
            } else {
              this.$message.error(error.response.data.message)
            }
          })
      })
    },
    onSuccessFileList(response) {
      this.$message.success(response.msg)
      const eventIdentifier = this.eventForm.eventIdentifier
      let createdBy = null
      if (!this.eventForm.createdBy) {
        createdBy = null
      } else {
        createdBy = this.eventForm.createdBy
      }
      getUploadFileList({
        eventIdentifier: eventIdentifier,
        createdBy: createdBy
      })
        .then(response => {
          this.convertUploadFileList(response.data.data)
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
  padding: 3px;
  border-style: solid;
  border-color: #ddd;
  background-color: #eee;
}
table.gridtable td {
  border-width: 1px;
  padding: 3px;
  border-style: solid;
  border-color: #ddd;
  background-color: #ffffff;
}
</style>
