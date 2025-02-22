// src/EventBus.js

import { reactive } from 'vue'

const eventBus = reactive({
  selectedPlayer: null,
})

export default eventBus
