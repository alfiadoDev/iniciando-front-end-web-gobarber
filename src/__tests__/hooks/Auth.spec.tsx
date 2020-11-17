import { renderHook, act } from '@testing-library/react-hooks';
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

  it('Should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123456';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123456',
            name: 'alfiado',
            email: 'alfiado@a.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('alfiado@a.com');
  });

  it('Should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123456';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123456',
            name: 'alfiado',
            email: 'alfiado@a.com',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('Should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user123456',
      name: 'alfiado',
      email: 'alfiado@a.com',
      avatar_url: 'image.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
