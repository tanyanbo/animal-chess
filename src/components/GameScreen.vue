<script setup lang="ts">
import { ref } from "vue"
import ChessBoard from "./ChessBoard.vue"
const turn = ref<"红" | "蓝">()
const winner = ref<"红" | "蓝" | null>(null)

const chessBoardKey = ref<number>(0)

function handleTurnChanged(t: "red" | "blue") {
  turn.value = t === "red" ? "红" : "蓝"
}

function restart() {
  chessBoardKey.value += 1
  winner.value = null
}
</script>

<template>
  <div class="outer-container">
    <div class="button-row">
      <button @click="restart">重新开始</button>
    </div>
    <p class="turn">
      <span>轮到：</span>
      <span :class="{ red: turn === '红', blue: turn === '蓝' }">{{
        turn
      }}</span>
    </p>
    <ChessBoard
      @turn-changed="handleTurnChanged"
      @game-over="(w) => (winner = w === 'red' ? '红' : '蓝')"
      :key="chessBoardKey"
    />
    <p class="game-over-text" v-if="winner !== null">{{ winner }}方胜利!</p>
  </div>
</template>

<style scoped lang="scss">
.outer-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .button-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 80px;
    width: 100%;
    padding-right: 10px;
    padding-top: 10px;

    button {
      font-size: 2rem;
      padding: 6px;
    }
  }

  .turn {
    margin-bottom: 10px;

    span {
      font-size: 2rem;
      font-weight: bold;
    }

    .red {
      color: red;
    }

    .blue {
      color: blue;
    }
  }

  .game-over-text {
    font-size: 2rem;
    margin-top: 10px;
    font-weight: bold;
  }

  .restart {
    font-size: 2rem;
    margin-top: 10px;
    padding: 6px;
  }
}
</style>
