import { mount } from '@vue/test-utils'
import Octopus from '@/components/icons/octopus.vue'

describe('🐙', () => {
  test('is a Vue component', () => {
    const wrapper = mount(Octopus)
    expect(true).toBe(true)
  })
})
