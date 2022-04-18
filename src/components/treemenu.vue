<template>
  <template v-for="menu in menuList" :key="menu._id">
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0"
      :index="menu.path"
    >
      <template #title>
        <el-icon><component :is="menu.icon" /></el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :menuList="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType === 1" :index="menu.path">
      <el-icon><component :is="menu.icon" /></el-icon>
      <span>{{ menu.menuName }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { toReactive } from '@vueuse/shared';
import TreeMenu from './treemenu.vue';
const props = defineProps<{
  menuList: any[];
}>();
const { menuList } = toReactive(props);
</script>

<style></style>
