import { shallow } from 'enzyme';
import React from 'react';
import PrPreview from '../PrPreview/PrPreview';
import PrList from './PrList';


describe('PrList loads all Prs passed by parent', () => {

  const prs = [{ id: 1, others: 'test' }, { id: 2, others: 'test' }, { id: 3, others: 'test' }];
  const wrapper = shallow(<PrList prs={prs} />);

  const prsVis = [{ id: 1, others: 'test' }, { id: 2, others: 'test' }];
  const wrapperVis = shallow(<PrList prs={prsVis} />);

  const wrapperNoPrs = shallow(<PrList />);

  it('No <PrPreview/> rendered if No prs passed to PRlist component', () => {
    expect(wrapperNoPrs.containsMatchingElement(<PrPreview />)).toEqual(false);
  });

  it('Number of <PrPreview/> rendered is equal to number of prs passed to PRlist component', () => {
    expect(wrapper.find(PrPreview).length).toBe(3);
    expect(wrapperVis.find(PrPreview).length).toBe(2);
  });

});
