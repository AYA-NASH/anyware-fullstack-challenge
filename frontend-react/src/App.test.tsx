import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock('redux-thunk', () => {
  const mockThunkMiddleware = (store: any) => (next: any) => (action: any) => {
    if (typeof action === 'function') {
      return action(store.dispatch, store.getState, undefined);
    }
    return next(action);
  };
  return mockThunkMiddleware;
});

import thunk from 'redux-thunk';
import App from "./App";

jest.mock("./config", () => ({ baseUrl: "http://mockapi.test" }));

jest.mock('react-router-dom', () => {
  const actualRouterDom = jest.requireActual('react-router-dom');

  return {
    ...actualRouterDom, // Keep all other original exports like 'Link', 'useNavigate', etc.
    BrowserRouter: ({ children }: { children: React.ReactNode }) => {
      return (
        <actualRouterDom.MemoryRouter initialEntries={[window.location.pathname]}>
          {children}
        </actualRouterDom.MemoryRouter>
      );
    },
  };
});

beforeAll(() => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ result: [] }),
    })
  ) as any;
});

const mockStore = configureStore([thunk as any]);

function renderWithStore(store: any) {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe("App routing and authentication", () => {
  it("redirects unauthenticated users to /login when accessing /dashboard", async () => {
    const store = mockStore({ auth: { authorized: false }, notification: {} });
    window.history.pushState({}, "Test page", "/dashboard");
    renderWithStore(store);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });

  it("allows authenticated users to access /dashboard", async () => {
    const store = mockStore({ auth: { authorized: true }, notification: {} });
    window.history.pushState({}, "Test page", "/dashboard");
    renderWithStore(store);
    await waitFor(() => {
      expect(screen.getByText(/Announcements/i)).toBeInTheDocument();
      expect(screen.getByText(/What’s Due/i)).toBeInTheDocument();
    });
  });

  it("redirects unknown routes to /login", async () => {
    const store = mockStore({ auth: { authorized: false }, notification: {} });
    window.history.pushState({}, "Test page", "/unknown");
    renderWithStore(store);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });
});