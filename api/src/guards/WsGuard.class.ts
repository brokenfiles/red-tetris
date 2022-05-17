import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable()
export class WsGuard implements CanActivate {

    constructor(
        private userService: UserService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const client = context.switchToWs().getClient()
        const player = this.userService.findOne(client.id)

        client.player = player
        return player !== null
    }

}
