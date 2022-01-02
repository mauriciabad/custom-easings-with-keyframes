<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { computePointsWithDelay, isTransformProperty, round } from '@/helpers'
import { useGtag } from 'vue-gtag-next'
import useOptions from '@/modules/options'

export default defineComponent({
  components: {},

  setup() {
    const store = useStore(key)
    const points = computed(() => store.state.points)
    const { options } = useOptions()
    const pointsWithDelay = computed(() =>
      computePointsWithDelay(points.value, options)
    )

    const codeElement = ref<HTMLPreElement | null>(null)
    const code = computed<string>(() => codeElement.value?.textContent ?? '')

    const { event } = useGtag()
    let lastCopiedCode: string
    function trackCopyCode() {
      event('copy_code', {
        event_category: 'engagement',
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
      copyCode,
      pointsWithDelay,
      round,
      codeElement
    }
  }
})
</script>

<template>
  <div class="container">
    <div ref="codeElement" class="code-wrapper" data-test-id="code">
      <div class="fade fade--top"></div>
      <div class="fade fade--right"></div>
      <div class="fade fade--bottom"></div>
      <div class="fade fade--left"></div>
      <code>
        <pre
          class="code"
        ><span class="gray">.</span><span class="orange">{{options.easingName}}</span><span class="gray"> {</span>
  <span class="white">animation</span><span class="gray">: </span><span class="orange">{{options.easingName}}</span> <span class="violet">{{options.duration}}</span><span class="red">ms</span> <span class="cyan">linear</span><span class="gray">;</span>
<span class="gray">}</span>

<span class="light-gray">@</span><span class="red">keyframes</span> <span class="orange">{{options.easingName}}</span> <span class="gray">{</span
><template v-for="point in pointsWithDelay" :key="point.x">
  <span class="cyan">{{point.x}}%</span><span class="gray"> {</span><template v-if="isTransformProperty(options.property)"><span class="white">transform</span><span class="gray">: </span><span class="green">{{options.property}}</span><span class="gray">(</span><span class="violet">{{round(((options.toValue - options.fromValue) * (point.y / 100) + options.fromValue), 6)}}</span><span class="red">{{options.valueUnits}}</span><span class="gray">)</span></template>
<template v-else>
  <span class="white">{{options.property}}</span><span class="gray">: </span><span class="violet">{{round(((options.toValue - options.fromValue) * (point.y / 100) + options.fromValue), 6)}}</span><span class="red">{{options.valueUnits}}</span></template><span class="gray">}</span></template
>
<span class="gray">}</span
    ></pre>
      </code>
    </div>
    <button
      class="copy-button"
      tabindex="0"
      role="button"
      aria-label="Copy code"
      @click="copyCode"
    >
      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
          <path
            d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
          /></svg></span
      >Copy code
    </button>
  </div>
</template>

<style scoped lang="scss">
.container {
  background: #222;
  border-radius: 0.75rem;
  color: #fff;
  padding: 0 1.5rem 1.5rem;
  margin: 0;
  grid-area: code;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  ::selection {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .code-wrapper {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 -1.5rem;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    overflow: hidden;

    .fade {
      position: absolute;
      pointer-events: none;

      &--bottom {
        right: 0;
        bottom: 0;
        left: 0;
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
      &--right {
        top: 0;
        right: 0;
        bottom: 0;
        width: 2.5rem;
        background: linear-gradient(
          to right,
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
      &--top {
        top: 0;
        right: 0;
        left: 0;
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
      &--left {
        top: 0;
        left: 0;
        bottom: 0;
        width: 2rem;
        background: linear-gradient(
          to left,
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
  }

  .code {
    $characterHeight: 14px;
    $lineHeight: 1.375 * $characterHeight;

    width: 35ch;
    height: $lineHeight * 9.5;

    font-size: $characterHeight;
    line-height: $lineHeight;
    cursor: text;
    padding: 1.5rem 2rem 2rem 1.5rem;
    overflow: auto;
    margin: 0;
    box-sizing: content-box;
    user-select: auto;
  }

  .copy-button {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: center;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.25rem;
    box-shadow: 0px 2px 8px #13b98180, 0 0 0 0 #fff;
    cursor: pointer;
    outline: none;
    transition: box-shadow 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
    appearance: none;
    position: relative;
    background: #13b981 linear-gradient(45deg, #26ada2, #2bc364);

    span {
      position: absolute;
      left: 0.75rem;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
    }

    svg {
      height: 1.25rem;
      opacity: 0.6667;
      transition: opacity 100ms ease-out;
    }
    &:hover svg {
      opacity: 1;
    }

    &:focus-visible {
      box-shadow: 0px 3px 12px 0.25rem #fff5, 0 0 0 0.1875rem #fff;
      outline: none;
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
