import {IPlayer} from "~/interfaces/Player.interface";

export namespace Hub {
    export type status = "WARMING" | "PLAYING"
}

export interface IHub {

    name: string
    status: Hub.status
    owner: IPlayer
    players?: IPlayer[]
    playerNumber?: number

}
