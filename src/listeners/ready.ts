import { Listener } from 'discord-akairo';
import config from '../config';
import { logger } from '../Util';
export default class readyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        })
    }
   async exec() {
        logger.info('[CLIENT READY]');
        await this.client.user?.setActivity({
            name: config.presence.activities.replace('{GUILDSIZE}', this.client.guilds.cache.size as any),
            url: config.presence.streaming ? 'https://twitch.tv/discord' : '',
            type: config.presence.type as any
        })
    }
}