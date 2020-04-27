import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { UserContext } from "../../contexts";

const NavBarButton = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  return user ? (
    <div className="navbar-end">
      <div className="navbar-item">
        <button
          className="button"
          type="button"
          onClick={() => {
            setUser(null);
            localStorage.removeItem("userType");
            localStorage.removeItem("username");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
};

export default NavBarButton;
