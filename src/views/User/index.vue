<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form ref="searchFormRef" :model="user" :inline="true">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state">
            <el-option label="所有" :value="0" />
            <el-option
              v-for="option in stateOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset(searchFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="addUser">新增</el-button>
        <el-button type="danger" @click="batchDel">批量删除</el-button>
      </div>
      <el-table
        :data="userList"
        @selection-change="handleSelectChange"
        height="100%"
        style="flex: 1"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="column in tableColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
        />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger" @click="singleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
      />
    </div>
    <el-dialog
      v-model="showAddModal"
      title="新增用户"
      :append-to-body="true"
      top="10vh"
    >
      <el-form
        :model="addUserForm"
        :rules="addUserRules"
        ref="dialogForm"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addUserForm.userName" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="addUserForm.userEmail" />
        </el-form-item>
        <el-form-item label="手机号" prop="userMobile">
          <el-input v-model="addUserForm.userMobile" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="addUserForm.job" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="addUserForm.state">
            <el-option
              v-for="state in stateOptions"
              :label="state.label"
              :value="state.value"
              :key="state.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select v-model="addUserForm.roleList">
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            />
            <el-option label="管理员" value="0" />
            <el-option label="普通用户" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <el-cascader
            v-model="addUserForm.deptId"
            :options="deptList"
            :props="{ value: '_id', label: 'deptName' }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddModal = false">取消</el-button>
          <el-button type="primary" @click="dialogSubmit(dialogForm)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { getUserList, deleteUser, getDeptList, getRoleList } from './../../api';

onMounted(() => {
  getUserListFn();
  getDeptListFn();
  getRoleListFn();
});

type ElFormInstance = InstanceType<typeof ElForm>;
interface Ipager {
  pageNum: number;
  pageSize: number;
  total?: number | undefined;
}

const userList = ref([]);
const searchFormRef = ref<ElFormInstance>();
const user = reactive({
  userId: '',
  userName: '',
  state: 0
});
const pager: Ipager = reactive({
  pageNum: 1,
  pageSize: 10
});
const checkIdList = ref([]);
const stateOptions = [
  {
    label: '在职',
    value: 1
  },
  {
    label: '离职',
    value: 2
  },
  {
    label: '试用期',
    value: 3
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
    prop: 'role',
    formatter(_: any, __: TableColumnCtx<any>, value: any) {
      return {
        0: '管理员',
        1: '普通用户'
      }[value as 0 | 1];
    }
  },
  {
    label: '用户状态',
    prop: 'state',
    formatter(_: any, __: TableColumnCtx<any>, value: any) {
      return {
        1: '在职',
        2: '离职',
        3: '试用期'
      }[value as 1 | 2 | 3];
    }
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
const getUserListFn = async () => {
  const params = { ...user, ...pager };
  try {
    const { list, page } = await getUserList(params);
    userList.value = list;
    pager.total = page.total;
  } catch (error) {
    console.log(error);
  }
};
// 查询
const handleSearch = () => {
  getUserListFn();
};
// 重置查询条件
const handleReset = (searchForm: ElFormInstance) => {
  searchForm.resetFields();
};
// 表格选中
const handleSelectChange = (val: any) => {
  checkIdList.value = val.map((item: any) => item.userId);
};
// 批量删除
const batchDel = async () => {
  const res = await deleteUser({
    userIds: checkIdList.value
  });
  console.log(res);
};
// 单个删除
const singleDel = async (row: any) => {
  const res = await deleteUser({
    userIds: [row.userId]
  });
  console.log(res, 'del');
};
// 新增用户变量声明
const addUserForm = reactive({
  userName: '',
  userEmail: '',
  userMobile: '',
  job: '',
  state: 1,
  roleList: [],
  deptId: ''
});
const addUserRules = reactive({
  userName: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'blur'
    }
  ],
  userEmail: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
  mobile: [
    {
      pattern: /1[3-9]\d{9}/,
      message: '请输入正确的手机号格式',
      trigger: 'blur'
    }
  ],
  deptId: [
    {
      required: true,
      message: '请选择所属部门',
      trigger: 'blur'
    }
  ]
});
const showAddModal = ref(false);
const deptList = ref([]);
const roleList = ref<any[]>([]);
// 获取部门列表
const getDeptListFn = async () => {
  const res = await getDeptList();
  deptList.value = res;
};
// 获取角色列表
const getRoleListFn = async () => {
  const res = await getRoleList();
  // console.log(res);
  roleList.value = res.list;
  console.log(res.list);
};
// 新增按钮点击
const addUser = () => {
  showAddModal.value = true;
};
// 新增用户表单提交
const dialogForm = ref<ElFormInstance>();
const dialogSubmit = (dialogForm: ElFormInstance) => {
  console.log(dialogForm);
};
</script>

<style lang="scss">
.user-manager {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
