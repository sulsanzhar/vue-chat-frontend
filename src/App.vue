<script setup>
import { ref, onMounted } from "vue";
import { router } from "./routes/router";
import { useRoute } from "vue-router";
import { useUserStore } from "./store/user.js";
import AsideNav from "./components/AsideNav.vue";
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
    <div class="flex h-screen overflow-hidden p-5 box-border">
        <AsideNav />

        <div class="flex-1 flex flex-col h-full">
            <main class="h-full overflow-auto bg-[rgb(38,40,54)] rounded-xl">
                <router-view />
            </main>
        </div>
    </div>
</template>
