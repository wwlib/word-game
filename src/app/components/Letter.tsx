import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

export interface LetterProps { clickHandler: any, letter: string, hilight: boolean  }
export interface LetterState { }

export default class Letter extends React.Component<LetterProps, LetterState> {

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
    }

    onButtonClicked(event: any) {
        this.props.clickHandler(event);
    }

    render() {
        let classname: string = 'letter';
        if (this.props.hilight) {
            classname = 'letter-hilighted';
        }
        return (
            <div className={classname} id="letter" onClick={this.onButtonClicked.bind(this)} >
                <div>
                    {this.props.letter}
                </div>
            </div>
        );
    }
}
