import {WsException} from "@nestjs/websockets";

export class AlreadyPlayingException extends WsException {

    constructor() {
        super("This hub is already playing");
    }

}
