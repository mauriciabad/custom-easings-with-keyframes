<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useGtag } from 'vue-gtag-next'
import Welcome from './Welcome.vue'

export default defineComponent({
  components: {
    Welcome
  },
  props: {},

  setup() {
    const isWelcomeVisible = ref<boolean>(
      window.localStorage['welcomeMessageWasSeen'] !== 'true'
    )
    window.localStorage['welcomeMessageWasSeen'] = 'true'

    const { event } = useGtag()

    function trackClickDonateFiat() {
      event('donate', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_category: 'ecommerce',
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_label: 'fiat'
      })
    }
    function trackClickDonateCrypto() {
      event('donate', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_category: 'ecommerce',
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_label: 'crypto'
      })
    }
    function trackClickStar() {
      event('star_project', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_category: 'engagement'
      })
    }
    function trackClickSourceCode() {
      event('view_source_code', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_category: 'engagement'
      })
    }
    function trackClickHelp() {
      event('help', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_category: 'engagement'
      })
    }

    function handleHelpClick() {
      trackClickHelp()
      isWelcomeVisible.value = true
    }

    return {
      trackClickDonateFiat,
      trackClickDonateCrypto,
      trackClickStar,
      trackClickSourceCode,
      isWelcomeVisible,
      handleHelpClick
    }
  }
})
</script>

<template>
  <div class="buttons">
    <a
      href="https://github.com/mauriciabad/custom-easings-with-keyframes"
      target="_blank"
      rel="noopener noreferrer"
      class="button"
      @click.passive="trackClickSourceCode"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M16.909 6.006a7.93 7.93 0 00-10.914-2.91A7.93 7.93 0 003.557 14.7a7.943 7.943 0 003.93 2.874c.181.036.327 0 .4-.073.109-.11.145-.182.145-.328.002-.497.002-.994 0-1.491l-.255.073-.582.036-.727-.073a2.973 2.973 0 01-.691-.327c-.219-.182-.364-.364-.437-.655l-.11-.218-.327-.546c-.145-.182-.29-.327-.436-.4l-.073-.036a.764.764 0 01-.255-.255c0-.073 0-.11.073-.146l.291-.036.219.036.509.255c.182.146.364.291.51.546.145.254.327.473.545.618.255.146.473.255.691.255l.582-.073.473-.145c.073-.473.255-.837.51-1.092-.4-.036-.728-.073-1.056-.182a3.727 3.727 0 01-.982-.4 2.8 2.8 0 01-1.382-1.782c-.146-.437-.219-.983-.219-1.565 0-.836.291-1.528.837-2.146-.254-.619-.218-1.31.073-2.11.182-.073.51 0 .873.145.462.178.902.41 1.31.692a7.349 7.349 0 014.001 0l.4-.255c.255-.182.583-.328.946-.473.364-.146.655-.182.837-.11.328.801.364 1.492.11 2.11.545.62.8 1.31.8 2.147 0 .582-.073 1.128-.219 1.565-.145.473-.327.836-.545 1.09-.219.292-.51.51-.837.692a3.728 3.728 0 01-.982.4c-.291.11-.655.146-1.055.182.364.328.545.8.545 1.492v2.182c0 .146.037.219.11.328.109.073.254.11.436.073a7.943 7.943 0 003.93-2.874C17.49 13.28 18 11.718 18 10.008c0-1.455-.364-2.801-1.091-4.002z"
        /></svg
      >GitHub</a
    >

    <button class="button" @click.passive="handleHelpClick">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        /></svg
      >Help
    </button>

    <welcome class="welcome" v-model:isVisible="isWelcomeVisible" />

    <a
      href="https://www.buymeacoffee.com/mauriciabad"
      target="_blank"
      rel="noopener noreferrer"
      class="button"
      @click.passive="trackClickDonateFiat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
          clip-rule="evenodd"
        /></svg
      >Donate</a
    >
    <a
      href="bitcoin:bc1qs0srzvcamaqplqpw2gkzkrvzqzma0892xjcvyl"
      target="_blank"
      rel="noopener noreferrer"
      class="button"
      @click.passive="trackClickDonateCrypto"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM9.5 5C9.5 4.44772 9.05228 4 8.5 4C7.94772 4 7.5 4.44772 7.5 5C6.94772 5 6.5 5.44772 6.5 6C6.5 6.55228 6.94772 7 7.5 7V10V13C6.94772 13 6.5 13.4477 6.5 14C6.5 14.5523 6.94772 15 7.5 15H8C8 15.5523 8.44771 16 9 16C9.55228 16 10 15.5523 10 15V14.9992C10.1626 14.9982 10.33 14.9959 10.5 14.9908V15C10.5 15.5523 10.9477 16 11.5 16C12.0523 16 12.5 15.5523 12.5 15V14.712L12.538 14.6997C13.0359 14.5356 13.5468 14.2593 13.9291 13.7792C14.3202 13.2881 14.5 12.6804 14.5 12C14.5 11.3196 14.3202 10.7119 13.9291 10.2208C13.7869 10.0422 13.6269 9.8919 13.4565 9.76502C13.4932 9.71698 13.5286 9.667 13.5625 9.61503C13.8685 9.14601 14 8.59563 14 8C14 7.40437 13.8685 6.85399 13.5625 6.38497C13.2558 5.91479 12.8274 5.60848 12.3743 5.41105C12.2537 5.35854 12.1286 5.31265 12 5.27256V5C12 4.44772 11.5523 4 11 4C10.4477 4 10 4.44772 10 5V5.00512C9.83082 5.00122 9.66356 5 9.5 5ZM9.5 9V7C10.0371 7 10.4822 7.01871 10.8436 7.06536C10.8586 7.06771 10.8738 7.06974 10.889 7.07142C11.1682 7.11005 11.3957 7.16627 11.5755 7.2446C11.7557 7.32312 11.8399 7.40478 11.8874 7.47764C11.9357 7.55166 12 7.6994 12 8C12 8.3006 11.9357 8.44834 11.8874 8.52236C11.8399 8.59522 11.7557 8.67688 11.5755 8.7554C11.1579 8.93734 10.4829 9 9.5 9ZM9.5 13V11C10.5202 11 11.3386 11.0108 11.9118 11.1997C12.1722 11.2856 12.2989 11.3843 12.3646 11.4667C12.4214 11.5381 12.5 11.6804 12.5 12C12.5 12.3196 12.4214 12.4619 12.3646 12.5333C12.2989 12.6157 12.1722 12.7144 11.9118 12.8003C11.7577 12.8511 11.5858 12.889 11.397 12.9173C11.3712 12.92 11.3457 12.9236 11.3205 12.9281C10.8209 12.9948 10.2092 13 9.5 13Z"
        />
      </svg>

      BTC</a
    >
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .button {
    color: #727477;
    border: solid 1px #9da6b2;
    text-decoration: none;
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 0 #6466f1;
    transition: box-shadow 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    cursor: pointer;

    &:focus {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 0.125rem #6466f1;
    }

    svg {
      height: 20px;
    }
  }
}
</style>
