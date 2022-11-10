<script setup lang="ts">
import { computed } from 'vue'

import { invertCoordenates } from '@/helpers'
import { useCanvasStore } from '@/stores/canvas'

const props = defineProps<{ position: number }>()

const { canvasDimensions: cd } = useCanvasStore()
const positionInverted = computed(() => invertCoordenates(props.position))
</script>

<template>
  <g aria-hidden="true">
    <line
      :x1="cd.offset.x"
      :x2="cd.offset.x + cd.width"
      :y1="cd.height * (cd.stepY / 2 + positionInverted + cd.maxY - 1)"
      :y2="cd.height * (cd.stepY / 2 + positionInverted + cd.maxY - 1)"
      stroke="#E0DED5"
    />
    <text
      :x="cd.offset.x - 8"
      :y="cd.height * (cd.stepY / 2 + positionInverted + cd.maxY - 1) + 4"
      text-anchor="end"
      class="text"
      >{{ (position * 100).toFixed() }}%</text
    >
  </g>
</template>

<style scoped lang="scss">
.text {
  fill: #949186;
  font-size: 0.8rem;
}
</style>
