import { render } from '@redwoodjs/testing'

import History from './History'

describe('History', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<History />)
    }).not.toThrow()
  })
})
