import { useState } from "react";
import { useLoginUserMutation } from "../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../store/feature/authSlice";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginUserMutation();

  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const dispatch = useDispatch();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ emailOrUsername, password }).unwrap();
      console.log("Login successful:", response);

      // Store token in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);

      // Update Redux state
      dispatch(setUser(response.data.user));
      dispatch(setAccessToken(response.data.accessToken));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="mb-6 text-2xl font-extrabold text-center text-gray-800">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="emailOrUsername"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white rounded-lg shadow-md transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && error.data?.message && (
          <p className="mt-4 text-sm font-medium text-center text-red-500">
            {error.data.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
