<script lang="ts">
import { defineComponent } from 'vue'
import { useGtag } from 'vue-gtag-next'

export default defineComponent({
  emits: ['help-clicked'],

  setup(props, { emit }) {
    const { event } = useGtag()

    function trackClickDonate() {
      event('donate', {
        event_category: 'ecommerce',
      })
    }
    function trackClickFeedback() {
      event('feedback', {
        event_category: 'engagement',
      })
    }
    function trackClickSourceCode() {
      event('view_source_code', {
        event_category: 'engagement',
      })
    }
    function trackClickHelp() {
      event('help', {
        event_category: 'engagement',
      })
    }

    function handleHelpClick() {
      trackClickHelp()
      emit('help-clicked')
    }

    return {
      trackClickDonate,
      trackClickFeedback,
      trackClickSourceCode,
      handleHelpClick,
    }
  },
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
      >Code</a
    >

    <button class="button" @click.passive="handleHelpClick">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
          clip-rule="evenodd"
        /></svg
      >Help
    </button>

    <a
      href="https://www.buymeacoffee.com/mauriciabad"
      target="_blank"
      rel="noopener noreferrer"
      class="button"
      @click.passive="trackClickDonate"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clip-rule="evenodd"
        />
        <path
          d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
        /></svg
      >Donate</a
    >
    <a
      href="https://github.com/mauriciabad/custom-easings-with-keyframes/issues/new"
      target="_blank"
      rel="noopener noreferrer"
      class="button"
      @click.passive="trackClickFeedback"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
        /></svg
      >Feedback</a
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
    gap: 0.25rem;
    font-weight: 500;
    cursor: pointer;

    &:focus-visible {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 0.125rem #6466f1;
      outline: none;
    }

    svg {
      height: 20px;
    }
  }
}
</style>
