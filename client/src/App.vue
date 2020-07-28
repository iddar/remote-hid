<template>
  <Mousepad @move="handlerMove" msg="Hello Vue 3.0 + Vite" />
  <div class="control">
    <button @click.prevent="mouseClick">
      Click
    </button>
    <button @click.prevent="sendKey('space')">
      Pouse
    </button>
    <button @click.prevent="sendKey('f')">
      Fullscreen
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Mousepad from './components/Mousepad.vue'


export default {
  components: {
    Mousepad
  },
  setup () {
    let socket = ref()
    const mouseClick = () => socket.emit('mouseClick')
    const sendKey = (key) => socket.emit('keypress', key)

    onMounted(() => {
      socket = io('http://192.168.1.42:3000')
    })

    const handlerMove = (point) => {
      socket.emit('movemouse', point)
    }

    return {
      test: 1,
      mouseClick,
      handlerMove,
      sendKey
    }
  }
}
</script>

<style>
.control {
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}

.control button {
  height: 60px;
}
</style>