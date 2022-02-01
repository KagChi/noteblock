import { PieceContext } from "@sapphire/pieces";
import { Message } from "eris";
import { Listener } from "../Stores/Listener";
import { CommandContext } from "../Structures/CommandContext";

export class messageListener extends Listener {
    public constructor(context: PieceContext) {
        super(context, {
            name: "message",
            event: "messageCreate",
        });
    }

    public async run(message: Message) {
        if (message.author.bot || message.webhookID) return;
        const prefix = this.getPrefix(message.content, process.env.PREFIX!);
        if (prefix) {
            const commandPrefix = this.getCommandPrefix(message.content, prefix);
		    const prefixLess = message.content.slice(commandPrefix.length).trim();

            const spaceIndex = prefixLess.indexOf(' ');
            const commandName = spaceIndex === -1 ? prefixLess : prefixLess.slice(0, spaceIndex);
            
            const command = this.container.stores.get("commands").resolve(commandName);
            if (command) {  
                const context = new CommandContext(message, prefix, command);
                await command.run(context);
                this.container.logger.info(`${context.message.member?.user.username} ran command ${command.name} in ${context.guild.name}`);
            }
        }
    }

    private getCommandPrefix(content: string, prefix: string | RegExp): string {
		return typeof prefix === 'string' ? prefix : prefix.exec(content)![0];
	}

    private getPrefix(content: string, prefixes: readonly string[] | string | null): string | null {
		if (prefixes === null) return null;
        content = content.toLowerCase();
		if (typeof prefixes === 'string') {
			return content.startsWith(prefixes.toLowerCase()) ? prefixes : null;
		}
		return prefixes.find((prefix) => content.startsWith(prefix.toLowerCase())) ?? null;
	}
}