<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { socket } from '../services/socket'
import { useUserStore } from '../store/user';
import Message from './Message.vue';
import { getCookie } from '../utils/getCookies';
import { useRoute } from 'vue-router';
import axios from '../services/api';
import { useGroupStore } from '../store/group';
import type { TMessage } from '../types/index';

const token = getCookie('accessToken');
const userStore = useUserStore();
const groupStore = useGroupStore();
const newMessage = ref('');
const route = useRoute();

const messagesContainer = ref<HTMLElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

async function sendMessage() {
  if (!newMessage.value.trim() || !socket) return;

  if(userStore.user === null) {
    alert('Вы не авторизованы');
    return;
  }

  socket.emit('message', {
    text: newMessage.value,
    groupId: groupStore.currentRoom?.id,
    username: userStore.user.username,
    userId: userStore.user.userId,
});

  await axios.post('/messages', {
    text: newMessage.value,
    groupId: groupStore.currentRoom?.id,
    username: userStore.user.username,
    userId: userStore.user.userId,
  });

    scrollToBottom();

  newMessage.value = '';
}

onMounted(async () => {
  if (!token) return;

  nextTick(() => {
    scrollToBottom();
  })

  socket.on('connect', () => {
    console.log('Сокет подключен к каналу: ', groupStore.currentRoom?.id);
    socket.emit('joinGroup', groupStore.currentRoom?.id);
  });

  socket.on('newMessage', async (message: TMessage) => {
    const isMyMessage = message.username === userStore.user?.username;

    groupStore.pushMessage({
      ...message,
      isAuthorMessage: isMyMessage,
    });
});
});

watch(
  () => groupStore.currentRoom?.id,
  async (newGroupId, oldGroupId) => {
    if (!socket || !newGroupId) return;

    if (oldGroupId) {
      socket.emit('leaveGroup', oldGroupId);
    }

    socket.emit('joinGroup', newGroupId);

    await groupStore.getGroup(newGroupId);
    await nextTick();
    scrollToBottom();
  }
);

onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect();
  }
});
</script>

<template>
    <div class="flex h-full">
        <div class="flex-1 flex flex-col">
            <div
                class="bg-[rgb(38,40,55)] p-5 flex items-center justify-between rounded-xl"
            >
                <div class="flex flex-1 items-center gap-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        viewBox="0 -960 960 960"
                        width="48"
                        fill="#fff"
                    >
                        <path
                            d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.81-195q-57.81 0-97.31-39.69-39.5-39.68-39.5-97.5 0-57.81 39.69-97.31 39.68-39.5 97.5-39.5 57.81 0 97.31 39.69 39.5 39.68 39.5 97.5 0 57.81-39.69 97.31-39.68 39.5-97.5 39.5Zm.66 370Q398-80 325-111.5t-127.5-86q-54.5-54.5-86-127.27Q80-397.53 80-480.27 80-563 111.5-635.5q31.5-72.5 86-127t127.27-86q72.76-31.5 155.5-31.5 82.73 0 155.23 31.5 72.5 31.5 127 86t86 127.03q31.5 72.53 31.5 155T848.5-325q-31.5 73-86 127.5t-127.03 86Q562.94-80 480.47-80Zm-.47-60q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Z"
                        />
                    </svg>
                    <h2 class="text-white font-semibold text-xl">
                        {{ groupStore.currentRoom?.name }}
                    </h2>
                </div>
            </div>

            <div
                ref="messagesContainer"
                class="flex flex-col gap-5 p-5 pb-10 overflow-y-auto flex-1"
            >
                <template v-if="groupStore.currentRoom?.messages?.length">
                    <Message
                        v-for="msg in groupStore.currentRoom?.messages"
                        :key="msg.id"
                        :id="msg.id"
                        :text="msg.text"
                        :username="msg.username"
                        :createdAt="msg.createdAt"
                        :isMyMessage="msg.username === userStore.user!.username"
                        :isAuthorMessage="msg.isAuthorMessage"
                    />
                </template>

                <h2
                    v-else-if="route.fullPath === '/chat'"
                    class="text-white text-2xl"
                >
                    Выберите беседу, чтобы начать общение
                </h2>

                <h2
                    v-else-if="route.params.id && groupStore.currentRoom"
                    class="text-white text-2xl"
                >
                    Пустая беседа без сообщений, будьте первым, кто напишет!
                </h2>
            </div>

            <div class="flex items-center gap-4 rounded-xl pl-2">
                <input
                    v-model="newMessage"
                    @keyup.enter="sendMessage"
                    placeholder="Message..."
                    type="text"
                    class="w-full rounded-xl p-4 text-white bg-[rgb(46,51,70)] border border-transparent
          focus:outline-none focus:ring-2 focus:ring-[rgb(103,133,255)]
          focus:shadow-lg transition-all duration-300 ease-in-out placeholder-gray-400"
                />
                <button
                    @click="sendMessage"
                    class="bg-[rgb(103,133,255)] p-3 rounded-xl hover:bg-[rgb(123,153,255)] transition duration-300 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28"
                        viewBox="0 -960 960 960"
                        width="28"
                        fill="#fff"
                    >
                        <path
                            d="M450-160v-526L202-438l-42-42 320-320 320 320-42 42-248-248v526h-60Z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
