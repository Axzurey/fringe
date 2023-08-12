import { None, Option, Some } from "./option";

export type Iteratable<T> = Array<T>

export default class Iterator<T extends defined> {
    private internal_counter = 0;

    private constructor(private values: Iteratable<T>) {
        
    };

    static from<T extends defined>(into_iter: Iteratable<T>): Iterator<T> {
        return new Iterator(into_iter);
    }

    next(): Option<T> {
        if (this.internal_counter < this.values.size()) {
            let out = Some(this.values[this.internal_counter]);
            this.internal_counter ++;
            return out;
        }
        return None();
    }

    peek(): Option<T> {
        if (this.internal_counter < this.values.size()) {
            return Some(this.values[this.internal_counter]);
        }
        return None();
    }

    size_hint(): number {
        return this.values.size() - this.internal_counter;
    }

    length(): number {
       return this.values.size(); 
    }

    nth(n: number): Option<T> {
        let o: Option<T> = None();
        for (let i = 0; i <= n; i++) {
            o = this.next();
        }
        return o;
    }

    chain(iterator: Iterator<T>): Iterator<T> {
        return Iterator.from([...this.values, ...iterator.values]);
    }

    map<B extends defined>(f: (e: T) => B): Iterator<B> {
        let mapped: B[] = this.values.map((e) => f(e));
        return Iterator.from(mapped);
    }

    take(n: number): Iterator<T> {
        if (n >= this.values.size()) return Iterator.from(this.values)
        let c: T[] = [];

        for (let i = 0; i < n; i++) {
            let o = this.values[i];
            c.push(o);
        }
        return Iterator.from(c);
    }

    collect_array(): T[] {
        return this.values;
    }

    /**
     * 
     * @param condition 
     * @returns 2 arrays, left and right. Left is populated with those elements for which condition is true
     */

    partition(condition: (e: T, index: number) => boolean): [T[], T[]] {
        let left: T[] = [];
        let right: T[] = [];

        this.values.forEach((v, i) => {
            if (condition(v, i)) {
                left.push(v);
            }
            else {
                right.push(v);
            }
        });

        return [left, right];
    }
}