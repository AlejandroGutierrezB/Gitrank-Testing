
import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Badge from './Badge';
import Emoji from 'a11y-react-emoji';
import { emojis } from './emojis-type';

describe('Badge', () => {

  it('If emoji <Badge/> renders a <Emoji />', () => {
    const wrapper = shallow(<Badge emoji={true} type={Object.keys(emojis)[0]} />);
    expect(wrapper.containsMatchingElement(<Emoji />)).toEqual(true);
  });

  test('If type <Badge/> renders type', () => {
    const { getByText } = render(<Badge type={'Test type'} />);
    const linkElement = getByText(/Test type/i);
    expect(linkElement).toBeInTheDocument();
  });

});
