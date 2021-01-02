<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Point } from '@/components/Canvas.d.ts'
import {
  toCanvasPointX,
  toCanvasPointY
} from '@/components/KeyframesCanvasHelper'

export default defineComponent({
  props: { point: { type: Object as () => Point, required: true } },

  setup(props) {
    const canvasX = computed(() => toCanvasPointX(props.point.x))
    const canvasY = computed(() => toCanvasPointY(props.point.y))

    return { canvasX, canvasY }
  }
})
</script>

<template>
  <circle
    r="7"
    :cx="canvasX"
    :cy="canvasY"
    class="point"
    :class="{ 'point--selected': point.isSelected }"
  />

  <circle
    r="2.5"
    :cx="canvasX"
    :cy="canvasY"
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

  cursor: pointer;
  outline: none;

  &--selected {
    cursor: move;
    outline: none;
  }
}
</style>
