/* Thanks to awesome "PapiOphidian" Log4J (That lavalink used for logging) styles logger in nodejs, please publish it as package 😬 */

import { BackTracker } from "backtracker";

/* @ts-ignore */
function stringify(data: any) {
	if (typeof data === "object" && data !== null && !Array.isArray(data)) {
		const references = new Set<any>();
		return JSON.stringify(step(data, references));
	} else if (Array.isArray(data)) return `[${data.map(i => stringify(i)).join(",")}]`;
	else return String(data);
}

function step(object: any, references: Set<any>): any {
	const rebuilt = {};
	for (const key of Object.keys(object)) {
		if (typeof object[key] === "object" && object[key] !== null && !Array.isArray(object[key])) {
            /* @ts-ignore */
			if (references.has(object[key])) rebuilt[key] = "[Circular]";
			else {
				references.add(object[key]);
                /* @ts-ignore */
				rebuilt[key] = step(object[key], references);
			}
            /* @ts-ignore */
		} else if (Array.isArray(object[key])) return `[${object[key].map(i => stringify(i)).join(",")}]`;
        /* @ts-ignore */
		else rebuilt[key] = object[key];
	}

	return rebuilt;
}

export const NoteLogger = {
	post: (error: boolean, value: string) => {
		error ? console.error(value) : console.log(value);
	},
	getPrefix: (type: "warn" | "info" | "error", worker: string) => {
		const first = BackTracker.stack[1];
		const scope = `${first.filename.replace(/\.js$/, "")}:${first.line}:${first.column}`;
		const color = type === "warn" ? "\x1b[93m" : type === "error" ? "\x1b[91m" : "\x1b[92m";
		return `\x1b[90m${new Date().toISOString().replace("T", " ").replace("Z", "")} ${color}${type.toUpperCase()} \x1b[35m${process.pid} \x1b[0m--- [${worker}] \x1b[36m${scope}${" ".repeat((15 - scope.length) < 1 ? 1 : 15 - scope.length)}\x1b[0m :`;
	},
	warn: (message: any, worker = "main") => {
		NoteLogger.post(false, `${NoteLogger.getPrefix("warn", worker)} ${stringify(message)}`);
	},
	info: (message: any, worker = "main") => {
		NoteLogger.post(false, `${NoteLogger.getPrefix("info", worker)} ${stringify(message)}`);
	},
	error: (message: any, worker = "main") => {
		NoteLogger.post(true, `${NoteLogger.getPrefix("error", worker)} ${stringify(message)}`);
	}
};
