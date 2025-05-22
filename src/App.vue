<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { router } from "./routes/router";
import { useRoute } from "vue-router";
import { useUserStore } from "./store/user.js";
import Aside from "./components/Aside.vue";
import ChatAside from "./components/ChatAside.vue";
import './style.css';
import { useGroupStore } from "./store/group";

const route = useRoute();
const userStore = useUserStore();
const groupStore = useGroupStore();

onMounted(() => {
  userStore.fetchCurrentUser();
});

watchEffect(() => {
  console.log("Current user:", userStore.user);
});
</script>

<template>
    <div class="flex h-screen overflow-hidden p-2.5">
        <Aside />
        <ChatAside />

        <div class="flex-1 flex flex-col pl-5 h-full">
            <main class="overflow-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>
