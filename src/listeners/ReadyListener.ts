import Listener from "../structures/Listener";
import { logger } from "../Util";
export default class ReadyListener extends Listener {
    public name = 'ready'
    public exec() {
        logger.info(`${this.client.user.username.toUpperCase()} READY `)
        this.client.editStatus("dnd", { name: `${this.client.guilds.size} Guilds Using ${this.client.user.username}`, type: 2 })
    }
}