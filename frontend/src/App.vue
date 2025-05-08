<script lang="ts" setup> 
import TitleBar from './components/TitleBar.vue'
</script>

<template>
  <TitleBar icon="./assets/images/logo-universal.png" title="演示案例"></TitleBar>
  <RouterView />
</template>

<style>
#app {
  position: fixed;
  left: 0;
  top: 44px;
  right: 4px;
  bottom: 0;
  padding: 12px 0 12px 12px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: 1.65;
  overflow: auto;
}

.titlebar__slot {
  align-self: stretch;
  display: flex;
  align-items: center;
  margin: 0 8px;
}
</style>
