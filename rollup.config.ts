import typescript from 'rollup-plugin-typescript2'

const packages = require('./package.json')

export default {
  input: './src/index.ts',
  name: 'ActionReducer',
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true
    }),
  ],
  output: [
    { format: 'umd', file: `dist/${packages.name}.js` },
    { format: 'cjs', file: packages.main },
    { format: 'es', file: packages.module },
  ],
}
