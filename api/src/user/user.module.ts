import {forwardRef, Module} from "@nestjs/common";
import { UserService } from './user.service';
import {UserGateway} from "./user.gateway";
import {HubModule} from "../hub/hub.module";
import {EventModule} from "../event/event.module";

@Module({
    providers: [UserService, UserGateway],
    exports: [UserService],
    imports: [forwardRef(() => HubModule), EventModule]
})
export class UserModule {}
