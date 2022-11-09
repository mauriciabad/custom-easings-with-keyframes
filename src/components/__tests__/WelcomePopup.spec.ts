import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WelcomePopup from '../WelcomePopup.vue'

describe('WelcomePopup', () => {
  it('displays when prop says so', () => {
    const wrapper = mount(WelcomePopup, {
      props: { isVisible: true },
    })
    expect(wrapper.text()).toContain('Welcome to Easy easings')
  })

  it('does not display when prop says so', () => {
    const wrapper = mount(WelcomePopup, {
      props: { isVisible: false },
    })
    expect(wrapper.text()).not.toContain('Welcome to Easy easings')
  })
})
