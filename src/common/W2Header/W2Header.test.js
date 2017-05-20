import React from 'react';
import { shallow } from 'enzyme';
import W2Header from './W2Header';

it('renders without crashing', () => {
  shallow(<W2Header />);
});
