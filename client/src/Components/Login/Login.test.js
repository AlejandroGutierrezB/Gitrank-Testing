import { shallow, mount, unmount } from 'enzyme';
import React from 'react';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Login from './Login';


describe('Login loads properly', () => {

  const wrapper = shallow(<Login isEnterprise={false} />);

  it('Initial state always loads <img />', () => {
    expect(wrapper.containsMatchingElement(<img />)).toEqual(true);
  });

  it('Initial state always <Checkbox />', () => {
    expect(wrapper.containsMatchingElement(<Checkbox />)).toEqual(true);
  });

  it('Initial state always <Button />', () => {
    expect(wrapper.containsMatchingElement(<Button children={'Go!'} />)).toEqual(true);
  });

  it('<form /> always loads 3 elements with .Login-input ', () => {
    // expect(wrapper.find(<input />)).to.have.length(2);
    expect(wrapper.find('.Login-input').length).toBe(3);
  });

  describe('On Checkbox Change', () => {

    test('successfully renders the enterprise input field', () => {
      const event = { target: { checked: true } };
      const initialLenght = wrapper.find('.Login-input').length;
      const checkBox = wrapper.find('.Login-input.Testing-input');
      checkBox.simulate('change', event);
      expect(wrapper.find('.Login-input').length).toBe(initialLenght + 1);
    });

  });
});


describe('<Login /> state handling', () => {
  let wrapper;
  const fakeAssignCredentials = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Login assignCredentials={fakeAssignCredentials} />);
  });


  it('Call assigns credentials prop with value of username and token textfields', async () => {
    const inputName = wrapper.find('.Login-input.Username');
    const inputToken = wrapper.find('.Login-input.Token');
    const eventName = { target: { value: 'Test Name' } };
    const eventToken = { target: { value: 'Test Token' } };
    await inputName.simulate('change', eventName);
    await inputToken.simulate('change', eventToken);
    const form = wrapper.find('.Login-form');
    await form.simulate('submit', new Event('submit'));
    expect(fakeAssignCredentials.mock.calls.length).toBe(1);
    expect(fakeAssignCredentials.mock.calls[0][0]).toBe('Test Name');
    expect(fakeAssignCredentials.mock.calls[0][1]).toBe('Test Token');
  });
});
