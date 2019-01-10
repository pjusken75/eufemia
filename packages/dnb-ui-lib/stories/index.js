/**
 * Storybook Entry
 *
 */

import { storiesOf } from '@storybook/react'

import playground from './componentExamples'
import typography from './typographyExamples'

// UI style + theme
import '../src/style'

// ATTENTION: for testing with IE11, we have to use the build version - make sure to run `yarn build` first
// import '../style/lib-IE11'

playground
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(component => storiesOf('Playground', module).add(...component))

typography
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(component => storiesOf('Typography', module).add(...component))
