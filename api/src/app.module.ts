import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import {UserModule} from "./user/user.module";
import { HubService } from './hub/hub.service';
import { HubModule } from './hub/hub.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [GameModule, UserModule, HubModule, EventModule],
  controllers: [],
  providers: [HubService],
})
export class AppModule {}
