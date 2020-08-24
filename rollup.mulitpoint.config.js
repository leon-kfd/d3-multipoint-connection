import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
export default {
  input: 'mulitpoint-connection/main.js',
  output: {
    file: 'mulitpoint-connection/bundle.js',
    format: 'iife'
  },
  plugins: [
    babel(),
    uglify()
  ]
};