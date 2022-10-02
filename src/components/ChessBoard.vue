<script setup lang="ts">
import { ref } from "vue"
import { useBoardDictionary } from "../hooks/useBoardDictionary"

const TRAPS = [2, 4, 10, 52, 58, 60]
const RIVER = [22, 23, 25, 26, 29, 30, 32, 33, 36, 37, 39, 40]
const clicked = ref<number | null>(null)
const turn = ref<"black" | "red">("red")

const emit = defineEmits<{ (e: "turn-changed", turn: "red" | "black"): void }>()
emit("turn-changed", "red")

const highlight = ref<number[]>([])

const { dict } = useBoardDictionary()

function handleClickBox(index: number) {
  if (!dict.value[index].piece && !highlight.value.includes(index)) {
    return
  }

  if (!clicked.value && dict.value[index].color !== turn.value) {
    return
  }

  if (clicked.value) {
    dict.value[index].piece = true
    dict.value[index].color = dict.value[clicked.value].color
    dict.value[index].animal = dict.value[clicked.value].animal
    dict.value[clicked.value].piece = false
    dict.value[clicked.value].animal = null
    clicked.value = null
    highlight.value = []
    turn.value = turn.value === "red" ? "black" : "red"
    emit("turn-changed", turn.value)
    return
  }

  clicked.value = index

  highlight.value = []

  if (index >= 7) {
    highlight.value.push(index - 7)
  }

  if (index <= 55) {
    highlight.value.push(index + 7)
  }

  if (index % 7 !== 0) {
    highlight.value.push(index - 1)
  }

  if ((index + 1) % 7 !== 0) {
    highlight.value.push(index + 1)
  }

  if (dict.value[index].animal !== "mouse") {
    highlight.value = highlight.value.filter((grid) => {
      return !RIVER.includes(grid)
    })
  }
}
</script>

<template>
  <div class="container">
    <div
      class="box"
      :class="{ highlight: highlight.includes(index) }"
      v-for="(n, index) in 63"
      :key="index"
      @click="handleClickBox(index)"
    >
      <img
        src="../assets/mouse.svg"
        alt="animal"
        v-show="dict[index].animal === 'mouse'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/cat.svg"
        alt="animal"
        v-show="dict[index].animal === 'cat'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/dog.svg"
        alt="animal"
        v-show="dict[index].animal === 'dog'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/wolf.svg"
        alt="animal"
        v-show="dict[index].animal === 'wolf'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/cheetah.svg"
        alt="animal"
        v-show="dict[index].animal === 'cheetah'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/tiger.svg"
        alt="animal"
        v-show="dict[index].animal === 'tiger'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/lion.svg"
        alt="animal"
        v-show="dict[index].animal === 'lion'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/elephant.svg"
        alt="animal"
        v-show="dict[index].animal === 'elephant'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/grass.png"
        alt="trap"
        v-if="TRAPS.includes(index)"
        class="trap"
      />
      <img
        src="../assets/river.svg"
        alt="river"
        v-if="RIVER.includes(index)"
        class="river"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  width: 350px;
  height: 450px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(9, 1fr);

  .box {
    height: 50px;
    width: 50px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.highlight {
      background-color: yellow;
    }

    img {
      height: 90%;
      width: 90%;
      position: absolute;
      top: 5%;
      left: 5%;

      &.trap,
      &.river {
        z-index: 0;
      }

      &.river {
        height: 100%;
        width: 100%;
      }

      &.animal {
        z-index: 10;
        padding: 4px;
        border-radius: 50%;
      }

      &.black {
        border: 2px solid black;
      }

      &.red {
        border: 2px solid red;
      }
    }
  }
}
</style>
