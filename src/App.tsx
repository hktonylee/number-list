import * as React from 'react';
import './App.css';
import {DataSource, NumberList} from './controls/NumberList';

class App extends React.Component<{}, null> {

    _dataSources = [
        new DataSource(),
        new DataSource(),
        new DataSource(),
        new DataSource(),
        new DataSource(),
        new DataSource(),
        new DataSource(),
    ];

    componentDidMount() {
        setInterval(
            () => {
                this._dataSources.forEach(dataSource => {
                    const newNumber = Math.ceil(Math.random() * Math.pow(10, (Math.random() * 3 + 2)));
                    dataSource.prepend(newNumber);
                });
            },
            1000);
    }

    render() {
        const numberLists = this._dataSources.map((dataSource, i) => (
            <NumberList key={i} dataSource={dataSource}/>
        ));

        return (
            <div className="app">
                <div className="number-list-wrapper">
                    {numberLists}
                    <NumberList dataSource={new DataSource([123, 446])}/>
                    <NumberList dataSource={new DataSource()}/>
                </div>
            </div>
        );
    }

}

export default App;
