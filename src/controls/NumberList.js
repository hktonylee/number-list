import React, {Component} from 'react';
import './NumberList.css';


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
        animated: false,
        lastUpdateSequence: 0,
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
        const animated = this.state.animated;
        const sameSequence = this.state.lastUpdateSequence === dataSource._updateSequence;
        this.state.animated = false;        // don't use setState here
        this.state.lastUpdateSequence = dataSource._updateSequence;

        if (!animated && !sameSequence) {
            setTimeout(() => {
                this.setState({animated: true});
            }, 1);
        }

        if (numbers.length === 0) {
            return (
                <div className='empty-div'>N/A</div>
            );

        } else {
            let items = numbers.map((number, i) => {
                let oddEvenClass = (number % 2 === 0 ? 'even-number' : 'odd-number');
                let className = ['row', oddEvenClass].join(' ');
                let animatedClass = (animated ? 'animated' :'');
                return (
                    <div key={i} className={className}>
                        <div className={'number ' + animatedClass}>{number}</div>
                        <div className='border'/>
                    </div>
                );
            });

            return this._fillArrayIfLessItems(items, 10, (i) => <div key={i} className='row'>&nbsp;</div>)
        }
    }

    render() {
        return (
            <div className='number-list'>
                <div className='wrapper'>
                    {this._renderRows()}
                </div>
            </div>
        );
    }
}

