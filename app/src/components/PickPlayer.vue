<template>
  <div>
    <div class="box content mt-[3rem] flex justify-center items-center">
      <form @submit.prevent="navigateToAbout">
        <p>Select an option:</p>
        <label>
          <input type="radio" name="choice" :value="player1.name" v-model="selectedPlayer" />
          {{ player1.name }} </label
        ><br />
        <label>
          <input type="radio" name="choice" :value="player2.name" v-model="selectedPlayer" />
          {{ player2.name }} </label
        ><br />
        <label>
          <input type="radio" name="choice" :value="player3.name" v-model="selectedPlayer" />
          {{ player3.name }} </label
        ><br />
        <button class="submit-button" type="submit">Submit</button>
      </form>
      <h2>Selected Player: {{ selectedPlayer }}</h2>
    </div>
  </div>
</template>

<script setup>
import { players } from './array'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter for navigation

const router = useRouter() // Create the router instance

const randomNumber1 = Math.floor(Math.random() * players.length)
const randomNumber2 = Math.floor(Math.random() * players.length)
const randomNumber3 = Math.floor(Math.random() * players.length)

const player1 = players[randomNumber1]
const player2 = players[randomNumber2]
const player3 = players[randomNumber3]

const selectedPlayer = ref('') // Initialize selectedPlayer

console.log(player1)
console.log(player2)
console.log(player3)

const navigateToAbout = () => {
  router.push({ name: 'about' })
}
</script>

<style scoped>
.submit-button {
  padding: 0.5rem;
  background-color: gray;
}
</style>
