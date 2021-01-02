import { render } from '@redwoodjs/testing'

import Day from './Day'

describe('FocusedDate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Day />)
    }).not.toThrow()
  })
})
