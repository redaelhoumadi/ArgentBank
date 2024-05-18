import { useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../utils/assets";
import { useGetCurrentUserQuery } from "@/store/services/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "@/store/features/authSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { access_token, isAuthenticated } = useSelector((state) => state.auth);

  // Fetch current user and provide refetch function
  const { data: user, refetch } = useGetCurrentUserQuery(null);

  // Refetch user data if access_token changes
  useEffect(() => {
    if (access_token) {
      refetch();
    }
  }, [access_token, refetch]);

  // Handle logout
  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {isAuthenticated ? (
          <div>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user?.body.firstName}
            </Link>
            <button onClick={handleLogout} className="main-nav-item font-bold">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-sign-out"></i>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
