<script lang="ts">
import { computed, defineComponent } from 'vue'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/components/KeyframesCanvas.vue'
import { Point } from '@/components/Canvas.d.ts'

export default defineComponent({
  props: { points: { type: Object as () => Point[], required: true } },

  setup(props) {
    const path = computed(() =>
      props.points.reduce((total, p) => {
        const x = (p.x / 100) * CANVAS_WIDTH
        const y = (p.y / 100) * CANVAS_HEIGHT

        if (!total) return `M${x} ${y}`
        else return `${total}L${x} ${y}`
      }, '')
    )

    return { path }
  }
})
</script>

<template>
  <path
    :d="path"
    stroke="#B796FF"
    stroke-width="8"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</template>

<style scoped lang="scss"></style>
