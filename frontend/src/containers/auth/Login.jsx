import React, { useState, useContext, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../../contexts";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    console.log("yp");
    const {
      data: { success, userType },
    } = await axios.post(`/api/auth/login`, {
      username,
      password,
    });
    if (success) {
      setUser({ username, userType });
    } else {
      alert("failed");
    }
  };

  if (user) {
    const landingPage =
      user.userType === "ADMIN" ? "/admin-dashboard" : "/my-trip";
    return <Redirect to={landingPage} />;
  }

  return (
    <React.Fragment>
      <header>Login</header>
      <form onSubmit={login}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
        <button type="button" onClick={() => history.push("/registration")}>
          Register
        </button>
      </form>
    </React.Fragment>
  );
};
export default Login;
