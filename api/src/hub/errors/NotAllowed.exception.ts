import {WsException} from "@nestjs/websockets";

export class NotAllowedException extends WsException {

    constructor(message: string) {
        super(message);
    }

}
