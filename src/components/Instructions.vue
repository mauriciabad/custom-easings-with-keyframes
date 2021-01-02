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
    <h2>Instructions</h2>
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
  border: solid 1px #ddd;
  padding: 1.75rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);

  h2 {
    margin: 0 0 1.5rem;
    line-height: 0.8;
    text-transform: uppercase;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 1rem;

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
