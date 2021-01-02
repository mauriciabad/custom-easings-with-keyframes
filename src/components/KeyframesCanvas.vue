<script lang="ts">
import KeyframesCanvasPoint from '@/components/KeyframesCanvasPoint.vue'
import KeyframesCanvasLine from '@/components/KeyframesCanvasLine.vue'
import KeyframesCanvasGuides from '@/components/KeyframesCanvasGuides.vue'
import { computed, defineComponent, ref } from 'vue'
import { invertCoordenates, clamp } from '@/components/KeyframesCanvasHelper'
import { useStore } from 'vuex'
import { key } from '@/store'
import deepClone from 'deep-clone'

export const CANVAS_WIDTH = 1000
export const CANVAS_HEIGHT = 500
export const CANVAS_OFFSET_X = 50
export const CANVAS_OFFSET_Y = 175

function extractCoordenates(event: MouseEvent) {
  return {
    x: clamp(
      Math.round(((event.offsetX - CANVAS_OFFSET_X) / CANVAS_WIDTH) * 100),
      0,
      100
    ),
    y: Math.round(
      invertCoordenates((event.offsetY - CANVAS_OFFSET_Y) / CANVAS_HEIGHT) * 100
    )
  }
}

export default defineComponent({
  components: {
    KeyframesCanvasPoint,
    KeyframesCanvasLine,
    KeyframesCanvasGuides
  },
  props: {},

  setup() {
    const store = useStore(key)
    const points = computed(() => store.state.points)

    let moveOrigin = {
      x: 0,
      y: 0
    }

    const originalPoints = ref(points.value)
    const isMoving = ref(false)
    const wasMovingPointSelected = ref(false)

    document.body.addEventListener('keydown', function(event: KeyboardEvent) {
      switch (event.key) {
        case 'Backspace':
        case 'Delete':
          store.commit('deleteFocusedPoints')
          break
        case 'Escape':
          store.commit('blurAllPoints')
          break
      }
    })

    function handleLeftClick(event: MouseEvent) {
      moveOrigin = extractCoordenates(event)

      const point = points.value.find(p => p.x === moveOrigin.x)
      wasMovingPointSelected.value = point ? point.isSelected : false

      store.commit('createPoint', moveOrigin)

      if (!wasMovingPointSelected.value && !event.shiftKey) {
        store.commit('blurAllPoints', moveOrigin)
      }
      store.commit('focusPoint', moveOrigin)

      originalPoints.value = deepClone(points.value)
      isMoving.value = true
    }

    function handleMouseMove(event: MouseEvent) {
      if (isMoving.value) {
        const moveEnd = extractCoordenates(event)

        const moveOffset = {
          x: moveEnd.x - moveOrigin.x,
          y: moveEnd.y - moveOrigin.y
        }
        store.commit('moveSelectedPoints', {
          moveOffset,
          originalPoints: originalPoints.value
        })
      }
    }

    function handleLeftClickUp(event: MouseEvent) {
      handleMouseMove(event)

      const moveEnd = extractCoordenates(event)
      if (moveOrigin.x === moveEnd.x && moveOrigin.y === moveEnd.y) {
        if (wasMovingPointSelected.value) {
          store.commit('blurPoint', moveOrigin)
        } else {
          if (!event.shiftKey) {
            store.commit('blurAllPoints', moveOrigin)
          }
          store.commit('focusPoint', moveOrigin)
        }
      }
      isMoving.value = false
    }

    function handleRightClick(event: MouseEvent) {
      const position = extractCoordenates(event)
      const point = points.value.find(p => p.x === position.x)
      if (point) store.commit('focusPoint', position)

      store.commit('deleteFocusedPoints')
    }

    function handleMouseUp(event: MouseEvent) {
      event.preventDefault()
      switch (event.which) {
        case 1:
          handleLeftClickUp(event)
          break
      }
    }

    function handleMouseDown(event: MouseEvent) {
      event.preventDefault()
      switch (event.which) {
        case 1:
          handleLeftClick(event)
          break
        case 3:
          handleRightClick(event)
          break
      }
    }

    return {
      points,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      CANVAS_OFFSET_X,
      CANVAS_OFFSET_Y,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleRightClick
    }
  }
})
</script>

<template>
  <div class="canvas-container">
    <svg
      height="850"
      width="1100"
      @mousedown="handleMouseDown($event)"
      @mousemove="handleMouseMove($event)"
      @mouseup="handleMouseUp($event)"
      @contextmenu="$event.preventDefault()"
      style="overflow: visible; user-select: none"
    >
      <g>
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="1.25"
              stdDeviation="5"
              flood-opacity="0.2"
            />
          </filter>
        </defs>
        <rect
          :x="CANVAS_OFFSET_X"
          :y="CANVAS_OFFSET_Y"
          :width="CANVAS_WIDTH"
          :height="CANVAS_HEIGHT"
          rx="2"
          ry="2"
          filter="url(#shadow)"
          fill="white"
        />
      </g>

      <keyframes-canvas-guides />

      <rect
        :x="CANVAS_OFFSET_X"
        :y="CANVAS_OFFSET_Y"
        :width="CANVAS_WIDTH"
        :height="CANVAS_HEIGHT"
        rx="2"
        ry="2"
        class="rectangle"
      />

      <svg
        :x="CANVAS_OFFSET_X"
        :y="CANVAS_OFFSET_Y"
        :width="CANVAS_WIDTH"
        :height="CANVAS_HEIGHT"
        style="overflow: visible"
      >
        <defs>
          <filter
            id="line-blur"
            filterUnits="userSpaceOnUse"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feOffset result="offOut" in="SourceGraphic" dy="11" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="16" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>

          <linearGradient
            id="line-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stop-color="#b721ff" />
            <stop offset="100%" stop-color="#21d4fd" />
          </linearGradient>
        </defs>

        <g filter="url(#line-blur)">
          <keyframes-canvas-line :points="points" />
          <g>
            <keyframes-canvas-point
              v-for="point in points"
              :key="point.x"
              :point="point"
            />
          </g>
        </g>
      </svg>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.canvas-container {
  width: 100%;
}
.rectangle {
  stroke-width: 2px;
  stroke: #b1ada1;
  fill: none;
}
</style>
