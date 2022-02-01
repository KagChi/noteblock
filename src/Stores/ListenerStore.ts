import { Store } from "@sapphire/pieces";
import { Command } from "./Command";

export class ListenerStore extends Store<Command> {
    public constructor() {
        super(Command as any, { name: "listeners" });
    }
}