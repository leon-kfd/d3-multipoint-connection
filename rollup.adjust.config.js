import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
export default {
  input: 'adjust-line/main.js',
  output: {
    file: 'adjust-line/bundle.js',
    format: 'iife'
  },
  plugins: [
    babel(),
    uglify()
  ]
};