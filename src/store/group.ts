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

    // async function getGroup(id: number) {
    //     if (id === currentRoom.value?.id) return;

    //     try {
    //         const { data } = await axios.get("/messages", {
    //             params: { groupId: id },
    //         });

    //         currentRoom.value!.messages = data.messages;
    //         currentRoom.value!.name = data.group.name;
    //         currentRoom.value!.id = data.group.id;
    //     } catch (error) {
    //         console.error("Error fetching group:", error);
    //     }
    // }

    async function getGroup(id: number) {
        if (id === currentRoom.value?.id) return;

        try {
            const { data } = await axios.get("/messages", {
                params: { groupId: id },
            });

            currentRoom.value = {
                id: data.group.id,
                name: data.group.name,
                messages: data.messages,
            };
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
