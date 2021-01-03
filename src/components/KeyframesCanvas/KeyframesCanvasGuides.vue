<script lang="ts">
import { defineComponent } from 'vue'
import KeyframesCanvasGuideHorizontal from '@/components/KeyframesCanvas/KeyframesCanvasGuideHorizontal.vue'
import KeyframesCanvasGuideVertical from '@/components/KeyframesCanvas/KeyframesCanvasGuideVertical.vue'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_OFFSET_X,
  CANVAS_OFFSET_Y
} from '@/components/KeyframesCanvas/KeyframesCanvas.vue'

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
    return {
      CANVAS_HEIGHT,
      CANVAS_WIDTH,
      CANVAS_OFFSET_X,
      CANVAS_OFFSET_Y,
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
      :x="CANVAS_OFFSET_X - 0.5"
      :y="CANVAS_OFFSET_Y + CANVAS_HEIGHT * (minY - 0.05)"
      :width="CANVAS_WIDTH + 1"
      :height="CANVAS_HEIGHT * 0.05 - 0.5"
    />
    <rect
      fill="url(#fade-out-to-bottom)"
      :x="CANVAS_OFFSET_X - 0.5"
      :y="
        CANVAS_OFFSET_Y + CANVAS_HEIGHT * (maxY + 0.05) - CANVAS_HEIGHT * 0.05
      "
      :width="CANVAS_WIDTH + 1"
      :height="CANVAS_HEIGHT * 0.05"
    />
  </g>
</template>

<style scoped lang="scss"></style>
