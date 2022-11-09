<script lang="ts">
import {
  computeKeyframes,
  getSorroundingPoints,
  type Options,
  Property,
  ValueUnits,
} from '@/helpers'
import { key } from '@/store'
import interpolate from 'color-interpolate'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

const beginColor = '#b721ff'
const endColor = '#21d4fd'

function styleKeyframes(keyframes: Keyframe[], options: Options): Keyframe[] {
  const styledKeyframes = [...keyframes]

  const disabledStyle = {
    backgroundColor: '#bbb',
    boxShadow: '0px 8px 16px #bbba',
  }

  if (options.beginingDelay) {
    styledKeyframes[0] = {
      ...styledKeyframes[0],
      ...disabledStyle,
    }
    styledKeyframes[1] = {
      ...styledKeyframes[1],
      ...disabledStyle,
    }
    styledKeyframes[2].backgroundColor = beginColor
  }

  if (options.endDelay) {
    styledKeyframes[styledKeyframes.length - 3].backgroundColor = endColor
    styledKeyframes[styledKeyframes.length - 2] = {
      ...styledKeyframes[styledKeyframes.length - 2],
      ...disabledStyle,
    }
    styledKeyframes[styledKeyframes.length - 1] = {
      ...styledKeyframes[styledKeyframes.length - 1],
      ...disabledStyle,
    }
  }

  return styledKeyframes
}

export default defineComponent({
  setup() {
    const store = useStore(key)
    const points = computed(() => store.state.points)
    const cd = computed(() => store.state.canvasDimensions)

    const previewElement = ref<HTMLDivElement>()
    const animation = ref<Animation>()

    const fadedDotsCount = 20

    watchEffect(() => {
      if (previewElement.value) {
        const options: Options = {
          property: Property.translateY,
          fromValue: 0,
          toValue: -1 * cd.value.height,
          valueUnits: ValueUnits.px,
          duration: 5000,
          easingName: 'animation-easing',
          beginingDelay: 750,
          endDelay: 750,
        }

        const keyframes = styleKeyframes(
          computeKeyframes(points.value, options),
          options
        )

        if (animation.value) animation.value.cancel()
        animation.value = previewElement.value.animate(keyframes, {
          duration: options.duration,
          iterations: Infinity,
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

      const sorroundingPoints = getSorroundingPoints(x, points.value)

      if (!sorroundingPoints[0]) {
        return points.value[0].y
      }
      if (!sorroundingPoints[1]) {
        return points.value[points.value.length - 1].y
      }

      const p =
        (x - sorroundingPoints[1].x) /
        (sorroundingPoints[0].x - sorroundingPoints[1].x)

      return (
        sorroundingPoints[1].y +
        p * (sorroundingPoints[0].y - sorroundingPoints[1].y)
      )
    }

    const colorMap = interpolate([beginColor, endColor])

    return {
      previewElement,
      cd,
      pointInPath,
      fadedDotsCount,
      colorMap,
    }
  },
})
</script>

<template>
  <div
    class="animation"
    :style="`height: ${cd.height}px; transform: translateY(${
      cd.height * (cd.maxY - 1 + cd.stepY / 2)
    }px)`"
  >
    <div
      v-for="n in fadedDotsCount + 1"
      :key="n"
      class="object object--faded"
      :style="`transform: translateY(${
        (pointInPath(((n - 1) / fadedDotsCount) * 100) / 100) * -1 * cd.height
      }px); background-color: ${colorMap((n - 1) / fadedDotsCount)}`"
    ></div>
    <div ref="previewElement" class="object"></div>
  </div>
</template>

<style scoped lang="scss">
.animation {
  $height: 24px;
  width: $height;
  position: relative;
  align-self: start;

  .object {
    height: $height;
    width: $height;
    background-color: #8a7eff;
    border-radius: 100%;
    box-shadow: 0px 8px 16px rgb(138 126 255 / 63%);
    position: absolute;
    bottom: -$height * 0.5;
    left: 0;

    &--faded {
      box-shadow: none;
      opacity: 0.1;
    }
  }
}
</style>
