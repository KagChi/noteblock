import type { CommandClient } from "eris";

export default abstract class Listener {
    public abstract name: string;
    public constructor(public readonly client: CommandClient) {}
    public abstract exec(...args: unknown[]): unknown;
}