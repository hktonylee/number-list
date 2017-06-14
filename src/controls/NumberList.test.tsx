import * as React from 'react';
import {shallow} from 'enzyme';
import {NumberList, DataSource, MissingDataSourceException} from './NumberList';


describe('DataSource', () => {

    it('should set up numbers in constructor', () => {
        expect(new DataSource().numbers).toEqual([]);
        expect(new DataSource([]).numbers).toEqual([]);
        expect(new DataSource([12, 34]).numbers).toEqual([12, 34]);
    });

    it('should call updateCallback when there is update', () => {
        let dataSource = new DataSource([199]);
        let callback = jest.fn();
        dataSource.setUpdateCallback(callback);
        expect(callback.mock.calls.length).toBe(0);
        dataSource.prepend(221);
        expect(callback.mock.calls.length).toBe(1);
        dataSource.prepend(233);
        expect(callback.mock.calls.length).toBe(2);
        expect(dataSource.numbers).toEqual([233, 221, 199]);
    });

    it('should limit the maximum count of numbers to be 10', () => {
        let dataSource = new DataSource();
        expect(dataSource.numbers).toEqual([]);
        dataSource.prepend(555);
        expect(dataSource.numbers).toEqual([555]);
        dataSource.prepend(666);
        expect(dataSource.numbers).toEqual([666, 555]);
        dataSource.prepend(777);
        expect(dataSource.numbers).toEqual([777, 666, 555]);
        dataSource.prepend(888);
        expect(dataSource.numbers).toEqual([888, 777, 666, 555]);
        dataSource.prepend(999);
        expect(dataSource.numbers).toEqual([999, 888, 777, 666, 555]);
        dataSource.prepend(12);
        expect(dataSource.numbers).toEqual([12, 999, 888, 777, 666, 555]);
        dataSource.prepend(371);
        expect(dataSource.numbers).toEqual([371, 12, 999, 888, 777, 666, 555]);
        dataSource.prepend(81);
        expect(dataSource.numbers).toEqual([81, 371, 12, 999, 888, 777, 666, 555]);
        dataSource.prepend(5);
        expect(dataSource.numbers).toEqual([5, 81, 371, 12, 999, 888, 777, 666, 555]);
        dataSource.prepend(15);
        expect(dataSource.numbers).toEqual([15, 5, 81, 371, 12, 999, 888, 777, 666, 555]);
        dataSource.prepend(93);
        expect(dataSource.numbers).toEqual([93, 15, 5, 81, 371, 12, 999, 888, 777, 666]);
        dataSource.prepend(15);
        expect(dataSource.numbers).toEqual([15, 93, 15, 5, 81, 371, 12, 999, 888, 777]);
    });

});


describe('<NumberList />', () => {

    it('should throw error when there is no dataSource prop', () => {
        expect(() => shallow(<NumberList />))
            .toThrow(MissingDataSourceException);
    });

    it('should show N/A when there is no data', () => {
        let wrapper = shallow(<NumberList dataSource={new DataSource()}/>);
        expect(wrapper.contains('N/A')).toBeTruthy();
    });

    it('should render the numbers in reversed chronological order', () => {
        let wrapper = shallow(<NumberList dataSource={new DataSource([112, 113, 114, 115, 116])}/>);
        expect(wrapper.text()).not.toContain('N/A');
        expect(wrapper.find('.number').at(0).text()).toBe('112');
        expect(wrapper.find('.number').at(1).text()).toBe('113');
        expect(wrapper.find('.number').at(2).text()).toBe('114');
        expect(wrapper.find('.number').at(3).text()).toBe('115');
        expect(wrapper.find('.number').at(4).text()).toBe('116');
    });

    it('should render the numbers when there is update', () => {
        let dataSource = new DataSource([112, 113, 114, 115, 116]);
        let wrapper = shallow(<NumberList dataSource={dataSource}/>);
        expect(wrapper.find('.number').at(0).text()).toBe('112');
        expect(wrapper.find('.number').at(1).text()).toBe('113');
        expect(wrapper.find('.number').at(2).text()).toBe('114');
        expect(wrapper.find('.number').at(3).text()).toBe('115');
        expect(wrapper.find('.number').at(4).text()).toBe('116');
        dataSource.prepend(99);
        expect(wrapper.find('.number').at(0).text()).toBe('99');
        expect(wrapper.find('.number').at(1).text()).toBe('112');
        expect(wrapper.find('.number').at(2).text()).toBe('113');
        expect(wrapper.find('.number').at(3).text()).toBe('114');
        expect(wrapper.find('.number').at(4).text()).toBe('115');
        expect(wrapper.find('.number').at(5).text()).toBe('116');
        expect(wrapper.text()).not.toContain('N/A');
    });

    it('should test the numbers are correctly colored', () => {
        let dataSource = new DataSource([112, 113, 114, 115, 116]);
        let wrapper = shallow(<NumberList dataSource={dataSource}/>);
        expect(wrapper.find('.number').at(0).text()).toBe('112');
        expect(wrapper.find('.number').at(1).text()).toBe('113');
        expect(wrapper.find('.number').at(2).text()).toBe('114');
        expect(wrapper.find('.number').at(3).text()).toBe('115');
        expect(wrapper.find('.number').at(4).text()).toBe('116');

        expect(wrapper.find('.row').at(0).hasClass('even-number')).toBeTruthy();
        expect(wrapper.find('.row').at(1).hasClass('even-number')).toBeFalsy();
        expect(wrapper.find('.row').at(2).hasClass('even-number')).toBeTruthy();
        expect(wrapper.find('.row').at(3).hasClass('even-number')).toBeFalsy();
        expect(wrapper.find('.row').at(4).hasClass('even-number')).toBeTruthy();

        expect(wrapper.find('.row').at(0).hasClass('odd-number')).toBeFalsy();
        expect(wrapper.find('.row').at(1).hasClass('odd-number')).toBeTruthy();
        expect(wrapper.find('.row').at(2).hasClass('odd-number')).toBeFalsy();
        expect(wrapper.find('.row').at(3).hasClass('odd-number')).toBeTruthy();
        expect(wrapper.find('.row').at(4).hasClass('odd-number')).toBeFalsy();
    });

});

