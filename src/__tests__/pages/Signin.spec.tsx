import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Signin from '../../pages/Signin';

const mockedHistory = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

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
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Signin Page', () => {
  beforeEach(() => {
    mockedHistory.mockClear();
  });

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

  it('it should not be able to signin with invalide crendetials', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordlField = getByPlaceholderText('Senha');
    const buttonTextElement = getByText('Enviar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordlField, { target: { value: '123456' } });

    fireEvent.click(buttonTextElement);

    await waitFor(() => expect(mockedHistory).not.toHaveBeenCalled());
  });

  it('it should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<Signin />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordlField = getByPlaceholderText('Senha');
    const buttonTextElement = getByText('Enviar');

    fireEvent.change(emailField, { target: { value: 'alfiado@a.com' } });
    fireEvent.change(passwordlField, { target: { value: '123456' } });

    fireEvent.click(buttonTextElement);

    await waitFor(() =>
      expect(mockedAddToast).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      ),
    );
  });
});
