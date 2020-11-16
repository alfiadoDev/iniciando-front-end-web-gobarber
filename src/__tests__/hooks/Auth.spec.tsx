import { renderHook } from '@testing-library/react-hooks';
import MockAdapetr from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const apiMock = new MockAdapetr(api);

describe('Auth Hook', () => {
  it('Should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user123456',
        name: 'alfiado',
        email: 'alfiado@a.com',
      },
      token: 'token-1234656',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'alfiado@a.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );

    expect(result.current.user.email).toEqual('alfiado@a.com');
  });
});
