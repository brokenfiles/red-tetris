import {
  OnGatewayInit,
  WebSocketGateway
} from '@nestjs/websockets';
import {Server, Socket} from "socket.io";
import {Logger, UseFilters, UseGuards} from "@nestjs/common";
import {GameService} from "./game.service";
import {WsAllExceptionsFilter} from "../filters/WsAllExceptions.filter";

@WebSocketGateway(parseInt(process.env.WS_PORT || "81"), {
  cors: {
    origin: process.env.FRONT_URI || "http://localhost:3000",
  }
})
@UseFilters(WsAllExceptionsFilter)
export class GameGateway implements OnGatewayInit {

  private logger: Logger = new Logger("GameGateway")

  constructor(
      private gameService: GameService
  ) {}

  public afterInit(server: Server): void {
    this.logger.log("Gateway initiated")
  }


}
