<script setup lang="ts">
const url = "../assets/mao.svg";
const cat = `url(${url})`;
</script>

<template>
  <div class="container">
    <div
      class="box"
      v-for="(n, index) in 63"
      :key="index"
      :class="{ cat: index === 20 }"
    ></div>
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

    &.cat {
      background-image: v-bind(cat);
    }
  }
}
</style>
