import { Injectable } from '@nestjs/common';
import {Server} from "socket.io";
import {Player} from "../user/classes/Player.class";

@Injectable()
export class EventService {

    private _server: Server

    /**
     * Emit an event to all players
     * @param eventName
     * @param payload
     */
    public broadcast (eventName: string, payload: any): boolean {
        return this._server.emit(eventName, payload)
    }

    /**
     * Emit an event to a specifiic player
     * @param player
     * @param eventName
     * @param payload
     */
    public emitToPlayer (player: Player, eventName: string, payload: any): boolean {
        return player.socket?.emit(eventName, payload)
    }

    /**
     * Emit an event to a list of players
     * @param players
     * @param eventName
     * @param payload
     */
    public emitToPlayers (players: Player[], eventName: string, payload: any): void {
        for (const player of players) {
            this.emitToPlayer(player, eventName, payload)
        }
    }

    set server (server: Server) {
        this._server = server
    }

    get server (): Server {
        return this._server
    }

}
