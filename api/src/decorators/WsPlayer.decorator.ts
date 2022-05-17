import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {WsException} from "@nestjs/websockets";

export const WsPlayer = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const client = ctx.switchToWs().getClient()

        /* If the client is not injected with the Guard, return an error */
        if (!client.player)
            throw new WsException("No player found")

        return client.player
    }
)
