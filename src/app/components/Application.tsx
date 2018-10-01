import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Model from '../model/Model';
import TopNav from './TopNav';
import GamePanel from './GamePanel';
import WordGame from '../model/WordGame';

const prettyjson = require('prettyjson');

export interface ApplicationProps { model: Model }
export interface ApplicationState {
    gameData: WordGame,
    log: string
}

export default class Application extends React.Component < ApplicationProps, ApplicationState > {

    componentWillMount() {
        console.log(`Application: componentWillMount: `, this.props.model.wordGame);
        this.setState({
            gameData: this.props.model.wordGame,
            log: ''
         });
    }

    componentDidMount() {
    }

    onTopNavClick(event: any): void {
        let nativeEvent: any = event.nativeEvent;
        switch ( nativeEvent.target.id) {
            case 'tbd':
                break;
        }
    }

    onDropdownChange(selectedOption: any): void {
        // this.props.model.appSettings.tbd = selectedOption;
    }

    onPanelClick(event: any, data: any): void {
        let nativeEvent: any = event.nativeEvent;
        console.log(`onPanelClick: `, nativeEvent.target.id);
        switch ( nativeEvent.target.id) {
            case 'tbd':
                break;
            case 'clearLog':
                this.setState({ log: '' })
        }
    }

    layout(): any {
        let layout;
        layout = <div>
            <TopNav  clickHandler={this.onTopNavClick.bind(this)} />
            <div className="">
                <GamePanel clickHandler={this.onPanelClick.bind(this)} gameData={this.state.gameData} />
            </div>
        </div>
        return layout;
    }

    render() {
        return(
            this.layout()
        );
    }
}
