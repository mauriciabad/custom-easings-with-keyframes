<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { key, Options } from '@/store'
import { propertyValue } from '@/components/Preview.vue'
import { CANVAS_HEIGHT } from '@/components/KeyframesCanvas/KeyframesCanvas.vue'
import interpolate from 'color-interpolate'

export default defineComponent({
  props: {},
  components: {},

  setup() {
    const store = useStore(key)
    const points = computed(() => store.state.points)

    const previewElement = ref<HTMLDivElement>()
    const animation = ref<Animation>()
    const options: Options = {
      property: 'translateY',
      fromValue: 0,
      toValue: -1 * CANVAS_HEIGHT,
      valueUnits: 'px',
      duration: 6000,
      easingName: 'animation-easing'
    }

    const offset = 0.15
    const disabledStyle = {
      backgroundColor: '#bbb',
      boxShadow: '0px 8px 16px #bbba'
    }

    const fadedDotsCount = 20

    watchEffect(() => {
      if (previewElement.value) {
        const keyframes: Keyframe[] = points.value.map(point => ({
          offset: (point.x / 100) * (1 - 2 * offset) + offset,
          transform: `${options.property}(${propertyValue(point, options)})`
        }))

        keyframes[0].backgroundColor = '#b721ff'
        keyframes[keyframes.length - 1].backgroundColor = '#21d4fd'

        keyframes.unshift(
          {
            offset: 0,
            ...disabledStyle,
            transform: `${options.property}(${propertyValue(
              points.value[0],
              options
            )})`
          },
          {
            offset:
              (points.value[0].x / 100) * (1 - 2 * offset) + offset - 0.0001,
            ...disabledStyle,
            transform: `${options.property}(${propertyValue(
              points.value[0],
              options
            )})`
          }
        )

        keyframes.push(
          {
            offset:
              (points.value[points.value.length - 1].x / 100) *
                (1 - 2 * offset) +
              offset +
              0.0001,
            ...disabledStyle,
            transform: `${options.property}(${propertyValue(
              points.value[points.value.length - 1],
              options
            )})`
          },
          {
            offset: 1,
            ...disabledStyle,
            transform: `${options.property}(${propertyValue(
              points.value[points.value.length - 1],
              options
            )})`
          }
        )

        if (animation.value) animation.value.cancel()
        animation.value = previewElement.value.animate(keyframes, {
          duration: options.duration,
          iterations: Infinity
        })
      }
    })

    function pointInPath(x: number): number {
      if (x <= points.value[0].x) {
        return points.value[0].y
      }
      if (x >= points.value[points.value.length - 1].x) {
        return points.value[points.value.length - 1].y
      }

      for (let i = 0; i < points.value.length - 1; i++) {
        const leftPoint = points.value[i]
        const rightPoint = points.value[i + 1] || leftPoint

        if (leftPoint.x <= x && rightPoint.x >= x) {
          const p = (x - rightPoint.x) / (leftPoint.x - rightPoint.x)
          return rightPoint.y + p * (leftPoint.y - rightPoint.y)
        }
      }

      return 0
    }

    const colorMap = interpolate(['#b721ff', '#21d4fd'])

    return {
      previewElement,
      CANVAS_HEIGHT,
      pointInPath,
      fadedDotsCount,
      colorMap
    }
  }
})
</script>

<template>
  <div class="animation" :style="`height: ${CANVAS_HEIGHT}px`">
    <div
      class="object object--faded"
      v-for="n in fadedDotsCount + 1"
      :key="n"
      :style="
        `transform: translateY(${(pointInPath(
          ((n - 1) / fadedDotsCount) * 100
        ) /
          100) *
          -1 *
          CANVAS_HEIGHT}px); background-color: ${colorMap(
          (n - 1) / fadedDotsCount
        )}`
      "
    ></div>
    <div class="object" ref="previewElement"></div>
  </div>
</template>

<style scoped lang="scss">
.animation {
  $height: 24px;
  width: $height;
  position: relative;

  .object {
    height: $height;
    width: $height;
    background-color: #8a7eff;
    border-radius: 100%;
    box-shadow: 0px 8px 16px rgb(138 126 255 / 63%);
    position: absolute;
    bottom: -$height/2;
    left: 0;

    &--faded {
      box-shadow: none;
      opacity: 0.1;
    }
  }
}
</style>
