<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: number;
  text: string;
  username: string;
  createdAt: string | Date;
  isMyMessage: boolean;
  isAuthorMessage?: boolean;
}

const props = defineProps<Props>();

const formattedTime = computed(() =>
  new Date(props.createdAt).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
);
</script>

<template>
    <div class="mt-2">
        <div
            :class="[
        'flex gap-3',
        props.isMyMessage || props.isAuthorMessage
          ? 'justify-end'
          : 'justify-start',
      ]"
        >
            <div
                v-if="!props.isMyMessage && !props.isAuthorMessage"
                class="self-end"
            >
                <!-- Аватарка -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="36"
                    viewBox="0 -960 960 960"
                    width="36"
                    fill="#FFFFFF"
                >
                    <path
                        d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.81-195q-57.81 0-97.31-39.69-39.5-39.68-39.5-97.5 0-57.81 39.69-97.31 39.68-39.5 97.5-39.5 57.81 0 97.31 39.69 39.5 39.68 39.5 97.5 0 57.81-39.69 97.31-39.68 39.5-97.5 39.5Z"
                    />
                </svg>
            </div>
            <div>
                <h3
                    :class="props.isMyMessage || props.isAuthorMessage ? 'text-right' : 'text-left'"
                >
                    {{ props.username }}
                </h3>
                <div class="relative">
                    <p
                        :class="[
            'p-4 rounded-xl max-w-2xl min-w-40 text-white break-words',
            props.isMyMessage || props.isAuthorMessage
              ? 'bg-[rgb(103,133,255)]'
              : 'bg-[rgb(46,51,71)]',
          ]"
                    >
                        {{ props.text }}
                    </p>
                    <p
                        class="absolute bottom-1 right-2 text-xs mt-1"
                        :class="props.isMyMessage || props.isAuthorMessage ? 'text-right' : 'text-left'"
                    >
                        {{ formattedTime }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
