<script lang="ts">
import KeyframesCanvasPoint from '@/components/KeyframesCanvasPoint.vue'
import KeyframesCanvasLine from '@/components/KeyframesCanvasLine.vue'
import { Point } from '@/components/Canvas.d.ts'
import { defineComponent, ref, watchEffect } from 'vue'
import { invertCoordenates } from '@/components/KeyframesCanvasHelper'

export const CANVAS_WIDTH = 1000
export const CANVAS_HEIGHT = 500

export default defineComponent({
  components: { KeyframesCanvasPoint, KeyframesCanvasLine },
  props: {},

  setup(props, { emit }) {
    const points = ref<Point[]>([
      {
        x: 0,
        y: 0,
        isSelected: false
      },
      {
        x: 100,
        y: 100,
        isSelected: false
      }
    ])

    watchEffect(() => {
      emit(
        'update:points',
        points.value.map(p => ({ x: p.x / 100, y: p.y / 100 }))
      )
    })

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

    function handleMouseDown({
      offsetX,
      offsetY
    }: {
      offsetX: number
      offsetY: number
    }) {
      const x = Math.round((offsetX / CANVAS_WIDTH) * 100)
      const y = Math.round(invertCoordenates(offsetY / CANVAS_HEIGHT) * 100)
      createPoint(x, y)
      selectPoint(x)
    }

    return {
      points,
      selectPoint,
      createPoint,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      handleMouseDown
    }
  }
})
</script>

<template>
  <div class="canvas-container">
    <svg
      :height="CANVAS_HEIGHT"
      :width="CANVAS_WIDTH"
      class="canvas"
      @mousedown="handleMouseDown($event)"
    >
      <keyframes-canvas-line :points="points" />

      <keyframes-canvas-point
        v-for="point in points"
        :key="point.x"
        :point="point"
        @select="selectPoint(point.x)"
        @move="movePoint(point.x, $event)"
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
