import { AliasPiece, PieceContext } from "@sapphire/pieces";
import { Awaitable } from "@sapphire/utilities";
import { CommandContext } from "../Structures/CommandContext";

export abstract class Command extends AliasPiece {

    public constructor(context: PieceContext, public options: CommandOptions) {
        super(context, options);
    }
    public abstract run(context: CommandContext): Awaitable<unknown>;
}

export interface CommandOptions {
    name: string;
}