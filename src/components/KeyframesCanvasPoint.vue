<script lang="ts">
import { defineComponent } from 'vue'

interface Point {
  x: number
  y: number
  isSelected: boolean
}

export default defineComponent({
  props: { point: Object as () => Point },
  emits: ['click'],

  setup() {
    return {}
  }
})
</script>

<template>
  <rect
    :x="point.x - 4"
    :y="point.y - 4"
    width="22"
    height="22"
    rx="6"
    fill="#FF00A8"
    opacity="0.5"
    class="point-outline"
    :class="{ 'point-outline--selected': point.isSelected }"
  />

  <rect
    :x="point.x"
    :y="point.y"
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
