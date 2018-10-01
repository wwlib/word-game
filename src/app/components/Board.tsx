import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Letter from './Letter';
import { GameBoard, GameWord, GameLetter } from '../model/WordGame';

export interface BoardProps { clickHandler: any, gameBoard: GameBoard, word: GameWord }
export interface BoardState { }

export default class Board extends React.Component<BoardProps, BoardState> {

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
    }

    onButtonClicked(event: any) {
        this.props.clickHandler(event);
    }

    renderGameBoard(): any {
        let gameBoard: GameBoard = this.props.gameBoard;
        let word: GameWord = this.props.word;
        let table = [];
        if (gameBoard && gameBoard.length) {
            let rows: number = gameBoard.length;
            let cols: number = gameBoard[0].length;
            for (let row: number = 0; row < rows; row++) {
                let children = [];
                for (let col: number = 0; col < cols; col++) {
                    let letter: string = gameBoard[row][col];
                    let hilight: boolean = false;
                    if (this.wordUsesBoardLetter(word, row, col)) {
                        hilight = true;
                    }
                    children.push(<td style={{borderTop: '0px'}} ><Letter clickHandler={this.onButtonClicked.bind(this)} letter={letter} hilight={hilight} /></td>);
                }
                table.push(<tr>{children}</tr>);
            }
        }
        return table;
    }

    wordUsesBoardLetter(word: GameWord, row: number, col: number): boolean {
        let result: boolean = false;
        if (word) {
            word.letters.forEach((letter: GameLetter) => {
                if (letter.row == row && letter.col == col) {
                    result = true;
                }
            })
        }
        return result;
    }

    render() {
        return (
            <div className="" id="board" onClick={this.onButtonClicked.bind(this)} >
                <ReactBootstrap.Table condensed hover style = {{width: 30}}>
                     <tbody>
                        {this.renderGameBoard()}
                     </tbody>
                </ReactBootstrap.Table>
            </div>
        );
    }
}
