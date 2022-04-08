<script setup lang="ts">
import { onMounted } from 'vue';
import request from '../../utils/request';
onMounted(() => {
  request.get('/login');
});
</script>

<template>
  <div>home</div>
</template>

<style></style>
