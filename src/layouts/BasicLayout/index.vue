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
        <tree-menu :menuList="menuList" />
      </el-menu>
    </div>
    <div class="right-content">
      <div class="content-header">
        <div class="bread-wrap">
          <el-icon @click="toggle">
            <fold v-if="!isCollapse" />
            <expand v-else />
          </el-icon>
          <div class="bread">
            <bread-crumb />
          </div>
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
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TreeMenu from './../../components/treemenu.vue';
import BreadCrumb from './../../components/breadcrumb.vue';
import { useUserStore } from './../../stores/user';
import { getMenuList } from './../../api';

const menuList = ref([]);

onMounted(() => {
  getMenuList().then((res: any) => {
    menuList.value = res;
  });
});

const router = useRouter();
const user = useUserStore();

const isCollapse = ref(false);
const userInfo = reactive({
  userName: user.userInfo?.userName || '',
  userEmail: 'aaa@qq.com'
});

const toggle = () => {
  isCollapse.value = !isCollapse.value;
};

const logout = () => {
  user.changeUserInfo(null);
  router.push('/login');
};
</script>

<style lang="scss">
.basic-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .slide-menu-wrap {
    background: #001529;
    transition: width 0.5s;
    flex-shrink: 0;
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
    overflow: hidden;
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
    }
  }
}
</style>
