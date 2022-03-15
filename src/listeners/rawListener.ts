import {ApplyOptions} from '@sapphire/decorators';
import {Listener} from '@sapphire/framework';
import {GatewayVoiceServerUpdateDispatch, GatewayVoiceStateUpdateDispatch} from 'discord-api-types/gateway/v9';

@ApplyOptions<Listener.Options>({
  name: 'raw',
})

export class rawListener extends Listener {
  public async run(packet: GatewayVoiceStateUpdateDispatch | GatewayVoiceServerUpdateDispatch) {
    await this.container.client.kirishima.handleRawPacket(packet.t, packet);
  }
}
