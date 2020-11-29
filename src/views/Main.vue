<script lang="ts">
import KeyframesCanvas from '@/components/KeyframesCanvas.vue'
import { defineComponent } from 'vue'
import 'simple-syntax-highlighter/dist/sshpre.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import SshPre from 'simple-syntax-highlighter'

export default defineComponent({
  components: { KeyframesCanvas, SshPre },

  setup() {
    const code = `.ease-custom {
  animation: ease-custom 200ms linear;
}

@keyframes ease-custom {
   0% {transform: translateX(0rem)}
  25% {transform: translateX(1rem)}
  50% {transform: translateX(7rem)}
  75% {transform: translateX(9rem)}
  100%{transform: translateX(10rem)}
}`

    return { code }
  }
})
</script>

<template>
  <main class="main-layout">
    <keyframes-canvas />
    <ssh-pre language="css" dark copy-button reactive class="code">
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template: minmax(auto, 500px) / minmax(auto, 1000px);
  align-items: center;
  justify-content: center;
}
.code {
  text-align: left;
}
::v-deep .ssh-pre__copy {
  background: none;
  border: none;
  color: #fff;
  padding: 1rem;
  cursor: pointer;
}
</style>
