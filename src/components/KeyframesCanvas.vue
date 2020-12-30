<script lang="ts">
import KeyframesCanvasPoint from '@/components/KeyframesCanvasPoint.vue'
import KeyframesCanvasLine from '@/components/KeyframesCanvasLine.vue'
import { computed, defineComponent, ref } from 'vue'
import { invertCoordenates, clamp } from '@/components/KeyframesCanvasHelper'
import { useStore } from 'vuex'
import { key } from '@/store'
import deepClone from 'deep-clone'

export const CANVAS_WIDTH = 1000
export const CANVAS_HEIGHT = 500

function extractCoordenates(event: MouseEvent) {
  return {
    x: clamp(Math.round((event.offsetX / CANVAS_WIDTH) * 100), 0, 100),
    y: Math.round(invertCoordenates(event.offsetY / CANVAS_HEIGHT) * 100)
  }
}

export default defineComponent({
  components: { KeyframesCanvasPoint, KeyframesCanvasLine },
  props: {},

  setup() {
    const store = useStore(key)
    const points = computed(() => store.state.points)

    let moveOrigin = {
      x: 0,
      y: 0
    }

    const originalPoints = ref(points.value)
    const isMoving = ref(false)

    function handleMouseDown(event: MouseEvent) {
      moveOrigin = extractCoordenates(event)

      store.commit('createPoint', moveOrigin)
      store.commit('selectPoint', moveOrigin)

      originalPoints.value = deepClone(points.value)
      isMoving.value = true
    }

    function handleMouseMove(event: MouseEvent) {
      if (isMoving.value) {
        const moveEnd = extractCoordenates(event)

        const moveOffset = {
          x: moveEnd.x - moveOrigin.x,
          y: moveEnd.y - moveOrigin.y
        }
        store.commit('moveSelectedPoints', {
          moveOffset,
          originalPoints: originalPoints.value
        })
      }
    }

    function handleMouseUp(event: MouseEvent) {
      handleMouseMove(event)

      isMoving.value = false
    }

    return {
      points,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp
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
      @mousemove="handleMouseMove($event)"
      @mouseup="handleMouseUp($event)"
    >
      <keyframes-canvas-line :points="points" />

      <keyframes-canvas-point
        v-for="point in points"
        :key="point.x"
        :point="point"
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
