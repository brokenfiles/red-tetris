import {Hub} from "../../hub/classes/Hub.class";
import {IPlayerDto} from "../dto/Player.dto";
import {ISerializable, SerializeContext} from "../../interfaces/Serializable.interface";
import {Socket} from "socket.io";

export class Player implements ISerializable<IPlayerDto> {

    private readonly _socket: Socket
    private readonly _playerName: string
    private _hub: Hub

    constructor(socket: Socket, playerName: string) {
        this._socket = socket
        this._playerName = playerName
    }

    serialize(context?: SerializeContext): IPlayerDto {
        return {
            socketId: this._socket.id,
            playerName: this._playerName,
            hub: context?.groups.includes("Player:Hub") ? this._hub?.serialize(context) : undefined
        }
    }

    get playerName (): string {
        return this._playerName
    }

    get socket (): Socket {
        return this._socket
    }

    get hub (): Hub {
        return this._hub
    }

    set hub (hub: Hub) {
        this._hub = hub
    }

}
