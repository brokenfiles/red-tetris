import {WsException} from "@nestjs/websockets";

export class InvalidPlayerNameException extends WsException {

    constructor() {
        super("This username is invalid");
    }

}
