import typescript from 'rollup-plugin-typescript2'

const packages = require('./package.json')
const entry = './src/index.ts'

export default {
  input: entry,
  name: 'ActionReducer',
  plugins: [
    typescript({
      tsconfigOverride: { files: [entry] },
      useTsconfigDeclarationDir: true
    }),
  ],
  output: [
    { format: 'umd', file: `dist/${packages.name}.js` },
    { format: 'cjs', file: packages.main },
    { format: 'es', file: packages.module },
  ],
}
