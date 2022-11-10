<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

const store = useStore(key)
const cd = computed(() => store.state.canvasDimensions)
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
        v-for="n in Math.floor((cd.maxY - cd.minY) / cd.stepY) + 1"
        :key="n"
        :position="cd.minY + (n - 1) * cd.stepY"
      />
    </g>
    <g>
      <keyframes-canvas-guide-vertical
        v-for="n in Math.floor((cd.maxX - cd.minX) / cd.stepX) + 1"
        :key="n"
        :position="cd.minX + (n - 1) * cd.stepX"
      />
    </g>
    <rect
      fill="url(#fade-out-to-top)"
      :x="cd.offset.x - 0.5"
      :y="0"
      :width="cd.width + 1"
      :height="cd.height * (cd.stepY / 2) - 0.5"
    />
    <rect
      fill="url(#fade-out-to-bottom)"
      :x="cd.offset.x - 0.5"
      :y="cd.height * (cd.maxY - cd.minY + cd.stepY / 2)"
      :width="cd.width + 1"
      :height="cd.height * (cd.stepY / 2)"
    />
  </g>
</template>

<style scoped lang="scss"></style>
