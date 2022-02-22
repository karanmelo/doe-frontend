import React from 'react';

import renderer from 'react-test-renderer';

import { Sidebar } from '../../../modules/web/components/Sidebar';

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ goBack: () => undefined }),
  };
});

describe('Component - Sidebar', () => {
  it('should be render component', () => {
    const component = renderer.create(<Sidebar />);

    expect(component).toMatchSnapshot();
  });
});
