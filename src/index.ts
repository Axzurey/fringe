import Iterator from "./iterator";

let iter = Iterator.from([1, 2, 3, 4, 5]);

let _123 = iter.take(3).collect_array(); // will be [1, 2, 3]