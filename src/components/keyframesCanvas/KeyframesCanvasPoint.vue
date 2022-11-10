<script setup lang="ts">
import { computed } from 'vue'
import type { Point } from '@/types'
import { toCanvasPoint } from '@/helpers'
import { useCanvasStore } from '@/stores/canvas'

const props = defineProps<{
  point: Point
}>()

const { canvasDimensions: cd } = useCanvasStore()

const pointInCanvas = computed(() => toCanvasPoint(props.point, cd))
</script>

<template>
  <circle
    r="7"
    :cx="pointInCanvas.x"
    :cy="pointInCanvas.y"
    class="point"
    :class="{ 'point--selected': point.isSelected }"
  />

  <circle
    r="2.5"
    :cx="pointInCanvas.x"
    :cy="pointInCanvas.y"
    class="point-outline"
    :class="{ 'point-outline--selected': point.isSelected }"
  />
</template>

<style scoped lang="scss">
.point-outline {
  fill: #000;
  opacity: 0;
  transition: opacity 200ms ease-out;

  pointer-events: none;

  &--selected {
    opacity: 0.75;
  }
}
.point {
  fill: transparent;
  stroke: url(#line-gradient);
  stroke-width: 5;

  cursor: grab;
  outline: none;

  &--selected {
    cursor: move;
    outline: none;
  }
}
</style>
