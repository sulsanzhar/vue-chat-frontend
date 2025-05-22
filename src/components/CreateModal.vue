<script setup lang="ts">
import axios from '../services/api';
import { ref, defineEmits, defineProps } from 'vue';
import Cookies from 'js-cookie'

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);

const accessToken = Cookies.get('accessToken')

const channelName = ref('');

const createChannel = async () => {
  if (channelName.value.trim()) {
    console.log('Создан канал:', channelName.value);

    try {
      await axios.post('/groups', { name: channelName.value }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      console.error('Ошибка при создании канала:', error);
    }

    channelName.value = '';
    emit('close');
  }
};


const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close');
  }
};
</script>

<template>
    <div
        @click="handleBackdropClick"
        v-if="props.isOpen"
        class="fixed text-black inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
    >
        <form
            @submit.prevent="createChannel"
            class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md"
        >
            <h2 class="text-xl font-semibold mb-4 text-center">
                Модальное окно
            </h2>
            <input
                v-model="channelName"
                type="text"
                placeholder="Название канала"
                class="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
                Создать
            </button>
        </form>
    </div>
</template>
../services/api
