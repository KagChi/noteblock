import { Awaitable, isFunction } from '@sapphire/utilities';
import type * as Lexure from 'lexure';

export type Result<T, E> = Ok<T> | Err<E>;
export type Ok<T> = Lexure.Ok<T>;
export type Err<E> = Lexure.Err<E>;

export class Util {

    public static err<E>(x: E): Err<E>;
    public static err<E>(x?: E): Err<unknown> {
        return { success: false, error: x };
    }

    public isOk<T, E>(x: Result<T, E>): x is Ok<T> {
        return x.success;
    }
    
    public static ok<T>(x: T): Ok<T>;
    public static ok<T>(x?: T): Ok<unknown> {
        return { success: true, value: x };
    }

    public static isErr<T, E>(x: Result<T, E>): x is Err<E> {
        return !x.success;
    }

    public static async fromAsync<T, E = unknown>(promiseOrCb: Awaitable<T> | ((...args: unknown[]) => Awaitable<T>)): Promise<Result<T, E>> {
        try {
            return Util.ok(await (isFunction(promiseOrCb) ? promiseOrCb() : promiseOrCb));
        } catch (error) {
            return Util.err(error as E);
        }
    }
}