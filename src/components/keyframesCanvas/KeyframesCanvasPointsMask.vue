<script setup lang="ts">
import { computed } from 'vue'
import { toCanvasPoint } from '@/helpers'
import { useCanvasStore } from '@/stores/canvas'

const props = defineProps<{
  points: { x: number; y: number }[]
}>()

const { canvasDimensions: cd } = useCanvasStore()

const pointsInCanvas = computed(() =>
  props.points.map((point) => toCanvasPoint(point, cd))
)
</script>

<template>
  <mask>
    <rect
      :x="`${(cd.offset.x / cd.width) * -1 * 100}%`"
      :y="`${(cd.maxY - 1 + cd.stepY / 2 + 32 / cd.height) * -1 * 100}%`"
      :width="`${100 + ((32 + cd.offset.x) / cd.width) * 100}%`"
      :height="`${(cd.maxY - cd.minY + cd.stepY + 64 / cd.height) * 100}%`"
      fill="white"
    />
    <circle
      v-for="point in pointsInCanvas"
      :key="`${point.x},${point.y}`"
      r="8"
      :cx="point.x"
      :cy="point.y"
      fill="black"
    />
  </mask>
</template>
