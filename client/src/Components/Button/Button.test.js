import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('Button', () => {
  it('If icon <Button/> renders a <FontAwesomeIcon />', () => {
    const wrapper = shallow(<Button icon={'icon'} />);
    expect(wrapper.containsMatchingElement(<FontAwesomeIcon />)).toEqual(true);
  });

  test('if it has a children it renders the children', () => {
    const { getByText } = render(<Button children={'Test children'} />);
    const linkElement = getByText(/Test children/i);
    expect(linkElement).toBeInTheDocument();
  });

});
