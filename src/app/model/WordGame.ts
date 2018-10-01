// const wordlist = require('wordlist-english');
// const englishWords = wordlist['english'];
const dictionary = require('../../../data/wordlist.json');

export type GameLetter = {
    letter: string;
    row: number;
    col: number;
}

export type GameWord = {
    text: string
    letters: GameLetter[];
}

export type GameBoard = string[][];

export type WordGameOptions = {
    boardSize?: number;
}

export default class WordGame {

    public gameBoard: GameBoard;
    public maxSearchDepth: number = 6;
    // public dictionary: any;
    public wordsFound: GameWord[];

    constructor(options?: WordGameOptions) {
        options = options || {};
        let defaultOptions = {
            boardSize: 4
        };
        options = Object.assign(defaultOptions, options);

        // this.populateDictionary();
        this.generateBoard(options.boardSize);
        this.searchForWords();
        console.log(`wordsFound: `, this.wordsFound);
        console.log(`found ${this.wordsFound.length} words.`);
    }

    // populateDictionary(): void {
    //     englishWords.forEach(word => {
    //         this.dictionary[word.toUpperCase()] = true;
    //     });
    // }

    generateBoard(size: number): void {
        this.gameBoard = [
            ['E', 'R', 'C', 'W'],
            ['T', 'A', 'P', 'O'],
            ['B', 'Z', 'Q', 'P'],
            ['I', 'C', 'E', 'I'],
        ];
    }

    searchForWords(): void {
        this.wordsFound = [];
        let rows = this.gameBoard.length;
        let cols = this.gameBoard[0].length;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // console.log(`searchForWords: checking (${row}, ${col}): ${this.gameBoard[row][col]}`);
                this.recursiveSearch(this.gameBoard , row, col, {text: "", letters: []}, this.wordsFound, 0);
            }
        }
    }

    recursiveSearch(board: GameBoard, row: number, col: number, thisWord, wordsFound, depth) {
        // check wordSoFar against valid words
        //  if valid, add it to foundWords
        // mark the current row, col as checked
        // for each un-visited row, col: call recursiveSearch
        var thisLetter = board[row][col];
        var newWord = { text: thisWord.text + thisLetter, letters: [] };
        thisWord.letters.forEach(letter => {
            newWord.letters.push(letter);
          });
        newWord.letters.push({ letter: thisLetter, row: row, col: col });
        // if (checkAgainsWordList(newWord)) {
        if (this.checkAgainstDictionary(newWord.text)) {
          wordsFound.push(newWord);
        }

        var boardCopy = this.copyBoard(board);
        boardCopy[row][col] = "."; // mark the current letter visited
        if (depth <= this.maxSearchDepth) {
          var lettersToCheck = this.getLetters(boardCopy, row, col);
          lettersToCheck.forEach(letter => {
            this.recursiveSearch(boardCopy, letter.row, letter.col, newWord, wordsFound, depth + 1);
          });
        }
    }

    copyBoard(gameBoard: GameBoard): GameBoard {
        var newBoard: GameBoard = [];
        var row: string[];
        gameBoard.forEach((rowToCopy: string[]) => {
            row = [];
            rowToCopy.forEach((letter: string) => {
                row.push(letter);
            });
            newBoard.push(row);
        });
        return newBoard;
    }

    getLetters(board: GameBoard, row: number, col: number): GameLetter[] {
        let letters: GameLetter[] = [];
        let rows: number = board.length;
        let cols: number = board[0].length;
        let rowsToCheck: number[] = [];
        let colsToCheck: number[] = [];
        if (row == 0) { //first row
            rowsToCheck = [row, row + 1];
        } else if (row == rows -1) { //last row
            rowsToCheck = [row, row - 1];
        } else {
            rowsToCheck = [row - 1, row, row + 1];
        }
        if (col == 0) { //first col
            colsToCheck = [col, col + 1];
        } else if (col == cols -1) { //last col
            colsToCheck = [col, col - 1];
        } else {
            colsToCheck = [col - 1, col, col + 1];
        }
        rowsToCheck.forEach(rowToCheck => {
          colsToCheck.forEach(colToCheck => {
            let letterToCheck: GameLetter = { row: rowToCheck, col: colToCheck, letter: board[rowToCheck][colToCheck] };
            if ( (letterToCheck.letter != ".") && !(rowToCheck == row && colToCheck == col) ) {
              letters.push(letterToCheck);
            }
          });
        });
        return letters;
    }

    checkAgainstDictionary(word) {
      return dictionary[word];
    }
}
