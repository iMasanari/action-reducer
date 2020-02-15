import typescript from '@rollup/plugin-typescript'

const packages = require('./package.json')

export default {
  input: './src/index.ts',
  plugins: [
    typescript(),
  ],
  output: [
    { format: 'umd', file: `dist/${packages.name}.js`, name: 'ActionReducer' },
    { format: 'cjs', file: packages.main },
    { format: 'es', file: packages.module },
  ],
}
