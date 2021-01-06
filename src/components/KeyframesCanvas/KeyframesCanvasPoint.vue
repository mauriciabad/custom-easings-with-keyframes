<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Point } from '@/types'
import { toCanvasPoint } from '@/helpers'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
  props: { point: { type: Object as () => Point, required: true } },

  setup(props) {
    const store = useStore(key)
    const canvasDimensions = computed(() => store.state.canvasDimensions)

    const pointInCanvas = computed(() =>
      toCanvasPoint(props.point, canvasDimensions.value)
    )

    return { pointInCanvas }
  }
})
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
