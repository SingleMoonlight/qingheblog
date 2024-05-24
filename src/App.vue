<script setup>

</script>

<template>
  <div class="global-container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.global-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-color);
  overflow: hidden;
}
</style>
