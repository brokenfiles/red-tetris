import {Player} from "../../user/classes/Player.class";
import {TooMuchPlayersException} from "../errors/TooMuchPlayers.exception";
import {ISerializable, SerializeContext} from "../../interfaces/Serializable.interface";
import {IHubDto} from "../dto/Hub.dto";

export namespace Hub {
    export type status = "WARMING" | "PLAYING"
}

export class Hub implements ISerializable<IHubDto> {

    public MAX_PLAYERS = 8

    private readonly _name: string
    private _players: Player[]
    private _status: Hub.status
    private _owner: Player

    constructor(name: string, owner: Player) {
        this._players = []
        this._status = "WARMING"
        this._name = name
        this._owner = owner
    }

    serialize(context?: SerializeContext): IHubDto {
        return {
            name: this._name,
            status: this._status,
            owner: this._owner.serialize(),
            players: context?.groups.includes("Hub:Players") ? this.players.map((p) => p.serialize()) : undefined,
            playerNumber: context?.groups.includes('Hub:PlayerNumber') ? this.players.length : undefined
        }
    }

    public addPlayer (player: Player): void {
        if (this.playersNumber + 1 > this.MAX_PLAYERS)
            throw new TooMuchPlayersException()

        this._players.push(player)
        player.hub = this
    }

    public removePlayer (player: Player): number | false {
        const idx = this._players.indexOf(player)
        if (idx !== -1) {
            this._players.splice(idx, 1)
            player.hub = null

            if (this.playersNumber > 0) {
                // if the number of players if upper than 0, set the new hub owner
                // otherwise, let the service remove the hub
                if (this.owner === player) {
                    this.owner = this.players[0]
                }
            }
            return this.playersNumber
        }

        return false
    }

    get name (): string {
        return this._name
    }

    get players (): Player[] {
        return this._players
    }

    get playersNumber (): number {
        return this._players.length
    }

    get status (): Hub.status {
        return this._status
    }

    get owner (): Player {
        return this._owner
    }

    set status (status: Hub.status) {
        this._status = status
    }

    set owner (player: Player) {
        this._owner = player
    }

}
