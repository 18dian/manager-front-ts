<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="title">火星</div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            :prefix-icon="View"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            @click="submitForm(loginFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User, View } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';

type ElFormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<ElFormInstance>();

const loginForm = reactive({
  name: '',
  password: ''
});

const rules = reactive({
  name: [{ required: true, message: '', trigger: 'blur' }],
  password: [{ required: true, message: '', trigger: 'blur' }]
});

const submitForm = (formEl: ElFormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', valid);
    } else {
      console.log('error submit!', fields);
      return false;
    }
  });
};
</script>

<style lang="scss">
.login-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #f9fcff;
  .login-content {
    width: 500px;
    padding: 50px;
    margin: auto;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 50px;
      line-height: 1.5;
      margin-bottom: 30px;
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>
