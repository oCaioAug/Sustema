import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock do addEventListener e removeEventListener
const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

describe('useAuth Hook', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
  });

  test('returns false when no token is present', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useAuth());
    
    expect(result.current).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
  });

  test('returns true when token is present', () => {
    localStorageMock.getItem.mockReturnValue('fake-token');
    
    const { result } = renderHook(() => useAuth());
    
    expect(result.current).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
  });

  test('sets up storage event listener', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    renderHook(() => useAuth());
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
  });

  test('cleans up event listener on unmount', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { unmount } = renderHook(() => useAuth());
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
  });

  test('updates authentication state when storage changes', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);
    
    const { result } = renderHook(() => useAuth());
    
    expect(result.current).toBe(false);
    
    // Simula mudança no localStorage
    localStorageMock.getItem.mockReturnValue('new-token');
    
    // Simula o evento de storage
    act(() => {
      const storageHandler = addEventListenerSpy.mock.calls.find(
        call => call[0] === 'storage'
      )?.[1] as Function;
      
      if (storageHandler) {
        storageHandler();
      }
    });
    
    expect(result.current).toBe(true);
  });

  test('handles empty string token as falsy', () => {
    localStorageMock.getItem.mockReturnValue('');
    
    const { result } = renderHook(() => useAuth());
    
    expect(result.current).toBe(false);
  });
});