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
      <p class="turn">
        <span>轮到：</span>
        <span :class="{ red: turn === '红', blue: turn === '蓝' }">{{
          turn
        }}</span>
      </p>
      <button @click="restart">重新开始</button>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;

  .button-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 15px;
    padding-top: 10px;
    padding-left: 15px;
    margin-bottom: 5px;
    max-width: 800px;

    button {
      font-size: 2rem;
      border: none;
      background-color: white;
    }

    .turn {
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
  }

  .game-over-text {
    font-size: 2rem;
    margin-top: 10px;
    font-weight: bold;
  }
}
</style>
