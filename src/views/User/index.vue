<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form :model="user" :inline="true">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state">
            <el-option
              v-for="option in stateOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button>删除</el-button>
      </div>
      <el-table :data="userList">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="column in tableColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
        />
        <el-table-column label="操作">
          <template #default>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = reactive({
  userId: '',
  userName: '',
  state: ''
});
// const userList = ref([]);
const stateOptions = [
  {
    label: '在职',
    value: 0
  },
  {
    label: '离职',
    value: 1
  }
];
const tableColumns = [
  {
    label: '用户ID',
    prop: 'userId'
  },
  {
    label: '用户名',
    prop: 'userName'
  },
  {
    label: '用户邮箱',
    prop: 'userEmail'
  },
  {
    label: '用户角色',
    prop: 'role'
    // formatter(row, column, value) {
    //   return {
    //     0: '管理员',
    //     1: '普通用户'
    //   }[value];
    // }
  },
  {
    label: '用户状态',
    prop: 'state'
    // formatter(row, column, value) {
    //   return {
    //     1: '在职',
    //     2: '离职',
    //     3: '试用期'
    //   }[value];
    // }
  },
  {
    label: '注册时间',
    prop: 'createTime',
    width: 180
    // formatter: (row, column, value) => {
    //   return utils.formateDate(new Date(value));
    // }
  },
  {
    label: '最后登录时间',
    prop: 'lastLoginTime',
    width: 180
    // formatter: (row, column, value) => {
    //   return utils.formateDate(new Date(value));
    // }
  }
];
const userList = [
  {
    userId: '11111',
    userName: 'Tom',
    userEmail: 'aaa@qq.com',
    role: '管理员',
    state: '在职',
    createTime: '2016-05-02',
    lastLoginTime: '2016-05-04'
  }
];
</script>

<style lang="scss"></style>
