import {BaseWsExceptionFilter} from "@nestjs/websockets";
import {ArgumentsHost, Catch} from "@nestjs/common";

@Catch()
export class WsAllExceptionsFilter extends BaseWsExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        super.catch(exception, host);
    }
}
