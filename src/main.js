import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Welcome from "./pages/welcome.vue";
import Game from "./pages/game.vue";
import Result from "./pages/result.vue";
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
