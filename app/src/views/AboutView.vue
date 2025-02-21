<template>
  <div>
    <TheScore />
    <MoveSet />
  </div>
</template>

<script setup>
import TheScore from '@/components/TheScore.vue'
import MoveSet from '../components/MoveSet.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
