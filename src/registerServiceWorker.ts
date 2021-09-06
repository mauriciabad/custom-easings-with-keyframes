/* eslint-disable no-console */

import { register } from 'register-service-worker'

let updateIntervalId: number | undefined = undefined

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    // ready() {
    //   console.log(
    //     'App is being served from cache by a service worker.\n' +
    //       'For more details, visit https://goo.gl/AFskqB'
    //   )
    // },
    registered(registration) {
      if (updateIntervalId) clearInterval(updateIntervalId)
      updateIntervalId = setInterval(() => {
        registration.update()
      }, 1000 * 60 * 60) // Check for updates every hour
    },
    // cached() {
    //   console.log('Content has been cached for offline use.')
    // },
    // updatefound() {
    //   console.log('New content is downloading.')
    // },
    updated(registration) {
      document.dispatchEvent(
        new CustomEvent<ServiceWorkerRegistration>('swUpdated', {
          detail: registration
        })
      )
    },
    // offline() {
    //   console.log(
    //     'No internet connection found. App is running in offline mode.'
    //   )
    // },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
