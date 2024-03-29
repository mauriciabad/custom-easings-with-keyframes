<script setup lang="ts">
import { clamp, invertCoordenates, deepClone } from '@/helpers'
import { useCanvasStore } from '@/stores/canvas'
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Point } from '@/types'

const canvasStore = useCanvasStore()
const {
  createPoint,
  deleteFocusedPoints,
  focusPoint,
  blurPoint,
  blurAllPoints,
  moveSelectedPoints,
  resize,
} = canvasStore
const { points, canvasDimensions: cd } = storeToRefs(canvasStore)

const newPoint = ref<
  | {
      x: number
      y: number
    }
  | undefined
>()

let moveOrigin = {
  x: 0,
  y: 0,
}

const originalPoints = ref<Point[]>(deepClone(points.value))
const isMoving = ref(false)
const wasMovingPointSelected = ref(false)

const canvas = ref<SVGElement>()
const canvasContainer = ref<HTMLDivElement>()

function extractCoordenates(event: MouseEvent) {
  if (!canvas.value) return { x: 0, y: 0 }

  const canvasRects = canvas.value.getClientRects()[0]
  const offset = {
    x: event.clientX - canvasRects.left,
    y: event.clientY - canvasRects.top,
  }

  return {
    x: clamp(
      Math.round(((offset.x - cd.value.offset.x) / cd.value.width) * 100),
      0,
      100
    ),
    y: Math.round(
      invertCoordenates(
        (offset.y -
          cd.value.height * (cd.value.maxY - 1 + cd.value.stepY / 2)) /
          cd.value.height
      ) * 100
    ),
  }
}

const resizeObserver = new ResizeObserver((entries) => {
  resize({
    height: entries[0].contentRect.height,
    width: entries[0].contentRect.width,
  })
})

onMounted(() => {
  if (canvasContainer.value) {
    resizeObserver.observe(canvasContainer.value)
  }
})

onUnmounted(() => {
  if (canvasContainer.value) {
    resizeObserver.unobserve(canvasContainer.value)
  }
})

document.body.addEventListener('keydown', function (event: KeyboardEvent) {
  switch (event.key) {
    case 'Backspace':
    case 'Delete':
      deleteFocusedPoints()
      break
    case 'Escape':
      blurAllPoints()
      break
  }
})

function handleLeftClick(event: MouseEvent) {
  moveOrigin = extractCoordenates(event)

  const point = points.value.find((p) => p.x === moveOrigin.x)
  wasMovingPointSelected.value = point ? point.isSelected : false

  createPoint(moveOrigin)

  if (!wasMovingPointSelected.value && !event.shiftKey) {
    blurAllPoints()
  }
  focusPoint(moveOrigin)

  originalPoints.value = deepClone(points.value)
  isMoving.value = true
}

function handleMouseMove(event: MouseEvent) {
  newPoint.value = extractCoordenates(event)

  if (isMoving.value) {
    const moveEnd = extractCoordenates(event)

    const moveOffset = {
      x: moveEnd.x - moveOrigin.x,
      y: moveEnd.y - moveOrigin.y,
    }
    moveSelectedPoints({
      moveOffset,
      originalPoints: originalPoints.value,
    })
  }
}

function handleLeftClickUp(event: MouseEvent) {
  handleMouseMove(event)

  const moveEnd = extractCoordenates(event)
  if (moveOrigin.x === moveEnd.x && moveOrigin.y === moveEnd.y) {
    if (wasMovingPointSelected.value) {
      blurPoint(moveOrigin)
    } else {
      if (!event.shiftKey) {
        blurAllPoints()
      }
      focusPoint(moveOrigin)
    }
  }
  isMoving.value = false
}

function handleRightClick(event: MouseEvent) {
  const position = extractCoordenates(event)
  const point = points.value.find((p) => p.x === position.x)
  if (point) focusPoint(position)

  deleteFocusedPoints()
}

function handleMouseLeave() {
  newPoint.value = undefined
}

function handleMouseUp(event: MouseEvent) {
  event.preventDefault()
  if (event.which === 1) {
    handleLeftClickUp(event)
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
</script>

<template>
  <div ref="canvasContainer" class="canvas-container">
    <svg
      ref="canvas"
      :height="cd.height * (cd.maxY - cd.minY + cd.stepY)"
      :width="cd.width + cd.offset.x + 32"
      class="canvas"
      @mousedown="handleMouseDown($event)"
      @mousemove="handleMouseMove($event)"
      @mouseup="handleMouseUp($event)"
      @contextmenu="$event.preventDefault()"
      @mouseleave="handleMouseLeave()"
      @blur="handleMouseLeave()"
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
        <filter id="shadow">
          <feDropShadow dx="0" dy="1.25" stdDeviation="5" flood-opacity="0.2" />
        </filter>
      </defs>

      <g>
        <rect
          :x="cd.offset.x"
          :y="cd.height * (cd.maxY - 1 + cd.stepY / 2)"
          :width="cd.width"
          :height="cd.height"
          rx="2"
          ry="2"
          filter="url(#shadow)"
          fill="white"
        />
      </g>

      <keyframes-canvas-guides />

      <rect
        :x="cd.offset.x"
        :y="cd.height * (cd.maxY - 1 + cd.stepY / 2)"
        :width="cd.width"
        :height="cd.height"
        rx="2"
        ry="2"
        class="rectangle"
        data-test-id="canvas-main-area"
      />

      <foreignObject
        :x="cd.offset.x"
        :y="cd.height * (cd.maxY - 1 + cd.stepY / 2)"
        :width="cd.width"
        :height="cd.height"
      >
        <div class="instructions-container">
          <keyframes-canvas-instructions />
        </div>
      </foreignObject>
      <svg
        :x="cd.offset.x"
        :y="cd.height * (cd.maxY - 1 + cd.stepY / 2)"
        :width="cd.width"
        :height="cd.height"
        style="overflow: visible"
      >
        <g filter="url(#line-blur)">
          <keyframes-canvas-new-point v-if="newPoint" :point="newPoint" />
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
  height: 100%;
  position: relative;

  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
    user-select: none;
    cursor: crosshair;
  }
}
.rectangle {
  stroke-width: 2px;
  stroke: #b1ada1;
  fill: none;
}
.instructions-container {
  position: relative;
  height: 100%;

  .instructions {
    position: absolute;
    left: 16px;
    top: 16px;
  }
}
</style>
