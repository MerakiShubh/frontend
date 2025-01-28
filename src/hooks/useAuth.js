import { useEffect } from "react";
import { useRefreshAccessTokenMutation } from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, setAccessToken } from "../store/feature/authSlice";

const useAuth = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshAccessTokenMutation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          // Token exists, set user as authenticated
          dispatch(setUser({ token }));
        } else {
          // Try refreshing the token
          const response = await refreshToken().unwrap();
          dispatch(setUser(response.user)); // Assuming response contains user data
          dispatch(setAccessToken(response.accessToken));
        }
      } catch (err) {
        dispatch(clearUser());
        console.error("Token validation failed:", err);
      }
    };

    if (!isAuthenticated) {
      validateToken();
    }
  }, [isAuthenticated, refreshToken, dispatch]);

  return isAuthenticated;
};

export default useAuth;
