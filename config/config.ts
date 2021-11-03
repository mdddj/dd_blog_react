import { defineConfig } from 'umi';
import routes from './routers';

export default defineConfig({
  routes,
  mfsu: {},
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.production.min.js',
  ],
  cacheGroups: {
    vendors: {
      name: 'vendors',
      chunks: 'all',
      test: /[\\/]node_modules[\\/]/,
      priority: -12,
    },
  },
  chunks: ['vendors', 'umi'],
});
