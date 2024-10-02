<template>
  <RouterView />
</template>

<script setup lang="ts">
import { Message } from '@/utils/message'
import { onMounted } from 'vue'

onMounted(() => {
  Message.success('页面加载成功')
})
</script>

<style lang="scss">
#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 20rem;
}
</style>
