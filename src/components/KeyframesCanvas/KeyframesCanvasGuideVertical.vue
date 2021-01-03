<script lang="ts">
import { defineComponent } from 'vue'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_OFFSET_X,
  CANVAS_OFFSET_Y
} from '@/components/KeyframesCanvas/KeyframesCanvas.vue'

export default defineComponent({
  props: {
    position: { type: Number, required: true },
    maxY: { type: Number, default: 1.3 },
    minY: { type: Number, default: -0.3 }
  },

  setup() {
    return {
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
      :x1="CANVAS_OFFSET_X + position * CANVAS_WIDTH"
      :x2="CANVAS_OFFSET_X + position * CANVAS_WIDTH"
      :y1="CANVAS_OFFSET_Y + CANVAS_HEIGHT * (minY - 0.05)"
      :y2="CANVAS_OFFSET_Y + CANVAS_HEIGHT"
      stroke="#E0DED5"
    />
    <text
      :x="CANVAS_OFFSET_X + position * CANVAS_WIDTH"
      :y="CANVAS_OFFSET_Y + CANVAS_HEIGHT + 20"
      text-anchor="middle"
      class="text"
    >
      {{ (position * 100).toFixed() }}%
    </text>
    <line
      :x1="CANVAS_OFFSET_X + position * CANVAS_WIDTH"
      :x2="CANVAS_OFFSET_X + position * CANVAS_WIDTH"
      :y1="CANVAS_OFFSET_Y + CANVAS_HEIGHT + 30"
      :y2="CANVAS_OFFSET_Y + CANVAS_HEIGHT * (maxY + 0.05)"
      stroke="#E0DED5"
    />
  </g>
</template>

<style scoped lang="scss">
.text {
  fill: #949186;
  font-size: 0.8rem;
}
</style>
