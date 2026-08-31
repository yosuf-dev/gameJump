import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Welcome from "./pages/Welcome.vue";
import Game from "./pages/Game.vue";
import Result from "./pages/Result.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Welcome },
  { path: "/game", component: Game },
  { path: "/result", component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
.use(router)
.mount("#app");
