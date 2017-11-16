var height = 4
	, width = 4
	, SIZE = 4;
var myArray = twoDimArray(height, width, 0);
addPiece();
addPiece();
Array.prototype.printArray(myArray);
//Array.prototype.printArray(myArray);
$(document).keydown(function (e) {
	switch (e.which) {
	case 37: // left
		//		console.log("Left");
		rotateBoard();
		rotateBoard();
		SlidePieces();
		rotateBoard();
		rotateBoard();
		addPiece();
		//		console.clear();
		Array.prototype.printArray(myArray);
		break;
	case 38: // up
		//		console.log("Up");
		rotateBoard();
		SlidePieces();
		rotateBoard();
		rotateBoard();
		rotateBoard();
		addPiece();
		//		console.clear();
		Array.prototype.printArray(myArray);
		break;
	case 39: // right
		//		console.log("Right");
		SlidePieces();
		addPiece();
		//		console.clear();
		Array.prototype.printArray(myArray);
		break;
	case 40: // down
		//		console.log("Down");
		rotateBoard();
		rotateBoard();
		rotateBoard();
		SlidePieces();
		rotateBoard();
		addPiece();
		//		console.clear();
		Array.prototype.printArray(myArray);
		break;
	default:
		return; // exit this handler for other keys
	}
	e.preventDefault(); // prevent the default action (scroll / move caret)
});

function dispatcher(direction) {
	//	var directionValues = {RIGHT:0,DOWN: }
}

function SlidePieces() {
	for (var i = 0; i < myArray.length; i++) {
		myArray[i] = myArray[i].filter(function (number) {
			return number > 0;
		});
		//		console.log(myArray[i]);
		var whereToSplice = [];
		for (var j = myArray[i].length - 1; j > 0; j--) {
			if (myArray[i][j] == myArray[i][j - 1]) {
				myArray[i][j] *= 2;
				whereToSplice.unshift(j - 1);
				j--;
			}
		}
		while (whereToSplice.length > 0) {
			myArray[i].splice(whereToSplice[0], 1);
			whereToSplice.shift();
		}
		var x = Array.apply(null, Array(SIZE - myArray[i].length)).map(function () {
			return 0;
		})
		Array.prototype.unshift.apply(myArray[i], x);
	}
}

function rotateBoard() { //***ROTATES CLOCKWISE***}
	for (var i = 0; i < SIZE / 2; i++) {
		for (var j = 0; j < Math.ceil(SIZE / 2); j++) {
			var temp = myArray[i][j];
			myArray[i][j] = myArray[SIZE - 1 - j][i];
			myArray[SIZE - 1 - j][i] = myArray[SIZE - 1 - i][SIZE - 1 - j];
			myArray[SIZE - 1 - i][SIZE - 1 - j] = myArray[j][SIZE - 1 - i];
			myArray[j][SIZE - 1 - i] = temp;
		}
	}
	return myArray;
}

function addPiece() {
	var string = myArray.map(e => e.join(',')).join(';')
		, x = -1
		, y = -1;
	if (string.indexOf("0") != -1) {
		do {
			x = Math.floor(Math.random() * 4);
			y = Math.floor(Math.random() * 4);
		}
		while ((myArray[x][y] != 0));
		myArray[x][y] = 2;
	}
}