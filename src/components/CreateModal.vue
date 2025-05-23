<script setup lang="ts">
import axios from '../services/api';
import { ref, defineEmits, defineProps } from 'vue';
import { useGroupStore } from '../store/group';

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);
const groupStore = useGroupStore();

const channelName = ref('');

const createChannel = async () => {
  if (channelName.value.trim()) {
    console.log('Создан канал:', channelName.value);

    try {
      const res = await axios.post('/groups', { name: channelName.value });
        groupStore.pushGroup({
          id: res.data.id,
          name: res.data.name,
          messages: []
      })
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
        class="fixed text-white inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40"
    >
        <form
            @submit.prevent="createChannel"
            class="bg-[rgb(46,51,73)] p-6 rounded-2xl shadow-lg w-full max-w-md"
        >
            <h2 class="text-xl font-semibold mb-7 text-center">
                Модальное окно
            </h2>
            <input
                v-model="channelName"
                type="text"
                placeholder="Название канала"
                class="w-full p-3 border border-transparent rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
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
