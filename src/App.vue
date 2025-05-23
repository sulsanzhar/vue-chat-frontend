<script setup>
import { ref, onMounted } from "vue";
import { router } from "./routes/router";
import { useRoute } from "vue-router";
import { useUserStore } from "./store/user.js";
import Aside from "./components/Aside.vue";
import ChatAside from "./components/ChatAside.vue";
import { useGroupStore } from "./store/group";
import './style.css';

const route = useRoute();
const userStore = useUserStore();
const groupStore = useGroupStore();

onMounted(async() => {
  await userStore.fetchCurrentUser();

  const currentRoomId = JSON.parse(localStorage.getItem('currentRoom'));
  groupStore.currentRoom.id = null;
  groupStore.currentRoom.name = null;

  if(currentRoomId) {
    groupStore.currentRoom.value = null;
    await groupStore.getGroup(currentRoomId)
  } else {
    await groupStore.getGroup(1);
  };
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
