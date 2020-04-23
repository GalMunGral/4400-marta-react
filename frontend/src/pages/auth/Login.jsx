import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
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
    <div className="columns is-centered">
      <div className="column is-one-third">
        <div className="box">
          <header className="title is-1">Login</header>
          <form onSubmit={login}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Login</button>
              </div>
              <div className="control">
                <button
                  className="button"
                  type="button"
                  onClick={() => history.push("/registration")}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
