// @ts-check

import typescript from 'rollup-plugin-typescript2'
import fs from 'fs'

const packages = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

export default {
  input: './src/index.ts',
  name: 'ActionReducer',
  plugins: [
    typescript({ tsconfig: 'tsconfig.build.json' }),
  ],
  output: [
    { format: 'umd', file: `dist/${packages.name}.js` },
    { format: 'cjs', file: packages.main },
    { format: 'es', file: packages.module },
  ],
}
