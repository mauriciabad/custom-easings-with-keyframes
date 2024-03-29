<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

let refreshing = false
let registration: ServiceWorkerRegistration | null = null
const updateExists = ref<boolean>(false)
const updateDismissed = ref<boolean>(false)

const showBanner = computed(() => updateExists.value && !updateDismissed.value)

function swUpdatedHandler(
  // TODO: use the right type
  // event: DocumentEventMap['swUpdatedCustomEvent']
  event: any
): void {
  registration = event.detail
  updateExists.value = true
}

// Refresh all open app tabs when a new service worker is installed.
function controllerchangeHandler(): void {
  if (refreshing) return

  refreshing = true
  location.reload()
}

document.addEventListener('swUpdatedCustomEvent', swUpdatedHandler, {
  once: true,
})
onBeforeUnmount(() => {
  document.removeEventListener('swUpdatedCustomEvent', swUpdatedHandler)
  document.removeEventListener('controllerchange', controllerchangeHandler)
})

navigator.serviceWorker?.addEventListener(
  'controllerchange',
  controllerchangeHandler
)

function handleUpdateClick() {
  updateExists.value = false

  registration?.waiting?.postMessage({ type: 'SKIP_WAITING' })
}

function handleDismissClick() {
  updateDismissed.value = true
}
</script>

<template>
  <transition name="fade">
    <div v-if="showBanner" class="wrapper">
      <div class="banner">
        <div class="banner__icon">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </svg>
        </div>
        <span class="banner__text">New version available!</span>
        <button class="banner__button" @click="handleUpdateClick">
          Refresh
        </button>
        <button class="banner__dismiss-button" @click="handleDismissClick">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.banner {
  $bg: #4caf50;
  $bg-dark: darken($bg, 12);

  gap: 1rem;
  margin: 1rem;
  background: $bg;
  color: #fff;
  padding: 0.75rem;
  border-radius: 0.75rem;
  display: flex;
  line-height: 1;
  align-items: center;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  pointer-events: all;

  &__icon {
    background: $bg-dark;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;

    & svg {
      height: 1.5em;
      display: block;
    }
  }

  &__button {
    color: $bg-dark;
    background: #fff;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    border: 0;
  }
  &__dismiss-button {
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin: 0 -0.25rem 0 -0.5rem;

    &:hover,
    &:focus-visible {
      background: $bg-dark;
      outline: none;
    }

    & svg {
      height: 1.5em;
      display: block;
    }
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
</style>
