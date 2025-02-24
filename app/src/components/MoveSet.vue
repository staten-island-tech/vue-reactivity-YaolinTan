<template>
  <div class="flex flex-col">
    <div class="flex justify-center mb-[2rem]">
      <div class="scoreboard flex justify-center">
        <span class="score">{{ playerScore }} - {{ cpuScore }}</span>
      </div>
    </div>
    <div class="flex flex-row justify-evenly">
      <button class="btn" @click.prevent="shoot(threePointChance, 'three')" :disabled="gameOver">
        <h2>Jab Step into a Three</h2>
      </button>
      <button class="btn" @click.prevent="shoot(midRangeChance, 'mid')" :disabled="gameOver">
        <h2>Shimmy Jab into a one-dribble middy</h2>
      </button>
      <button class="btn" @click.prevent="shoot(drivingLayupChance, 'layup')" :disabled="gameOver">
        <h2>Shimmy Jab into a driving layup</h2>
      </button>
    </div>
    <div class="flex flex-row justify-evenly">
      <button
        class="btn"
        @click.prevent="shoot(stepbackThreeChance, 'stepback')"
        :disabled="gameOver"
      >
        <h2>Pound Dribble Stepback Three</h2>
      </button>
      <button class="btn" @click.prevent="shoot(spinJumperChance, 'spin')" :disabled="gameOver">
        <h2>Drive into a midrange spin jumper</h2>
      </button>
      <button
        class="btn"
        @click.prevent="shoot(behindBackLayupChance, 'behindback')"
        :disabled="gameOver"
      >
        <h2>Double behind the back wrap into a driving layup</h2>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import eventBus from '../EventBus' // Ensure this path is correct
import { players } from './array'

const router = useRouter()
const playerScore = ref(0)
const cpuScore = ref(0)
const gameOver = ref(false) // Track if the game is over

const threePointChance = (player) => (player.threePoint * 0.45) / 100
const midRangeChance = (player) => (player.midRange * 0.55) / 100
const drivingLayupChance = (player) => (player.drivingLayup * 0.7) / 100
const stepbackThreeChance = (player) => {
  const baseChance = (player.threePoint * 0.5) / 99 // Scale to max of 0.38
  const handlingEffect = Math.random() < player.ballHandling / 99 ? 0.1 : -0.1 // Chance based on ball handling
  return Math.min(baseChance + handlingEffect, 0.5) // Cap at 0.38
}

const spinJumperChance = (player) => {
  const baseChance = (player.midRange * 0.55) / 99 // Scale to max of 0.45
  const handlingEffect = Math.random() < player.ballHandling / 99 ? 0.05 : -0.05 // Chance based on ball handling
  return Math.min(baseChance + handlingEffect, 0.55) // Cap at 0.45
}

const behindBackLayupChance = (player) => {
  const baseChance = (player.drivingLayup * 0.55) / 99 // Scale to max of 0.45
  const handlingEffect = Math.random() < player.ballHandling / 99 ? 0.08 : -0.08 // Lower reward/punishment chance
  return Math.min(baseChance + handlingEffect, 0.55) // Cap at 0.45
}

const shoot = (shot, shotType) => {
  const player = eventBus.selectedPlayer // Get the selected player from the event bus
  if (!player) {
    console.log('No player selected')
    return
  }
  const shotChance = Math.random()
  console.log('Chance:', shotChance)
  console.log('%', shot(player))

  if (shotChance <= shot(player)) {
    console.log('buckets')
    // Increment score based on shot type
    if (shotType === 'three') {
      playerScore.value += 3 // 3 points for a three-pointer
    } else if (shotType === 'mid') {
      playerScore.value += 2 // 2 points for a mid-range shot
    } else if (shotType === 'layup') {
      playerScore.value += 2 // 2 points for a layup
    } else if (shotType === 'stepback') {
      playerScore.value += 3 // 3 points for a stepback three
    } else if (shotType === 'spin') {
      playerScore.value += 2 // 2 points for a spin jumper
    } else if (shotType === 'behindback') {
      playerScore.value += 2 // 2 points for a behind the back layup
    }
  } else {
    console.log('brick')
  }

  // Check if either player has reached or exceeded 21 points
  if (playerScore.value >= 21) {
    console.log('You win!')
    gameOver.value = true // Set game over
    router.push({ name: 'win' }) // Redirect to WinView.vue
    return // Game stops here
  } else if (cpuScore.value >= 21) {
    console.log('You lose!')
    gameOver.value = true // Set game over
    router.push({ name: 'lose' }) // Redirect to LoseView.vue
    return // Game stops here
  }

  enemyTurn() // Proceed to enemy's turn if the game isn't over
}

const enemyTurn = () => {
  const randomNumber = Math.floor(Math.random() * players.length)
  const enemyPlayer = players[randomNumber]
  console.log(enemyPlayer)
  const enemyShotType = Math.floor(Math.random() * 6) // Now allows for 6 different shot types

  let shotChanceFunction
  let shotType

  // Select the appropriate shot chance function based on the random shot type
  switch (enemyShotType) {
    case 0:
      shotChanceFunction = threePointChance
      shotType = 'three'
      break
    case 1:
      shotChanceFunction = midRangeChance
      shotType = 'mid'
      break
    case 2:
      shotChanceFunction = drivingLayupChance
      shotType = 'layup'
      break
    case 3:
      shotChanceFunction = stepbackThreeChance
      shotType = 'stepback'
      break
    case 4:
      shotChanceFunction = spinJumperChance
      shotType = 'spin'
      break
    case 5:
      shotChanceFunction = behindBackLayupChance
      shotType = 'behindback'
      break
  }

  const shotChance = Math.random()
  console.log('Enemy shot chance:', shotChance)
  console.log('Enemy %', shotChanceFunction(enemyPlayer))

  if (shotChance <= shotChanceFunction(enemyPlayer)) {
    console.log('Enemy buckets')
    // Increment enemy score based on the shot type
    if (shotType === 'three') {
      cpuScore.value += 3 // 3 points for a three-pointer
    } else if (shotType === 'mid') {
      cpuScore.value += 2 // 2 points for a mid-range shot
    } else if (shotType === 'layup') {
      cpuScore.value += 2 // 2 points for a layup
    } else if (shotType === 'stepback') {
      cpuScore.value += 3 // 3 points for a stepback three
    } else if (shotType === 'spin') {
      cpuScore.value += 2 // 2 points for a spin jumper
    } else if (shotType === 'behindback') {
      cpuScore.value += 2 // 2 points for a behind the back layup
    }
  } else {
    console.log('Enemy brick')
  }

  // Check if either player has reached or exceeded 21 points
  if (playerScore.value >= 21) {
    console.log('You win!')
    gameOver.value = true // Set game over
    router.push({ name: 'win' }) // Redirect to WinView.vue
    return // Game stops here
  } else if (cpuScore.value >= 21) {
    console.log('You lose!')
    gameOver.value = true // Set game over
    router.push({ name: 'lose' }) // Redirect to LoseView.vue
    return // Game stops here
  }
}
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
}
button {
  width: 29vw;
  height: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: black;
  margin: 1rem;
  border: 0.2rem solid gold;
  border-radius: 5rem;
}
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
@media (max-width: 800px) {
  h2 {
    font-size: 1rem;
  }
}
</style>
