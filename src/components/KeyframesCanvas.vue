<script lang="ts">
import KeyframesCanvasPoint from '@/components/KeyframesCanvasPoint.vue'
import { defineComponent, ref } from 'vue'

interface Point {
  x: number
  y: number
  isSelected: boolean
}

export default defineComponent({
  components: { KeyframesCanvasPoint },
  props: {},

  setup() {
    const points = ref<Point[]>([
      {
        x: 100,
        y: 100,
        isSelected: false
      },
      {
        x: 200,
        y: 100,
        isSelected: false
      }
    ])

    const handlePointClick = (x: number) => {
      points.value = points.value.map(p => ({ ...p, isSelected: false }))

      const point = points.value.find(p => p.x === x)

      if (point) {
        point.isSelected = true
      }
    }

    return { points, handlePointClick }
  }
})
</script>

<template>
  <div class="canvas-container">
    <svg viewBox="0 0 1000 800" class="canvas">
      <keyframes-canvas-point
        v-for="point in points"
        :key="point.x"
        :point="point"
        @click="handlePointClick(point.x)"
      />
    </svg>
  </div>
</template>

<style scoped lang="scss">
.canvas-container {
  width: 100%;
}
.canvas {
  border: solid 4px #333;
  border-radius: 4px;
}
</style>
