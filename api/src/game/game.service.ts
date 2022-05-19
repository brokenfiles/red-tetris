import { Injectable } from '@nestjs/common';
import {EventService} from "../event/event.service";

@Injectable()
export class GameService {

    constructor(
       private eventService: EventService
    ) {}

    /**
     * Start a game
     */
    public start (): void {

    }

}
