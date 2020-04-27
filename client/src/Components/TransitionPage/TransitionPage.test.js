import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import TransitionPage from './TransitionPage'

describe('TransitionPage renders', () => {

  test('the error page if type error is passed', () => {
    const { getByText } = render(<TransitionPage type={'error token'} />);
    const linkElement = getByText(/Wrong token/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('the loading page if app is loading', () => {
    const wrapper = shallow(<TransitionPage type={'error token'} children={'Test loading'} />);
    expect(wrapper.find('.TransitionPage-errorButton').length).toBe(1);
  });

});
