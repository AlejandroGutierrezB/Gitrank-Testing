import { shallow } from 'enzyme';
import React from 'react';
import PrPreview from './PrPreview';
import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';
import Badge from '../Badge/Badge';
import Assign from '../Assign/Assign';
import PrDetails from '../PrDetails/PrDetails';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import mockPr from './mockPr.json';


describe('PrPreview renders all elements', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PrPreview pr={mockPr.pr} userId='userId' />);
  });

  describe('<header />', () => {
    it('It always renders <header />', () => {
      expect(wrapper.find('.PrPreview-header').length).toBe(1);
    });
  });

  describe('<Avatar />', () => {

    it('Always renders <Avatar /> with user info', () => {
      expect(wrapper.find('.PrPreview-header-avatar').length).toBe(1);
      expect(wrapper.find(Avatar).prop('avatarUrl')).toEqual(`${mockPr.pr.author.avatarUrl}`);
      expect(wrapper.find(Avatar).prop('author')).toEqual(`${mockPr.pr.author.login}`);
    });

    describe('Avatar renders bot view if pr.author.__typename !== "User" ', () => {
      const wrapper = shallow(<PrPreview pr={mockPr.prBot} />);

      it('<Avatar author={"Bot"}/>', () => {
        expect(wrapper.find('.PrPreview-header-avatar').length).toBe(1);
        expect(wrapper.containsMatchingElement(<Avatar avatarUrl={'https://octodex.github.com/images/Robotocat.png'} />)).toEqual(true);
      });

    });

  });


  describe('Header-title', () => {

    it('Always renders 1 header-title', () => {
      expect(wrapper.find('.PrPreview-header-title').length).toBe(1);
    });

    it('It has 1 link with the name of the repo and the owner', () => {
      expect(wrapper.find('.PrPreview-header-repo').prop('href')).toEqual(`${mockPr.pr.repository.url}`);
      expect(wrapper.find('.PrPreview-header-repo').text()).toEqual(`${mockPr.pr.repository.nameWithOwner}`);
    });

    it('It has 1 link with the number and name of the PR', () => {
      expect(wrapper.find('.PrPreview-header-name').prop('href')).toEqual(`${mockPr.pr.url}`);
      expect(wrapper.find('.PrPreview-header-name').text()).toEqual(`#${mockPr.pr.number} ${mockPr.pr.title}`);
    });
  });

  describe('Header-details', () => {
    it('Always renders header-details with badge', () => {
      expect(wrapper.find('.PrPreview-header-details').length).toBe(1);
    });

    it('Header-details contains badge', () => {
      expect(wrapper.containsMatchingElement(<Badge className='PrPreview-header-badge' />)).toEqual(true);
    });

    it('<Badge type={pr.state}/> passes "type" property to children', () => {
      expect(wrapper.find(Badge).prop('type')).toEqual(`${mockPr.pr.state}`);
    });

  });

  describe('Header-actions', () => {

    it('Always renders header-actions', () => {
      expect(wrapper.find('.PrPreview-header-actions').length).toBe(1);
    });

    describe('Copy-button', () => {

      it('Always renders <Button icon={"copy"}', () => {
        expect(wrapper.containsMatchingElement(<Button icon={'copy'} />)).toEqual(true);
      });

      it('<Clipboard /> has the link passed down', () => {
        expect(wrapper.find(CopyToClipboard).prop('text')).toEqual(`${mockPr.pr.url}`);
      });
    });

    describe('Fav-button', () => {

      it('Always renders <Button icon={"star"}', () => {
        expect(wrapper.containsMatchingElement(<Button icon={'star'} />)).toEqual(true);
      });

      it('Only If it is a fav pr, star icon is always displayed', () => {
        expect(wrapper.find('.PrPreview-header-button--isFavorite').length).toBe(0);
      });

      it('Handle onClick', () => {
        jest.mock('../../helperFunc.js', () => ({ pinItem: jest.fn() }));
        const setPinnedItems = jest.fn();
        wrapper.setProps({ setPinnedItems });
        const btnFav = wrapper.find('.star');
        const event = { currentTarget: { getAttribute: () => { }, 'prid': `${mockPr.pr.id}` } };
        btnFav.simulate('click', event);
        expect(setPinnedItems.mock.calls.length).toBe(1);
      });

    });

    describe('<Assign/>', () => {

      it('Always renders <Assign/>', () => {
        expect(wrapper.containsMatchingElement(<Assign className={'PrPreview-header-button'} />)).toEqual(true);
      });

      it('<Assign prId={pr.id}/> passes "prId" to child', () => {
        expect(wrapper.find(Assign).prop('prId')).toEqual(`${mockPr.pr.id}`);
      });

      it('<Assign userId={userId}/> passes "userId" to child', () => {
        expect(wrapper.find(Assign).prop('userId')).toEqual('userId');
      });

      it('<Assign isAssigned={isAssignedToUser}/> passes "isAssigned" to child', () => {
        const mockIsAssignedToUser = mockPr.pr.assignees.nodes.length === 0 ? false : true;
        expect(wrapper.find(Assign).prop('isAssigned')).toEqual(mockIsAssignedToUser);
      });

      it('<Assign currentAssignees={pr.assignees.nodes}/> passes "currentAssignees" to child', () => {
        expect(wrapper.find(Assign).prop('currentAssignees')).toEqual(mockPr.pr.assignees.nodes);
      });

    });

  });

  describe('<PrDetails />', () => {

    it('It always renders <PrDetails />', () => {
      expect(wrapper.find(PrDetails).length).toBe(1);
    });

    it('<PrDetails pr={pr}/> passes "pr" to child', () => {
      expect(wrapper.find(PrDetails).prop('pr')).toEqual(mockPr.pr);
    });

  });

});
