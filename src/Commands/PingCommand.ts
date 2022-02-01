import { PieceContext } from "@sapphire/pieces";
import { Command } from "../Stores/Command";
import { CommandContext } from "../Structures/CommandContext";

export class PingCommand extends Command {
    public constructor(context: PieceContext) {
        super(context, {
            name: "ping"
        });
    }

    public async run(context: CommandContext){
       const msg = await context.send("Configuring client latency...");
        return msg.edit(`${msg.createdAt - context.message.createdAt}ms Heartbeat latency`); 
    }
}