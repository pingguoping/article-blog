import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '博客管理后台',

  },

  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      name: '登录页',
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: '文章分类',
      path: '/home',
      component: './Home',
    },
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
    '/my': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
    '/article': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
  npmClient: 'yarn',
});
