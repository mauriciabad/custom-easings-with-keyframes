<script setup lang="ts">
import { computed } from 'vue'
import { getSorroundingPoints, toCanvasPoint } from '@/helpers'
import { useCanvasStore } from '@/stores/canvas'
import type { Point } from '@/types'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  point: { x: number; y: number }
}>()

const canvasStore = useCanvasStore()
const { points, canvasDimensions: cd } = storeToRefs(canvasStore)

const pointAlreadyExists = computed(
  () => !points.value.find((p) => p.x === props.point.x)
)

const sorroundingPoints = computed(() => {
  return getSorroundingPoints(props.point.x, points.value)
})

const sorroundingPointsIfExists = computed(() => {
  return sorroundingPoints.value.filter((p): p is Point => p !== undefined)
})

const leftPointInCanvas = computed(() => {
  return sorroundingPoints.value[0]
    ? toCanvasPoint(sorroundingPoints.value[0], cd.value)
    : undefined
})
const rightPointInCanvas = computed(() => {
  return sorroundingPoints.value[1]
    ? toCanvasPoint(sorroundingPoints.value[1], cd.value)
    : undefined
})
const centerPointInCanvas = computed(() => {
  return toCanvasPoint(props.point, cd.value)
})
</script>

<template>
  <g v-if="pointAlreadyExists" class="new-point">
    <defs>
      <keyframes-canvas-points-mask
        id="new-point-mask"
        :points="[point, ...sorroundingPointsIfExists]"
      />
    </defs>

    <g mask="url(#new-point-mask)">
      <line
        v-if="leftPointInCanvas"
        :x1="centerPointInCanvas.x"
        :y1="centerPointInCanvas.y"
        :x2="leftPointInCanvas.x"
        :y2="leftPointInCanvas.y"
        class="path"
      />
      <line
        v-if="rightPointInCanvas"
        :x1="centerPointInCanvas.x"
        :y1="centerPointInCanvas.y"
        :x2="rightPointInCanvas.x"
        :y2="rightPointInCanvas.y"
        class="path"
      />
    </g>
    <keyframes-canvas-point :point="{ isSelected: false, ...point }" />
  </g>
</template>

<style scoped lang="scss">
.new-point {
  opacity: 0.5;
  pointer-events: none;
}
.path {
  stroke: url(#line-gradient);
  stroke-width: 5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 8 16;
  stroke-dashoffset: 16;
}
</style>
