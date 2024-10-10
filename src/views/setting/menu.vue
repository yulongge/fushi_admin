<template>
  <div class="user-container">
    <div class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="80px" :inline="true">
        <el-form-item label="菜单名称">
          <el-input v-model="listQuery.roleName" size="mini" :placeholder="$t('table.roleName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">
            {{ $t('table.search') }}
          </el-button>
          <el-button v-waves class="filter-item" size="mini" type="plain" icon="el-icon-search" @click="handleFilter">
            {{ $t('table.reset') }}
          </el-button>
          <el-button class="filter-item" size="mini" type="primary" icon="el-icon-edit" @click="handleCreate">
            {{ $t('table.createMenu') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="menu-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'isLeaf'}">
        <el-table-column
          prop="name"
          label="菜单名称"
          width="180"
        />
        <el-table-column
          prop="menuType"
          label="菜单类型"
          width="180"
        />
        <el-table-column
          prop="icon"
          label="图标"
        />
        <el-table-column
          prop="component"
          label="组件"
        />
        <el-table-column
          prop="url"
          label="路径"
        />
        <el-table-column
          prop="sortNo"
          label="排序"
        />
        <el-table-column
          prop="options"
          label="操作"
        >
          <template slot-scope="{row,$index}">
            <el-link type="primary" class="option-item" @click="handleUpdate(row, $index)">{{ $t('table.edit') }}</el-link>
            <el-link type="primary" class="option-item">{{ $t('table.delete') }}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getMenus } from '@/api/role'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'ComplexTable',
  components: { },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getMenus(this.listQuery).then(response => {
        this.tableData = response.data.result
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-container {
  padding: 10px;
  background-color: #efefef;
  .filter-container {
    // margin-top: 30px;
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 10px;
    ::v-deep .el-form-item {
      margin-bottom: 0px;
    }
    .filter-item {
      margin-bottom: 0px;
    }
  }
  .avatar-table {
    width: 60px;
    height: 60px;
  }
  .option-item {
    margin-left: 10px;
  }
  .pagination-container {
    margin-top: 10px;
  }
}
</style>
