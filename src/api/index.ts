import request from './../utils/request';

export const login = (params: any) => {
  return request.post('/users/login', params);
};

export const getCount = () => {
  return request.get('/users/count');
};
