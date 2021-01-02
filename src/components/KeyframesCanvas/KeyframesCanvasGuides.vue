<script lang="ts">
import { defineComponent } from 'vue'
import KeyframesCanvasGuideHorizontal from '@/components/KeyframesCanvas/KeyframesCanvasGuideHorizontal.vue'
import KeyframesCanvasGuideVertical from '@/components/KeyframesCanvas/KeyframesCanvasGuideVertical.vue'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_OFFSET_X
} from '@/components/KeyframesCanvas/KeyframesCanvas.vue'

export default defineComponent({
  components: {
    KeyframesCanvasGuideHorizontal,
    KeyframesCanvasGuideVertical
  },
  props: {},

  setup() {
    return { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_OFFSET_X }
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
        v-for="n in 17"
        :key="n"
        :position="(n - 4) / 10"
      />
    </g>
    <g>
      <keyframes-canvas-guide-vertical
        v-for="n in 11"
        :key="n"
        :position="(n - 1) / 10"
      />
    </g>
    <rect
      fill="url(#fade-out-to-top)"
      :x="CANVAS_OFFSET_X - 0.5"
      :y="0"
      :width="CANVAS_WIDTH + 1"
      :height="CANVAS_HEIGHT * 0.05 - 0.5"
    />
    <rect
      fill="url(#fade-out-to-bottom)"
      :x="CANVAS_OFFSET_X - 0.5"
      :y="850 - CANVAS_HEIGHT * 0.05 + 0.5"
      :width="CANVAS_WIDTH + 1"
      :height="CANVAS_HEIGHT * 0.05"
    />
  </g>
</template>

<style scoped lang="scss"></style>
