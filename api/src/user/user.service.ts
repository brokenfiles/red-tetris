import { Injectable } from '@nestjs/common';
import {Player} from "./classes/Player.class";
import {HubService} from "../hub/hub.service";
import {Socket} from "socket.io";
import {EventService} from "../event/event.service";

@Injectable()
export class UserService {

    private readonly _players: Player[]

    constructor(private hubService: HubService, private eventService: EventService) {
        this._players = []
    }

    public create (socket: Socket, playerName: string): Socket | void {
        if (this.findOne(playerName) !== undefined) {
            socket.emit("exception", {
                status: "error",
                message: "This username is already taken"
            })
            return socket.disconnect()
        }

        if (playerName.length < 3 || playerName.length > 16) {
            socket.emit("exception", {
                status: "error",
                message: "This player name is invalid"
            })
            return socket.disconnect()
        }

        // add a new player to the list
        const player = new Player(socket, playerName)
        this.emitConnectionEvents(player)
        this.add(player)
    }

    public add (player: Player): void {
        this._players.push(player)
    }

    public remove (socketId: string): void {
        const idx = this._players.map((p) => p.socket.id).indexOf(socketId)
        if (idx !== -1) {
            const player = this._players[idx]
            if (player.hub) {
                this.hubService.removePlayer(player.hub, player)
            }
            this._players.splice(idx, 1)
        }
    }

    public findOne (param: string): Player | undefined {
        const player = this._players.find((p) => {
            return p.socket.id === param || p.playerName === param
        })
        return player
    }

    public findAll(): Player[] {
        return this._players
    }

    /**
     * Emit needed events for the player just after his connection to the server
     * @param player
     */
    public emitConnectionEvents (player: Player): void {
        this.eventService.emitToPlayer(player, "hub/all", this.hubService.findAll().map(h => h.serialize({
            groups: ['Hub:PlayerNumber']
        })))
    }

}
