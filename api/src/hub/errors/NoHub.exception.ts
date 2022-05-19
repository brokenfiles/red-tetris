import {WsException} from "@nestjs/websockets";

export class NoHubException extends WsException {

    constructor() {
        super("You're not currently in a hub");
    }

}
