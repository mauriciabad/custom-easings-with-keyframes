<script setup lang="ts">
import { computed } from 'vue'
import type { Point } from '@/types'
import { toCanvasPoint } from '@/helpers'
import { useCanvasStore } from '@/stores/canvas'

const props = defineProps<{
  points: Point[]
}>()
const { canvasDimensions: cd } = useCanvasStore()

const pointsInCanvas = computed(() => {
  const pointsWithStartAndEnd = [...props.points]

  if (pointsWithStartAndEnd[0].x !== 0) {
    pointsWithStartAndEnd.unshift({ x: 0, y: 0, isSelected: false })
  }
  if (pointsWithStartAndEnd[pointsWithStartAndEnd.length - 1].x !== 100) {
    pointsWithStartAndEnd.push({ x: 100, y: 0, isSelected: false })
  }

  return pointsWithStartAndEnd.map((point) => toCanvasPoint(point, cd))
})

const path = computed(() =>
  pointsInCanvas.value.reduce((total, { x, y }) => {
    return total ? `${total}L${x} ${y}` : `M${x} ${y}`
  }, '')
)
</script>

<template>
  <g>
    <defs>
      <keyframes-canvas-points-mask id="line-mask" :points="points" />
    </defs>

    <path :d="path" mask="url(#line-mask)" class="path" />
  </g>
</template>

<style scoped lang="scss">
.path {
  stroke: url(#line-gradient);
  stroke-width: 5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
