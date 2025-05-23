import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "../services/api";

export const useUserStore = defineStore("user", () => {
    const user = ref<{ userId: number; username: string } | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchCurrentUser() {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.get("/api/me", {
                withCredentials: true,
            });

            user.value = response.data;
        } catch (err: any) {
            if (err.response?.status === 401) {
                try {
                    await axios.post("/refresh", {}, { withCredentials: true });

                    const response = await axios.get("/api/me", {
                        withCredentials: true,
                    });
                    user.value = response.data;
                } catch (refreshErr) {
                    user.value = null;
                    console.error("Refresh failed:", refreshErr);
                }
            } else {
                user.value = null;
                error.value = "Failed to fetch current user";
                console.error(err);
            }
        } finally {
            loading.value = false;
        }
    }

    async function clearUser() {
        user.value = null;
        try {
            await axios.post("/logout", {}, { withCredentials: true });
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return { user, loading, error, fetchCurrentUser, clearUser };
});
