<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link :to="item.path" v-if="index === 0">
        {{ item.meta.title }}
      </router-link>
      <span v-else>
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
const route = useRoute();
const isIndex = (route: any) => {
  const redirect = route && route.redirect;
  if (!redirect) {
    return false;
  }
  return redirect === '/home';
};
const breadList = computed(() => {
  const matched: any = route.matched;
  if (isIndex(matched[0]) && matched[1].path === '/home') {
    return matched.slice(1);
  }
  return matched;
});
</script>

<style></style>
