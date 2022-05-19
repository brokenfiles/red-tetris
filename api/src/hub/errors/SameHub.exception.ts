import {WsException} from "@nestjs/websockets";

export class SameHubException extends WsException {

    constructor() {
        super("You are already in this hub");
    }

}
