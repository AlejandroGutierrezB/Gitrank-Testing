import { shallow } from 'enzyme';
import React from 'react';
import Feedback from './Feedback';


describe('Feedback Loads properly', () => {

  const wrapper = shallow(<Feedback/>);

  it('with 2 buttons', () => {
    expect(wrapper.find('.Feedback-button').length).toBe(2);
  });
});

