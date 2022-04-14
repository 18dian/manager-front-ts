import { createApp } from 'vue';
import * as ELIcons from '@element-plus/icons-vue';
import router from './router';
import App from './App.vue';

const app = createApp(App);
for (const iconName in ELIcons) {
  app.component(iconName, (ELIcons as any)[iconName]);
}
app.use(router).mount('#app');
