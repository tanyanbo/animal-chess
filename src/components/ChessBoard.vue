<script setup lang="ts">
const TRAPS = [2, 4, 10, 52, 58, 60];
const RIVER = [22, 23, 25, 26, 29, 30, 32, 33, 36, 37, 39, 40];
</script>

<template>
  <div class="container">
    <div class="box" v-for="(n, index) in 63" :key="index">
      <img
        src="../assets/shu.svg"
        alt="animal"
        v-show="index === 22"
        class="animal"
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
      }
    }
  }
}
</style>
