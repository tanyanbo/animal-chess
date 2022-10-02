<script setup lang="ts">
import ChessBoard from "./components/ChessBoard.vue";
</script>

<template>
  <div class="outer-container">
    <ChessBoard />
  </div>
</template>

<style scoped lang="scss">
.outer-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
