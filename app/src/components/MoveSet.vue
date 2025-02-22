<template>
  <div class="flex flex-col">
    <div class="flex justify-center">
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
      <button class="btn" @click.prevent="shoot(threePointChance, 'three')" :disabled="gameOver">
        <h2>Pound Dribble Stepback Three</h2>
      </button>
      <button class="btn" @click.prevent="shoot(midRangeChance, 'mid')" :disabled="gameOver">
        <h2>Drive into a midrange spin jumper</h2>
      </button>
      <button class="btn" @click.prevent="shoot(drivingLayupChance, 'layup')" :disabled="gameOver">
        <h2>Double behind the back wrap into a driving layup</h2>
      </button>
    </div>
  </div>
</template>

<script setup>
import eventBus from '../EventBus' // Ensure this path is correct
import { ref } from 'vue'
import { players } from './array'

const playerScore = ref(0)
const cpuScore = ref(0)
const gameOver = ref(false) // Track if the game is over

const threePointChance = (player) => (player.threePoint * 0.45) / 100
const midRangeChance = (player) => (player.midRange * 0.55) / 100
const drivingLayupChance = (player) => (player.drivingLayup * 0.7) / 100

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
      playerScore.value += 1 // 1 point for a layup
    }
  } else {
    console.log('brick')
  }

  // Check if either player has reached or exceeded 21 points
  if (playerScore.value >= 21) {
    console.log('You win!')
    gameOver.value = true // Set game over
    return // Game stops here
  } else if (cpuScore.value >= 21) {
    console.log('You lose!')
    gameOver.value = true // Set game over
    return // Game stops here
  }

  enemyTurn() // Proceed to enemy's turn if the game isn't over
}

const enemyTurn = () => {
  const randomNumber = Math.floor(Math.random() * players.length)
  const enemyPlayer = players[randomNumber]
  const enemyShotType = Math.floor(Math.random() * 3) // 0: three, 1: mid, 2: layup

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
      cpuScore.value += 1 // 1 point for a layup
    }
  } else {
    console.log('Enemy brick')
  }

  // Check if either player has reached or exceeded 21 points
  if (playerScore.value >= 21) {
    console.log('You win!')
    gameOver.value = true // Set game over
    return // Game stops here
  } else if (cpuScore.value >= 21) {
    console.log('You lose!')
    gameOver.value = true // Set game over
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
  height: 5rem;
  background-color: black;
  margin: 1rem;
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
</style>
