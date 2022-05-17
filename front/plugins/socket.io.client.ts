import {defineNuxtPlugin, ref} from "#imports";
import { io } from "socket.io-client"

export default defineNuxtPlugin((nuxtApp) => {
    const socket = io(`http://localhost:81`, {
        // disable auto-connect to manually handle the ws-connection
        autoConnect: false,
        reconnection: false
    })
    const connected = ref(false)

    socket.on('connect', () => {
        connected.value = socket.connected
    })
    socket.on('disconnect', () => {
        connected.value = socket.connected
    })

    return {
        provide: {
            socket,
            socket_connected: connected,
            connectToServer: (playerName: string) => {
                socket.io.opts.query = {
                    playerName: playerName
                }
                socket.connect()
            }
        }
    }
})
