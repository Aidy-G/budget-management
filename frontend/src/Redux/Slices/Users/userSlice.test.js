import { userSlice, restoreUserFromSession, resetUser, setUser } from './userSlice';

describe('userSlice session persistence', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('loads saved user from sessionStorage when restoreUserFromSession is dispatched', () => {
    const savedUser = { id: 7, userName: 'demo', schoolSymbol: 0 };
    sessionStorage.setItem('schoolBudgetSessionUser', JSON.stringify(savedUser));

    const state = userSlice.reducer(undefined, restoreUserFromSession());

    expect(state.currUser).toEqual(savedUser);
  });

  test('saves user to sessionStorage when setUser is dispatched', () => {
    const user = { id: 7, userName: 'demo', schoolSymbol: 0 };

    const state = userSlice.reducer(undefined, setUser(user));

    expect(state.currUser).toEqual(user);
    expect(JSON.parse(sessionStorage.getItem('schoolBudgetSessionUser'))).toEqual(user);
  });

  test('clears sessionStorage when resetUser is dispatched', () => {
    const user = { id: 7, userName: 'demo', schoolSymbol: 0 };
    sessionStorage.setItem('schoolBudgetSessionUser', JSON.stringify(user));

    const state = userSlice.reducer({ currUser: user }, resetUser());

    expect(state.currUser).toEqual({});
    expect(sessionStorage.getItem('schoolBudgetSessionUser')).toBeNull();
  });
});
