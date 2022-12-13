import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'L.Graticule.js',
  output: {
    file: 'L.Graticule.min.js' ,
    format: 'iife'
  },
  plugins: [nodeResolve()]
};