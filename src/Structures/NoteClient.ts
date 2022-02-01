import { container, StoreRegistry } from "@sapphire/pieces";
import { Client } from "eris";
import { join } from "node:path";
import { CommandStore } from "../Stores/CommandStore";
import { ListenerStore } from "../Stores/ListenerStore";
import { NoteLogger } from "../Utils/NoteLog";

export class NoteClient extends Client {
    public constructor(token?: string) { 
        super(token ?? process.env.DISCORD_TOKEN!, {
            intents: ["guilds", "guildMessages"]
        });
        container.client = this;
        container.logger = NoteLogger;
    }

    public stores = new StoreRegistry();

    public async connect(): Promise<void> {
        this.stores.register(new CommandStore().registerPath(join(__dirname, '..', 'Commands')))
                   .register(new ListenerStore().registerPath(join(__dirname, '..', 'Listeners')));

        container.stores = this.stores;
        await Promise.all([...this.stores.values()].map((store) => store.loadAll()));
        return super.connect();
    }
}

declare module '@sapphire/pieces' {
	interface Container {
		client: NoteClient;
		stores: StoreRegistry;
        logger: typeof NoteLogger;
	}

	interface StoreRegistryEntries {
		commands: CommandStore;
		listeners: ListenerStore;
	}
}