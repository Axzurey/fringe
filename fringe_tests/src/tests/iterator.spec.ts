/// <reference types="@rbxts/testez/globals" />
import RIterator from '../riterator';
import { Some } from '../option';

export = () => {

    describe("RIterator", () => {
        it("should have the nth, property working fine", () => {
            let x = RIterator.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

            expect(x.nth(0)).to.equal(Some(1));

            expect(x.nth(4)).to.equal(Some(5));

            expect(x.nth(9)).to.equal(Some(10));
        });

        it("should take slices", () => {
            let x = RIterator.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        
            let first5 = x.take(5).unwrap();

            expect(first5.nth(0)).to.equal(Some(1));

            expect(first5.nth(4)).to.equal(Some(5));
        });

        it("should peek... properly", () => {
            let x = RIterator.from(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

            let also_a = x.peek();
            let a = x.next();
            let also_b = x.peek();
            let b = x.next();

            expect(a).to.equal(Some("a"));
            expect(also_a).to.equal(Some("a"));
            expect(b).to.equal(Some("b"));
            expect(also_b).to.equal(Some("b"));
        })

        it("should allow for negative indices for nth", () => {
            let x = RIterator.from(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

            expect(x.nth(-1)).to.equal(Some('g'));

            expect(x.nth(-2)).to.equal(Some('f'));
        });

        it("should be able to partition", () => {
            let x = RIterator.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

            expect(x.partition(e => e % 2 === 0)[0]).to.equal([2, 4, 6, 8, 10]);
            expect(x.partition(e => e % 2 !== 0)[0]).to.equal([1, 3, 5, 7, 9]);
        })
    });
}