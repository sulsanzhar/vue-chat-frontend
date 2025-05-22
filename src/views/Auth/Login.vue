<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';

const route = useRouter();
const user = ref({
    username: "",
    password: "",
});

const onLoginHandler = async () => {
    try {
        const req = await api.post('/login', user.value, {withCredentials: true});
        if (req.status === 200) {
            route.push('/');
        }
        console.log('Registration successful:', req.statusText);

    } catch (error) {
        console.error('Error during registration:', error);
    }

}
</script>

<template>
    <form
        @submit.prevent="onLoginHandler"
        class="flex flex-col gap-10 w-full max-w-sm min-h-screen mx-auto justify-center"
    >
        <h1 class="text-center text-xl font-bold mb-4">Вход</h1>

        <label class="flex items-center gap-2">
            <p class="w-20">Email</p>
            <input
                class="flex-1 border border-gray-400 p-2 rounded-sm"
                type="text"
                placeholder="email..."
                v-model="user.username"
            />
        </label>

        <label class="flex items-center gap-2">
            <p class="w-20">Password</p>
            <input
                class="flex-1 border border-gray-400 p-2 rounded-sm"
                type="password"
                placeholder="password..."
                v-model="user.password"
            />
        </label>
        <button
            class="w-fit py-2 px-5 mx-auto border border-[gray] cursor-pointer hover:bg-black hover:text-white rounded-sm ease-in-out duration-300"
            type="submit"
        >
            Войти в аккаунт
        </button>
    </form>
</template>
../../services/api
