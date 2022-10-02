<script setup lang="ts">
import { ref } from "vue"
import { useBoardDictionary } from "../hooks/useBoardDictionary"
import rank from "../helpers/rank"

const TRAPS = [2, 4, 10, 52, 58, 60]
const RIVER = [22, 23, 25, 26, 29, 30, 32, 33, 36, 37, 39, 40]
// 第二个数组是为了检查中间是否有老鼠挡路
const JUMP = {
  15: [[43], [[22, 29, 36]]],
  16: [[44], [[23, 30, 37]]],
  18: [[46], [[25, 32, 39]]],
  19: [[47], [[26, 33, 40]]],
  21: [[24], [[22, 23]]],
  24: [
    [21, 27],
    [
      [22, 23],
      [25, 26],
    ],
  ],
  27: [[24], [[25, 26]]],
  28: [[31], [[29, 30]]],
  31: [
    [28, 34],
    [
      [29, 30],
      [32, 33],
    ],
  ],
  34: [[31], [[32, 33]]],
  35: [[38], [[36, 37]]],
  38: [
    [35, 41],
    [
      [36, 37],
      [39, 40],
    ],
  ],
  41: [[38], [[39, 40]]],
  43: [[15], [[22, 29, 36]]],
  44: [[16], [[23, 30, 37]]],
  46: [[18], [[25, 32, 39]]],
  47: [[19], [[26, 33, 40]]],
} as const

const clicked = ref<number | null>(null)
const turn = ref<"blue" | "red">("red")

const emit = defineEmits<{
  (e: "turn-changed", turn: "red" | "blue"): void
  (e: "game-over", winner: "red" | "blue"): void
}>()
emit("turn-changed", "red")

const highlight = ref<number[]>([])

const { dict } = useBoardDictionary()

function eatPiece(index: number) {
  dict.value[index].piece = true
  dict.value[index].color = dict.value[clicked.value!].color
  dict.value[index].animal = dict.value[clicked.value!].animal
  dict.value[clicked.value!].piece = false
  dict.value[clicked.value!].animal = null
  clicked.value = null
  highlight.value = []
}

function checkGameOver(index: number) {
  if (
    (turn.value === "red" && index === 3) ||
    (turn.value === "blue" && index === 59)
  ) {
    eatPiece(index)
    emit("game-over", index === 3 ? "red" : "blue")
    return true
  }
  return false
}

function checkRank(index: number) {
  if (
    !TRAPS.includes(index) &&
    dict.value[index].piece &&
    rank[dict.value[clicked.value!].animal!] <
      rank[dict.value[index].animal!] &&
    !(
      dict.value[clicked.value!].animal === "mouse" &&
      dict.value[index].animal === "elephant"
    )
  ) {
    dict.value[clicked.value!].piece = false
    dict.value[clicked.value!].animal = null
    clicked.value = null
    highlight.value = []
    turn.value = turn.value === "red" ? "blue" : "red"
    emit("turn-changed", turn.value)
    return true
  }
  return false
}

function highlightBoxes(index: number) {
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

  if (
    index in JUMP &&
    (dict.value[index].animal === "lion" ||
      dict.value[index].animal === "tiger")
  ) {
    JUMP[index as keyof typeof JUMP][0].forEach((element, idx) => {
      let canAdd = true
      // 检查中间是否有老鼠挡路
      JUMP[index as keyof typeof JUMP][1][idx].forEach((e) => {
        if (dict.value[e].piece) {
          canAdd = false
        }
      })
      if (canAdd) {
        highlight.value.push(element)
      }
    })
  }

  highlight.value = highlight.value.filter((box) => {
    if (
      (box === 3 && turn.value === "blue") ||
      (box === 59 && turn.value === "red")
    ) {
      return false
    }

    if (dict.value[index].animal === "elephant") {
      if (dict.value[box].animal === "mouse") {
        return false
      }
      return (
        !RIVER.includes(box) &&
        (!dict.value[box].piece || dict.value[box].color !== turn.value)
      )
    }

    if (dict.value[index].animal !== "mouse") {
      return (
        !RIVER.includes(box) &&
        (!dict.value[box].piece || dict.value[box].color !== turn.value)
      )
    } else {
      // 老鼠不能从河里直接吃象
      if (RIVER.includes(index)) {
        return dict.value[box].animal !== "elephant"
      }
      return !dict.value[box].piece || dict.value[box].color !== turn.value
    }
  })
}

function handleClickBox(index: number) {
  if (!dict.value[index].piece && !highlight.value.includes(index)) {
    clicked.value = null
    highlight.value = []
    return
  }

  if (
    dict.value[index].piece &&
    !highlight.value.includes(index) &&
    dict.value[index].color !== turn.value
  ) {
    clicked.value = null
    highlight.value = []
    return
  }

  if (clicked.value !== null && highlight.value.includes(index)) {
    if (checkGameOver(index)) {
      return
    }

    if (checkRank(index)) {
      return
    }

    eatPiece(index)
    turn.value = turn.value === "red" ? "blue" : "red"
    emit("turn-changed", turn.value)
    return
  }

  clicked.value = index
  highlightBoxes(index)
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
        src="../assets/cat.png"
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
        src="../assets/cheetah.png"
        alt="animal"
        v-show="dict[index].animal === 'cheetah'"
        class="animal"
        :class="{ [dict[index].color]: true }"
      />
      <img
        src="../assets/tiger.png"
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
      <img
        src="../assets/target.svg"
        alt="target"
        v-if="index === 3 || index === 59"
        class="trap"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  padding: 0 15px;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 7 / 9;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(9, 1fr);

  .box {
    // height: 50px;
    // width: 50px;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #f5f5f5;

    &.highlight {
      background-color: #fff59d;
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

      &.blue {
        background-color: #b3e5fc;
      }

      &.red {
        background-color: #f48fb1;
      }
    }
  }
}
</style>
