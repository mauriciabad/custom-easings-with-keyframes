<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Point } from '@/types'
import { toCanvasPoint } from '@/helpers'
import { useStore } from 'vuex'
import { key } from '@/store'
import KeyframesCanvasPointsMask from './KeyframesCanvasPointsMask.vue'

export default defineComponent({
  components: { KeyframesCanvasPointsMask },
  props: { points: { type: Object as () => Point[], required: true } },

  setup(props) {
    const store = useStore(key)
    const cd = computed(() => store.state.canvasDimensions)

    const pointsInCanvas = computed(() =>
      props.points.map((point) => toCanvasPoint(point, cd.value))
    )

    const path = computed(() =>
      pointsInCanvas.value.reduce((total, { x, y }) => {
        return total ? `${total}L${x} ${y}` : `M${x} ${y}`
      }, '')
    )

    return { path, pointsInCanvas, cd }
  }
})
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
