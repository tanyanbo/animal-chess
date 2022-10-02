<script setup lang="ts">
import { ref } from "vue"
import ChessBoard from "./ChessBoard.vue"
const turn = ref<"红" | "黑">()
const winner = ref<"红" | "黑" | null>(null)

const chessBoardKey = ref<number>(0)

function handleTurnChanged(t: "red" | "black") {
  turn.value = t === "red" ? "红" : "黑"
}

function restart() {
  chessBoardKey.value += 1
  winner.value = null
}
</script>

<template>
  <div class="outer-container">
    <p class="turn">
      <span>轮到：</span>
      <span :class="{ red: turn === '红' }">{{ turn }}</span>
    </p>
    <ChessBoard
      @turn-changed="handleTurnChanged"
      @game-over="(w) => (winner = w === 'red' ? '红' : '黑')"
      :key="chessBoardKey"
    />
    <p class="game-over-text" v-if="winner !== null">{{ winner }}方胜利!</p>
    <button @click="restart" v-if="winner !== null" class="restart">
      重新开始
    </button>
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
    margin-bottom: 10px;

    span {
      font-size: 2rem;
    }

    .red {
      color: red;
    }
  }

  .game-over-text {
    font-size: 2rem;
    margin-top: 10px;
  }

  .restart {
    font-size: 2rem;
    margin-top: 10px;
    padding: 6px;
  }
}
</style>
