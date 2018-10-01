import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import * as ReactList from 'react-list';
import { GameWord } from '../model/WordGame';

export interface WordListProps { clickHandler: any, wordList: GameWord[]  }
export interface WordListState { selectedWord: GameWord }

export default class WordList extends React.Component<WordListProps, WordListState> {

    private _itemClickedPrevTime: number = 0;

    componentWillMount() {
        this.setState({selectedWord: null});
    }

    componentDidMount() {
    }

    onButtonClicked(event: any) {
        this.props.clickHandler(event);
    }

    onItemClicked(index: number, event: any): void {
        this.props.clickHandler(index);
        this.setState({ selectedWord: this.props.wordList[index] });

        let currentTime: number = new Date().getTime();
        let elapsedTime: number = currentTime - this._itemClickedPrevTime
        this._itemClickedPrevTime = currentTime;
        if (elapsedTime < 200) { // double-click
            //
        }
        event.preventDefault();
    }

    renderItem(index: number, key: string) {
        let classname: string = 'word';
        if (this.state.selectedWord == this.props.wordList[index]) {
            classname  = 'word-selected';
        }
        return  <div key={key} className={classname} onClick={this.onItemClicked.bind(this, index)}>
                    {this.props.wordList[index].text}
                </div>;
    }

    render() {
        return (
            <div className="" id="wordList" >
                <div style={{color: '#04478d', fontWeight: 'bold'}}>
                    Word List
                </div>
                <div style={{overflow: 'auto', height: 200, maxHeight: 200}}>
                    <ReactList
                      itemRenderer={this.renderItem.bind(this)}
                      length={this.props.wordList.length}
                      type='uniform'
                    />
                </div>
            </div>
        );
    }
}
