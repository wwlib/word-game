import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Board from './Board';
import WordList from './WordList';
import WordGame, { GameWord } from '../model/WordGame';

export interface GamePanelProps { clickHandler: any, gameData: WordGame  }
export interface GamePanelState { word: GameWord };

export default class GamePanel extends React.Component<GamePanelProps, GamePanelState> {

    componentWillMount() {
        this.setState({ word: null});
    }

    componentDidMount() {
    }

    onButtonClicked(event: any) {
        this.props.clickHandler(event);
    }

    onWordListClicked(wordIndex: number) {
        let word: GameWord = this.props.gameData.wordsFound[wordIndex];
        this.setState({ word: word });
    }

    render() {
        return (
            <div className="" id="gamePanel" onClick={this.onButtonClicked.bind(this)} >
                <div>
                    Game
                </div>
                <Board clickHandler={this.onButtonClicked.bind(this)} gameBoard={this.props.gameData.gameBoard} word={this.state.word} />
                <WordList clickHandler={this.onWordListClicked.bind(this)} wordList={this.props.gameData.wordsFound} />
            </div>
        );
    }
}
