<template>
  <div>
    <TheScore />
  </div>
</template>

<script setup>
import TheScore from '@/components/TheScore.vue'
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
