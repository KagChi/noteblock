import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";

@ApplyOptions<Listener.Options>({
    name: "ready"
})

export class readyListener extends Listener {
    public async run() {
        this.container.logger.info(`${this.container.client.user?.tag} is ready!`);
        await this.container.client.kirishima.initialize(this.container.client.user?.id);
    }
}