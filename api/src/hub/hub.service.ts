import { Injectable } from '@nestjs/common';
import {Hub} from "./classes/Hub.class";
import {Player} from "../user/classes/Player.class";
import {IHubDto} from "./dto/Hub.dto";
import {WsException} from "@nestjs/websockets";
import {EventService} from "../event/event.service";

@Injectable()
export class HubService {

    private readonly _hubs: Hub[]

    constructor(private eventService: EventService) {
        this._hubs = []
    }

    public findOne (option: string | Player): Hub | null {
        if (typeof option === 'string') {
            const idx = this._hubs.map((h) => h.name).indexOf(option)
            if (idx === -1) return null
            return this._hubs[idx]
        } else if (option instanceof Player) {
            const hub = this._hubs.find((h) => {
                return h.players.includes(option)
            })
            return hub || null
        }
    }

    public createOrJoin (name: string, player: Player): Hub {
        const foundHub = this.findOne(name)
        if (foundHub === null) {
            // create the hub
            const hub = new Hub(name, player)
            this.addPlayer(hub, player)
            this.add(hub)

            return hub
        } else {
            // join the hub
            this.addPlayer(foundHub, player)

            // emit event to players in hub to specify them there is a new player
            this.eventService.emitToPlayers(foundHub.players, "hub/playerJoined", player.serialize())

            return foundHub
        }
    }

    public addPlayer (hub: Hub, player: Player): void {
        // prevent double hub, make the player leave his previous hub
        if (player.hub) {
            this.removePlayer(player.hub, player)
        }
        hub.addPlayer(player)
    }

    public leaveCurrent (player: Player): void {
        if (player.hub) {
            this.removePlayer(player.hub, player)
        }
    }

    public findCurrent (player: Player): Hub | null {
        return this.findOne(player)
    }

    public removePlayer (hub: Hub, player: Player): void {
        if (!hub) return

        const playersLeft = hub.removePlayer(player)
        // emit event to players in hub to specify them that a player left
        this.eventService.emitToPlayers(hub.players, "hub/playerLeft", player.serialize())
        if (playersLeft === 0) {
            this.remove(hub)
        }
    }

    public remove (hub: Hub): number {
        const idx = this._hubs.indexOf(hub)
        if (idx !== -1) {
            // broadcast to all users that the hub is destroyed
            this.eventService.broadcast("hub/destroyed", this._hubs[idx])
            this._hubs.splice(idx, 1)
        }
        return idx
    }

    public add (hub: Hub): void {
        this._hubs.push(hub)
        // broadcast to all users there is a new hub
        this.eventService.broadcast("hub/new", hub)
    }

    public findAll() {
        return this._hubs;
    }

    public start(player: Player): IHubDto {
        // todo: throw a custom error
        if (!player.hub)
            throw new WsException("You do not have a hub")

        const hub = player.hub
        // todo: throw a custom error
        if (hub.owner !== player)
            throw new WsException("You are not the owner")
        // hub.start()
        return hub.serialize()
    }
}
