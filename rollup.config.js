// @ts-check

import typescript from 'rollup-plugin-typescript2'
// @ts-ignore
import replace from 'rollup-plugin-replace'
import fs from 'fs'

const packages = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

export default {
  entry: './src/index.ts',
  moduleName: 'ActionReducer',
  plugins: [
    typescript(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
  targets: [
    { format: 'umd', dest: `dest/${packages.name}.js` },
    { format: 'cjs', dest: packages.main },
    { format: 'es', dest: packages.module },
  ],
}
