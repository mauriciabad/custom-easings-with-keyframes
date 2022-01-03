import { register } from 'register-service-worker'

let updateIntervalId: number | undefined = undefined

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    registered(registration) {
      if (updateIntervalId) clearInterval(updateIntervalId)

      updateIntervalId = setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000) // Check for updates every hour
    },

    updated(registration) {
      document.dispatchEvent(
        new CustomEvent<DocumentEventMap['swUpdatedCustomEvent']['detail']>(
          'swUpdatedCustomEvent',
          {
            detail: registration
          }
        )
      )
    },

    error(error) {
      // eslint-disable-next-line no-console
      console.error('Error during service worker registration:', error)
    }
  })
}

declare global {
  interface DocumentEventMap {
    swUpdatedCustomEvent: CustomEvent<ServiceWorkerRegistration>
  }
}
