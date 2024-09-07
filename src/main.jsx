// index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthContext";

/**
 * The entry point of the application that renders the root component.
 *
 * @returns {JSX.Element} The rendered application component with Redux and Auth context providers
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the application with the Redux provider to allow access to the Redux store */}
    <Provider store={store}>
      {/* Wrap the application with the AuthProvider to manage authentication state */}
      <AuthProvider>
        {/* Render the main application component */}
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
