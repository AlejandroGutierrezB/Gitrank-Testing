import { shallow } from 'enzyme';
import React from 'react';
import Badge from '../Badge/Badge';
import Login from '../Login/Login';
import LoginPage from './LoginPage';


describe('LoginPage', () => {

  it('<Login/> always loads', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.containsMatchingElement(<Login />)).toEqual(true);
  });
  it('if the app is offline loads a <Badge/>', () => {
    const wrapper = shallow(<LoginPage offline={true} />);
    expect(wrapper.containsMatchingElement(<Badge />)).toEqual(true);
  });
  it('if the app is offline loads a <Badge/>', () => {
    const wrapper = shallow(<LoginPage offline={false} />);
    expect(wrapper.containsMatchingElement(<Badge />)).toEqual(false);
  });
});
