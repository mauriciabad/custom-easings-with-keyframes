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
    const fromValue = ref(0)
    const toValue = ref(1)
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
    <keyframes-canvas
      @update:points="points = $event"
      class="keyframes-canvas"
    />

    <div class="options">
      <select name="property" id="property" v-model="property">
        <option value="scale">scale</option>
        <option value="translateX">translateX</option>
        <option value="translateY">translateY</option>
        <option value="opacity">opacity</option>
        <option value="rotate">rotate</option>
      </select>
      <input
        type="number"
        name="duration"
        id="duration"
        v-model.number="duration"
      />
      <input
        type="number"
        name="fromValue"
        id="fromValue"
        v-model.number="fromValue"
      />
      <input
        type="number"
        name="toValue"
        id="toValue"
        v-model.number="toValue"
      />
      <select name="valueUnits" id="valueUnits" v-model="valueUnits">
        <option value="">none</option>
        <option value="px">px</option>
        <option value="em">em</option>
        <option value="rem">rem</option>
        <option value="%">%</option>
        <option value="deg">deg</option>
        <option value="turn">turn</option>
      </select>
    </div>

    <preview
      :points="points"
      :property="property"
      :toValue="toValue"
      :fromValue="fromValue"
      :valueUnits="valueUnits"
      :duration="duration"
      class="preview"
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
  grid-template: min-content min-content 1fr / min-content auto;
  grid-template-areas: 'canvas code' 'options code' 'preview code';
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  height: 100%;
  box-sizing: border-box;
}
.keyframes-canvas {
  grid-area: canvas;
}
.preview {
  grid-area: preview;
}
.options {
  grid-area: options;
}
.code {
  text-align: left;
  background: #222;
  border-radius: 1rem;
  color: #fff;
  padding: 1.75rem 2rem;
  align-self: stretch;
  justify-self: stretch;
  margin: 0;
  overflow: auto;
  grid-area: code;
}
::v-deep .ssh-pre__copy {
  background: none;
  border: none;
  color: #fff;
  padding: 1rem;
  cursor: pointer;
}
</style>
