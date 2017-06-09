import React from 'react';
import {shallow} from 'enzyme';
import {NumberList, DataSource} from './NumberList';


describe('<NumberList />', () => {

    it('should throw error when there is no dataSource prop', () => {
        expect(() => shallow(<NumberList />))
            .toThrow('Must provide dataSource prop in <NumberList />');
    });

    it('should show N/A when there is no data', () => {
        let wrapper = shallow(<NumberList dataSource={new DataSource()}/>);
        expect(wrapper.text()).toContain('N/A');
    });

    it('should render the numbers in reversed chronological order', () => {
        let wrapper = shallow(<NumberList dataSource={new DataSource([112, 113, 114, 115, 116])}/>);
        expect(wrapper.find('.number').at(0).text()).toBe('112');
        expect(wrapper.find('.number').at(1).text()).toBe('113');
        expect(wrapper.find('.number').at(2).text()).toBe('114');
        expect(wrapper.find('.number').at(3).text()).toBe('115');
        expect(wrapper.find('.number').at(4).text()).toBe('116');
    });

});

