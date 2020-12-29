<script lang="ts">
import KeyframesCanvasPoint from '@/components/KeyframesCanvasPoint.vue'
import KeyframesCanvasLine from '@/components/KeyframesCanvasLine.vue'
import { computed, defineComponent } from 'vue'
import { invertCoordenates } from '@/components/KeyframesCanvasHelper'
import { useStore } from 'vuex'
import { key } from '@/store'

export const CANVAS_WIDTH = 1000
export const CANVAS_HEIGHT = 500

export default defineComponent({
  components: { KeyframesCanvasPoint, KeyframesCanvasLine },
  props: {},

  setup() {
    const store = useStore(key)
    const points = computed(() => store.state.points)

    function handleMouseDown({
      offsetX,
      offsetY
    }: {
      offsetX: number
      offsetY: number
    }) {
      const x = Math.round((offsetX / CANVAS_WIDTH) * 100)
      const y = Math.round(invertCoordenates(offsetY / CANVAS_HEIGHT) * 100)
      store.commit('createPoint', { x, y })
      store.commit('selectPoint', { x })
    }

    return {
      points,
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
