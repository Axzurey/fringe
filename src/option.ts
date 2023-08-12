/**
 * cmon, this seemed like it would be fun c:
 * Though we don't have the "?" syntax or the same pattern matching we can still have fun with unwrapping
*/
export class Option<T> {

    constructor(private value?: T) {

        return setmetatable(this, {
            __eq: function(a: Option<T>, b: Option<T>) {
                if (a.value !== undefined && b.value !== undefined) {
                    if (a.value === b.value) return true;
                }
                else if (a.value === undefined && b.value === undefined) {
                    return true;
                }
                return false;
            }
        });
    }

    is_some(): boolean {
        return this.value !== undefined;
    }

    is_none(): boolean {
        return this.value === undefined;
    }

    unwrap(): T {
        assert(this.value !== undefined, "Attempt to unwrap an Option with a null value.");
        return this.value;
    }

    expect(message: string): T {
        assert(this.value !== undefined, message);
        return this.value;
    }

    unwrap_or(default_value: T): T {
        if (this.value === undefined) {
            return default_value;
        }
        return this.value;
    }

    unwrap_or_else(default_function: () => T): T {
        if (this.value === undefined) {
            return default_function();
        }
        return this.value;
    }
}

export function Some<T>(value: T): Option<T> {
    return new Option(value);
}

export function None(): Option<any> {
    return new Option();
}