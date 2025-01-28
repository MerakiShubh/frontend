import { useDispatch } from "react-redux";
import { clearUser } from "../store/feature/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear token
    dispatch(clearUser()); // Clear Redux state
    navigate("/"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
