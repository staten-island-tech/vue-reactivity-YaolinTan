<template>
  <div>
    <div class="box">
      <form action="submit" @submit.prevent="">
        <p>Select an option:</p>
        <label> <input type="radio" name="choice" value="option1" /> Option 1 </label><br />
        <label> <input type="radio" name="choice" value="option2" /> Option 2 </label><br />
        <label> <input type="radio" name="choice" value="option3" /> Option 3 </label><br />
        <button class="submit-button" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { players } from './array'
import { ref } from 'vue'

const randomNumber1 = Math.floor(Math.random() * 99)
const randomNumber2 = Math.floor(Math.random() * 99)
const randomNumber3 = Math.floor(Math.random() * 99)

let player1 = players[randomNumber1]
let player2 = players[randomNumber2]
let player3 = players[randomNumber3]

console.log(player1, player2, player3)
</script>

<style scoped>
.submit-button {
  padding: 0.5rem;
  background-color: gray;
}
</style>
