<script lang="ts">
import { computed, defineComponent } from 'vue'
import KeyframesCanvasGuideHorizontal from '@/components/KeyframesCanvas/KeyframesCanvasGuideHorizontal.vue'
import KeyframesCanvasGuideVertical from '@/components/KeyframesCanvas/KeyframesCanvasGuideVertical.vue'
import { useStore } from 'vuex'
import { key } from '@/store'

const maxY = 1.3
const minY = -0.3
const stepY = 0.1

const maxX = 1
const minX = 0
const stepX = 0.1

export default defineComponent({
  components: {
    KeyframesCanvasGuideHorizontal,
    KeyframesCanvasGuideVertical
  },
  props: {},

  setup() {
    const store = useStore(key)
    const canvasDimensions = computed(() => store.state.canvasDimensions)

    return {
      canvasDimensions,
      maxY,
      minY,
      stepY,
      maxX,
      minX,
      stepX
    }
  }
})
</script>

<template>
  <g>
    <defs>
      <linearGradient id="fade-out-to-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fff" stop-opacity="0" />
        <stop offset="100%" stop-color="#fff" />
      </linearGradient>
      <linearGradient id="fade-out-to-top" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#fff" stop-opacity="0" />
        <stop offset="100%" stop-color="#fff" />
      </linearGradient>
    </defs>
    <g>
      <keyframes-canvas-guide-horizontal
        v-for="n in Math.floor((maxY - minY) / stepY) + 1"
        :key="n"
        :position="minY + (n - 1) * stepY"
      />
    </g>
    <g>
      <keyframes-canvas-guide-vertical
        v-for="n in Math.floor((maxX - minX) / stepX) + 1"
        :key="n"
        :position="minX + (n - 1) * stepX"
        :maxY="maxY"
        :minY="minY"
      />
    </g>
    <rect
      fill="url(#fade-out-to-top)"
      :x="canvasDimensions.offset.x - 0.5"
      :y="canvasDimensions.offset.y + canvasDimensions.height * (minY - 0.05)"
      :width="canvasDimensions.width + 1"
      :height="canvasDimensions.height * 0.05 - 0.5"
    />
    <rect
      fill="url(#fade-out-to-bottom)"
      :x="canvasDimensions.offset.x - 0.5"
      :y="
        canvasDimensions.offset.y +
          canvasDimensions.height * (maxY + 0.05) -
          canvasDimensions.height * 0.05
      "
      :width="canvasDimensions.width + 1"
      :height="canvasDimensions.height * 0.05"
    />
  </g>
</template>

<style scoped lang="scss"></style>
