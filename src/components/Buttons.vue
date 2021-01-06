<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  components: {},
  props: {},

  setup() {
    return {}
  }
})
</script>

<template>
  <div class="buttons">
    <a
      href="https://github.com/mauriciabad/custom-easings-with-keyframes"
      target="_blank"
      rel="noopener noreferrer"
      class="button button--star"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        /></svg
      >Star project</a
    >

    <a
      href="https://www.buymeacoffee.com/mauriciabad"
      target="_blank"
      rel="noopener noreferrer"
      class="button button--donate"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
          clip-rule="evenodd"
        /></svg
      >Donate</a
    >
    <a
      href="https://www.buymeacoffee.com/mauriciabad"
      target="_blank"
      rel="noopener noreferrer"
      class="button button--cripto"
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

      Donate BTC</a
    >
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  // gap: 1rem;
  justify-content: space-between;

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

    &--cripto {
      // background: #3772ff;
    }

    &--donate {
      // background: #3772ff;
    }

    &--star {
      background: #fdca41;
      color: #3e3e3e;
      border: none;
    }
    &:focus {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 0.125rem #6466f1;
    }

    svg {
      height: 20px;
    }
  }
}
</style>
