<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { isTransformProperty } from '@/helpers'
import { propertyValue } from '@/components/Preview.vue'
import { useGtag } from 'vue-gtag-next'

export default defineComponent({
  components: {},

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

    const { event } = useGtag()
    let lastCopiedCode: string
    function trackCopyCode() {
      event('Copy code', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_category: 'engagement',
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_label: lastCopiedCode === code.value ? 'duplicate' : undefined
      })

      lastCopiedCode = code.value
    }

    function copyCode() {
      navigator.clipboard.writeText(code.value)
      trackCopyCode()
    }

    return {
      options,
      points,
      isTransformProperty,
      copyCode
    }
  }
})
</script>

<template>
  <pre class="container"><div class="code-wrapper"><code class="code"
><span class="gray">.</span><span class="orange">{{options.easingName}}</span><span class="gray"> {</span>
  <span class="white">animation</span><span class="gray">: </span><span class="orange">{{options.easingName}}</span> <span class="violet">{{options.duration}}</span><span class="red">ms</span> <span class="cyan">linear</span><span class="gray">;</span>
<span class="gray">}</span>

<span class="light-gray">@</span><span class="red">keyframes</span> <span class="orange">{{options.easingName}}</span> <span class="gray">{</span
><template v-for="point in points" :key="point.x">
  <span class="cyan">{{point.x.toFixed()}}%</span><span class="gray"> {</span><template v-if="isTransformProperty(options.property)"><span class="white">transform</span><span class="gray">: </span><span class="green">{{options.property}}</span><span class="gray">(</span><span class="violet">{{Math.round(((options.toValue - options.fromValue) * (point.y / 100) + options.fromValue) * 100) / 100}}</span><span class="red">{{options.valueUnits}}</span><span class="gray">)</span></template>
<template v-else>
  <span class="white">{{options.property}}</span><span class="gray">: </span><span class="violet">{{Math.round(((options.toValue - options.fromValue) * (point.y / 100) + options.fromValue) * 100) / 100}}</span><span class="red">{{options.valueUnits}}</span></template><span class="gray">}</span></template
>
<span class="gray">}</span
    ></code></div>
    <button class="copy-button" @click="copyCode">Copy</button>
  </pre>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  background: #222;
  border-radius: 1rem;
  color: #fff;
  padding: 0 1.5rem 1.5rem;
  margin: 0;
  align-self: stretch;
  justify-self: stretch;
  grid-area: code;
  width: 50ch;
  user-select: auto;

  ::selection {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .code-wrapper {
    width: 100%;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    position: relative;

    &::before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    &::before {
      bottom: 0;
      height: 2.5rem;
      background: linear-gradient(
        to bottom,
        hsla(0, 0%, 13%, 0) 0%,
        hsla(0, 0%, 13%, 0.013) 4.4%,
        hsla(0, 0%, 13%, 0.049) 7.7%,
        hsla(0, 0%, 13%, 0.104) 10.4%,
        hsla(0, 0%, 13%, 0.175) 12.7%,
        hsla(0, 0%, 13%, 0.259) 14.8%,
        hsla(0, 0%, 13%, 0.352) 17.2%,
        hsla(0, 0%, 13%, 0.45) 20.1%,
        hsla(0, 0%, 13%, 0.55) 23.9%,
        hsla(0, 0%, 13%, 0.648) 28.8%,
        hsla(0, 0%, 13%, 0.741) 35.2%,
        hsla(0, 0%, 13%, 0.825) 43.3%,
        hsla(0, 0%, 13%, 0.896) 53.6%,
        hsla(0, 0%, 13%, 0.951) 66.3%,
        hsla(0, 0%, 13%, 0.987) 81.6%,
        hsl(0, 0%, 13%) 100%
      );
    }
    &:after {
      top: 0;
      height: 2rem;
      background: linear-gradient(
        to top,
        rgba(34, 34, 34, 0) 0%,
        rgba(34, 34, 34, 0.013) 8.1%,
        rgba(34, 34, 34, 0.049) 15.5%,
        rgba(34, 34, 34, 0.104) 22.5%,
        rgba(34, 34, 34, 0.175) 29%,
        rgba(34, 34, 34, 0.259) 35.3%,
        rgba(34, 34, 34, 0.352) 41.2%,
        rgba(34, 34, 34, 0.45) 47.1%,
        rgba(34, 34, 34, 0.55) 52.9%,
        rgba(34, 34, 34, 0.648) 58.8%,
        rgba(34, 34, 34, 0.741) 64.7%,
        rgba(34, 34, 34, 0.825) 71%,
        rgba(34, 34, 34, 0.896) 77.5%,
        rgba(34, 34, 34, 0.951) 84.5%,
        rgba(34, 34, 34, 0.987) 91.9%,
        rgba(34, 34, 34, 1) 100%
      );
    }
  }

  .code {
    flex: 1 1 0;
    overflow: auto;
    text-align: left;
    padding: 1.5rem 0 2rem;
    display: block;
    cursor: text;
  }

  .copy-button {
    display: block;
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    border: none;
    border-radius: 0.5rem;
    background-color: #8a7eff;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 0.25rem;
    line-height: 0.85;
    box-shadow: 0px 3px 12px #8a7effa0;
    cursor: pointer;
    z-index: 1;
    outline: none;
    transition: box-shadow 100ms ease-out;

    &:focus-visible {
      box-shadow: 0px 3px 12px 0.25rem #fff5, 0 0 0 0.25rem #fff;
    }
  }
}

.red {
  color: #ff518c;
}
.green {
  color: #54db87;
}
.violet {
  color: #9788e9;
}
.cyan {
  color: #00d7e9;
}
.gray {
  color: #8c8890;
}
.light-gray {
  color: #bbb6c1;
}
.white {
  color: #f8f1ff;
}
.black {
  color: #222222;
}
.orange {
  color: #ff8d41;
}
</style>
