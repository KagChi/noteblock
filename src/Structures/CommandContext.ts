import { container } from "@sapphire/pieces";
import { CommandInteraction, Message, MessageContent } from "eris";
import { Lexer, Parser, Args } from "lexure";
import { Command } from "../Stores/Command";

export class CommandContext {
    public constructor(private context: Message | CommandInteraction, public prefix: string, public command: Command) { }

    public async send(message: MessageContent, interactionReply: "edit" | "follow" | "follow" = "edit") {
        if (this.context instanceof CommandInteraction) {
            if (interactionReply === "edit") {
                await this.context.defer();
                return this.context.editMessage(this.context.id, message);
            } else if (interactionReply === "follow") {
                await this.context.defer();
                return this.context.createFollowup(message);
            }
        }
        return this.context.channel.createMessage(message);
    }

    public get args() {
        if (this.context instanceof Message) {
            const args = new Args(new Parser(new Lexer(this.context.content).lex()).parse());
            args.parserOutput.ordered = args.parserOutput.ordered.filter(x => x.value !== this.prefix && x.value !== this.command.name && !this.command.aliases.includes(x.value) && !x.value.startsWith(this.prefix));
            return args;
        } else return null;
    }

    public get channel() {
        return this.context.channel;
    }

    public get message() {
        return this.context;
    }

    public get guild() {
        return container.client.guilds.get(this.context.guildID!)!;
    }
}