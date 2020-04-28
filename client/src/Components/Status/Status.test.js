import { shallow } from 'enzyme';
import React from 'react';
import Status from './Status';
import mockData from './mockData.json';

describe('Status loads properly', () => {

  const reviewers = [];
  const assignees = [];

  describe('There are no reviewers and no Assignees', () => {

    const wrapper = shallow(<Status reviewers={reviewers} assignees={assignees} />);

    it('renders No reviewers <span/>', () => {
      expect(wrapper.find('.Status-text.Reviewers').text()).toEqual('No reviewers');
    });

    it('Renders No assignees <span/>', () => {
      expect(wrapper.find('.Status-text.Assignees').text()).toEqual('No assignees');
    });
  });

  describe('There are reviewers', () => {

    const wrapper = shallow(<Status reviewers={mockData} assignees={assignees} />);
    it('renders reviewers <span/>', () => {
      expect(wrapper.find('.Status-text.Reviewers').text()).toEqual('Reviewers');
    });

    it('Number of <Avatar/>s rendered is equal to the number of reviewers', () => {
      expect(wrapper.find('.Status-reviewers-avatars').children()).toHaveLength(mockData.length);
    });
  });

  describe('There are assignees', () => {

    const wrapper = shallow(<Status reviewers={reviewers} assignees={mockData} />);

    it('renders assignees <span/>', () => {
      expect(wrapper.find('.Status-text.Assignees').text()).toEqual('Assignees');
    });

    it('Number of <Avatar/>s rendered is equal to the number of assignees', () => {
      expect(wrapper.find('.Status-assignees-avatars').children()).toHaveLength(mockData.length);
    });
  });
});