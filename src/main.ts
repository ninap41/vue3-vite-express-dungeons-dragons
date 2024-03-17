import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

const app = createApp(App)
  .use(ToastPlugin)
  .use(createPinia())
  .use(router)
  .mount("#app");
