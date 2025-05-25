<script setup lang="ts"></script>

<template>
    <div class="flex overflow-y-auto h-screen">
        <div
            class="w-[350px] overflow-y-auto  rounded-tr-lg rounded-tl-lg bg-[rgb(38,40,54)] px-4"
        >
            <router-view />
        </div>

        <div class="flex-1 bg-[rgb(28,30,44)] px-4">
            <router-view name="chat" />
        </div>
    </div>
</template>
