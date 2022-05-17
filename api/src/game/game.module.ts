import { Module } from '@nestjs/common';
import {GameGateway} from "./game.gateway";
import { GameService } from './game.service';
import {UserModule} from "../user/user.module";

@Module({
    providers: [GameGateway, GameService],
    imports: [UserModule]
})
export class GameModule {}
