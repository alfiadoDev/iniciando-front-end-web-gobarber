import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../context/AuthContext';

describe('Auth Hook', () => {
  it('Should be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'alfiado@a.com',
      password: '123456',
    });

    expect(result.current.user.email).toEqual('alfiado@a.com');
  });
});
