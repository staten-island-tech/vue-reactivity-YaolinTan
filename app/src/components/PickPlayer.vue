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

<script setup></script>

<style scoped>
.submit-button {
  padding: 0.5rem;
  background-color: gray;
}
</style>
