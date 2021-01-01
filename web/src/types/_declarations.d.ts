// asset files
declare module '*.svg' // TODO not working for some reason

import { CSSProp } from 'styled-components'

interface MyTheme {} // custom theme type

declare module 'react' {
  interface Attributes {
    css?: CSSProp<MyTheme> // css prop from styled-components
  }
}
