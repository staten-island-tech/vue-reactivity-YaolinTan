<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <div class="flex flex-col justify-start items-center w-full">
      <header class="flex flex-col justify-start items-center w-full">
        <H1 class="text-[3rem]">All About Buckets</H1>
        <nav>
          <RouterLink to="/">Restart</RouterLink>
        </nav>
      </header>
      <RouterView />
      <footer></footer>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  margin-top: 2rem;
  margin-left: 2rem;
}

.logo {
  display: block;
  margin: 0; /* Removed auto centering */
}

nav {
  width: 33vw;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center; /* Ensure vertical alignment */
    justify-content: flex-start; /* Align left */
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0; /* No margin on the logo */
  }

  header .wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
