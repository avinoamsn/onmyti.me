import { render } from '@redwoodjs/testing'

import EarlierEntries from './EarlierEntries'

describe('EarlierEntries', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EarlierEntries />)
    }).not.toThrow()
  })
})
