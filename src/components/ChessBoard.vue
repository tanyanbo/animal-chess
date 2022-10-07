<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useBoardDictionary } from "../hooks/useBoardDictionary";
import {
  TRAPS,
  RED_TRAPS,
  BLUE_TRAPS,
  RIVER,
  getPossibleMovesFromBox,
  generateMove,
} from "../helpers/game";
import { useSound } from "../hooks/useSound";
import {
  ELEPHANT,
  MOUSE,
  CAT,
  DOG,
  WOLF,
  CHEETAH,
  TIGER,
  LION,
  WHICH_ANIMAL,
  WHOSE_TURN,
} from "../constants/values";

// true: 轮到红，false: 轮到蓝
const emit = defineEmits<{
  (e: "turn-changed", turn: boolean): void;
  (e: "game-over", winner: boolean): void;
}>();

const props = withDefaults(
  defineProps<{
    singlePlayer?: boolean;
    volume?: number;
    shouldPlaySound?: boolean;
  }>(),
  {
    singlePlayer: false,
    volume: 0.2,
    shouldPlaySound: true,
  }
);

const clicked = ref<number | null>(null);
const turn = ref<boolean>(true);
const container = ref<HTMLDivElement>();
const prevMove = ref<number | null>(null);
const disabled = ref<boolean>(false);

const bluePos = ref<Set<number>>(new Set([0, 6, 8, 12, 14, 16, 18, 20]));
const redPos = ref<Set<number>>(new Set([42, 44, 46, 48, 50, 54, 56, 62]));

const { playSound } = useSound(props.volume, props.shouldPlaySound);

onMounted(() => {
  if (container.value!.getBoundingClientRect().height < 100) {
    container.value!.style.height =
      (container.value!.getBoundingClientRect().width / 7) * 9 + "px";
  }
});

emit("turn-changed", true);

const highlight = ref<number[]>([]);

const { dict } = useBoardDictionary();

/**
 * 重置回合状态
 * @param resetPrevMove 是否重置上一回合标识
 */
function resetToStartOfMove(resetPrevMove: boolean = true) {
  if (resetPrevMove) {
    prevMove.value = clicked.value;
  }
  clicked.value = null;
  highlight.value = [];
}

async function eatPiece(index: number) {
  let hasEaten = false;
  if (dict.value[index] & WHOSE_TURN) {
    hasEaten = true;
  }
  dict.value[index] = dict.value[clicked.value!];
  dict.value[clicked.value!] = 0;
  !turn.value ? redPos.value.delete(index) : bluePos.value.delete(index);
  resetToStartOfMove();
  if (hasEaten) {
    await playSound(dict.value[index] & WHICH_ANIMAL);
  }
}

/**
 * 检查一方是否已经胜利
 * @param index 当前点击的格子的编号
 */
function checkGameOver(index: number) {
  if ((turn.value && index === 3) || (!turn.value && index === 59)) {
    eatPiece(index);
    emit("game-over", index === 3 ? true : false);
    return true;
  }
  return false;
}

function changePositions(index: number) {
  if (turn.value) {
    redPos.value.delete(clicked.value!);
    redPos.value.add(index);
  } else {
    bluePos.value.delete(clicked.value!);
    bluePos.value.add(index);
  }
}

function singlePlayerMove() {
  if (props.singlePlayer && !turn.value) {
    setTimeout(() => {
      disabled.value = true;
      const move = generateMove(dict.value, bluePos.value, redPos.value, false);
      disabled.value = false;
      aiMove(move[0], move[1]);
    }, 1);
  }
}

function aiMove(startPos: number, endPos: number) {
  clicked.value = startPos;
  highlight.value = [endPos];
  handleClickBox(endPos);
}

/**
 * 检查是否“自杀”
 * @param index 当前点击的格子的编号
 */
async function checkRank(index: number) {
  if (
    (!TRAPS.includes(index) ||
      (RED_TRAPS.includes(index) && !turn.value) ||
      (BLUE_TRAPS.includes(index) && turn.value)) &&
    dict.value[index] &&
    (dict.value[clicked.value!] & WHICH_ANIMAL) <
      (dict.value[index] & WHICH_ANIMAL) &&
    !(
      (dict.value[clicked.value!] & WHICH_ANIMAL) === MOUSE &&
      (dict.value[index] & WHICH_ANIMAL) === ELEPHANT
    )
  ) {
    dict.value[clicked.value!] = 0;
    turn.value
      ? redPos.value.delete(clicked.value!)
      : bluePos.value.delete(clicked.value!);
    resetToStartOfMove();
    await playSound(dict.value[index] & WHICH_ANIMAL);
    turn.value = !turn.value;
    emit("turn-changed", turn.value);
    singlePlayerMove();
    return true;
  }
  return false;
}

/**
 * 处理点击了任意一个格子（特殊情况在函数内处理）
 * @param index 当前点击的格子的编号
 */
async function handleClickBox(index: number) {
  if (disabled.value) {
    return;
  }
  // 点击了一个没有棋子的格子
  if (!dict.value[index] && !highlight.value.includes(index)) {
    resetToStartOfMove(false);
    return;
  }

  // 点击了对手的一个吃不到的棋子
  if (
    dict.value[index] &&
    !highlight.value.includes(index) &&
    !!(dict.value[index] & WHOSE_TURN) !== turn.value
  ) {
    resetToStartOfMove(false);
    return;
  }

  if (clicked.value !== null && highlight.value.includes(index)) {
    if (checkGameOver(index)) {
      return;
    }

    if (await checkRank(index)) {
      return;
    }

    changePositions(index);
    await eatPiece(index);
    turn.value = !turn.value;
    emit("turn-changed", turn.value);
    singlePlayerMove();
    return;
  }

  clicked.value = index;
  highlight.value = getPossibleMovesFromBox(index, dict.value, turn.value);
}
</script>

<template>
  <div class="container" ref="container">
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
        v-show="(dict[index] & WHICH_ANIMAL) === MOUSE"
        class="animal"
        :class="{
          red: dict[index] & WHOSE_TURN,
          blue: !(dict[index] & WHOSE_TURN),
        }"
      />
      <img
        src="../assets/cat.png"
        alt="animal"
        v-show="(dict[index] & WHICH_ANIMAL) === CAT"
        class="animal"
        :class="{
          red: dict[index] & WHOSE_TURN,
          blue: !(dict[index] & WHOSE_TURN),
        }"
      />
      <img
        src="../assets/dog.svg"
        alt="animal"
        v-show="(dict[index] & WHICH_ANIMAL) === DOG"
        class="animal"
        :class="{
          red: dict[index] & WHOSE_TURN,
          blue: !(dict[index] & WHOSE_TURN),
        }"
      />
      <img
        src="../assets/wolf.svg"
        alt="animal"
        v-show="(dict[index] & WHICH_ANIMAL) === WOLF"
        class="animal"
        :class="{
          red: dict[index] & WHOSE_TURN,
          blue: !(dict[index] & WHOSE_TURN),
        }"
      />
      <img
        src="../assets/cheetah.png"
        alt="animal"
        v-show="(dict[index] & WHICH_ANIMAL) === CHEETAH"
        class="animal"
        :class="{
          red: dict[index] & WHOSE_TURN,
          blue: !(dict[index] & WHOSE_TURN),
        }"
      />
      <img
        src="../assets/tiger.png"
        alt="animal"
        v-show="(dict[index] & WHICH_ANIMAL) === TIGER"
        class="animal"
        :class="{
          red: dict[index] & WHOSE_TURN,
          blue: !(dict[index] & WHOSE_TURN),
        }"
      />
      <img
        src="../assets/lion.svg"
        alt="animal"
        v-show="(dict[index] & WHICH_ANIMAL) === LION"
        class="animal"
        :class="{
          red: dict[index] & WHOSE_TURN,
          blue: !(dict[index] & WHOSE_TURN),
        }"
      />
      <img
        src="../assets/elephant.svg"
        alt="animal"
        v-show="(dict[index] & WHICH_ANIMAL) === ELEPHANT"
        class="animal"
        :class="{
          red: dict[index] & WHOSE_TURN,
          blue: !(dict[index] & WHOSE_TURN),
        }"
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
      <div class="prev" v-show="prevMove === index"></div>
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

    .prev {
      height: 80%;
      width: 80%;
      border-radius: 50%;
      border: 2px solid #fdd835;
    }
  }
}
</style>
