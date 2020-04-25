import { shallow } from 'enzyme';
import React from 'react';
import App from './App';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginPage from './Components/LoginPage/LoginPage';


describe('App', () => {

  it('<App/> renders LoginPage if no token is provided', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<LoginPage />)).toEqual(true);
  });

  it('<App/> renders Dashboard if a token is provided', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Dashboard />)).toEqual(false);
  });


  // let wrapper;
  // const fakeAssignCredentials = jest.fn();

  // beforeEach(() => {
  //   wrapper = shallow(<App assignCredentials={fakeAssignCredentials} />);
  //   console.log('wrapper.debug(): ', wrapper.debug());
  // });

  // it('<App/> renders Dashboard if token is provided', () => {
  //   const wrapper = shallow(<LoginPage />);
  //   expect(wrapper.containsMatchingElement(<Login />)).toEqual(true);
  // });




});

