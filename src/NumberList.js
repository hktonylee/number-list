import React, {Component} from 'react';
import './NumberList.css';

export class NumberList extends Component {
    state = {};

    _renderRows() {
        const numbers = this.props['numbers'] || [];

        if (numbers.length === 0) {
            return (
                <div>N/A</div>
            );

        } else {
            return numbers.map((number, i) => {
                let oddEvenClass = (number % 2 === 0 ? 'even-number' : 'odd-number');
                let className = ["row", oddEvenClass].join(" ");
                return (
                    <div key={i} className={className}>
                        {number}
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div className="number-list">
                <div className="wrapper">
                    {this._renderRows()}
                </div>
            </div>
        );
    }
}

