import { io, Socket } from "socket.io-client";
import { getCookie } from "../utils/getCookies";

const token = getCookie("accessToken");

export const socket: Socket = io("http://localhost:3000", {
    withCredentials: true,
    auth: { token },
});
