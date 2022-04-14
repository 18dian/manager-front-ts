<template>
  <div class="basic-layout">
    <div :class="['slide-menu-wrap', isCollapse ? 'expand' : 'fold']">
      <div class="menu-head">
        <img src="./../../assets/logo.png" alt="" />
        <h3>Manager</h3>
      </div>
      <el-menu
        default-active="1"
        class="slide-menu"
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
          <el-menu-item index="1-3">item one</el-menu-item>
          <el-menu-item index="1-4">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>审批管理</span>
          </template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item one</el-menu-item>
          <el-menu-item index="2-4">item two</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right-content">
      <div class="content-header">
        <div class="bread-wrap">
          <el-icon @click="toggle">
            <fold v-if="!isCollapse" />
            <expand v-else />
          </el-icon>
          <div class="bread">bread</div>
        </div>
        <div class="user">
          <el-badge is-dot class="user-bell">
            <el-icon><bell /></el-icon>
          </el-badge>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.userName }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>{{ userInfo.userEmail }}</el-dropdown-item>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from './../../stores/user';
const router = useRouter();
const isCollapse = ref(false);
const userInfo = reactive({
  userName: '李林檀',
  userEmail: 'aaa@qq.com'
});
const toggle = () => {
  isCollapse.value = !isCollapse.value;
};

const user = useUserStore();
const logout = () => {
  user.changeUserInfo(null);
  router.push('/login');
};
</script>

<style lang="scss">
.basic-layout {
  display: flex;
  .slide-menu-wrap {
    height: 100vh;
    background: #001529;
    transition: width 0.5s;
    &.fold {
      width: 200px;
    }
    &.expand {
      width: 64px;
    }
    .menu-head {
      height: 50px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
      h3 {
        color: #fff;
        font-size: 18px;
      }
    }
    .slide-menu {
      height: calc(100% - 50px);
      overflow-y: auto;
      border-right: none;
    }
  }
  .right-content {
    flex: 1;
    .content-header {
      height: 50px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .bread-wrap {
        display: flex;
        align-items: center;
        .bread {
          margin-left: 15px;
          cursor: pointer;
        }
      }
      .user {
        display: flex;
        align-items: center;
        cursor: pointer;
        .user-bell {
          display: flex;
          align-items: center;
          margin-right: 15px;
        }
      }
    }
    .content-wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      box-sizing: border-box;
      .content {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
