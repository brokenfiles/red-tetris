import {WsException} from "@nestjs/websockets";

export class TooMuchPlayersException extends WsException {

    constructor() {
        super("Too much players in this hub");
    }

}
