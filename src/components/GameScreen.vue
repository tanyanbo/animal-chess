<script setup lang="ts">
import { ref } from "vue";
import ChessBoard from "./ChessBoard.vue";
const turn = ref<"红" | "蓝">();
const winner = ref<"红" | "蓝" | null>(null);

const chessBoardKey = ref<number>(0);

function handleTurnChanged(t: boolean) {
  turn.value = t ? "红" : "蓝";
}

function restart() {
  chessBoardKey.value += 1;
  winner.value = null;
}

const isSinglePlayer = ref(true);

function toggleSinglePlayer() {
  isSinglePlayer.value = !isSinglePlayer.value;
  restart();
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
      <div>
        <input
          type="checkbox"
          id="singlePlayer"
          @change="toggleSinglePlayer"
          :checked="isSinglePlayer"
        />
        <label for="singlePlayer">单人</label>
      </div>
      <button @click="restart">重新开始</button>
    </div>
    <ChessBoard
      @turn-changed="handleTurnChanged"
      @game-over="(w) => (winner = w ? '红' : '蓝')"
      :key="chessBoardKey"
      :single-player="isSinglePlayer"
    />
    <p class="game-over-text" v-if="winner !== null">{{ winner }}方胜利!</p>
  </div>
</template>

<style scoped lang="scss">
.outer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%;

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

    label {
      font-size: 2rem;
      padding-left: 4px;
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
