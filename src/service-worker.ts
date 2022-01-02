/// <reference lib="webworker" />
export default null
declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('activate', () => {
  self.clients.claim()
})
