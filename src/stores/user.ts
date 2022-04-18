import storage from '../utils/storage';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: null || storage.getItem('userInfo')
  }),
  actions: {
    /**
     * save or clear user info
     * @param {any} data
     */
    changeUserInfo(data: any) {
      this.userInfo = data;
      storage.setItem('userInfo', data);
    }
  }
});
