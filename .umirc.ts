import { defineConfig } from 'umi';
import routers from './config/routers';

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
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.production.min.js',
  ],
});
