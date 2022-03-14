import { ApplyOptions } from "@sapphire/decorators";
import { Precondition } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<Precondition.Options>({
    name: "isOnVoice",
})

export class isOnVoice extends Precondition {
    public async messageRun(message: Message) {
        if (!message.member?.voice.channel) return this.error({ message: "You must be on a voice channel" });
        return this.ok();
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        isOnVoice: never;
    }
}