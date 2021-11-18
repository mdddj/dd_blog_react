export default [
  { path: '/', component: '@/pages/index', title: '梁典典的博客' },
  { path: '/category', component: '@/pages/category' },
  { path: '/simple', component: '@/pages/text' },
  { path: '/login', component: '@/pages/login' },
  { path: '/r', component: '@/pages/write' },
  { path: '/push-blog', component: '@/pages/markdown' },
  { path: '/dynamic', component: '@/pages/dynamic' },
  { exact: true, path: '/post/:id', component: '@/pages/post/[id]' },
];
