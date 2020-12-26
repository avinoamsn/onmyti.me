import { render } from '@redwoodjs/testing'

import Clock from './Clock'

describe('Clock', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Clock />)
    }).not.toThrow()
  })
})
