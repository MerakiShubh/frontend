import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Redirect to login page if not authenticated
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
