import { io } from "socket.io-client";

const socket = io("server.deshinta.online",{
    autoConnect:false
})

// const socket = io("http://localhost:3000",{
//     autoConnect:false
// })

export default socket