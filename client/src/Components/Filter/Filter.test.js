import { shallow } from 'enzyme';
import React from 'react';
import Filter from './Filter';
import Select from 'react-select';



describe('Filter loads properlya', () => {

  const wrapper = shallow(<Filter tester = {true} />);

  it('Filter passes props to Select component', () => {
    expect(wrapper.containsMatchingElement(<Select tester = {true} />)).toEqual(true);
  });
});



