import {KirishimaNode} from '@kirishima/core';
import {ApplyOptions} from '@sapphire/decorators';
import {Listener} from '@sapphire/framework';

@ApplyOptions<Listener.Options>({
  name: 'nodeConnect',
  emitter: 'kirishima',
})

export class nodeConnect extends Listener {
  public run(node: KirishimaNode) {
    this.container.logger.info(`Node ${node.options.identifier} has been connected`);
  }
}
