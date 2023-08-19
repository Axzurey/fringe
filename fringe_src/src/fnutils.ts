import { Err, Ok, Result } from "./result";

namespace fnutils {
    export function wrap_call<T>(fn: () => T): Result<T, string> {
        let out = pcall(fn);
        if (out[0] === true) {
            return Ok(out[1])
        }
        else {
            return Err(out[1] as string);
        }
    }

    export function slice_array<T extends defined>(array: T[], slice: number): Result<T[], string> {
        let x: T[] = [];

        if (slice >= array.size()) return Err(`Slice of ${slice} is greater index than the array with a length of ${array.size()}`);

        if (slice >= 0) {
            for (let i = slice; i < array.size(); i++) {
                x.push(array[i]);
            }
        }
        else {
            for (let i = array.size() + slice; i < array.size(); i++) {
                x.push(array[i]);
            }
        }

        return Ok(x);
    }
}

export default fnutils;