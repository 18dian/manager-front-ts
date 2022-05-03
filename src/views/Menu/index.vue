<template>
  <div class="menu-menage manager">
    <div class="query-form">
      <el-form ref="searchFormRef" :model="menuSearchForm" :inline="true">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="menuSearchForm.menuName"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="menuSearchForm.menuState">
            <el-option :value="1" label="正常" />
            <el-option :value="2" label="停用" />
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
        <el-button type="primary" @click="addMenu(1)">新增</el-button>
      </div>
      <el-table
        :data="menuList"
        height="100%"
        style="flex: 1"
        row-key="_id"
        :tree-props="{ children: 'children' }"
      >
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
            <el-button
              size="small"
              type="primary"
              @click="addMenu(2, scope.row)"
            >
              新增
            </el-button>
            <el-button size="small" @click="editMenu(scope.row)">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="delMenu(scope.row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="showModal"
      :title="action === 'add' ? '新增菜单' : '编辑菜单'"
      :append-to-body="true"
      top="10vh"
      @close="handleClose"
    >
      <el-form
        :model="dialogMenuForm"
        :rules="dialogRules"
        ref="dialogForm"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="dialogMenuForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="dialogMenuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="dialogMenuForm.menuName"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="dialogMenuForm.menuType === 1"
        >
          <el-input v-model="dialogMenuForm.icon" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="dialogMenuForm.menuType === 1"
        >
          <el-input
            v-model="dialogMenuForm.path"
            placeholder="请输入路由地址"
          />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="dialogMenuForm.menuType === 2"
        >
          <el-input
            v-model="dialogMenuForm.menuCode"
            placeholder="请输入权限标识"
          />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="menuState"
          v-show="dialogMenuForm.menuType == 1"
        >
          <el-radio-group v-model="dialogMenuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit(dialogForm)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus';
import { getMenuList, menuSubmit } from './../../api/index';

onMounted(() => {
  getMenuListFn();
});

type ElFormInstance = InstanceType<typeof ElForm>;

const getMenuListFn = async () => {
  const params = toRaw(menuSearchForm);
  const res = await getMenuList(params);
  menuList.value = res;
};

const action = ref('');

const searchFormRef = ref<ElFormInstance>();
const menuSearchForm = reactive({
  menuName: '',
  menuState: 1
});
// 查询
const handleSearch = async () => {
  getMenuListFn();
};

// 共用重置
const handleReset = (form: ElFormInstance | undefined) => {
  form?.resetFields();
};

const menuList = ref([]);
const tableColumns = [
  {
    label: '菜单名称',
    prop: 'menuName',
    width: 150
  },
  {
    label: '图标',
    prop: 'icon'
  },
  {
    label: '菜单类型',
    prop: 'menuType',
    formatter(_: any, __: any, value: any) {
      return {
        1: '菜单',
        2: '按钮'
      }[value as 1 | 2];
    }
  },
  {
    label: '权限标识',
    prop: 'menuCode'
  },
  {
    label: '路由地址',
    prop: 'path'
  },
  {
    label: '菜单状态',
    prop: 'menuState',
    width: 90,
    formatter(_: any, __: any, value: any) {
      return {
        1: '正常',
        2: '停用'
      }[value as 1 | 2];
    }
  },
  {
    label: '创建时间',
    prop: 'createTime'
    // formatter(row, column, value) {
    //   return utils.formateDate(new Date(value));
    // }
  }
];

const showModal = ref(false);

const addMenu = async (type: number, data?: any) => {
  showModal.value = true;
  action.value = 'add';
  if (type === 2) {
    dialogMenuForm.parentId = [...data.parentId, data._id].filter(
      (item) => item
    );
  }
};
const editMenu = (row: any) => {
  showModal.value = true;
  action.value = 'edit';
  nextTick(() => {
    Object.assign(dialogMenuForm, row);
  });
};
const delMenu = async (_id: string) => {
  await menuSubmit({ _id, action: 'delete' });
  getMenuListFn();
};

const dialogForm = ref<ElFormInstance>();
const dialogMenuForm = reactive({
  parentId: [] as any[],
  menuType: 1,
  menuName: '',
  icon: '',
  path: '',
  menuCode: '',
  menuState: 1
});
const dialogRules = {
  menuName: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 10,
      message: '长度在2-8个字符',
      trigger: 'blur'
    }
  ]
};
const handleClose = () => {
  showModal.value = false;
  handleReset(dialogForm.value);
};
const handleSubmit = (dialogForm: ElFormInstance | undefined) => {
  if (!dialogForm) return;
  dialogForm.validate(async (valid: any) => {
    if (valid) {
      const params = toRaw(dialogMenuForm);
      await menuSubmit({ ...params, action: action.value });
      showModal.value = false;
      handleReset(dialogForm);
      getMenuListFn();
    }
  });
};
</script>

<style lang="scss"></style>
