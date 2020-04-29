import { shallow } from 'enzyme';
import React from 'react';
import PrDetails from './PrDetails';
import Status from '../Status/Status';
import mockPr from '../PrPreview/mockPr.json';

describe('PrDetails loads properly', () => {

  const wrapper = shallow(<PrDetails pr={mockPr.pr} />);

  it('Always loads <Status />', () => {
    expect(wrapper.containsMatchingElement(<Status />)).toEqual(true);
  });

  it('<PrDetails reviewers={pr.assignees.nodes}/> passes "reviewers" property to children', () => {
    expect(wrapper.find(Status).prop('reviewers')).toEqual([] || mockPr.pr.assignees.nodes);
  });
  it('<PrDetails assignees={pr.assignees.nodes}/> passes "assignees" property to children', () => {
    expect(wrapper.find(Status).prop('assignees')).toEqual(mockPr.pr.assignees.nodes);
  });

  it('Always loads date', () => {
    expect(wrapper.find('.PrDetails-date').length).toBe(1);
  });

});