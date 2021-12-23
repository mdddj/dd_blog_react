import { defineConfig } from 'umi';
import routers from './config/routers';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const prodGzipList = ['js', 'css'];

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routers,
  fastRefresh: {},
  mfsu: {},
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  scripts:
    process.env.NODE_ENV === 'development'
      ? [
          'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.development.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.development.js',
        ]
      : [
          'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.production.min.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.production.min.js',
        ],
  // // esbuild: {},
  dynamicImport: {
    loading: '@/Loading',
  },
  // chunks: ['vendors', 'umi'],
});
