import {MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import {Logger, UseFilters, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {Player} from "../user/classes/Player.class";
import {HubService} from "./hub.service";
import {WsGuard} from "../guards/WsGuard.class";
import {WsPlayer} from "../decorators/WsPlayer.decorator";
import {IHubDto} from "./dto/Hub.dto";
import {CreateHubDto} from "./dto/input/create-hub.dto";
import {BadRequestTransformationFilter} from "../filters/BadRequestTransformation.filter";

@WebSocketGateway(parseInt(process.env.WS_PORT || "81"), {
  cors: {
    origin: process.env.FRONT_URI || "http://localhost:3000",
  }
})
@UsePipes(new ValidationPipe())
@UseFilters(new BadRequestTransformationFilter())
export class HubGateway implements OnGatewayInit {

  private logger: Logger = new Logger("HubGateway")

  constructor(
      private hubService: HubService
  ) {}

  afterInit(): void {
    this.logger.log("Gateway initiated")
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("hub/createOrJoin")
  public createOrJoin (@WsPlayer() player: Player, @MessageBody() hubDto: CreateHubDto): IHubDto {
    return this.hubService.createOrJoin(hubDto.hubName, player).serialize({ groups: ["Hub:Players"] })
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
