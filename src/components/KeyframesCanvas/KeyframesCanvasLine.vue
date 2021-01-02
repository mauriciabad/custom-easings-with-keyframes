<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Point } from '@/types'
import { toCanvasPoint } from '@/helpers'

export default defineComponent({
  props: { points: { type: Object as () => Point[], required: true } },

  setup(props) {
    const pointsInCanvas = computed(() => props.points.map(toCanvasPoint))

    const path = computed(() =>
      pointsInCanvas.value.reduce((total, { x, y }) => {
        return total ? `${total}L${x} ${y}` : `M${x} ${y}`
      }, '')
    )

    return { path, pointsInCanvas }
  }
})
</script>

<template>
  <g>
    <defs>
      <mask id="line-mask">
        <rect x="-100%" y="-100%" width="300%" height="300%" fill="white" />
        <circle
          v-for="point in pointsInCanvas"
          :key="point.x"
          r="8"
          :cx="point.x"
          :cy="point.y"
          fill="black"
        />
      </mask>
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
