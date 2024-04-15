import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";

import router from "@/router/index.js";

import "element-plus/dist/index.css";
import "@/assets/styles/label.css";
import "@/assets/styles/button.css";
import "@/assets/styles/loading.css";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
