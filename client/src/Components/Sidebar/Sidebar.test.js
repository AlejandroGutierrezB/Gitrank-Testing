import React from 'react';
import { shallow } from 'enzyme';
import SidebarContent from '../SidebarContent/SidebarContent'
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('If icon <Sidebar/> renders a <SidebarContent />', () => {
    const wrapper = shallow(<Sidebar/>);
    expect(wrapper.containsMatchingElement(<SidebarContent />)).toEqual(true);
  });
});