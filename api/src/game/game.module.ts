import {forwardRef, Module} from '@nestjs/common';
import {GameGateway} from "./game.gateway";
import { GameService } from './game.service';
import {UserModule} from "../user/user.module";
import {EventModule} from "../event/event.module";

@Module({
    providers: [GameGateway, GameService],
    exports: [GameService],
    imports: [UserModule, EventModule],
})
export class GameModule {}
