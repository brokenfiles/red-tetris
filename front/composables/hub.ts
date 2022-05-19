import {useNuxtApp, useState} from "#imports";
import {IHub} from "~/interfaces/Hub.interface";
import {Socket} from "socket.io-client";
import {HubPlayersUpdatedOption} from "~/types/HubPlayersUpdatedOption.type";
import {IPlayer} from "~/interfaces/Player.interface";
import {NavigationFailure, Router} from "vue-router";

export const useHubs = () => useState<IHub[]>('hubs', () => [])
export const useHub = () => useState<IHub>("hub", useDefaultHub)

export const useDefaultHub = (): IHub => {
    return null
}

export const listenHubsEvents = (socket: Socket) => {
    const hubs = useHubs()
    socket.on('hub/all', (receivedHubs: IHub[]) => {
        console.log('received hubs', receivedHubs)
        hubs.value = receivedHubs
    })
    socket.on('hub/new', (newHub: IHub) => {
        console.log('new hub create', newHub)
        hubs.value.push(newHub)
    })
    socket.on('hub/destroyed', (destroyedHub: IHub) => {
        console.log('hub deleted', destroyedHub)
        const idx = hubs.value.map(h => h.name).indexOf(destroyedHub.name)
        hubs.value.splice(idx, 1)
    })
    socket.on('hub/playersUpdated', (options: HubPlayersUpdatedOption) => {
        const hub = hubs.value.find(h => h.name === options.name)
        if (!! hub) {
            hub.playerNumber = options.playersNumber
        }
    })
}

export const listenHubEvents = (socket: Socket, $showToast) => {
    const hub = useHub()
    socket.on('hub/setOwner', (owner: IPlayer) => {
        console.log('the owner changed to ', owner)
        hub.value.owner = owner
        $showToast(`The owner is now ${hub.value.owner.playerName}`, "info")
    })
    socket.on('hub/playerJoined', (player: IPlayer) => {
        console.log('player joined: ', player)
        hub.value.players.push(player)
        $showToast(`${player.playerName} joined the hub`, "info")
    })
    socket.on('hub/playerLeft', (player: IPlayer) => {
        const idx = hub.value.players.map(p => p.playerName).indexOf(player.playerName)
        console.log('player left: ', player)
        if (idx !== -1) {
            hub.value.players.splice(idx, 1)
            $showToast(`${player.playerName} left the hub`, "info")
        }
    })
}

export const createOrJoin = (socket: Socket, name: string): Promise<IHub> => {
    return new Promise<IHub>(async (resolve) => {
        socket.emit('hub/createOrJoin', {
            hubName: name
        }, (hub: IHub) => {
            resolve(hub)
        })
    })
}

export const pushToHash = (hub: IHub, playerName: string, router: Router): void => {
    router.push(`#${hub.name}-${playerName}`)
}
