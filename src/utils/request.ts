/*
 * @Descripttion:axios二次封装
 * @Author: lintan
 */
import axios, { AxiosPromise } from 'axios';
import { ElMessage } from 'element-plus';
import stroage from './storage';
import config from '../config';

const router = useRouter();

interface IRequest {
  (options: any): AxiosPromise<any>;
  [key: string]: any;
}

const TOKEN_INVALID = 'Token认证失败，请重新登录';
const NETWORK_ERROR = '网络请求异常，请稍后重试';

const instance = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
});

// 请求拦截
instance.interceptors.request.use((req) => {
  const headers = req.headers || {};
  const userInfo = stroage.getItem('userInfo');
  if (userInfo && !headers.Authorization)
    headers.Authorization = 'Bearer ' + userInfo.token;
  return req;
});

// 响应拦截
instance.interceptors.response.use((res) => {
  const { data, code } = res.data;
  if (code === 200) {
    return data;
  } else if (code === 500001) {
    ElMessage.error(TOKEN_INVALID);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
    return Promise.reject(TOKEN_INVALID);
  } else {
    return Promise.reject(NETWORK_ERROR);
  }
});

/**
 * @name: request
 * @msg: 请求核心函数
 * @param {*} options 请求配置
 */
const request: IRequest = (options: any) => {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  let isMock = config.mock;
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock;
  }
  if (config.env === 'production') {
    instance.defaults.baseURL = config.baseApi;
  } else {
    instance.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }
  return instance(options);
};

['get', 'post', 'put', 'delete'].forEach((item: string) => {
  request[item] = (url: string, data?: any, options?: any) => {
    return request({
      url,
      method: item,
      data,
      ...options
    });
  };
});

export default request;
