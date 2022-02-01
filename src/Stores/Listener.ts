import { Piece, PieceContext } from "@sapphire/pieces";
import { EventListeners } from "eris";
import EventEmitter from "node:events";
import { Util } from "../Utils/Util";

export abstract class Listener extends Piece {
    private _listener: ((...args: any[]) => void) | null;
    public readonly emitter: EventEmitter | null;
    public abstract run(...args: unknown[]): unknown;

    public constructor(context: PieceContext, public options: ListenerOptions) {
        super(context, options);
        this.emitter =
			typeof options.emitter === 'undefined'
				? this.container.client
				: (typeof options.emitter === 'string' ? (Reflect.get(this.container.client, options.emitter) as EventEmitter) : options.emitter) ??
				  null;
        this._listener = this.emitter && options.event ? (options.once ? this._runOnce.bind(this) : this._run.bind(this)) : null;

        if (this.emitter === null || this._listener === null) this.enabled = false;
    }

    public onLoad() {
		if (this._listener) {
			const emitter = this.emitter!;

			const maxListeners = emitter.getMaxListeners();
			if (maxListeners !== 0) emitter.setMaxListeners(maxListeners + 1);

			emitter[this.options.once ? 'once' : 'on'](this.options.event, this._listener);
		}
		return super.onLoad();
	}

	public onUnload() {
		if (!this.options.once && this._listener) {
			const emitter = this.emitter!;

			const maxListeners = emitter.getMaxListeners();
			if (maxListeners !== 0) emitter.setMaxListeners(maxListeners - 1);

			emitter.off(this.options.event, this._listener);
			this._listener = null;
		}

		return super.onUnload();
	}

    private async _run(...args: unknown[]) {
		const result = await Util.fromAsync(() => this.run(...args));
		if (Util.isErr(result)) {
			this.container.client.emit("listenerError", result.error, { piece: this });
		}
	}

	private async _runOnce(...args: unknown[]) {
		await this._run(...args);
		await this.unload();
	}


}

export interface ListenerOptions {
    name: string;
    event: string;
    emitter?: keyof EventListeners | string;
    once?: boolean;
}