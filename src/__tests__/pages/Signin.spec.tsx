import React from 'react';
import { render } from '@testing-library/react';

import SignIn from '../../pages/Signin';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Signin Page', () => {
  it('it should be able to signin', () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
