<script lang="ts">
import KeyframesCanvasPoint from '@/components/KeyframesCanvasPoint.vue'
import { defineComponent, ref } from 'vue'

interface Point {
  x: number
  y: number
  isSelected: boolean
}

export const CANVAS_WIDTH = 1000
export const CANVAS_HEIGHT = 500

export default defineComponent({
  components: { KeyframesCanvasPoint },
  props: {},

  setup() {
    const points = ref<Point[]>([
      {
        x: 10,
        y: 10,
        isSelected: false
      },
      {
        x: 20,
        y: 10,
        isSelected: false
      }
    ])

    const selectPoint = (x: number) => {
      points.value = points.value.map(p => ({ ...p, isSelected: false }))

      const point = points.value.find(p => p.x === x)

      if (point) {
        point.isSelected = true
      }
    }

    const createPoint = (x: number, y: number) => {
      if (points.value.find(p => p.x === x)) return

      points.value.push({
        x,
        y,
        isSelected: false
      })

      points.value.sort((a, b) => a.x - b.x)
    }

    return { points, selectPoint, createPoint, CANVAS_WIDTH, CANVAS_HEIGHT }
  }
})
</script>

<template>
  <div class="canvas-container">
    <svg
      :height="CANVAS_HEIGHT"
      :width="CANVAS_WIDTH"
      class="canvas"
      @click="
        createPoint(
          Math.round(($event.offsetX / CANVAS_WIDTH) * 100),
          Math.round(($event.offsetY / CANVAS_HEIGHT) * 100)
        )
      "
    >
      <keyframes-canvas-point
        v-for="point in points"
        :key="point.x"
        :point="point"
        @click="selectPoint(point.x)"
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
