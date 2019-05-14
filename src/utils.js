'use strict';

function swap(arr, i1, i2) {
	let tmp = arr[i1];
	arr[i1] = arr[i2];
	arr[i2] = tmp;
}

function part(arr, pivot, left, right) {
	var value = arr[pivot];
	var start = left;

	for (; left < right; left++) {
		if (arr[left] < value) {
			swap(arr, left, start);
			start++;
		}
	}
	swap(arr, right, start);
	return start;
}

function rpart(arr, pivot, left, right) {
	var value = arr[pivot];
	var start = left;

	for (; left < right; left++) {
		if (arr[left] > value) {
			swap(arr, left, start);
			start++;
		}
	}
	swap(arr, start, right);
	return start;
}


function qsort(arr, left, right) {
	var index;
	left = left === undefined ? 0 : left;
	right = right === undefined ? arr.length - 1 : right;

	if (left < right) {
		index = part(arr, right, left, right);

		qsort(arr, left, index - 1);
		qsort(arr, index + 1, right);
	}
}

function qrsort(arr, left, right) {
	var index;
	left = left === undefined ? 0 : left;
	right = right === undefined ? arr.length - 1 : right;

	if (left < right) {
		index = rpart(arr, right, left, right);

		qrsort(arr, left, index - 1);
		qrsort(arr, index + 1, right);
	}
}

function sum(values) {
	var s = 0;
	var i, n;

	for (i = 0, n = values.length; i < n; ++i) {
		s += values[i];
	}

	return s;
}

export default {
	qsort: qsort,
	qrsort: qrsort,
	sum: sum
};
