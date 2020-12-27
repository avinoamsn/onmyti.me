import { render } from '@redwoodjs/testing'

import Entry from './Entry'

describe('Entry', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Entry isFocused={true} />)
    }).not.toThrow()
  })
})

describe('Entry', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Entry isFocused={false} />)
    }).not.toThrow()
  })
})
