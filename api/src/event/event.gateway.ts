import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import {Logger, UseFilters} from "@nestjs/common";
import {WsAllExceptionsFilter} from "../filters/WsAllExceptions.filter";
import {Server, Socket} from "socket.io";
import {EventService} from "./event.service";

@WebSocketGateway(parseInt(process.env.WS_PORT || "81"), {
  cors: {
    origin: process.env.FRONT_URI || "http://localhost:3000",
  }
})
export class EventGateway implements OnGatewayInit {

  private logger: Logger = new Logger("EventsGateway")

  constructor(
      private eventService: EventService
  ) {}

  afterInit(server: Server): void {
    this.logger.log("EventService initiated")
    this.eventService.server = server
  }

}
