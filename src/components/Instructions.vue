<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {},

  setup() {
    return {}
  }
})
</script>

<template>
  <div class="instructions">
    <div class="background"></div>
    <ul>
      <li>
        <icon name="left-click" /><icon name="right-arrow" /> Add point / Select
        point
      </li>
      <li>
        <icon name="move" /><icon name="right-arrow" /> Move selected points
      </li>
      <li>
        <icon name="right-click" />/<icon name="key-backspace" /><icon
          name="right-arrow"
        />
        Delete selected points
      </li>
      <li>
        <icon name="key-shift" />+<icon name="left-click" /><icon
          name="right-arrow"
        />
        Select many points
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.instructions {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #222;
  opacity: 0.33;
  transition: opacity 200ms ease-out;
  display: inline-block;
  position: relative;
  will-change: opacity;

  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border: solid 1px #dfddd5;
    border-radius: inherit;
    opacity: 0;
    transition: inherit;
  }

  &:hover {
    opacity: 1;

    .background {
      opacity: 1;
    }
  }

  ul {
    will-change: opacity;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 0.5rem;

      svg:first-child {
        margin-left: -0.5rem;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
