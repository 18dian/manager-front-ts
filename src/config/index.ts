/*
 * @Descripttion:环境配置封装
 * @Author: lintan
 */
type Env = 'production' | 'development' | 'test';
const env = import.meta.env.MODE || 'production';

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'http://127.0.0.1:4523/mock/671892'
  },
  test: {
    baseApi: '/api',
    mockApi: 'http://127.0.0.1:4523/mock/671892'
  },
  production: {
    baseApi: '/api',
    mockApi: '/'
  }
};

export default {
  env,
  mock: false,
  namespace: 'manager',
  ...EnvConfig[env as Env]
};
