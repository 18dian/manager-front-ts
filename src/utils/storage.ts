/*
 * @Descripttion:storage二次封装
 * @Author: lintan
 */
import config from '../config';

export default {
  setItem(key: string, value: any) {
    this.getStorage()[key] = value;
    const storageValue = JSON.stringify(this.getStorage());
    window.localStorage.setItem(config.namespace, storageValue);
  },
  getItem(key: string) {
    return this.getStorage()[key];
  },
  getStorage() {
    const stroage = window.localStorage.getItem(config.namespace) || '{}';
    return JSON.parse(stroage);
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
