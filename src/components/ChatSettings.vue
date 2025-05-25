<script setup lang="ts">
import { ref } from 'vue';

const buttons = ['Мой профиль', 'Конфиденциальность', 'Восстановить пароль', 'Выйти из аккаунта'];

const activeIndex = ref<number | null>(null);

function setActive(index: number) {
  activeIndex.value = index;
}
</script>

<template>
    <button
        v-for="(btn, index) in buttons"
        :key="index"
        @click="setActive(index)"
        :class="[
        'px-10 py-5 rounded-xl transition-colors duration-200',
        activeIndex === index
          ? 'bg-[rgb(105,135,255)] text-white'
          : 'bg-black text-white hover:bg-[#2E3347]'
      ]"
    >
        {{ btn }}
    </button>
</template>
