import { createApp } from "vue";
import { router } from "./routes/router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
