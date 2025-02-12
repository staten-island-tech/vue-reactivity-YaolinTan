<template>
  <div>
    <div class="scoreboard flex justify-center">
      <span class="score">{{ playerScore }} - {{ cpuScore }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const playerScore = ref(0)
const cpuScore = ref(0)
</script>

<style scoped>
.scoreboard {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  background-color: black;
  border: 4px solid white;
  color: red;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
}
</style>
