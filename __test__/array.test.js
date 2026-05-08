require("../js/object/array.js");

describe("Array.prototype.myFlatMap", () => {
	test("maps and flattens one level", () => {
		const input = [1, 2, 3];
		const result = input.myFlatMap((x) => [x, x * 2]);

		expect(result).toEqual([1, 2, 2, 4, 3, 6]);
	});

	test("does not flatten nested arrays deeper than one level", () => {
		const input = [1, 2];
		const result = input.myFlatMap((x) => [[x]]);

		expect(result).toEqual([[1], [2]]);
	});

	test("respects callback context", () => {
		const ctx = { factor: 10 };
		const input = [1, 2, 3];
		const result = input.myFlatMap(function (x) {
			return [x * this.factor];
		}, ctx);

		expect(result).toEqual([10, 20, 30]);
	});

	test("skips sparse indexes in source and mapped arrays", () => {
		const input = [1, , 3];
		const result = input.myFlatMap((x) => {
			const arr = [];
			arr[0] = x;
			arr[2] = x + 1;
			return arr;
		});

		expect(result).toEqual([1, 2, 3, 4]);
	});

	test("throws when callback is not a function", () => {
		expect(() => [1, 2].myFlatMap()).toThrow(TypeError);
		expect(() => [1, 2].myFlatMap(null)).toThrow(TypeError);
	});
});
