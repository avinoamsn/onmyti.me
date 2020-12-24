import { render } from '@redwoodjs/testing'

import Today from './Today'

describe('Today', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Today />)
    }).not.toThrow()
  })
})
