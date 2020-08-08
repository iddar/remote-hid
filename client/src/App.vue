<template>
  <h1>{{activeWin.name}}</h1>
  <Mousepad @move="handlerMove" msg="Hello Vue 3.0 + Vite" />
  <div class="control">
    <button @click.prevent="mouseClick">Click</button>
    <button @click.prevent="sendKey('space')">Pouse</button>
    <button @click.prevent="sendKey('f')">Fullscreen</button>
    <button @click.prevent="sendKey('audio_mute')">Mute</button>
    <button @click.prevent="sendKey('audio_vol_down')">down vol</button>
    <button @click.prevent="sendKey('audio_vol_up')">up vol</button>
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
    let socket = io('http://192.168.1.42:3000')
    const mouseClick = () => socket.emit('mouseClick')
    const sendKey = (key) => socket.emit('keypress', key)
    const activeWin = ref({})

    socket.on('window_change', (win) => {
      activeWin.value = win
      const winStr = Object.values(win).join(' ')
      console.log(winStr, winStr.toLowerCase().includes('firefox'))
    })

    const handlerMove = (point) => {
      socket.emit('movemouse', point)
    }

    return {
      mouseClick,
      handlerMove,
      sendKey,
      activeWin
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
