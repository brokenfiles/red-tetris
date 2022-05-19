import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WsException, WsResponse
} from '@nestjs/websockets';
import {Server, Socket} from "socket.io";
import {Logger, UseFilters, UseGuards} from "@nestjs/common";
import {Player} from "./classes/Player.class";
import {UserService} from "./user.service";
import {WsGuard} from "../guards/WsGuard.class";
import {WsPlayer} from "../decorators/WsPlayer.decorator";
import {IPlayerDto} from "./dto/Player.dto";
import {WsAllExceptionsFilter} from "../filters/WsAllExceptions.filter";

@WebSocketGateway(parseInt(process.env.WS_PORT || "81"), {
  cors: {
    origin: process.env.FRONT_URI || "http://localhost:3000",
  }
})
export class UserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger("UserGateway")

  constructor(
      private userService: UserService,
  ) {}

  afterInit(server: Server): void {
    this.logger.log("Gateway initiated")
  }

  public handleConnection(socket: Socket, ...args: any[]): void {
    this.logger.log(`Client ${socket.id} connected`)
    if (!socket.handshake?.query?.playerName)
      socket.disconnect()

    this.userService.create(socket, socket.handshake.query.playerName as string)
  }

  public handleDisconnect(client: Socket): void {
    this.logger.log(`Client ${client.id} disconnected`)
    // remove the player from the player list
    this.userService.remove(client.id)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("user/me")
  public getInfos (@WsPlayer() player: Player): IPlayerDto {
    return player.serialize({ groups: ['Player:Hub'] })
  }


}
