<template>
  <div class="wrapper">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  name: 'LoadingPage'
}
</script>

<style scoped >
.wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
}
</style>
