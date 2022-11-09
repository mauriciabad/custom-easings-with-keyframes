<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({

  setup() {
    const userAknowladges = ref(false)

    function handleClick() {
      userAknowladges.value = true
    }

    return { userAknowladges, handleClick }
  },
})
</script>

<template>
  <transition name="fade">
    <div v-if="!userAknowladges" class="popup">
      <div class="background"></div>
      <div class="popup-container">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2>The display is too small</h2>
        <p>
          This tool is not optimized for small screens. Open it on a larger
          screen to use it properly.
        </p>
        <button @click="handleClick">I understand, use anyway.</button>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.popup {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #444;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23888' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.popup-container {
  z-index: 1;
  border-radius: 0.5rem;
  background-color: #fff;
  width: 32ch;
  max-width: 100%;
  padding: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  text-align: center;

  .icon {
    padding: 1rem;
    background-color: #fde2e1;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    margin: 0 auto;
    color: #db2625;
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
    color: #111827;
    margin: 0.75rem 0 0;
  }

  p {
    margin: 0.5rem 0 0;
    color: #6b7280;
    font-size: 14px;
    line-height: 20px;
  }

  button {
    margin: 1rem 0 0;
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
    box-shadow: 0px 2px 8px #db262580, 0 0 0 0 #fff;
    cursor: pointer;
    z-index: 1;
    outline: none;
    transition: box-shadow 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
    appearance: none;
    position: relative;
    background: #db2625 linear-gradient(45deg, #de2f74, #db6025);
    background: #db2625;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1);

  .background {
    transition: inherit;
  }

  .popup-container {
    transition: opacity 500ms cubic-bezier(0.33, 1, 0.68, 1),
      transform 500ms cubic-bezier(0.33, 1, 0.68, 1);
  }
}

.fade-enter-from,
.fade-leave-to {
  .background {
    opacity: 0;
  }
  .popup-container {
    opacity: 0;
    transform: translateY(-2rem);
  }
}

@media only screen and (min-width: 700px) {
  .popup {
    display: none;
  }
}
</style>
