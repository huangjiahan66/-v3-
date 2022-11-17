import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import TDesign from "tdesign-vue-next";
// 引入组件库全局样式资源
import "tdesign-vue-next/es/style/index.css";
import "tdesign-vue-next/dist/reset.css";
import { permissionDirective } from "@/directives/permission";
// 引入样式
import "@/assets/less/base.less";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pina = createPinia();
pina.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(TDesign);
app.use(router);
app.use(pina);
app.directive("permission", permissionDirective);
app.mount("#app");
