import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [
    babel(),
    uglify()
  ]
};