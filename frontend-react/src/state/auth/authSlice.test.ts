import authReducer, { login, logout, setLogoutTimerId, startLogoutTimer, resetLogoutTimer, clearLogoutTimer } from './authSlice';
import { showNotification } from '../notification/notificationSlice';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

const middlewares = [thunk as any];
const mockStore = configureStore(middlewares);

describe('authSlice reducers', () => {
  it('should handle login', () => {
    const initialState = { authorized: false, logoutTimerId: null };
    const nextState = authReducer(initialState, login());
    expect(nextState.authorized).toBe(true);
  });

  it('should handle logout', () => {
    const initialState = { authorized: true, logoutTimerId: 123 };
    const nextState = authReducer(initialState, logout());
    expect(nextState.authorized).toBe(false);
  });

  it('should handle setLogoutTimerId', () => {
    const initialState = { authorized: false, logoutTimerId: null };
    const nextState = authReducer(initialState, setLogoutTimerId(42));
    expect(nextState.logoutTimerId).toBe(42);
  });
});

describe('authSlice thunks', () => {
  let store: ReturnType<typeof mockStore>;
  let originalLocalStorage: typeof globalThis.localStorage;
  let setTimeoutSpy: jest.SpyInstance;
  let clearTimeoutSpy: jest.SpyInstance;
  let removeItemMock: jest.Mock;
  let authSlice: typeof import('./authSlice');
  beforeEach(async () => {
    jest.resetModules();
    store = mockStore({ auth: { authorized: true, logoutTimerId: null } });
    jest.useFakeTimers();
    setTimeoutSpy = jest.spyOn(globalThis, 'setTimeout');
    clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout');
    originalLocalStorage = globalThis.localStorage;
    removeItemMock = jest.fn();
    globalThis.localStorage = {
      removeItem: removeItemMock,
      getItem: jest.fn(() => 'true'),
      setItem: jest.fn(),
    } as any;
    authSlice = await import('./authSlice');
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    setTimeoutSpy.mockRestore();
    clearTimeoutSpy.mockRestore();
    globalThis.localStorage = originalLocalStorage;
  });

  it('startLogoutTimer sets a timer and dispatches logout and showNotification after timeout', () => {
    store.dispatch(authSlice.startLogoutTimer(1000) as any);
    expect(setTimeoutSpy).toHaveBeenCalled();
    jest.runAllTimers();
    const actions = store.getActions();
    expect(actions.some((a: any) => a.type === authSlice.logout.type)).toBe(true);
    expect(actions.some((a: any) => a.type === showNotification.type)).toBe(true);
  });

  it('resetLogoutTimer dispatches startLogoutTimer', () => {
    store.dispatch(authSlice.resetLogoutTimer(2000) as any);
    expect(setTimeoutSpy).toHaveBeenCalled();
  });

  it('clearLogoutTimer clears the timer', () => {
    store.dispatch(authSlice.startLogoutTimer(1000) as any);
    store.dispatch(authSlice.clearLogoutTimer() as any);
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});