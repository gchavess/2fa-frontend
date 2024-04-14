import { createRouter, createWebHistory } from "vue-router";
import CadasterUserView from "@/views/CadasterUserView/CadasterUserView.vue";
import LoginUserView from "@/views/LoginUserView/LoginUserView.vue";
import HomeView from "@/views/HomeView/HomeView.vue";

const routes = [
  { path: "/", component: LoginUserView },
  { path: "/login", component: LoginUserView },
  { path: "/cadastro", component: CadasterUserView },
  { path: "/home", component: HomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
