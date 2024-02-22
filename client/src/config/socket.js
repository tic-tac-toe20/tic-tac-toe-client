import { io } from "socket.io-client";
const socket = io("https://server.deshinta.online",{
    autoConnect:false
})

export default socket