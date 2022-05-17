import {IPlayerDto} from "../../user/dto/Player.dto";
import {Hub} from "../classes/Hub.class";

export interface IHubDto {

    name: string
    status: Hub.status
    owner: IPlayerDto
    players?: IPlayerDto[]
    playerNumber?: number

}
