import {defineNuxtPlugin, ref} from "#imports";
import { io } from "socket.io-client"

export default defineNuxtPlugin((nuxtApp) => {
    const socket = io (`http://localhost:81`, {
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
            connectToServer: (playerName: string): Promise<boolean> => {
                return new Promise<boolean>((resolve) => {
                    socket.io.opts.query = {
                        playerName: playerName
                    }

                    const timerId = setTimeout(() => {
                        // the connection timed out
                        resolve(false)
                    }, 2000)

                    socket.on('connect', () => {
                        clearTimeout(timerId)
                        resolve(true)
                    })
                    socket.connect()
                })
            },
            logout: () => {
                socket.disconnect()
            }
        }
    }
})
