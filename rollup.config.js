// @ts-check

import typescript from '@rollup/plugin-typescript'
import buble from '@rollup/plugin-buble'
import packages from './package.json'

export default {
  input: './src/index.ts',
  plugins: [
    typescript({ declaration: false }),
    buble(),
  ],
  output: [{
    format: 'umd',
    file: `dist/${packages.name}.js`,
    name: 'ActionReducer',
    exports: 'named',
  }, {
    format: 'cjs',
    file: packages.main,
    exports: 'named',
  }, {
    format: 'es',
    file: packages.module,
  }],
}
