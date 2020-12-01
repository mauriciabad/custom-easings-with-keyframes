<script lang="ts">
import KeyframesCanvas from '@/components/KeyframesCanvas.vue'
import Preview from '@/components/Preview.vue'
import { computed, defineComponent, ref } from 'vue'
import 'simple-syntax-highlighter/dist/sshpre.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import SshPre from 'simple-syntax-highlighter'

export default defineComponent({
  components: { KeyframesCanvas, SshPre, Preview },

  setup() {
    const points = ref<{ x: number; y: number }[]>([])

    const property = ref<
      'scale' | 'translateX' | 'translateY' | 'opacity' | 'rotate'
    >('scale')
    const fromValue = ref(1)
    const toValue = ref(2)
    const valueUnits = ref<'' | 'px' | 'em' | 'rem' | '%' | 'deg' | 'turn'>('')
    const duration = ref(1000)
    const easingName = ref('ease-custom')

    const code = computed(() => {
      const keyframesLines = points.value.map(
        p =>
          `${(p.x * 100).toFixed()}% {transform: ${property.value}(${Math.round(
            ((toValue.value - fromValue.value) * p.y + fromValue.value) * 100
          ) / 100}${valueUnits.value});}`
      )
      return `.${easingName.value} {
  animation: ${easingName.value} ${duration.value}ms linear;
}

@keyframes ${easingName.value} {
${keyframesLines.reduce((total, line) => `${total}  ${line}\n`, '')}}`
    })

    return { code, points, property, toValue, fromValue, valueUnits, duration }
  }
})
</script>

<template>
  <main class="main-layout">
    <keyframes-canvas @update:points="points = $event" />

    <preview
      :points="points"
      :property="property"
      :toValue="toValue"
      :fromValue="fromValue"
      :valueUnits="valueUnits"
      :duration="duration"
    />

    <pre class="code"><code>{{code}}</code></pre>

    <ssh-pre
      language="css"
      dark
      copy-button
      reactive="true"
      class="code"
      v-if="false"
    >
      <template v-slot:copy-button>
        <svg viewBox="-40 0 512 512" height="2rem" width="2rem">
          <path
            d="m271 512h-191c-44.113281 0-80-35.886719-80-80v-271c0-44.113281 35.886719-80 80-80h191c44.113281 0 80 35.886719 80 80v271c0 44.113281-35.886719 80-80 80zm-191-391c-22.054688 0-40 17.945312-40 40v271c0 22.054688 17.945312 40 40 40h191c22.054688 0 40-17.945312 40-40v-271c0-22.054688-17.945312-40-40-40zm351 261v-302c0-44.113281-35.886719-80-80-80h-222c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h222c22.054688 0 40 17.945312 40 40v302c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm0 0"
            fill="currentColor"
          />
        </svg>
      </template>
      {{ code }}
    </ssh-pre>
  </main>
</template>

<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template: minmax(auto, 500px) / minmax(auto, 1000px);
  align-items: center;
  justify-content: center;
}
.code {
  text-align: left;
  background: #222;
  border-radius: 1rem;
  color: #fff;
  padding: 1.75rem 2rem;
}
::v-deep .ssh-pre__copy {
  background: none;
  border: none;
  color: #fff;
  padding: 1rem;
  cursor: pointer;
}
</style>
