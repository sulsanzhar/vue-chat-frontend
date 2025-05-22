<script setup lang="ts">
import Search from './Search.vue';
import ChatCard from './ChatCard.vue';
import CreateModal from './CreateModal.vue';
import { ref, onMounted } from 'vue';
import { useGroupStore } from '../store/group';
import { watch } from 'vue';

const groupStore = useGroupStore();

const isOpen = ref(false);

watch(
  () => groupStore.currentRoom,
  (newRoom, oldRoom) => {
    console.log('Room changed:', oldRoom, '=>', newRoom);
    console.log('watch chat aside')
  }, {deep: true}
)


onMounted(() => {
    groupStore.getGroups();
});
</script>

<template>
    <div
        class="bg-[rgb(38,40,54)] rounded-tr-2xl rounded-br-2xl px-5 flex flex-col h-full"
    >
        <div class="pt-5">
            <Search />
        </div>

        <div class="flex-1 overflow-auto space-y-5 my-5">
            <ChatCard
                v-for="group in groupStore.groups"
                :key="group.id"
                :id="group.id"
                :name="group.name"
                @groupSelected="groupStore.getGroup(group.id)"
            />
        </div>

        <div class="text-center pb-5">
            <button
                @click="isOpen = true"
                class="cursor-pointer bg-[rgb(105,135,255)] w-fit py-4 px-20 rounded-xl"
            >
                Создать беседу
            </button>
        </div>

        <CreateModal @close="isOpen = false" :is-open="isOpen" />
    </div>
</template>
../services/api
