import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Signin from '../../pages/Signin';

const mockedHistory = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistory,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../context/AuthContext', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('Signin Page', () => {
  it('it should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordlField = getByPlaceholderText('Senha');
    const buttonTextElement = getByText('Enviar');

    fireEvent.change(emailField, { target: { value: 'alfiado@alfiado.com' } });
    fireEvent.change(passwordlField, { target: { value: '123456' } });

    fireEvent.click(buttonTextElement);

    await waitFor(() => expect(mockedHistory).toHaveBeenCalledWith('/'));
  });
});
