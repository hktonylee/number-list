import * as React from 'react';
import './NumberList.css';
import {CSSTransitionGroup} from 'react-transition-group';
import * as browser from 'detect-browser';


type DataSourceCallback = () => void;


export class DataSource {
    _updateSequence: number = 0;
    _updateCallback: null | DataSourceCallback = null;

    numbers: Array<number>;

    constructor(numbers?: Array<number>) {
        this.numbers = (numbers ? numbers.slice(0) : []);
    }

    prepend(n: number): void {
        this.numbers.splice(0, 0, n);
        this.numbers.splice(10);
        this._updateSequence += 1;
        this._callUpdateCallback();
    }

    setUpdateCallback(callback: DataSourceCallback): void {
        this._updateCallback = callback;
    }

    _callUpdateCallback() {
        if (this._updateCallback !== null) {
            this._updateCallback();
        }
        return 5;
    }
}


export class MissingDataSourceException {
    getMessage() {
        return 'Must provide dataSource prop in <NumberList />';
    }
}


interface NumberListProps {
    dataSource: DataSource;
}


export class NumberList extends React.Component<NumberListProps, null> {
    _transitionLeaveTimeout: number;

    constructor(props: NumberListProps) {
        super(props);
        if (typeof(props.dataSource) === 'undefined') {
            throw new MissingDataSourceException();
        }

        this._setTransitionLeaveTimeout();

        props.dataSource.setUpdateCallback(() => {
            this.forceUpdate();
        });
    }

    // This function ensures that enough <div> are filled in the .number-list.wrapper, so that the layout
    // remains intact.
    _fillArrayIfLessItems<T>(array: Array<T>, n: number, itemFunc: (index: number) => T) {
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
                <div key="naLabel" className="empty-div">N/A</div>
            );

        } else {
            let items = numbers.map((num, i) => {
                let key = dataSource._updateSequence - i;
                let oddEvenClass = (num % 2 === 0 ? 'even-number' : 'odd-number');
                let className = ['row', oddEvenClass].join(' ');
                return (
                    <div key={key} className={className}>
                        <div className="number">{num}</div>
                    </div>
                );
            });

            return this._fillArrayIfLessItems(items, 10, (i) => <div key={'_' + i} className="row">&nbsp;</div>);
        }
    }

    _setTransitionLeaveTimeout() {
        this._transitionLeaveTimeout = 1;
        if (browser.name === 'chrome' || browser.name === 'safari') {
            this._transitionLeaveTimeout = 300;
        } else {
            // disable on other browser => animation glitches
            this._transitionLeaveTimeout = 1;
        }
    }

    render() {
        return (
            <div className="number-list">
                <div className="wrapper">
                    <CSSTransitionGroup
                        component="div"
                        className="transition-group"
                        transitionName="number-list"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={this._transitionLeaveTimeout}
                    >
                        {this._renderRows()}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

