class TicTacToe {
    constructor() {
		this.currentPlayer = 'x';
		this.winner = null;
		this.matrix = [[null, null, null], [null, null, null], [null, null, null]];
    }

    getCurrentPlayerSymbol() {
		return this.currentPlayer;
    }

    nextTurn(rowIndex, columnIndex) {
		if(this.matrix[rowIndex][columnIndex] === null){
			if(this.currentPlayer == 'x') {
				this.matrix[rowIndex][columnIndex] = 'x';
				this.currentPlayer = 'o';
			} else {
				this.matrix[rowIndex][columnIndex] = 'o';
				this.currentPlayer = 'x';
			}
		}
    }

    isFinished() {
		return this.isDraw() || (this.getWinner() != null);
    }

    getWinner() {
		var diag1 = [], diag2 = [];
		for(var i = 0; i < this.matrix.length; i++){
			var rowWinner = this.uniq(this.matrix[i]);
			if(this.isWinner(rowWinner)) return rowWinner[0];
			for(var j = 0; j < this.matrix[i].length; j++) {
				var columnWinner = this.uniq(this.matrix.map(x => x[j]));
				if(this.isWinner(columnWinner)) return columnWinner[0];
				if(i == j) diag1.push(this.matrix[i][j]);
				if(i + j == 2 ) diag2.push(this.matrix[i][j]);
			}
		}
		var diag1Winner = this.uniq(diag1), diag2Winner = this.uniq(diag2);
		if(this.isWinner(diag1Winner)) return diag1Winner[0];
		if(this.isWinner(diag2Winner)) return diag2Winner[0];
		
		return null;
    }

    noMoreTurns() {
		return this.matrix.join('').replace(/,/g, '').length == 9;
    }

    isDraw() {
		return this.noMoreTurns() && (this.getWinner() == null);
    }

    getFieldValue(rowIndex, colIndex) {
		return this.matrix[rowIndex][colIndex];
    }
	
	uniq(a) {
		return Array.from(new Set(a));
	}
	
	isWinner(array) {
		return array.length == 1 && array[0] != null;
	}

}

module.exports = TicTacToe;
