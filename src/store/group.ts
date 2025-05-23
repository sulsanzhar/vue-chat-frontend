import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "../services/api";
import { getCookie } from "../utils/getCookies";
import type { TMessage } from "../types";

export const useGroupStore = defineStore("group", () => {
    const groups = ref<{ id: number; name: string }[]>([]);
    const currentRoom = ref<{
        id: number;
        name: string;
        messages: TMessage[];
    } | null>(null);

    const token = getCookie("accessToken");

    function pushMessage(message: TMessage) {
        if (currentRoom.value) {
            currentRoom.value.messages.push(message);
        }
    }

    async function getGroups() {
        try {
            const { data } = await axios.get("/groups", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data) {
                groups.value = data;
                currentRoom.value = {
                    ...data[0],
                };
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    }

    async function getGroup(id: number) {
        if (id === currentRoom.value?.id) return;

        try {
            const response = await axios.get("/messages", {
                params: { groupId: id },
            });

            if (response.status === 200) {
                localStorage.setItem("currentRoom", JSON.stringify(id));

                currentRoom.value = {
                    id: response.data.group.id,
                    name: response.data.group.name,
                    messages: response.data.messages,
                };
            }
        } catch (error) {
            console.error("Error fetching group:", error);
        }
    }

    return {
        currentRoom,
        groups,
        getGroups,
        getGroup,
        pushMessage,
    };
});
