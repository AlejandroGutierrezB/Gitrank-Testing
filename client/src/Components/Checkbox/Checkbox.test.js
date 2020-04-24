
import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Checkbox from './Checkbox';

describe('Checkbox', () => {

  test('If text <Checkbox/> renders a <p>text</>', () => {
    const { getByText } = render(<Checkbox text={'Test text'} />);
    const linkElement = getByText(/Test text/i);
    expect(linkElement).toBeInTheDocument();
  });

});
