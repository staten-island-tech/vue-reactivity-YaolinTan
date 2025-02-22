<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-evenly">
      <button class="btn" @click.prevent="shoot(threePointChance)">
        <h2>Jab Step into a Three</h2>
      </button>
      <button class="btn" @click.prevent="shoot(midRangeChance)">
        <h2>Shimmy Jab into a one-dribble middy</h2>
      </button>
      <button class="btn" @click.prevent="shoot(drivingLayupChance)">
        <h2>Shimmy Jab into a driving layup</h2>
      </button>
    </div>
    <div class="flex flex-row justify-evenly">
      <button class="btn" @click.prevent="shoot(threePointChance)">
        <h2>Pound Dribble Stepback Three</h2>
      </button>
      <button class="btn" @click.prevent="shoot(midRangeChance)">
        <h2>Drive into a midrange spin jumper</h2>
      </button>
      <button class="btn" @click.prevent="shoot(drivingLayupChance)">
        <h2>Double behind the back wrap into a driving layup</h2>
      </button>
    </div>
  </div>
</template>

<script setup>
const threePointChance = (player) => (player.threePoint * 0.45) / 100
const midRangeChance = (player) => (player.midRange * 0.55) / 100
const freeThrowChance = (player) => (player.freeThrow * 0.9) / 100
const drivingLayupChance = (player) => (player.drivingLayup * 0.7) / 100
const drivingDunkChance = (player) => (player.drivingDunk * 0.7) / 100
const standingDunkChance = (player) => (player.standingDunk * 0.7) / 100

// Example Player
const player = {
  name: 'Nikola Jokic',
  overall: 98,
  ballHandling: 87,
  threePoint: 92,
  midRange: 88,
  freeThrow: 83,
  drivingLayup: 90,
  drivingDunk: 75,
  standingDunk: 80,
}

function shoot(shot) {
  const shotChance = Math.random()
  console.log('Chance:', shotChance)
  console.log('%', shot(player))

  if (shotChance <= shot(player)) {
    console.log('buckets')
  } else {
    console.log('brick')
  }
}
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
}
button {
  width: 27vw;
  height: 5rem;
  background-color: black;
  margin: 1rem;
}
</style>
