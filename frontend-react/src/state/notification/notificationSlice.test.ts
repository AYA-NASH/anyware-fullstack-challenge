import notificationReducer, { showNotification, hideNotification } from './notificationSlice';

describe('notificationSlice reducers', () => {
  it('should handle showNotification with all fields', () => {
    const initialState = { open: false, message: '', type: 'info', autoHideDuration: 6000 };
    const payload = { message: 'Test', type: 'success', autoHideDuration: 3000 };
    const nextState = notificationReducer(initialState, showNotification(payload));
    expect(nextState.open).toBe(true);
    expect(nextState.message).toBe('Test');
    expect(nextState.type).toBe('success');
    expect(nextState.autoHideDuration).toBe(3000);
  });

  it('should handle showNotification with defaults', () => {
    const initialState = { open: false, message: '', type: 'info', autoHideDuration: 6000 };
    const payload = { message: 'Default test' };
    const nextState = notificationReducer(initialState, showNotification(payload));
    expect(nextState.open).toBe(true);
    expect(nextState.message).toBe('Default test');
    expect(nextState.type).toBe('info');
    expect(nextState.autoHideDuration).toBe(6000);
  });

  it('should handle hideNotification', () => {
    const initialState = { open: true, message: 'Hide me', type: 'warning', autoHideDuration: 4000 };
    const nextState = notificationReducer(initialState, hideNotification());
    expect(nextState.open).toBe(false);
    expect(nextState.message).toBe('');
    expect(nextState.type).toBe('warning');
    expect(nextState.autoHideDuration).toBe(4000);
  });
}); 