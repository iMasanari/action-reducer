// @ts-check

import esbuild from 'rollup-plugin-esbuild'
import packages from './package.json'

export default {
  input: './src/index.ts',
  plugins: [
    esbuild({ target: 'es2015' }),
  ],
  output: [{
    format: 'umd',
    file: `dist/${packages.name}.js`,
    name: 'ActionReducer',
    exports: 'named',
  }, {
    format: 'cjs',
    file: packages.exports.require,
    exports: 'named',
  }, {
    format: 'es',
    file: packages.exports.import,
  }],
}
