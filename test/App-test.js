import { shallow } from 'enzyme';
import React from 'react';
import Main from '../public/src/components/Main.jsx'


describe('<Main />', () => {
  it('should render one <FuturePostList /> components', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(FuturePostList)).to.have.length(1);
  });
});