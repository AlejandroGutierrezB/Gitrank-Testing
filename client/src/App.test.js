import { shallow } from 'enzyme';
import React from 'react';
import App from './App';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginPage from './Components/LoginPage/LoginPage';


describe('App', () => {

  it('<App/> renders LoginPage if no token is provided', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<LoginPage />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<Dashboard />)).toEqual(false);
  });

  it('<App/> renders Dashboard if a token is provided', () => {
    const wrapper = shallow(<App />);
    wrapper.invoke('assignCredentials')('userName', 'token');
    expect(wrapper.containsMatchingElement(<LoginPage />)).toEqual(false);
    expect(wrapper.containsMatchingElement(<Dashboard />)).toEqual(true);
  });
});


  // let wrapper;
  // const fakeAssignCredentials = jest.fn();

  // beforeEach(() => {
  //   wrapper = shallow(<App assignCredentials={fakeAssignCredentials} />);
  // });

  // it('<App/> renders Dashboard if token is provided', () => {
  //   const wrapper = shallow(<LoginPage />);
  //   expect(wrapper.containsMatchingElement(<Login />)).toEqual(true);
  // });






