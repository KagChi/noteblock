import { ApplyOptions } from "@sapphire/decorators";
import { Precondition } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<Precondition.Options>({
    name: "isJoinable",
})

export class isJoinable extends Precondition {
    public async messageRun(message: Message) {
        if (!message.member?.voice.channel?.permissionsFor(message.guild?.me!).has(["CONNECT", "VIEW_CHANNEL"])) return this.error({ message: "I can't join your voice channel" });
        return this.ok();
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        isJoinable: never;
    }
}