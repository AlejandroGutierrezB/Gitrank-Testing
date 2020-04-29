import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import SidebarContent from './SidebarContent'

describe('Sidebar content renders properly', () => {

  test('Content passed to sidebarContent is rendered', () => {
    let toRender = <div>Test123</div>
    const { getByText } = render(<SidebarContent content = {toRender} />);
    const linkElement = getByText(/Test123/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Two transitions components are rendered', () => {
    const wrapper = mount(<SidebarContent />);
    expect(wrapper.find('.sidebar-transition').length).toBe(2);
  });

});
