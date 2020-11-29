<script lang="ts">
import { computed, defineComponent } from 'vue'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/components/KeyframesCanvas.vue'

interface Point {
  x: number
  y: number
  isSelected: boolean
}

export default defineComponent({
  props: { point: { type: Object as () => Point, required: true } },
  emits: ['click'],

  setup(props) {
    const canvasX = computed(() => (props.point.x / 100) * CANVAS_WIDTH)
    const canvasY = computed(() => (props.point.y / 100) * CANVAS_HEIGHT)

    return { canvasX, canvasY }
  }
})
</script>

<template>
  <rect
    :x="canvasX - 7 - 4"
    :y="canvasY - 7 - 4"
    width="22"
    height="22"
    rx="6"
    fill="#FF00A8"
    opacity="0.5"
    class="point-outline"
    :class="{ 'point-outline--selected': point.isSelected }"
  />

  <rect
    :x="canvasX - 7"
    :y="canvasY - 7"
    width="14"
    height="14"
    rx="2"
    fill="#FFED48"
    stroke="black"
    stroke-width="2"
    tabindex="0"
    class="point"
    :class="{ 'point--selected': point.isSelected }"
    @click="$emit('click', $event)"
  />
</template>

<style scoped lang="scss">
.point-outline {
  pointer-events: none;
  display: none;

  &--selected {
    display: block;
  }
}
.point {
  cursor: pointer;
  outline: none;

  &--selected {
    cursor: move;
    outline: none;
  }
}
</style>
