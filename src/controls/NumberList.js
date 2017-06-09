import React, {Component} from 'react';
import './NumberList.css';
import {CSSTransitionGroup} from 'react-transition-group';


export class DataSource {
    _updateSequence = 0;
    _updateCallback = undefined;

    numbers;

    constructor(numbers) {
        this.numbers = (numbers ? numbers.slice(0) : []);
    }

    prepend(n) {
        this.numbers.splice(0, 0, n);
        this.numbers.splice(10);
        this._updateSequence += 1;
        this._callUpdateCallback();
    }

    setUpdateCallback(callback) {
        this._updateCallback = callback;
    }

    _callUpdateCallback() {
        if (this._updateCallback !== undefined) {
            this._updateCallback();
        }
    }
}


export class NumberList extends Component {
    state = {
    };

    constructor(props) {
        super(props);
        if (typeof(props.dataSource) === 'undefined') {
            throw 'Must provide dataSource prop in <NumberList />';
        }
        props.dataSource.setUpdateCallback(() => {
            this.forceUpdate();
        });
    }

    // This function ensures that enough <div> are filled in the .number-list.wrapper, so that the layout remains intact.
    _fillArrayIfLessItems(array, n, itemFunc) {
        const oldLength = array.length;
        const diff = n - oldLength;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                array.splice(array.length, 0, itemFunc(oldLength + i));
            }
        }
        return array;
    }

    _renderRows() {
        let dataSource = this.props.dataSource;
        const numbers = dataSource.numbers;

        if (numbers.length === 0) {
            return (
                <div key="naLabel" className='empty-div'>N/A</div>
            );

        } else {
            let items = numbers.map((number, i) => {
                let oddEvenClass = (number % 2 === 0 ? 'even-number' : 'odd-number');
                let className = ['row', oddEvenClass].join(' ');
                return (
                    <div key={number} className={className}>
                        <div className='number'>{number}</div>
                        <div className='border'/>
                    </div>
                );
            });

            return this._fillArrayIfLessItems(items, 10, (i) => <div key={"_" + i} className='row'>&nbsp;</div>)
        }
    }

    render() {
        return (
            <div className='number-list'>
                <div className='wrapper'>
                    <CSSTransitionGroup component="div" className="transition-group" transitionName='number-list' transitionEnterTimeout={400} transitionLeaveTimeout={1}>
                        {this._renderRows()}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

