import React, {Component} from 'react';
import './App.css';
import {NumberList} from "./NumberList";

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="number-list-wrapper">
                    <NumberList numbers={[19, 123, 12, 3123, 3123, 1231, 3312, 111, 1212, 123]} />
                    <NumberList numbers={[]} />
                </div>
            </div>
        );
    }
}

export default App;
