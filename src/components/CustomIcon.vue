<script lang="ts">
import { defineComponent, type PropType } from 'vue'

const labels = {
  move: 'Move',
  'left-click': 'Left click',
  'right-click': 'Right click',
  'key-shift': 'Key shift',
  'key-backspace': 'Key backspace',
  'right-arrow': 'Right arrow',
  slash: 'or',
  plus: 'and',
} as const

type LabelName = keyof typeof labels

export default defineComponent({
  props: {
    name: {
      type: String as PropType<LabelName>,
      required: true,
    },
  },

  setup() {
    return { labels }
  },
})
</script>

<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    class="icon"
    :aria-label="labels[name]"
  >
    <template v-if="name === 'left-click'">
      <path
        d="M6 9.74999C6 6.02207 8.91015 3 12.5 3V12H6V9.74999Z"
        fill="currentColor"
      />
      <path
        d="M12.5 12V3M12.5 12H6M12.5 12L19 12M12.5 3C8.91015 3 6 6.02207 6 9.74999V12M12.5 3C16.0899 3 19 6.02208 19 9.75V12M6 12V14.25C6 17.9779 8.91015 21 12.5 21C16.0899 21 19 17.9779 19 14.25V12"
        stroke="currentColor"
        stroke-width="2"
      />
    </template>

    <template v-else-if="name === 'right-click'">
      <path
        d="M19 9.74999C19 6.02207 16.0899 3 12.5 3V12H19V9.74999Z"
        fill="currentColor"
      />
      <path
        d="M12.5 12V3M12.5 12H19M12.5 12L6 12M12.5 3C16.0899 3 19 6.02207 19 9.74999V12M12.5 3C8.91015 3 6 6.02208 6 9.75V12M19 12V14.25C19 17.9779 16.0899 21 12.5 21C8.91015 21 6 17.9779 6 14.25V12"
        stroke="currentColor"
        stroke-width="2"
      />

      />
    </template>

    <template v-else-if="name === 'move'">
      <path
        d="M12 9V3M12 3L9.5 5.5M12 3L14.5 5.5M18.5 9.5L21 12M21 12H15M21 12L18.5 14.5M5.5 14.5L3 12M3 12L5.5 9.5M3 12H9M12 21L9.5 18.5M12 21V15M12 21L14.5 18.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'key-shift'">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M7.29289 11.2929C7.0069 11.5789 6.92134 12.009 7.07612 12.3827C7.2309 12.7564 7.59554 13 8 13H9.5V16C9.5 16.5523 9.94772 17 10.5 17H13.5C14.0523 17 14.5 16.5523 14.5 16V13H16C16.4045 13 16.7691 12.7564 16.9239 12.3827C17.0787 12.009 16.9931 11.5789 16.7071 11.2929L12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L7.29289 11.2929Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'key-backspace'">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
      />
    </template>

    <template v-else-if="name === 'right-arrow'">
      <path
        d="M15 8L19 12M19 12L15 16M19 12H5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'plus'">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </template>

    <template v-else-if="name === 'slash'">
      <path
        d="M8 21L16 3"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  height: 1.5rem;
}
</style>
