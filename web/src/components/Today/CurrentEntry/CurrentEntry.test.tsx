import { render } from '@redwoodjs/testing'

import CurrentEntry from './CurrentEntry'

describe('Entry', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CurrentEntry isFocused={true} />)
    }).not.toThrow()
  })
})

describe('Entry', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CurrentEntry isFocused={false} />)
    }).not.toThrow()
  })
})
