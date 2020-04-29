import { shallow } from 'enzyme';
import React from 'react';
import Avatar from './Avatar';

describe('Avatar loads properly', () => {

  const wrapper = shallow(<Avatar avatarUrl={'avatarUrl'} />);

  it('Initial state always loads <img />', () => {
    expect(wrapper.containsMatchingElement(<img />)).toEqual(true);
  });

  it('<img src="avatarUrl/> inherits src from parent', () => {
    expect(wrapper.find('img').prop('src')).toEqual('avatarUrl');
  });

  test('Renders avatar error span if there is no image', () => {
    const imgMock = wrapper.find('img');
    imgMock.simulate('error');
    expect(wrapper.containsMatchingElement(<span />)).toEqual(true);
  });

});