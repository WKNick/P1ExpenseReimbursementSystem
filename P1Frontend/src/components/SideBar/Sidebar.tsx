import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { store } from "../../globalData/store";

export const Sidebar: React.FC<{
  setIsAuthenticated: (auth: boolean) => void;
}> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className={`bar ${isCollapsed ? "bar1" : ""}`}></div>
        <div className={`bar ${isCollapsed ? "bar2" : ""}`}></div>
        <div className={`bar ${isCollapsed ? "bar3" : ""}`}></div>
      </div>
      {!isCollapsed && (
        <>
          <div>
            <div className="user-name">
              {store.loggedInUser.firstName} {store.loggedInUser.lastName}
            </div>
            <div
              className="logout"
              onClick={() => {
                store.loggedInUser = {
                  userId: 0,
                  firstName: "",
                  lastName: "",
                  username: "",
                  email: "",
                  password: "",
                  role: "",
                };
                navigate("/");

                setIsAuthenticated(false);
              }}
            >
              Logout
            </div>
          </div>
          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Account
            </NavLink>
            <NavLink
              to="/reimbursements"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Reimbursements
            </NavLink>
            {store.loggedInUser.role === "Admin" && (
              <>
                <NavLink
                  to="/adminreimbursements"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Admin Reimbursements
                </NavLink>

                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Users
                </NavLink>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
