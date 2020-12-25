// asset files
declare module '*.svg'

import { CSSProp } from 'styled-components'

interface MyTheme {} // custom theme type

declare module 'react' {
  interface Attributes {
    css?: CSSProp<MyTheme>
  }
}
