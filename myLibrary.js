function twoDimArray(height, width, elem) {
	var retArray = [];
	for (var i = 0; i < height; i++) {
		var inner = [];
		for (var j = 0; j < width; j++) {
			//			inner.push(JSON.parse(JSON.stringify(elem))); (HOW TO DEEP COPY)
			inner.push(elem);
		}
		retArray.push(inner);
	}
	return retArray;
}
Array.prototype.printArray = function (array) {
	for (var i = 0; i < array.length; i++) {
		if (i == 0) {
			console.log("[", array[i].toString());
		}
		else if (i != array.length - 1) {
			console.log(array[i].toString());
		}
		else {
			console.log(array[i].toString(), "]");
		}
	}
}
Array.prototype.printArrayObj = function (array) {
	var nums = " " + array.map(function (row) {
		return row.map(function (element) {
			return element.num;
		}).toString() + '\n';
	});
	console.log(nums);
}