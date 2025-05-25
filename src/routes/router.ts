// router.ts
import { createWebHistory, createRouter } from "vue-router";
import ChatGroups from "../components/ChatGroups.vue";
import ChatSettings from "../components/ChatSettings.vue";
import LayoutAside from "../components/LayoutAside.vue";
import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
import Chat from "../components/Chat.vue";

const routes = [
    { path: "/", redirect: "/chat/groups/1" },
    {
        path: "/chat",
        component: LayoutAside,
        children: [
            {
                path: "groups/:id",
                components: {
                    default: ChatGroups,
                    chat: Chat,
                },
            },
            {
                path: "settings",
                component: ChatSettings,
            },
        ],
    },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
];

// ✅ ВАЖНО: именно createRouter, не просто массив
export const router = createRouter({
    history: createWebHistory(),
    routes,
});
