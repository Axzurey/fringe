import Iterator from 'iterator';
import { Some } from 'option';

const nums = Iterator.from([1, 2, 3, 4, 5, 6]);

const nums2 = Iterator.from([7, 8, 9]);

const letters = Iterator.from(['a', 'b', 'c']);

assert(nums.size_hint() === 6, "Not 6");

const iterator2 = nums.chain(nums);

assert(iterator2.nth(9) === Some(9), "Not nine");