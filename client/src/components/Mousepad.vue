<template>
  <canvas ref="root"></canvas>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

function normalize (val) {
  if (val < 0) return 0
  if (val > 1) return 1
  return val
}

export default {
  setup(props, { emit }) {
    let root = ref(null)

    const handleMouseMove = (el) => (event) => {
      const canvasSize = el.getBoundingClientRect()
      const x = event.touches[0].clientX - canvasSize.x
      const y = event.touches[0].clientY - canvasSize.y
      const xPos = x / canvasSize.width
      const yPos = y / canvasSize.height
      emit('move', { x: xPos, y: yPos })
    }

    onMounted(() => {
      document.addEventListener("touchmove", handleMouseMove(root.value))
    })

    onBeforeUnmount(() => {
      document.removeEventListener("touchmove", handleMouseMove(root.value))
    })

    return {
      root
    }
  }
}
</script>

<style scoped>
canvas {
  border: solid 1px black;
  aspect-ratio: 16 / 9;
  width: 80%;
  margin: 0 auto;
  display: block;
}
</style>