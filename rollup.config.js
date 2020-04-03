import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { global, dependencies, filename } from './monoceros.config.json'

const babelOptions = {
  exclude: /node_modules/,
  babelrc: false,
}
const terserOptions = {
  mangle: {
    keep_classnames: true,
    reserved: [global, ...dependencies],
  },
  compress: {
    pure_funcs: ['console.log'],
  },
}

let output

if (process.env.BUILD === 'module') {
  output = [
    {
      file: `./dist/${filename}.js`,
      format: 'esm',
      name: global,
    },
    {
      file: `./dist/${filename}.browser.js`,
      format: 'iife',
      name: global,
    },
  ]
} else {
  output = [
    {
      file: `./dist/${filename}.min.js`,
      format: 'esm',
      name: global,
      plugins: [terser(terserOptions)],
    },
    {
      file: `./dist/${filename}.browser.min.js`,
      format: 'iife',
      name: global,
      plugins: [terser(terserOptions)],
    },
  ]
}

export default {
  input: './src/index.js',
  output,
  plugins: [resolve(), json(), babel(babelOptions), commonjs()],
}
