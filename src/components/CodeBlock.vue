<script lang="ts">
import { computed, defineComponent } from 'vue'
import 'simple-syntax-highlighter/dist/sshpre.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import SshPre from 'simple-syntax-highlighter'
import { useStore } from 'vuex'
import { key } from '@/store'
import { isTransformProperty } from '@/helpers'
import { propertyValue } from '@/components/Preview.vue'

export default defineComponent({
  components: { SshPre },

  setup() {
    const store = useStore(key)
    const points = computed(() => store.state.points)
    const options = computed(() => store.state.options)

    const code = computed(() => {
      const keyframesLines = points.value.map(point => {
        let properties: string

        if (isTransformProperty(options.value.property)) {
          properties = `transform: ${options.value.property}(${propertyValue(
            point,
            options.value
          )})`
        } else {
          properties = `${options.value.property}: ${propertyValue(
            point,
            options.value
          )}`
        }

        return `${point.x.toFixed()}% {${properties}}`
      })

      return `.${options.value.easingName} {
  animation: ${options.value.easingName} ${options.value.duration}ms linear;
}

@keyframes ${options.value.easingName} {
${keyframesLines.reduce((total, line) => `${total}  ${line}\n`, '')}}`
    })

    return { code }
  }
})
</script>

<template>
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
</template>

<style scoped lang="scss">
.code {
  text-align: left;
  background: #222;
  border-radius: 1rem;
  color: #fff;
  padding: 1.75rem 2rem;
  margin: 0;
  overflow: auto;
  align-self: stretch;
  justify-self: stretch;
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
