import React from 'react';
import { mount } from 'enzyme';
import NavBar from '../NavBar/NavBar';
import Dashboard from './Dashboard';
import { GET_PRS, GET_REPOS, GET_AUTHORS } from '../../ApiClient/Queries';
import { MockedProvider } from '@apollo/react-testing';
import TransitionPage from '../TransitionPage/TransitionPage';
import PR_MOCK from './Pr_mock.json';
import REPO_MOCK from './Repo_mock.json';
import AUTH_MOCK from './Auth_mock.json';
const wait = require('waait');

const data_mocks = [
  {
    request: {
      query: GET_PRS,
      variables: {
        login: 'test',
      },
    },
    result: {
      data: PR_MOCK,
    },
  },
  {
    request: {
      query: GET_REPOS,
      variables: {
        login: 'test',
      },
    },
    result: {
      data: REPO_MOCK,
    },
  },
  {
    request: {
      query: GET_AUTHORS,
      variables: {
        login: 'test',
      },
    },
    result: {
      data: AUTH_MOCK,
    },
  },
];

describe('Dashboard loads data when no errors shows correct page based on Query Result', () => {
  const errorPrs = [
    {
      request: {
        query: GET_PRS,
        variables: {
          login: 'test',
        },
      },
      error: new Error('Testing error page on Dashboard for GET_PRS'),
    },
    {
      request: {
        query: GET_REPOS,
        variables: {
          login: 'test',
        },
      },
      result: {
        data: REPO_MOCK,
      },
    },
    {
      request: {
        query: GET_AUTHORS,
        variables: {
          login: 'test',
        },
      },
      result: {
        data: AUTH_MOCK,
      },
    },
  ];

  const errorRepos = [
    {
      request: {
        query: GET_PRS,
        variables: {
          login: 'test',
        },
      },
      result: {
        data: PR_MOCK,
      },
    },
    {
      request: {
        query: GET_REPOS,
        variables: {
          login: 'test',
        },
      },
      error: new Error('Testing error page on Dashboard for GET_REPOS'),
    },
    {
      request: {
        query: GET_AUTHORS,
        variables: {
          login: 'test',
        },
      },
      result: {
        data: AUTH_MOCK,
      },
    },
  ];

  const errorAuths = [
    {
      request: {
        query: GET_PRS,
        variables: {
          login: 'test',
        },
      },
      result: {
        data: PR_MOCK,
      },
    },
    {
      request: {
        query: GET_REPOS,
        variables: {
          login: 'test',
        },
      },
      result: {
        data: REPO_MOCK,
      },
    },
    {
      request: {
        query: GET_AUTHORS,
        variables: {
          login: 'test',
        },
      },
      error: new Error('Testing error page on Dashboard for GET_AUTHORS'),
    },
  ];



  it('loading page works', () => {
    const wrapper = mount(
      <MockedProvider mocks={data_mocks}>
        <Dashboard username={'test'} />
      </MockedProvider>
    );
    expect(
      wrapper.containsMatchingElement(
        <TransitionPage children={'Fetching your PRs...'} />
      )
    ).toEqual(true);
  });

  it('error page works for error in prs', async () => {
    const wrapper = mount(
      <MockedProvider mocks={errorPrs}>
        <Dashboard username={'test'} />
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    expect(
      wrapper.containsMatchingElement(
        <TransitionPage
          children='Something went wrong fetching your PRs... Please, refresh the page'
          type={'error token'}
        />
      )
    ).toEqual(true);
  });

  it('error page works for error in repos', async () => {
    const wrapper = mount(
      <MockedProvider mocks={errorRepos}>
        <Dashboard username={'test'} />
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    expect(
      wrapper.containsMatchingElement(
        <TransitionPage
          children='Something went wrong fetching your PRs... Please, refresh the page'
          type={'error token'}
        />
      )
    ).toEqual(true);
  });

  it('error page works for error in authors', async () => {
    const wrapper = mount(
      <MockedProvider mocks={errorAuths}>
        <Dashboard username={'test'} />
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    expect(
      wrapper.containsMatchingElement(
        <TransitionPage
          children='Something went wrong fetching your PRs... Please, refresh the page'
          type={'error token'}
        />
      )
    ).toEqual(true);
  });

  it('data page works', async () => {
    const wrapper = mount(
      <MockedProvider mocks={data_mocks}>
        <Dashboard username={'test'} />
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    expect(wrapper.containsMatchingElement(<NavBar />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<TransitionPage />)).toEqual(false);
  });
});
