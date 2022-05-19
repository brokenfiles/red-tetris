import {useState} from "#imports";
import {IPlayer} from "~/interfaces/Player.interface";

export const usePlayer = () => useState<IPlayer>('user', useDefaultPlayer)

export const useDefaultPlayer = (): IPlayer => {
    return null
}
