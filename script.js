var height = 4
	, width = 4
	, SIZE = 4;
var wasCombined = false; //Were atleast 2 pieces combiend in the last move?
var myArray = twoDimArray(height, width, 0);
/*
START
*/
$(document).ready(function () {
	addPiece();
	addPiece();
	updateFrontEnd();
});
//updateFrontEnd();
Array.prototype.printArray(myArray);
//Array.prototype.printArray(myArray);
$(document).keydown(function (e) {
	switch (e.which) {
		/*
		Rotate board until the designated motion would be oriented right, 
		then undo it with more rotations after the pices have been moved.
		*/
	case 37: // left
		rotateBoard();
		rotateBoard();
		SlidePieces();
		rotateBoard();
		rotateBoard();
		if (wasCombined) addPiece();
		Array.prototype.printArray(myArray);
		break;
	case 38: // up
		rotateBoard();
		SlidePieces();
		rotateBoard();
		rotateBoard();
		rotateBoard();
		if (wasCombined) addPiece();
		Array.prototype.printArray(myArray);
		break;
	case 39: // right
		SlidePieces();
		if (wasCombined) addPiece();
		Array.prototype.printArray(myArray);
		break;
	case 40: // down
		rotateBoard();
		rotateBoard();
		rotateBoard();
		SlidePieces();
		rotateBoard();
		if (wasCombined) addPiece();
		Array.prototype.printArray(myArray);
		break;
	default:
		return; // exit this handler for other keys
	}
	updateFrontEnd();
	e.preventDefault(); // prevent the default action (scroll / move caret)
});

function updateFrontEnd() {
	for (var i = 0; i < SIZE; i++) {
		for (var j = 0; j < SIZE; j++) {
			console.log("Num: " + ((i * 4) + (j)));
			var index = (i * 4) + (j + 1);
			$("section div:nth-child(" + index + ")").text(myArray[i][j]);
			var color = "";
			switch (myArray[i][j]) {
			case 2:
				color = "red";
				break;
			case 4:
				color = "blue";
				break;
			default:
				color = "grey";
				break;
			}
			$("section div:nth-child(" + index + ")").css("background-color", color)
		}
	}
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
			wasCombined = true;
			myArray[i].splice(whereToSplice[0], 1);
			whereToSplice.shift();
		}
		var x = Array.apply(null, Array(SIZE - myArray[i].length)).map(function () {
			return 0;
		})
		Array.prototype.unshift.apply(myArray[i], x);
	}
}
/*
Rotate the board Clockwise
*/
function rotateBoard() {
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
/*
If there is the need, add a piece.
The piece will be added randomly to a spot which has a 0. 
Choose a spot on the board which has a zero, loop until that spot is found. 
*/
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