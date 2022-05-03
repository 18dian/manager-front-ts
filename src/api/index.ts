import request from './../utils/request';

export const login = (params: any) => {
  return request.post('/users/login', params, { mock: false });
};

export const getCount = () => {
  return request.get('/users/count', {}, { mock: false });
};

export const getUserList = (param = {}) => {
  return request.get('/users/list', param);
};

export const deleteUser = (param: any) => {
  return request.post('users/delete', param);
};

export const getDeptList = () => {
  return request.get('/dept/list', {}, { mock: true });
};

export const getRoleList = () => {
  return request.get('/roles/allList', {}, { mock: true });
};

export const userSubmit = (params: any) => {
  return request.post('/users/operate', params);
};

export const getMenuList = (params = {}) => {
  return request.get('/menu/list', params);
};

export const menuSubmit = (params: any) => {
  return request.post('/menu/operate', params);
};
