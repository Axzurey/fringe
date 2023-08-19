/// <reference types="@rbxts/testez/globals" />

import fnutils from "../fnutils";

export = () => {
    describe("fnutils", () => {
        it("should have positive slices working C:", () => {
            let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            expect(fnutils.slice_array(array, 5).is_ok()).to.equal(true);

            expect(fnutils.slice_array(array, 0).unwrap().size()).to.equal(10);

            expect(fnutils.slice_array(array, 9).unwrap().size()).to.equal(1);
        });

        it("should have negative slices working C:", () => {
            let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            expect(fnutils.slice_array(array, -5).is_ok()).to.equal(true);

            expect(fnutils.slice_array(array, -1).unwrap().size()).to.equal(1); //last element

            expect(fnutils.slice_array(array, -2).unwrap().size()).to.equal(2); //last 2 elements
        });
    });
}