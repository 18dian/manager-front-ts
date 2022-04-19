/*
 * @Descripttion:storage二次封装
 * @Author: lintan
 */
import config from '../config';

export default {
  setItem(key: string, value: any) {
    const storage: any = this.getStorage();
    storage[key] = value;
    window.localStorage.setItem(config.namespace, JSON.stringify(storage));
  },
  getItem(key: string) {
    return this.getStorage()[key];
  },
  getStorage() {
    const storage = window.localStorage.getItem(config.namespace) || '{}';
    return JSON.parse(storage);
  },
  clearItem(key: string) {
    delete this.getStorage()[key];
    window.localStorage.setItem(
      config.namespace,
      JSON.stringify(this.getStorage())
    );
  },
  clearAll() {
    window.localStorage.clear();
  }
};
