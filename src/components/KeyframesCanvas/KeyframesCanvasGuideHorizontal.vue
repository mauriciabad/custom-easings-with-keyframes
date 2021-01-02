<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_OFFSET_X,
  CANVAS_OFFSET_Y
} from '@/components/KeyframesCanvas/KeyframesCanvas.vue'
import { invertCoordenates } from '@/helpers'

export default defineComponent({
  props: { position: { type: Number, required: true } },

  setup(props) {
    const positionInverted = computed(() => invertCoordenates(props.position))

    return {
      positionInverted,
      CANVAS_HEIGHT,
      CANVAS_WIDTH,
      CANVAS_OFFSET_X,
      CANVAS_OFFSET_Y
    }
  }
})
</script>

<template>
  <g aria-hidden="true">
    <line
      :x1="CANVAS_OFFSET_X"
      :x2="CANVAS_OFFSET_X + CANVAS_WIDTH"
      :y1="CANVAS_OFFSET_Y + position * CANVAS_HEIGHT"
      :y2="CANVAS_OFFSET_Y + position * CANVAS_HEIGHT"
      stroke="#E0DED5"
    />
    <text
      :x="CANVAS_OFFSET_X - 8"
      :y="CANVAS_OFFSET_Y + position * CANVAS_HEIGHT + 4"
      text-anchor="end"
      class="text"
      >{{ (positionInverted * 100).toFixed() }}%</text
    >
  </g>
</template>

<style scoped lang="scss">
.text {
  fill: #949186;
  font-size: 0.8rem;
}
</style>
