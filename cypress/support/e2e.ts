/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err) => {
  if (err && typeof err.message === 'string') {
    if (err.message.includes('ResizeObserver')) {
      return false // returning false prevents Cypress from failing the test
    }
  }

  return true
})
