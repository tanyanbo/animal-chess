<script setup lang="ts">
import { ref } from "vue"
import ChessBoard from "./ChessBoard.vue"
const turn = ref<"红" | "黑">()

function handleTurnChanged(t: "red" | "black") {
  turn.value = t === "red" ? "红" : "黑"
}
</script>

<template>
  <div class="outer-container">
    <p class="turn">轮到：{{ turn }}</p>
    <ChessBoard @turn-changed="handleTurnChanged" />
  </div>
</template>

<style scoped lang="scss">
.outer-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .turn {
    font-size: 2rem;
    margin-bottom: 10px;
  }
}
</style>
