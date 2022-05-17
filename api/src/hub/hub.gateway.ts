import {OnGatewayInit, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {Server} from "socket.io";
import {Logger, UseFilters, UseGuards} from "@nestjs/common";
import {Player} from "../user/classes/Player.class";
import {HubService} from "./hub.service";
import {WsGuard} from "../guards/WsGuard.class";
import {WsPlayer} from "../decorators/WsPlayer.decorator";
import {WsData} from "../decorators/WsData.decorator";
import {IHubDto} from "./dto/Hub.dto";
import {WsAllExceptionsFilter} from "../filters/WsAllExceptions.filter";

@WebSocketGateway(parseInt(process.env.WS_PORT || "81"), {
  cors: {
    origin: process.env.FRONT_URI || "http://localhost:3000",
  }
})
@UseFilters(WsAllExceptionsFilter)
export class HubGateway implements OnGatewayInit {

  private logger: Logger = new Logger("HubGateway")
  private _server: Server

  constructor(
      private hubService: HubService
  ) {}

  afterInit(server: Server): void {
    this.logger.log("Gateway initiated")
    this._server = server
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("hub/createOrJoin")
  public createOrJoin (@WsPlayer() player: Player, @WsData() hubName: string): IHubDto {
    return this.hubService.createOrJoin(hubName, player).serialize({ groups: ["Hub:Players"] })
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("hub/leave")
  public leave (@WsPlayer() player: Player): void {
    return this.hubService.removePlayer(player.hub, player)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("hub/start")
  public start (@WsPlayer() player: Player): IHubDto {
    return this.hubService.start(player)
  }

  @SubscribeMessage("hub/findAll")
  public findAll (): IHubDto[] {
    return this.hubService.findAll().map(h => h.serialize({ groups: ["Hub:PlayerNumber"] }))
  }

}
