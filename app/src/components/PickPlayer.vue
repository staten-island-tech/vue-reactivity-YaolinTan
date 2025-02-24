<template>
  <div class="flex flex-row justify-center mt-[3rem]">
    <div class="box content mt-[3rem] flex justify-center items-center">
      <form class="mr-[2rem]" @submit.prevent="navigateToAbout">
        <p class="mb-[2rem]">Select an option:</p>
        <label class="flex flex-row">
          <input type="radio" name="choice" :value="player1" v-model="selectedPlayer.player" />
          <h2>{{ player1.name }}</h2> </label
        ><br />
        <label class="flex flex-row">
          <input type="radio" name="choice" :value="player2" v-model="selectedPlayer.player" />
          <h2>{{ player2.name }}</h2> </label
        ><br />
        <label class="flex flex-row">
          <input type="radio" name="choice" :value="player3" v-model="selectedPlayer.player" />
          <h2>{{ player3.name }}</h2> </label
        ><br />
        <button class="submit-button" type="submit">Submit</button>
      </form>
      <h2 class="mr-[2rem]">
        Selected Player: {{ selectedPlayer.player ? selectedPlayer.player.name : 'None' }}
      </h2>
    </div>
    <div class="flex flex-row">
      <div
        v-for="player in playersArray"
        :key="player.name"
        class="player-card mx-[1.5rem] mt-[2rem] bg-[#d9c196] border border-[#5d3eca75] rounded-[1rem] px-[1rem] py-[1rem] text-gray-800"
      >
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
@media (max-width: 800px) {
  h2 {
    font-size: 1rem;
  }
}
</style>
