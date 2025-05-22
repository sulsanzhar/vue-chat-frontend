import { createWebHistory, createRouter } from "vue-router";

import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
import Chat from "../components/Chat.vue";

const routes = [
    { path: "/chat", component: Chat },
    { path: "/chat/:id", component: Chat },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
