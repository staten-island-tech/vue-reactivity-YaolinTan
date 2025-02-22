<template>
  <div class="flex flex-row">
    <div class="box content mt-[3rem] flex justify-center items-center">
      <form @submit.prevent="navigateToAbout">
        <p>Select an option:</p>
        <label>
          <input type="radio" name="choice" :value="player1" v-model="selectedPlayer.player" />
          {{ player1.name }} </label
        ><br />
        <label>
          <input type="radio" name="choice" :value="player2" v-model="selectedPlayer.player" />
          {{ player2.name }} </label
        ><br />
        <label>
          <input type="radio" name="choice" :value="player3" v-model="selectedPlayer.player" />
          {{ player3.name }} </label
        ><br />
        <button class="submit-button" type="submit">Submit</button>
      </form>
      <h2>Selected Player: {{ selectedPlayer.player ? selectedPlayer.player.name : 'None' }}</h2>
    </div>
    <div class="flex flex-row">
      <div v-for="player in playersArray" :key="player.name" class="player-card mx-[1rem]">
        <h2 class="font-bold">{{ player.name }}</h2>
        <ul>
          <li>Overall: {{ player.overall }}</li>
          <li>Ball Handling: {{ player.ballHandling }}</li>
          <li>Three-Point: {{ player.threePoint }}</li>
          <li>Mid-Range: {{ player.midRange }}</li>
          <li>Free Throw: {{ player.freeThrow }}</li>
          <li>Driving Layup: {{ player.drivingLayup }}</li>
          <li>Driving Dunk: {{ player.drivingDunk }}</li>
          <li>Standing Dunk: {{ player.standingDunk }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { players } from './array'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import eventBus from '../EventBus' // Adjust the path based on the actual location

const router = useRouter()

const randomNumber1 = Math.floor(Math.random() * players.length)
const randomNumber2 = Math.floor(Math.random() * players.length)
const randomNumber3 = Math.floor(Math.random() * players.length)

const playersArray = [players[randomNumber1], players[randomNumber2], players[randomNumber3]]

const player1 = playersArray[0]
const player2 = playersArray[1]
const player3 = playersArray[2]

const selectedPlayer = reactive({ player: null })

const navigateToAbout = () => {
  eventBus.selectedPlayer = selectedPlayer.player // Emit the selected player to the event bus
  router.push({ name: 'about' })
}
</script>

<style scoped>
.submit-button {
  padding: 0.5rem;
  background-color: gray;
}
</style>
