import {IHubDto} from "../../hub/dto/Hub.dto";

export interface IPlayerDto {

    socketId: string
    playerName: string
    hub?: IHubDto

}
