import React from 'react';
import { mount } from 'enzyme';
import Button from '../Button/Button'
import NavBar from './NavBar';
import { GET_USERINFO } from '../../ApiClient/Queries';
import { MockedProvider } from '@apollo/react-testing';
import TransitionPage from '../TransitionPage/TransitionPage';
import mockData from './MockData.json'
const wait = require ('waait')

describe('NavBar shows correct page based on Query Result', () => {

  const error_mocks = [
    {
      request: {
        query: GET_USERINFO,
        variables: {
          login: 'test',
        },
      },
      error: new Error ('Testing error page on NavBar')
    },
  ]


  const data_mocks = [
    {
      request: {
        query: GET_USERINFO,
        variables: {
          login: 'test',
        },
      },
      result: {
        data: mockData,
      },
    },
  ]


  it('loading page works', () => {
    const wrapper = mount(
      <MockedProvider mocks = {data_mocks} addTypename = {false}>
        <NavBar />
      </MockedProvider>
    );
    expect(wrapper.containsMatchingElement(<TransitionPage />)).toEqual(true);
  });


  it('error page works', async () => {
    const wrapper = mount(
      <MockedProvider mocks = {error_mocks} addTypename = {false}>
        <NavBar />
      </MockedProvider>
    );
    await wait(0);
    wrapper.update()
    expect(wrapper.find('TransitionPage').prop('children')).toEqual('Something went wrong... Please, refresh the page')
  });

  it('data page works', async () => {
    const wrapper = mount(
      <MockedProvider mocks = {data_mocks} addTypename = {false}>
        <NavBar />
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    expect(wrapper.containsMatchingElement(<Button />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<TransitionPage />)).toEqual(false);
  });
});
