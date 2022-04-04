import {ApplyOptions} from '@sapphire/decorators';
import {Precondition} from '@sapphire/framework';
import {Message} from 'discord.js';

@ApplyOptions<Precondition.Options>({
  name: 'isQueueAvailable',
})

export class isQueueAvailable extends Precondition {
  public messageRun(message: Message) {
    return this.container.client.kirishima.players!.has(message.guildId!) ? this.ok() : this.error({message: 'There are no queue in this server'});
  }
}

declare module '@sapphire/framework' {
    export interface Preconditions {
        isQueueAvailable: never;
    }
}
