import { Listener } from "../Stores/Listener";
import { PieceContext } from "@sapphire/pieces";

export class readyListener extends Listener {
    public constructor(context: PieceContext) {
        super(context, {
            name: "ready",
            event: "ready",
        });
    }

    public run() {
        this.container.logger.info(`${this.container.client.user.username} ready to action !`);
    }
}