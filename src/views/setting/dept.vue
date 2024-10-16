<template>
  <div class="dept-container">
    <div class="dept-lf">
      <div class="dept-options">
        <el-button class="filter-item" size="mini" style="" type="primary" icon="el-icon-plus" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
        <el-button class="filter-item" size="mini" style="" type="primary" icon="el-icon-plus" @click="handleCreateSub">
          {{ $t('table.addSubDept') }}
        </el-button>
      </div>
      <div class="dept-tree">
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
          size="small"
        >
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
        <el-tree
          ref="tree"
          show-checkbox
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
        />
      </div>
    </div>
    <div class="dept-rt">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="dataForm" :rules="rules" :model="ruleForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
            <el-form-item :label="$t('dept.departName')" prop="departName">
              <el-input v-model="ruleForm.departName" />
            </el-form-item>
            <el-form-item :label="$t('dept.parentDept')" prop="parentDept">
              <el-input v-model="ruleForm.parentDept" />
            </el-form-item>
            <el-form-item :label="$t('dept.orgCategory')" prop="orgCategory">
              公司
            </el-form-item>
            <el-form-item :label="$t('dept.departOrder')" prop="departOrder">
              <el-input-number v-model="ruleForm.departOrder" :min="1" :max="10" label="描述文字" />
            </el-form-item>
            <el-form-item :label="$t('dept.mobile')">
              <el-input v-model="ruleForm.mobile" />
            </el-form-item>
            <el-form-item :label="$t('dept.fax')">
              <el-input v-model="ruleForm.fax" />
            </el-form-item>
            <el-form-item :label="$t('dept.address')">
              <el-input v-model="ruleForm.address" />
            </el-form-item>
            <el-form-item :label="$t('dept.memo')">
              <el-input v-model="ruleForm.memo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="部门权限" name="second">部门权限</el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="deptDialog" width="600px">
      <el-form ref="dataForm" :rules="rules" :model="ruleForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('dept.departName')" prop="departName">
          <el-input v-model="ruleForm.departName" />
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'createSub'" :label="$t('dept.parentDept')" prop="parentDept">
          <el-input v-model="ruleForm.parentDept" />
        </el-form-item>
        <el-form-item :label="$t('dept.orgCategory')" prop="orgCategory">
          公司
        </el-form-item>
        <el-form-item :label="$t('dept.departOrder')" prop="departOrder">
          <el-input-number v-model="ruleForm.departOrder" :min="1" :max="10" label="描述文字" />
        </el-form-item>
        <el-form-item :label="$t('dept.mobile')">
          <el-input v-model="ruleForm.mobile" />
        </el-form-item>
        <el-form-item :label="$t('dept.fax')">
          <el-input v-model="ruleForm.fax" />
        </el-form-item>
        <el-form-item :label="$t('dept.address')">
          <el-input v-model="ruleForm.address" />
        </el-form-item>
        <el-form-item :label="$t('dept.memo')">
          <el-input v-model="ruleForm.memo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deptDialog = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import i18n from '@/lang'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      filterText: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeName: 'first',
      ruleForm: {
        departName: '部门名称',
        orgCategory: '机构类型',
        departOrder: '排序',
        mobile: '电话',
        fax: '传真',
        address: '地址',
        memo: '备注',
        parentDept: '上级部门'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      deptDialog: false,
      textMap: {
        update: 'Edit',
        create: '添加部门',
        createSub: '添加下级部门'
      },
      dialogStatus: 'create'
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      const routes = this.generateRoutes(res.data)
      this.routes = this.i18n(routes)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (ruleFormlength > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCreate() {
      this.deptDialog = true
    },
    handleCreateSub() {
      this.dialogStatus = 'createSub'
      this.deptDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dept-container {
  background-color: #efefef;
  height: calc(100vh - 84px);
  padding: 10px;
  display: flex;
  .dept-lf {
    background-color: #ffffff;
    flex: 1;
    padding: 20px;
    .dept-tree {
      margin-top: 20px;
      .filter-tree {
        margin-top: 20px;
      }
    }
  }
  .dept-rt {
    background-color: #ffffff;
    flex: 1;
    margin-left: 10px;
    padding: 10px 20px 20px 20px;
  }
}
</style>
