import { defineConfig } from 'umi';
import routers from './config/routers';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routers,
  fastRefresh: {},
  mfsu: {},
});
