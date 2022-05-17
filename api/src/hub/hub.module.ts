import {forwardRef, Module} from '@nestjs/common';
import {HubService} from "./hub.service";
import {HubGateway} from "./hub.gateway";
import {UserModule} from "../user/user.module";
import {EventModule} from "../event/event.module";

@Module({
    providers: [HubGateway, HubService],
    exports: [HubService],
    imports: [forwardRef(() => UserModule), EventModule],
})
export class HubModule {}
